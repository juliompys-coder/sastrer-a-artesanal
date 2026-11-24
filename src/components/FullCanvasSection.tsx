import React, { useState } from 'react';
import { FULL_CANVAS_MODULES } from '../data/courseContent';
import { ModuleAccordionList } from './ModuleAccordionList';
import { Reveal } from './Reveal';

export const FullCanvasSection: React.FC = () => {
  // Todos los módulos inician cerrados para reducir la longitud visual inicial
  const [openNumbers, setOpenNumbers] = useState<Record<string, boolean>>({});

  const toggleModule = (key: string) => {
    setOpenNumbers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    FULL_CANVAS_MODULES.forEach((m) => {
      next[`fc-${m.number}`] = true;
    });
    setOpenNumbers(next);
  };

  const collapseAll = () => {
    setOpenNumbers({});
  };

  const allOpen = FULL_CANVAS_MODULES.every(
    (m) => openNumbers[`fc-${m.number}`]
  );
  const anyOpen = FULL_CANVAS_MODULES.some(
    (m) => openNumbers[`fc-${m.number}`]
  );

  return (
    <section
      id="temario"
      className="bg-[#EAD5D7] text-[#342C30] pt-16 pb-10 sm:pt-20 sm:pb-12 scroll-mt-18 overflow-x-clip"
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-8">
        {/* Encabezado compacto del temario Full Canvas */}
        <Reveal className="bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg p-5 sm:p-7 mb-5 sm:mb-6 shadow-xs">
          <div
            id="full-canvas"
            className="scroll-mt-24 flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-1.5">
                Especialidad I · 12 módulos técnicos
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold text-[#64162D] leading-snug">
                Explora los 12 módulos de Sastrería Artesanal Full Canvas
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

        {/* Acordeones de los 12 módulos originales de Full Canvas */}
        <ModuleAccordionList
          modules={FULL_CANVAS_MODULES}
          openNumbers={openNumbers}
          onToggle={toggleModule}
          prefix="fc"
        />
      </div>
    </section>
  );
};
