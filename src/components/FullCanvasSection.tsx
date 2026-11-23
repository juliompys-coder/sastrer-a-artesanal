import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FULL_CANVAS_MODULES, CourseModule } from '../data/courseContent';
import { Reveal } from './Reveal';

interface ModuleAccordionColumnProps {
  modules: CourseModule[];
  openNumbers: Record<string, boolean>;
  onToggle: (num: string) => void;
  prefix: string;
}

const ModuleAccordionColumn: React.FC<ModuleAccordionColumnProps> = ({
  modules,
  openNumbers,
  onToggle,
  prefix,
}) => (
  <div className="space-y-3">
    {modules.map((mod) => {
      const key = `${prefix}-${mod.number}`;
      const isOpen = Boolean(openNumbers[key]);
      const panelId = `${key}-panel`;
      const btnId = `${key}-btn`;

      return (
        <div
          key={key}
          className="bg-[#FCF6EC] border border-[#DEC9A8] rounded-md shadow-xs overflow-hidden transition-colors"
        >
          <h4>
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(key)}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FFFDF9] transition-colors min-h-[56px]"
            >
              <span className="flex items-baseline gap-3 min-w-0">
                <span className="text-xs font-extrabold text-[#9A7A4C] tabular-nums shrink-0">
                  {mod.number}
                </span>
                <span className="text-sm sm:text-[15px] font-semibold text-[#342C30] leading-snug">
                  {mod.title}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-[#9A7A4C] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </h4>

          <div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            hidden={!isOpen}
            className={
              isOpen
                ? 'px-5 pb-4 pt-1 border-t border-[#DEC9A8]/50 bg-[#FFFDF9]'
                : ''
            }
          >
            <p className="text-sm leading-[1.68] text-[#5A4F54] pl-7">
              {mod.description}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

export const FullCanvasSection: React.FC = () => {
  const [openNumbers, setOpenNumbers] = useState<Record<string, boolean>>({
    'fc-01': true,
    'fc-07': true,
  });

  const toggleModule = (key: string) => {
    setOpenNumbers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allOpen = FULL_CANVAS_MODULES.every(
    (m) => openNumbers[`fc-${m.number}`]
  );

  const toggleAll = () => {
    const next: Record<string, boolean> = {};
    FULL_CANVAS_MODULES.forEach((m) => {
      next[`fc-${m.number}`] = !allOpen;
    });
    setOpenNumbers(next);
  };

  const leftCol = FULL_CANVAS_MODULES.slice(0, 6);
  const rightCol = FULL_CANVAS_MODULES.slice(6, 12);

  return (
    <section
      id="temario"
      className="bg-[#EAD5D7] text-[#342C30] pt-20 pb-14 sm:pt-24 sm:pb-16"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        {/* Intro to Both Complementary Specialties */}
        <Reveal
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div id="especialidades" className="scroll-mt-24">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#64162D] mb-2.5">
              Dos especialidades complementarias
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#64162D] leading-[1.14] mb-5">
              Dos especialidades. Una formación en alta sastrería.
            </h2>
            <div className="space-y-3 text-sm sm:text-[15px] leading-[1.7] text-[#342C30]/90">
              <p>
                Hemos reunido dos métodos de confección que te permitirán
                comprender diferentes formas de construir sacos, americanas y
                chaquetas de traje.
              </p>
              <p>
                La sastrería semiartesanal combina técnicas de confección y
                operaciones mecanizadas para desarrollar un proceso eficiente y
                preciso. La sastrería artesanal Full Canvas profundiza en la
                construcción interna flotante y el modelado tradicional de las
                prendas de alta gama.
              </p>
            </div>
            <p className="mt-4 text-base sm:text-lg font-bold text-[#64162D]">
              No tienes que elegir entre aprender uno u otro método. Tendrás
              acceso a ambos.
            </p>
          </div>
        </Reveal>

        {/* Specialty I Header */}
        <Reveal
          className="bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg p-6 sm:p-8 mb-7 shadow-xs"
        >
          <div
            id="full-canvas"
            className="scroll-mt-24 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 mb-5 border-b border-[#DEC9A8]/70"
          >
            <div>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-1.5">
                Especialidad I · 12 módulos técnicos
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#64162D] leading-tight">
                Sastrería Artesanal Full Canvas
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#342C30] mt-1">
                La tradición, la estructura y el arte de la confección a medida.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleAll}
              className="self-start md:self-auto text-xs font-bold uppercase tracking-[0.06em] text-[#64162D] hover:text-[#F05D3D] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1.5"
            >
              {allOpen ? 'Contraer módulos' : 'Expandir los 12 módulos'}
            </button>
          </div>

          <div className="space-y-3 text-sm sm:text-[15px] leading-[1.7] text-[#5A4F54]">
            <p>
              En la sastrería artesanal, una parte esencial del trabajo se
              encuentra en el interior del saco. La construcción Full Canvas
              utiliza una estructura de entretelas flotantes que permite
              trabajar el pecho, modelar las solapas y construir la forma de la
              prenda mediante procedimientos tradicionales.
            </p>
            <p>
              En esta especialidad estudiarás los procesos de confección
              artesanal, desde las primeras medidas hasta las terminaciones.
            </p>
          </div>
        </Reveal>

        {/* Two-Column Accordions for Specialty I */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-8">
          <ModuleAccordionColumn
            modules={leftCol}
            openNumbers={openNumbers}
            onToggle={toggleModule}
            prefix="fc"
          />
          <ModuleAccordionColumn
            modules={rightCol}
            openNumbers={openNumbers}
            onToggle={toggleModule}
            prefix="fc"
          />
        </div>

        <p className="text-center text-sm sm:text-base font-bold text-[#64162D]">
          Aprende a comprender la arquitectura interior de un saco de alta
          sastrería.
        </p>
      </div>
    </section>
  );
};
