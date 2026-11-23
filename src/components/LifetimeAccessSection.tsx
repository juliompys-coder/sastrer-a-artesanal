import React from 'react';
import { Check } from 'lucide-react';
import { LIFETIME_BENEFITS } from '../data/courseContent';
import { Reveal } from './Reveal';

const VALUE_POINTS = [
  'Imagina poder elaborar tus propios patrones.',
  'Comprender cómo se construye la estructura interna de un saco Full Canvas.',
  'Aprender los procedimientos de montaje del cuello y de las mangas.',
  'Conocer cómo se preparan los ojales artesanales.',
  'Identificar las diferencias entre la confección semiartesanal y el trabajo tradicional.',
  'Y disponer de videos que puedas volver a consultar mientras practicas.',
];

export const LifetimeAccessSection: React.FC = () => {
  return (
    <section
      id="acceso-de-por-vida"
      className="bg-[#FCF6EC] text-[#342C30] py-12 sm:py-16"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        {/* Two-Column Large Cards: Lifetime Access + Professional Value */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-10">
          {/* Card 1: Lifetime Access */}
          <Reveal className="bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg p-7 sm:p-9 shadow-xs flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
                Acceso de por vida
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#64162D] leading-[1.18] mb-4">
                Una formación que podrás consultar durante toda tu vida.
              </h2>
              <div className="space-y-3 text-sm sm:text-[15px] leading-[1.7] text-[#5A4F54] mb-6">
                <p>Aprender sastrería requiere tiempo, observación y práctica.</p>
                <p>
                  Es normal que algunos procedimientos deban estudiarse y
                  repetirse varias veces antes de comprenderlos completamente.
                  Por eso, las clases están disponibles en video con acceso de
                  por vida.
                </p>
              </div>

              <ul className="space-y-3 text-sm sm:text-[15px] text-[#342C30]">
                {LIFETIME_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span
                      className="w-5 h-5 rounded-full bg-[#64162D] text-[#FFFFFF] inline-flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <Check className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-7 pt-5 border-t border-[#DEC9A8]/70 text-sm font-bold text-[#64162D] leading-snug">
              El conocimiento se perfecciona con la práctica. Por eso, tus
              clases estarán disponibles para volver a consultarlas.
            </p>
          </Reveal>

          {/* Card 2: Professional Value */}
          <Reveal
            delay={0.08}
            className="bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg p-7 sm:p-9 shadow-xs flex flex-col justify-between"
          >
            <div id="valor-profesional" className="scroll-mt-24">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
                Se trata de comprender el oficio detrás de su construcción
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#64162D] leading-[1.18] mb-5">
                No se trata solamente de aprender a confeccionar un saco.
              </h2>

              <ul className="space-y-3 text-sm sm:text-[15px] leading-[1.68] text-[#342C30] mb-6">
                {VALUE_POINTS.map((point, index) => (
                  <li key={point} className="flex items-baseline gap-3">
                    <span className="text-xs font-extrabold text-[#9A7A4C] tabular-nums shrink-0">
                      0{index + 1}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm sm:text-[15px] leading-[1.7] text-[#5A4F54]">
                Estos conocimientos pueden ayudarte a desarrollar tus
                habilidades, perfeccionar tus trabajos y ampliar tus
                posibilidades dentro del mundo de la confección.
              </p>
            </div>

            <p className="mt-7 pt-5 border-t border-[#DEC9A8]/70 text-sm font-bold text-[#64162D] leading-snug">
              Cada técnica que aprendes es un recurso más para desarrollar tu
              oficio.
            </p>
          </Reveal>
        </div>

        {/* Lower Burgundy Summary Strip of Everything Included */}
        <Reveal className="bg-[#64162D] text-[#FFFFFF] rounded-lg px-6 py-7 sm:px-10 sm:py-8">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] text-center mb-4">
            Resumen completo de tu acceso
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="sm:border-r sm:border-[#DEC9A8]/25 sm:pr-4">
              <p className="text-xs font-bold text-[#DEC9A8] uppercase mb-1">
                Especialidad I
              </p>
              <p className="text-sm font-semibold text-[#FFFFFF]">
                Sastrería Artesanal Full Canvas
              </p>
            </div>
            <div className="lg:border-r lg:border-[#DEC9A8]/25 lg:pr-4">
              <p className="text-xs font-bold text-[#DEC9A8] uppercase mb-1">
                Especialidad II
              </p>
              <p className="text-sm font-semibold text-[#FFFFFF]">
                Sastrería Semiartesanal
              </p>
            </div>
            <div className="sm:border-r sm:border-[#DEC9A8]/25 sm:pr-4">
              <p className="text-xs font-bold text-[#DEC9A8] uppercase mb-1">
                Obsequio incluido
              </p>
              <p className="text-sm font-semibold text-[#FFFFFF]">
                Libro de Sastrería de cortesía
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-[#DEC9A8] uppercase mb-1">
                Modalidad
              </p>
              <p className="text-sm font-semibold text-[#FFFFFF]">
                Pago único · Acceso de por vida
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
