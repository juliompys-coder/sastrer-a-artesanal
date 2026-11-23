import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { PurchaseButton } from './PurchaseButton';

interface MobilePurchaseBarProps {
  onUnconfiguredCheckout: () => void;
}

/**
 * Barra inferior discreta para móvil:
 * - Aparece únicamente tras superar la primera pantalla (#inicio).
 * - Se oculta automáticamente cuando el pie de página entra en pantalla.
 */
export const MobilePurchaseBar: React.FC<MobilePurchaseBarProps> = ({
  onUnconfiguredCheckout,
}) => {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('inicio');
    const footerEl = document.getElementById('footer-principal');

    if (!heroEl || typeof IntersectionObserver === 'undefined') return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    heroObserver.observe(heroEl);

    let footerObserver: IntersectionObserver | null = null;
    if (footerEl) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          setFooterVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      footerObserver.observe(footerEl);
    }

    return () => {
      heroObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  const isVisible = pastHero && !footerVisible;

  return (
    <div
      aria-hidden={!isVisible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 bg-[#FCF6EC]/97 backdrop-blur-sm border-t border-[#DEC9A8] shadow-[0_-4px_16px_rgba(100,22,45,0.1)] px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] transition-transform duration-200 ${
        isVisible
          ? 'translate-y-0 pointer-events-auto'
          : 'translate-y-full pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xl font-extrabold leading-none text-[#64162D] tabular-nums">
            {siteConfig.offer.formattedPrice}
          </p>
          <p className="text-[11px] font-medium text-[#5A4F54] truncate mt-0.5">
            Pago único · Acceso de por vida
          </p>
        </div>

        <PurchaseButton
          label="Acceder ahora"
          variant="compact"
          onUnconfiguredCheckout={onUnconfiguredCheckout}
        />
      </div>
    </div>
  );
};
