import { siteConfig } from '../config/siteConfig';

declare global {
  interface Window {
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
    __META_PAGEVIEW_EVENT_ID__?: string;
  }
}

type SupportedMetaEvent = 'PageView' | 'InitiateCheckout';

function generateEventId(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined' || !document.cookie) {
    return undefined;
  }
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  if (!match) {
    return undefined;
  }
  const value = match.slice(name.length + 1).trim();
  return value || undefined;
}

function getFbcValue(): string | undefined {
  const cookieFbc = readCookie('_fbc');
  if (cookieFbc) {
    return cookieFbc;
  }
  if (typeof window === 'undefined') {
    return undefined;
  }
  try {
    const fbclid = new URLSearchParams(window.location.search).get('fbclid');
    if (fbclid && /^[a-zA-Z0-9_-]{1,200}$/.test(fbclid)) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function sendServerEvent(eventName: SupportedMetaEvent, eventId: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    fbp: readCookie('_fbp'),
    fbc: getFbcValue(),
  };

  void fetch('/api/meta-capi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Non-blocking analytics request
  });
}

let pageViewSynced = false;

export function syncServerPageView(): void {
  if (typeof window === 'undefined' || pageViewSynced) {
    return;
  }
  pageViewSynced = true;
  const eventId =
    window.__META_PAGEVIEW_EVENT_ID__ || generateEventId('pv');
  sendServerEvent('PageView', eventId);
}

export function trackInitiateCheckout(): void {
  if (typeof window === 'undefined') {
    return;
  }
  const eventId = generateEventId('ic');

  if (typeof window.fbq === 'function') {
    window.fbq(
      'track',
      'InitiateCheckout',
      {
        value: siteConfig.offer.price,
        currency: siteConfig.offer.currency,
        content_name: siteConfig.brand.name,
      },
      { eventID: eventId }
    );
  }

  sendServerEvent('InitiateCheckout', eventId);
}
