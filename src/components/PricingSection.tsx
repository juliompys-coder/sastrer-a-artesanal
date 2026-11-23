import React from 'react';
import { Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PRICING_BENEFITS } from '../data/courseContent';
import { PurchaseButton } from './PurchaseButton';
import { CountdownTimer } from './CountdownTimer';
import { CurrencyConverter } from './CurrencyConverter';
import { Reveal } from './Reveal';

interface PricingSectionProps {
  onUnconfiguredCheckout: () => void;
}

const OFFER_BREAKDOWN = [
  {
    number: '01',
    label: 'Especialidad I',
    title: 'Sastrería Artesanal Full Canvas',
    description:
      'Técnicas tradicionales de patronaje, construcción interna, picado artesanal, montaje y acabados.',
  },
  {
    number: '02',
    label: 'Especialidad II',
    title: 'Sastrería Semiartesanal',
    description:
      'Patronaje, corte, entretelado, confección, montaje de cuello y mangas y terminaciones profesionales.',
  },
  {
    number: '03',
    label: 'Material complementario',
    title: 'Libro de Sastrería de cortesía',
    description: 'Incluido sin coste adicional para acompañar tus clases y consultas.',
  },
  {
    number: '04',
    label: 'Modalidad de estudio',
    title: 'Acceso de por vida en video',
    description:
      'Clases completas en español para repetir y estudiar a tu propio ritmo desde cualquier lugar.',
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({
  onUnconfiguredCheckout,
}) => {
  return (
    <section
      id="inversion"
      className="bg-[#64162D] text-[#FFFFFF] py-20 sm:py-28"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Numbered Summary of Everything Received with Thin Dividers */}
          <Reveal className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] mb-2.5">
              Formación especializada en dos métodos de confección
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#FFFFFF] leading-[1.12] mb-8">
              Tu inversión en alta sastrería
            </h2>

            <ol className="border-t border-[#DEC9A8]/40 divide-y divide-[#DEC9A8]/40">
              {OFFER_BREAKDOWN.map((item) => (
                <li key={item.number} className="py-5 flex items-start gap-5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#DEC9A8] tabular-nums leading-none shrink-0 pt-0.5">
                    {item.number}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#DEC9A8] mb-0.5">
                      {item.label}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-[1.68] text-[#FCF6EC]/85">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Right Column: Large Cream Card with Burgundy Price & Coral CTA */}
          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="bg-[#FCF6EC] text-[#342C30] border-2 border-[#DEC9A8] rounded-lg p-7 sm:p-9 shadow-xl">
              <div className="text-center pb-6 mb-6 border-b border-[#DEC9A8]">
                <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
                  Inversión especial de acceso
                </p>

                <p className="text-5xl sm:text-6xl font-extrabold leading-none text-[#64162D] tabular-nums mb-2.5">
                  {siteConfig.offer.formattedPrice}
                </p>

                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#5A4F54] mb-2">
                  {siteConfig.offer.currency} · Pago único
                </p>

                <p className="text-sm leading-relaxed text-[#5A4F54]">
                  Por ambas especialidades y el Libro de Sastrería de cortesía.
                </p>
              </div>

              {/* Additional Benefits */}
              <div className="mb-7">
                <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#64162D] mb-3.5">
                  Beneficios adicionales
                </p>
                <ul className="space-y-2.5 text-sm text-[#342C30]">
                  {PRICING_BENEFITS.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="w-5 h-5 rounded-full bg-[#64162D] text-[#FFFFFF] inline-flex items-center justify-center shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <Check className="w-3 h-3" strokeWidth={2.5} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PurchaseButton
                label="Sí, quiero comenzar mi formación"
                variant="coral"
                fullWidth
                onUnconfiguredCheckout={onUnconfiguredCheckout}
              />

              <CountdownTimer />

              <CurrencyConverter />

              <p className="mt-4 text-center text-xs font-medium text-[#5A4F54]">
                Pago único <span aria-hidden="true">·</span> Sin mensualidades{' '}
                <span aria-hidden="true">·</span> Acceso de por vida.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
