import React from 'react';
import { Check, CreditCard, KeyRound, PlayCircle, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PurchaseButton } from './PurchaseButton';
import { CurrencyConverter } from './CurrencyConverter';
import { Reveal } from './Reveal';

interface PricingSectionProps {
  onUnconfiguredCheckout: () => void;
}

const OFFER_BENEFITS: string[] = [
  'Sastrería Artesanal Full Canvas — 12 módulos.',
  'Sastrería Semiartesanal — 12 módulos.',
  '24 módulos técnicos en total.',
  'Clases en video, paso a paso.',
  'Libro de Sastrería de cortesía.',
  'Acceso de por vida.',
  'Formación en español.',
];

const POST_PURCHASE_STEPS = [
  {
    number: '01',
    title: 'Completa tu compra',
    description: 'Realiza tu pago mediante el proceso seguro de Whop.',
    icon: CreditCard,
  },
  {
    number: '02',
    title: 'Recibe tu acceso',
    description:
      'Sigue las instrucciones que Whop y la plataforma del curso proporcionen después de la compra.',
    icon: KeyRound,
  },
  {
    number: '03',
    title: 'Comienza tu formación',
    description:
      'Ingresa a las especialidades disponibles y estudia las clases a tu propio ritmo.',
    icon: PlayCircle,
  },
] as const;

export const PricingSection: React.FC<PricingSectionProps> = ({
  onUnconfiguredCheckout,
}) => {
  return (
    <section
      id="inversion"
      className="bg-[#64162D] text-[#FFFFFF] py-12 sm:py-18 scroll-mt-18 overflow-x-clip"
    >
      <div className="max-w-[980px] mx-auto px-4 sm:px-8">
        {/* Encabezado de la Oferta */}
        <Reveal className="max-w-2xl mx-auto text-center mb-7 sm:mb-9">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#DEC9A8] mb-2">
            Inscripción transparente
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#FFFFFF] leading-[1.13] mb-2.5">
            Tu formación completa en alta sastrería
          </h2>
          <p className="text-sm sm:text-[15px] leading-[1.65] text-[#FCF6EC]/90">
            Un solo pago de US$25 para acceder a las dos especialidades, las
            clases en video y el Libro de Sastrería de cortesía.
          </p>
        </Reveal>

        {/* Tarjeta Premium de Oferta (Una sola columna centrada) */}
        <Reveal delay={0.05} className="max-w-[640px] mx-auto">
          <div className="bg-[#FCF6EC] text-[#342C30] border-2 border-[#DEC9A8] rounded-xl p-5 sm:p-8 shadow-xl">
            {/* Cabecera de Precio Único Transparente */}
            <div className="text-center pb-6 mb-7 border-b border-[#DEC9A8]">
              <p className="text-xs font-extrabold tracking-[0.16em] uppercase text-[#9A7A4C] mb-1">
                FORMACIÓN COMPLETA
              </p>
              <p className="text-sm sm:text-base font-semibold text-[#64162D] mb-4">
                Dos especialidades de alta sastrería
              </p>

              <p className="text-5xl sm:text-6xl font-extrabold leading-none text-[#64162D] tabular-nums mb-2.5">
                {siteConfig.offer.formattedPrice}
              </p>

              <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#9A7A4C] mb-2.5">
                PAGO ÚNICO — SIN MENSUALIDADES
              </p>

              <p className="text-sm sm:text-[15px] leading-relaxed text-[#5A4F54]">
                Un solo pago para acceder a las dos especialidades.
              </p>
            </div>

            {/* Lista de Beneficios Verificados */}
            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#64162D] mb-4">
                Qué incluye tu inscripción
              </p>
              <ul className="space-y-3 text-sm sm:text-[15px] text-[#342C30]">
                {OFFER_BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full bg-[#64162D] text-[#FFFFFF] inline-flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón Principal de Inscripción (Whop) */}
            <PurchaseButton
              label={`Inscribirme ahora por ${siteConfig.offer.formattedPrice}`}
              location="offer_card"
              variant="coral"
              fullWidth
              className="min-h-[54px] py-4 text-[13.5px] sm:text-sm shadow-md"
              onUnconfiguredCheckout={onUnconfiguredCheckout}
            />

            <p className="mt-3 text-center text-xs sm:text-[13px] font-semibold text-[#5A4F54]">
              Pago único <span aria-hidden="true">·</span> Sin mensualidades{' '}
              <span aria-hidden="true">·</span> Acceso de por vida
            </p>

            {/* Aclaración Transparente de Transición hacia Whop */}
            <div className="mt-4 rounded-md bg-[#FFFDF9] border border-[#DEC9A8]/90 px-4 py-3.5 flex items-start gap-2.5 text-left">
              <ShieldCheck
                className="w-4 h-4 text-[#9A7A4C] shrink-0 mt-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
              <div className="space-y-1 text-xs leading-relaxed text-[#5A4F54]">
                <p className="font-semibold text-[#342C30]">
                  Al continuar, accederás a Whop para completar tu inscripción.
                </p>
                <p>
                  Precio de la formación: {siteConfig.offer.formattedPrice}.
                  Podrás revisar el importe final y los métodos de pago
                  disponibles antes de confirmar la compra.
                </p>
              </div>
            </div>

            {/* Conversor de Moneda Referencial */}
            <div className="mt-5 pt-5 border-t border-[#DEC9A8]/70">
              <CurrencyConverter />
            </div>
          </div>
        </Reveal>

        {/* Bloque Posterior: Qué Sucede Después de Completar la Inscripción */}
        <Reveal delay={0.1} className="mt-9 sm:mt-11">
          <div className="text-center mb-5 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#FFFFFF] leading-snug">
              ¿Qué sucede después de completar tu inscripción?
            </h3>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {POST_PURCHASE_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <li
                  key={step.number}
                  className="bg-[#4B0F21] border border-[#DEC9A8]/35 rounded-lg p-5 sm:p-6 flex flex-col"
                >
                  <div className="flex items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-[#DEC9A8]/25">
                    <span className="w-9 h-9 rounded-md bg-[#64162D] border border-[#DEC9A8]/45 text-[#DEC9A8] inline-flex items-center justify-center shrink-0">
                      <StepIcon
                        className="w-4 h-4"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-xl font-extrabold text-[#DEC9A8]/70 tabular-nums leading-none">
                      {step.number}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#FFFFFF] leading-snug mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#FCF6EC]/85">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};
