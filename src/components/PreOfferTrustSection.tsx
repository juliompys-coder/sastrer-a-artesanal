import React from 'react';
import {
  CreditCard,
  Infinity as InfinityIcon,
  Layers,
  PlayCircle,
} from 'lucide-react';
import { PurchaseButton } from './PurchaseButton';
import { Reveal } from './Reveal';

interface PreOfferTrustSectionProps {
  onUnconfiguredCheckout: () => void;
}

const TRUST_POINTS = [
  {
    title: 'Clases reales en video',
    description: 'puedes observar una muestra antes de inscribirte.',
    icon: PlayCircle,
  },
  {
    title: 'Contenido organizado',
    description: 'dos especialidades con 24 módulos técnicos en total.',
    icon: Layers,
  },
  {
    title: 'Pago único',
    description: 'US$25 sin mensualidades.',
    icon: CreditCard,
  },
  {
    title: 'Acceso de por vida',
    description: 'vuelve a consultar tus clases cuando lo necesites.',
    icon: InfinityIcon,
  },
] as const;

export const PreOfferTrustSection: React.FC<PreOfferTrustSectionProps> = ({
  onUnconfiguredCheckout,
}) => {
  return (
    <section
      id="transparencia"
      className="bg-[#FCF6EC] text-[#342C30] py-16 sm:py-22 border-t border-[#DEC9A8] overflow-x-clip"
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-8">
        <Reveal>
          <div className="bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg p-6 sm:p-10 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
                Claridad antes de tu inscripción
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] leading-[1.15] text-[#64162D]">
                Una formación que puedes conocer antes de comprar
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-5 mb-8">
              {TRUST_POINTS.map((point) => {
                const PointIcon = point.icon;
                return (
                  <li
                    key={point.title}
                    className="flex items-start gap-3.5 bg-[#FCF6EC] border border-[#DEC9A8]/85 rounded-md p-4"
                  >
                    <span
                      className="w-9 h-9 rounded-md bg-[#64162D] text-[#DEC9A8] inline-flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <PointIcon className="w-4 h-4" strokeWidth={2} />
                    </span>
                    <p className="text-sm leading-[1.6] text-[#5A4F54]">
                      <strong className="font-bold text-[#64162D]">
                        {point.title}:
                      </strong>{' '}
                      {point.description}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="text-center">
              <PurchaseButton
                label="Quiero acceder a las dos especialidades"
                location="pre_offer"
                variant="coral"
                className="w-full sm:w-auto sm:min-w-[380px] min-h-[52px] py-4 text-[13px] sm:text-sm shadow-sm"
                onUnconfiguredCheckout={onUnconfiguredCheckout}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
