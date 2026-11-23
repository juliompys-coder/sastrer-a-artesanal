import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface NotificationEntry {
  name: string;
  city: string;
  plan: string;
}

function getRandomIntervalMs(minMs: number, maxMs: number): number {
  const safeMin = Math.max(1000, minMs);
  const safeMax = Math.max(safeMin, maxMs);
  return Math.floor(Math.random() * (safeMax - safeMin + 1)) + safeMin;
}

/**
 * Notificaciones discretas de prueba social en la esquina inferior izquierda:
 * - Se activan únicamente cuando el visitante alcanza la sección de ofertas (#inversion).
 * - Muestran nombre, ciudad y plan adquirido durante 4 segundos.
 * - Se repiten automáticamente cada 15 a 20 segundos.
 */
export const SocialProofToast: React.FC = () => {
  const {
    triggerSectionId,
    visibleDurationMs,
    minIntervalMs,
    maxIntervalMs,
    entries,
  } = siteConfig.socialProof;

  const [hasReachedOffer, setHasReachedOffer] = useState(false);
  const [activeNotification, setActiveNotification] =
    useState<NotificationEntry | null>(null);

  const indexRef = useRef<number>(0);
  const showTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  // Detectar cuando el visitante llega con el scroll a la sección de ofertas (#inversion)
  useEffect(() => {
    if (hasReachedOffer || typeof window === 'undefined') {
      return;
    }

    const offerEl = document.getElementById(triggerSectionId);
    if (!offerEl) {
      return;
    }

    const checkPosition = () => {
      const rect = offerEl.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85) {
        setHasReachedOffer(true);
      }
    };

    checkPosition();

    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
            setHasReachedOffer(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.08 }
      );
      observer.observe(offerEl);
    }

    window.addEventListener('scroll', checkPosition, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', checkPosition);
    };
  }, [hasReachedOffer, triggerSectionId]);

  // Ciclo de aparición cada 15–20s, visible durante 4s
  useEffect(() => {
    if (!hasReachedOffer || entries.length === 0 || typeof window === 'undefined') {
      return;
    }

    let cancelled = false;

    const clearTimers = () => {
      if (showTimerRef.current !== null) {
        window.clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const scheduleNext = (delayMs: number) => {
      if (cancelled) return;
      showTimerRef.current = window.setTimeout(() => {
        if (cancelled) return;

        const nextEntry = entries[indexRef.current % entries.length];
        indexRef.current += 1;
        setActiveNotification(nextEntry);

        hideTimerRef.current = window.setTimeout(() => {
          if (cancelled) return;
          setActiveNotification(null);
          scheduleNext(getRandomIntervalMs(minIntervalMs, maxIntervalMs));
        }, visibleDurationMs);
      }, delayMs);
    };

    // Primera notificación poco después de alcanzar la sección de ofertas
    scheduleNext(1200);

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [hasReachedOffer, entries, minIntervalMs, maxIntervalMs, visibleDurationMs]);

  const handleDismissCurrent = () => {
    setActiveNotification(null);
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed left-4 sm:left-5 bottom-22 md:bottom-5 z-40 pointer-events-none max-w-[calc(100vw-2rem)] sm:max-w-[355px]"
    >
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            key={`${activeNotification.name}-${activeNotification.city}-${indexRef.current}`}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            className="pointer-events-auto bg-[#FCF6EC] text-[#342C30] border border-[#DEC9A8] border-l-4 border-l-[#64162D] rounded-lg shadow-[0_10px_28px_rgba(75,15,33,0.22)] px-3.5 py-3 flex items-start gap-3"
          >
            <span
              className="w-8 h-8 rounded-full bg-[#64162D] text-[#FFFFFF] inline-flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
              aria-hidden="true"
            >
              <Check className="w-4 h-4" strokeWidth={2.5} />
            </span>

            <div className="min-w-0 flex-1 pr-1">
              <p className="text-[12.5px] sm:text-[13px] leading-[1.45] text-[#342C30]">
                <strong className="font-bold text-[#64162D]">
                  {activeNotification.name}
                </strong>{' '}
                de{' '}
                <strong className="font-semibold text-[#342C30]">
                  {activeNotification.city}
                </strong>{' '}
                acaba de comprar{' '}
                <span className="font-semibold text-[#64162D]">
                  {activeNotification.plan}
                </span>
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#5A4F54]">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-[#F05D3D] shrink-0"
                  aria-hidden="true"
                />
                <span>Hace unos instantes</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#9A7A4C] font-semibold">
                  {siteConfig.offer.formattedPrice}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDismissCurrent}
              aria-label="Cerrar notificación"
              className="text-[#9A7A4C] hover:text-[#64162D] transition-colors p-0.5 rounded cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
