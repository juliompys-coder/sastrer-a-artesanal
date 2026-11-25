import { siteConfig } from '../config/siteConfig';

export type CheckoutButtonLocation =
  | 'header'
  | 'header_mobile'
  | 'hero'
  | 'after_curriculum'
  | 'pre_offer'
  | 'offer_card'
  | 'final_cta'
  | 'mobile_sticky_bar';

declare global {
  interface Window {
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID?: string }
    ) => void;
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: Array<Record<string, unknown>>;
    whop?: {
      track?: (eventName: string, params?: Record<string, unknown>) => void;
    };
    __META_PAGEVIEW_EVENT_ID__?: string;
  }
}

type SupportedMetaEvent = 'PageView' | 'InitiateCheckout';

const PRODUCT_SLUG = 'alta_sastreria_masculina';

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

/**
 * Registra únicamente el inicio de checkout (sin PII y sin disparar eventos Purchase/Lead/CompleteRegistration)
 * al hacer clic en los botones hacia Whop.
 * - Whop Pixel: evento personalizado click_checkout (protegido si window.whop no está disponible).
 * - Meta Pixel + Conversions API: evento InitiateCheckout deduplicado mediante event_id.
 * - GA4 / GTM (si está instalado): evento begin_checkout con parámetros no sensibles.
 */
export function trackInitiateCheckout(
  buttonLocation?: CheckoutButtonLocation
): void {
  if (typeof window === 'undefined') {
    return;
  }
  const eventId = generateEventId('ic');
  const location = buttonLocation ?? 'offer_card';

  try {
    if (window.whop && typeof window.whop.track === 'function') {
      window.whop.track('click_checkout');
    }
  } catch {
    // Non-blocking: el enlace de compra debe seguir funcionando normalmente
  }

  if (typeof window.fbq === 'function') {
    window.fbq(
      'track',
      'InitiateCheckout',
      {
        value: siteConfig.offer.price,
        currency: siteConfig.offer.currency,
        content_name: siteConfig.brand.name,
        content_ids: [PRODUCT_SLUG],
        content_type: 'product',
        button_location: location,
      },
      { eventID: eventId }
    );
  }

  sendServerEvent('InitiateCheckout', eventId);

  const funnelParams = {
    product: PRODUCT_SLUG,
    value: siteConfig.offer.price,
    currency: siteConfig.offer.currency,
    button_location: location,
  };

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', funnelParams);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: 'begin_checkout',
      ...funnelParams,
    });
  }
}

export const trackBeginCheckout = trackInitiateCheckout;
