import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { SEMI_ARTISANAL_MODULES } from '../data/courseContent';
import { ModuleAccordionList } from './ModuleAccordionList';
import { PurchaseButton } from './PurchaseButton';
import { Reveal } from './Reveal';

interface SemiArtisanalSectionProps {
  onUnconfiguredCheckout: () => void;
}

export const SemiArtisanalSection: React.FC<SemiArtisanalSectionProps> = ({
  onUnconfiguredCheckout,
}) => {
  // Todos los módulos inician cerrados para reducir la longitud visual inicial
  const [openNumbers, setOpenNumbers] = useState<Record<string, boolean>>({});

  const toggleModule = (key: string) => {
    setOpenNumbers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    SEMI_ARTISANAL_MODULES.forEach((m) => {
      next[`sa-${m.number}`] = true;
    });
    setOpenNumbers(next);
  };

  const collapseAll = () => {
    setOpenNumbers({});
  };

  const allOpen = SEMI_ARTISANAL_MODULES.every(
    (m) => openNumbers[`sa-${m.number}`]
  );
  const anyOpen = SEMI_ARTISANAL_MODULES.some(
    (m) => openNumbers[`sa-${m.number}`]
  );

  return (
    <section
      id="semiartesanal"
      className="bg-[#EAD5D7] text-[#342C30] pt-4 pb-16 sm:pb-22 border-b border-[#DEC9A8] scroll-mt-20 overflow-x-clip"
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-8">
        {/* Encabezado compacto del temario Semiartesanal */}
        <Reveal className="bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg p-5 sm:p-7 mb-5 sm:mb-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-1.5">
                Especialidad II · 12 módulos técnicos
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold text-[#64162D] leading-snug">
                Explora los 12 módulos de Sastrería Semiartesanal
              </h3>
              <p className="text-xs sm:text-sm text-[#5A4F54] mt-1.5">
                Pulsa sobre cada módulo para descubrir los procedimientos que
                aprenderás.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={expandAll}
                disabled={allOpen}
                className="px-3.5 py-2 rounded-md border border-[#DEC9A8] bg-[#FFFDF9] text-xs font-bold uppercase tracking-[0.06em] text-[#64162D] hover:border-[#64162D] hover:text-[#F05D3D] disabled:opacity-45 disabled:pointer-events-none transition-colors cursor-pointer min-h-[38px]"
              >
                Expandir todos
              </button>
              <button
                type="button"
                onClick={collapseAll}
                disabled={!anyOpen}
                className="px-3.5 py-2 rounded-md border border-[#DEC9A8] bg-[#FFFDF9] text-xs font-bold uppercase tracking-[0.06em] text-[#5A4F54] hover:border-[#64162D] hover:text-[#64162D] disabled:opacity-45 disabled:pointer-events-none transition-colors cursor-pointer min-h-[38px]"
              >
                Contraer todos
              </button>
            </div>
          </div>
        </Reveal>

        {/* Acordeones de los 12 módulos originales de Sastrería Semiartesanal */}
        <ModuleAccordionList
          modules={SEMI_ARTISANAL_MODULES}
          openNumbers={openNumbers}
          onToggle={toggleModule}
          prefix="sa"
        />

        {/* Único bloque de inscripción después de ambos temarios */}
        <Reveal className="mt-10 sm:mt-12">
          <div className="max-w-2xl mx-auto bg-[#FCF6EC] border-2 border-[#DEC9A8] rounded-lg px-5 py-7 sm:px-9 sm:py-9 text-center shadow-sm">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#64162D] leading-snug mb-2">
              Aprende las dos especialidades con una sola inscripción.
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#5A4F54] max-w-xl mx-auto mb-5">
              Accede a los 24 módulos técnicos, a las clases en video y al Libro
              de Sastrería de cortesía.
            </p>

            <p className="text-base sm:text-lg font-extrabold tracking-[0.06em] uppercase text-[#64162D] tabular-nums mb-5">
              {siteConfig.offer.formattedPrice} — PAGO ÚNICO
            </p>

            <div className="flex justify-center">
              <PurchaseButton
                label="Quiero acceder a las dos especialidades"
                location="after_curriculum"
                variant="coral"
                className="w-full sm:w-auto sm:min-w-[360px] min-h-[52px] py-4 text-[13px] sm:text-sm shadow-sm"
                onUnconfiguredCheckout={onUnconfiguredCheckout}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
