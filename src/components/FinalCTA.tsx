import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { PurchaseButton } from './PurchaseButton';
import { ScarcityCounter } from './ScarcityCounter';
import { Reveal } from './Reveal';

interface FinalCTAProps {
  onUnconfiguredCheckout: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onUnconfiguredCheckout,
}) => {
  return (
    <section
      id="comenzar"
      className="bg-[#64162D] text-[#FFFFFF] py-20 sm:py-28 border-t border-[#DEC9A8]/25"
    >
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] mb-3">
            El inicio de tu formación
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-[-0.02em] leading-[1.12] text-[#FFFFFF] mb-6">
            Todo gran oficio comienza con la decisión de aprender.
          </h2>

          <div className="space-y-3.5 text-sm sm:text-base leading-[1.75] text-[#FCF6EC]/88 max-w-2xl mx-auto mb-10">
            <p>
              La sastrería reúne conocimientos que han sido transmitidos y
              perfeccionados durante generaciones.
            </p>
            <p>
              El patronaje, el corte, la construcción del pecho, el montaje del
              cuello, la colocación de las mangas, el trabajo de los ojales y
              los acabados forman parte de ese legado.
            </p>
            <p className="text-[#FFFFFF] font-semibold">
              Hoy tienes la oportunidad de estudiar dos métodos de confección
              mediante una formación que puedes comenzar desde cero.
            </p>
          </div>

          {/* Direct Recap Box */}
          <div className="border-t border-b border-[#DEC9A8]/40 py-7 mb-9 max-w-xl mx-auto">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] mb-4">
              Tu formación incluye
            </p>
            <div className="space-y-1.5 text-base sm:text-lg font-bold text-[#FFFFFF]">
              <p>Sastrería Artesanal Full Canvas</p>
              <p className="text-[#DEC9A8]" aria-hidden="true">
                +
              </p>
              <p>Sastrería Semiartesanal</p>
              <p className="text-[#DEC9A8]" aria-hidden="true">
                +
              </p>
              <p>Libro de Sastrería de cortesía</p>
            </div>
            <div className="mt-5 pt-5 border-t border-[#DEC9A8]/25 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-xs sm:text-sm font-bold tracking-[0.08em] uppercase">
              <span className="text-[#FCF6EC]">Acceso de por vida</span>
              <span
                className="hidden sm:inline text-[#DEC9A8]"
                aria-hidden="true"
              >
                ·
              </span>
              <span className="text-[#DEC9A8] tabular-nums">
                Inversión Lote 1: {siteConfig.offer.formattedPrice}
              </span>
            </div>
          </div>

          {/* Coral Primary CTA + Scarcity Counter */}
          <div className="mb-8">
            <PurchaseButton
              label="Quiero formarme en alta sastrería"
              variant="coral"
              onUnconfiguredCheckout={onUnconfiguredCheckout}
            />
            <ScarcityCounter
              variant="dark"
              className="max-w-md mx-auto mt-4"
            />
          </div>

          <p className="text-sm sm:text-base font-semibold text-[#DEC9A8]">
            {siteConfig.brand.motto}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
