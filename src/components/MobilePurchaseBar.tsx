import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { PurchaseButton } from './PurchaseButton';

interface MobilePurchaseBarProps {
  onUnconfiguredCheckout: () => void;
}

/**
 * Barra inferior fija y discreta exclusiva para móvil:
 * - Aparece únicamente tras superar la portada y el video (#inicio).
 * - Se oculta automáticamente cuando la oferta (#inversion), el cierre (#comenzar)
 *   o el pie de página (#footer-principal) están visibles en pantalla.
 * - Se oculta también cuando hay cualquier ventana modal o galería abierta ([role="dialog"]).
 */
export const MobilePurchaseBar: React.FC<MobilePurchaseBarProps> = ({
  onUnconfiguredCheckout,
}) => {
  const [pastHero, setPastHero] = useState(false);
  const [hiddenSectionVisible, setHiddenSectionVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const heroEl = document.getElementById('inicio');
    const hideTargets = ['inversion', 'comenzar', 'footer-principal']
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const visibleHiddenIds = new Set<string>();

    let heroObserver: IntersectionObserver | null = null;
    if (heroEl) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          setPastHero(!entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(heroEl);
    }

    let hideObserver: IntersectionObserver | null = null;
    if (hideTargets.length > 0) {
      hideObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const id = entry.target.id;
            if (entry.isIntersecting) {
              visibleHiddenIds.add(id);
            } else {
              visibleHiddenIds.delete(id);
            }
          });
          setHiddenSectionVisible(visibleHiddenIds.size > 0);
        },
        { threshold: 0.05 }
      );
      hideTargets.forEach((el) => hideObserver?.observe(el));
    }

    const checkDialogs = () => {
      setDialogOpen(Boolean(document.querySelector('[role="dialog"]')));
    };
    checkDialogs();

    const mutationObserver = new MutationObserver(checkDialogs);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['role', 'aria-modal'],
    });

    return () => {
      heroObserver?.disconnect();
      hideObserver?.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const isVisible = pastHero && !hiddenSectionVisible && !dialogOpen;

  return (
    <div
      aria-hidden={!isVisible}
      className={`md:hidden fixed inset-x-0 bottom-0 z-30 bg-[#FCF6EC]/97 backdrop-blur-sm border-t border-[#DEC9A8] shadow-[0_-4px_16px_rgba(100,22,45,0.12)] px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] transition-[transform,visibility] duration-200 ${
        isVisible
          ? 'translate-y-0 visible pointer-events-auto'
          : 'translate-y-full invisible pointer-events-none'
      }`}
    >
      <PurchaseButton
        label={`Acceder a los 2 cursos — ${siteConfig.offer.formattedPrice}`}
        ariaLabel={`Acceder a los 2 cursos por ${siteConfig.offer.formattedPrice} en Whop`}
        location="mobile_sticky_bar"
        variant="coral"
        fullWidth
        className="min-h-[48px] py-3 px-4 text-xs sm:text-[13px] shadow-xs"
        onUnconfiguredCheckout={onUnconfiguredCheckout}
      />
    </div>
  );
};
