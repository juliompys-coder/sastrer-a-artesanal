import crypto from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

const DEFAULT_PIXEL_ID = '983079787006620';
const META_GRAPH_API_VERSION = 'v21.0';
const ALLOWED_EVENTS = new Set(['PageView', 'InitiateCheckout']);
const CANONICAL_OFFER = {
  value: 25,
  currency: 'USD',
  content_name: 'Alta Sastrería Masculina',
  content_type: 'product',
} as const;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 60;
const ipBuckets = new Map<string, { count: number; resetAt: number }>();

export interface MetaApiRequest extends IncomingMessage {
  body?: unknown;
}

export interface MetaApiResponse extends ServerResponse {
  status?: (code: number) => MetaApiResponse;
  json?: (body: unknown) => void;
}

function sendJson(res: MetaApiResponse, statusCode: number, payload: unknown): void {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (typeof res.status === 'function') {
    const responseWithStatus = res.status(statusCode);
    if (typeof responseWithStatus.json === 'function') {
      responseWithStatus.json(payload);
      return;
    }
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function getHeaderValue(req: MetaApiRequest, name: string): string {
  const value = req.headers[name.toLowerCase()];
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }
  return typeof value === 'string' ? value : '';
}

function getClientIp(req: MetaApiRequest): string | undefined {
  const forwarded = getHeaderValue(req, 'x-forwarded-for');
  const candidate = forwarded
    ? forwarded.split(',')[0]?.trim()
    : req.socket?.remoteAddress?.trim();
  if (!candidate || candidate.length > 64) {
    return undefined;
  }
  return candidate;
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (ipBuckets.size > 5000) {
    for (const [key, bucket] of ipBuckets) {
      if (bucket.resetAt <= now) {
        ipBuckets.delete(key);
      }
    }
  }
  const existing = ipBuckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function isOriginAllowed(req: MetaApiRequest): boolean {
  const origin = getHeaderValue(req, 'origin');
  if (!origin) {
    return true;
  }
  const expectedHost = (
    getHeaderValue(req, 'x-forwarded-host') || getHeaderValue(req, 'host')
  )
    .split(',')[0]
    ?.trim()
    .toLowerCase();

  if (!expectedHost) {
    return false;
  }

  try {
    const parsedOrigin = new URL(origin);
    if (parsedOrigin.protocol !== 'http:' && parsedOrigin.protocol !== 'https:') {
      return false;
    }
    return parsedOrigin.host.toLowerCase() === expectedHost;
  } catch {
    return false;
  }
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) {
    return cookies;
  }
  for (const part of cookieHeader.split(';')) {
    const eqIndex = part.indexOf('=');
    if (eqIndex <= 0) continue;
    const key = part.slice(0, eqIndex).trim();
    const val = part.slice(eqIndex + 1).trim();
    if (key && val) {
      cookies[key] = val;
    }
  }
  return cookies;
}

function sanitizeEventId(value: unknown): string {
  if (typeof value === 'string' && /^[a-zA-Z0-9._-]{8,128}$/.test(value)) {
    return value;
  }
  return crypto.randomUUID();
}

function sanitizeEventSourceUrl(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length === 0 || value.length > 2048) {
    return undefined;
  }
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return undefined;
    }
    return parsed.toString();
  } catch {
    return undefined;
  }
}

function sanitizeFbp(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > 128) {
    return undefined;
  }
  return /^fb\.\d+\.\d+\.\d+$/.test(value) ? value : undefined;
}

function sanitizeFbc(value: unknown): string | undefined {
  if (typeof value !== 'string' || value.length > 256) {
    return undefined;
  }
  return /^fb\.\d+\.\d+\.[a-zA-Z0-9_-]{1,200}$/.test(value) ? value : undefined;
}

async function readJsonBody(req: MetaApiRequest): Promise<Record<string, unknown> | null> {
  if (req.body && typeof req.body === 'object' && !Array.isArray(req.body)) {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string') {
    try {
      const parsed = JSON.parse(req.body);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null;
    } catch {
      return null;
    }
  }

  const chunks: Buffer[] = [];
  let totalBytes = 0;
  const maxBytes = 16 * 1024;

  return new Promise((resolve) => {
    req.on('data', (chunk: Buffer) => {
      totalBytes += chunk.length;
      if (totalBytes > maxBytes) {
        resolve(null);
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (chunks.length === 0) {
        resolve(null);
        return;
      }
      try {
        const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        resolve(
          parsed && typeof parsed === 'object' && !Array.isArray(parsed)
            ? (parsed as Record<string, unknown>)
            : null
        );
      } catch {
        resolve(null);
      }
    });
    req.on('error', () => resolve(null));
  });
}

export default async function handler(
  req: MetaApiRequest,
  res: MetaApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  if (!isOriginAllowed(req)) {
    sendJson(res, 403, { ok: false, error: 'origin_not_allowed' });
    return;
  }

  const clientIp = getClientIp(req);
  if (clientIp && isRateLimited(clientIp)) {
    sendJson(res, 429, { ok: false, error: 'rate_limited' });
    return;
  }

  const body = await readJsonBody(req);
  if (!body) {
    sendJson(res, 400, { ok: false, error: 'invalid_payload' });
    return;
  }

  const eventName = typeof body.event_name === 'string' ? body.event_name.trim() : '';
  if (!ALLOWED_EVENTS.has(eventName)) {
    sendJson(res, 400, { ok: false, error: 'unsupported_event' });
    return;
  }

  const accessToken = (process.env.META_CONVERSIONS_API_TOKEN || '').trim();
  if (!accessToken) {
    sendJson(res, 200, { ok: false, configured: false });
    return;
  }

  const rawPixelId = (process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID).trim();
  if (!/^\d{5,20}$/.test(rawPixelId)) {
    sendJson(res, 500, { ok: false, error: 'invalid_pixel_configuration' });
    return;
  }

  const cookies = parseCookies(getHeaderValue(req, 'cookie'));
  const userAgent = getHeaderValue(req, 'user-agent').slice(0, 512) || undefined;
  const fbp = sanitizeFbp(body.fbp) ?? sanitizeFbp(cookies._fbp);
  const fbc = sanitizeFbc(body.fbc) ?? sanitizeFbc(cookies._fbc);
  const eventSourceUrl =
    sanitizeEventSourceUrl(body.event_source_url) ??
    sanitizeEventSourceUrl(getHeaderValue(req, 'referer'));
  const eventId = sanitizeEventId(body.event_id);

  const userData: Record<string, string> = {};
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const eventData: Record<string, unknown> = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    user_data: userData,
  };

  if (eventSourceUrl) {
    eventData.event_source_url = eventSourceUrl;
  }

  if (eventName === 'InitiateCheckout') {
    eventData.custom_data = {
      value: CANONICAL_OFFER.value,
      currency: CANONICAL_OFFER.currency,
      content_name: CANONICAL_OFFER.content_name,
      content_type: CANONICAL_OFFER.content_type,
    };
  }

  const metaPayload: Record<string, unknown> = {
    data: [eventData],
  };

  const testEventCode = (process.env.META_TEST_EVENT_CODE || '').trim();
  if (testEventCode && /^[A-Z0-9_-]{4,64}$/i.test(testEventCode)) {
    metaPayload.test_event_code = testEventCode;
  }

  const endpoint = `https://graph.facebook.com/${META_GRAPH_API_VERSION}/${rawPixelId}/events`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(metaPayload),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      sendJson(res, 502, { ok: false, error: 'meta_api_rejected' });
      return;
    }

    const result = (await response.json().catch(() => ({}))) as {
      events_received?: number;
    };

    sendJson(res, 200, {
      ok: true,
      events_received: result.events_received ?? 1,
    });
  } catch {
    sendJson(res, 502, { ok: false, error: 'meta_api_unreachable' });
  }
}
