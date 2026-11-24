import React from 'react';
import { Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PurchaseButton } from './PurchaseButton';
import { Reveal } from './Reveal';

interface FinalCTAProps {
  onUnconfiguredCheckout: () => void;
}

const FINAL_SUMMARY_ITEMS: string[] = [
  'Dos especialidades.',
  '24 módulos técnicos.',
  'Clases completas en video.',
  'Libro de Sastrería de cortesía.',
  'Acceso de por vida.',
];

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onUnconfiguredCheckout,
}) => {
  return (
    <section
      id="comenzar"
      className="bg-[#64162D] text-[#FFFFFF] py-12 sm:py-16 border-t border-[#DEC9A8]/25 overflow-x-clip"
    >
      <div className="max-w-[820px] mx-auto px-4 sm:px-8 text-center">
        <Reveal>
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] mb-2">
            El inicio de tu formación
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-[1.14] text-[#FFFFFF] mb-3.5">
            Tu próximo paso en la alta sastrería comienza aquí
          </h2>

          <p className="text-sm sm:text-[15px] leading-[1.68] text-[#FCF6EC]/90 max-w-2xl mx-auto mb-6 sm:mb-7">
            Aprende las técnicas de dos especialidades de confección de sacos
            masculinos, desde los fundamentos hasta los procedimientos y acabados
            de cada método.
          </p>

          {/* Resumen Compacto de 5 Puntos */}
          <div className="max-w-md mx-auto bg-[#4B0F21] border border-[#DEC9A8]/40 rounded-lg px-5 py-5 sm:px-6 sm:py-6 mb-6 text-left">
            <ul className="space-y-2 text-sm text-[#FCF6EC]">
              {FINAL_SUMMARY_ITEMS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full bg-[#DEC9A8] text-[#4B0F21] inline-flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <Check className="w-3 h-3" strokeWidth={3} />
                  </span>
                  <span className="font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3.5 border-t border-[#DEC9A8]/25 text-center">
              <p className="text-base sm:text-lg font-extrabold tracking-[0.06em] uppercase text-[#DEC9A8] tabular-nums">
                {siteConfig.offer.formattedPrice} — PAGO ÚNICO
              </p>
            </div>
          </div>

          {/* Botón Principal de Cierre */}
          <div className="mb-5 flex justify-center">
            <PurchaseButton
              label="Quiero acceder a mi formación"
              location="final_cta"
              variant="coral"
              className="w-full sm:w-auto sm:min-w-[360px] min-h-[52px] py-3.5 sm:py-4 text-[13.5px] sm:text-sm shadow-md"
              onUnconfiguredCheckout={onUnconfiguredCheckout}
            />
          </div>

          <p className="text-xs sm:text-sm font-semibold text-[#DEC9A8]">
            {siteConfig.brand.motto}
          </p>
        </Reveal>
      </div>
    </section>
  );
};
