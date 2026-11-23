import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SEMI_ARTISANAL_MODULES, CourseModule } from '../data/courseContent';
import { PurchaseButton } from './PurchaseButton';
import { Reveal } from './Reveal';

interface SemiArtisanalSectionProps {
  onUnconfiguredCheckout: () => void;
}

interface SemiAccordionColumnProps {
  modules: CourseModule[];
  openNumbers: Record<string, boolean>;
  onToggle: (num: string) => void;
}

const SemiAccordionColumn: React.FC<SemiAccordionColumnProps> = ({
  modules,
  openNumbers,
  onToggle,
}) => (
  <div className="space-y-3">
    {modules.map((mod) => {
      const key = `sa-${mod.number}`;
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

export const SemiArtisanalSection: React.FC<SemiArtisanalSectionProps> = ({
  onUnconfiguredCheckout,
}) => {
  const [openNumbers, setOpenNumbers] = useState<Record<string, boolean>>({
    'sa-01': true,
    'sa-07': true,
  });

  const toggleModule = (key: string) => {
    setOpenNumbers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allOpen = SEMI_ARTISANAL_MODULES.every(
    (m) => openNumbers[`sa-${m.number}`]
  );

  const toggleAll = () => {
    const next: Record<string, boolean> = {};
    SEMI_ARTISANAL_MODULES.forEach((m) => {
      next[`sa-${m.number}`] = !allOpen;
    });
    setOpenNumbers(next);
  };

  const leftCol = SEMI_ARTISANAL_MODULES.slice(0, 6);
  const rightCol = SEMI_ARTISANAL_MODULES.slice(6, 12);

  return (
    <section
      id="semiartesanal"
      className="bg-[#EAD5D7] text-[#342C30] pt-4 pb-20 sm:pb-24 border-b border-[#DEC9A8]"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        {/* Specialty II Header */}
        <Reveal className="bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg p-6 sm:p-8 mb-7 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 mb-5 border-b border-[#DEC9A8]/70">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-1.5">
                Especialidad II · 12 módulos técnicos
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#64162D] leading-tight">
                Sastrería Semiartesanal
              </h3>
              <p className="text-sm sm:text-base font-semibold text-[#342C30] mt-1">
                Precisión, técnica y eficiencia en la confección de sacos.
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
              La sastrería semiartesanal combina conocimientos de confección
              tradicional con procedimientos mecanizados, permitiendo
              desarrollar procesos eficientes sin descuidar el patronaje, el
              montaje y los acabados.
            </p>
            <p>
              Esta especialidad complementa la construcción artesanal Full
              Canvas y permite estudiar otro enfoque de elaboración de sacos de
              vestir.
            </p>
          </div>
        </Reveal>

        {/* Two-Column Accordions for Specialty II */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 mb-8">
          <SemiAccordionColumn
            modules={leftCol}
            openNumbers={openNumbers}
            onToggle={toggleModule}
          />
          <SemiAccordionColumn
            modules={rightCol}
            openNumbers={openNumbers}
            onToggle={toggleModule}
          />
        </div>

        <p className="text-center text-sm sm:text-base font-bold text-[#64162D] mb-10">
          Amplía tus conocimientos con un método de confección que combina
          técnica y eficiencia.
        </p>

        {/* Centered Coral CTA below both courses */}
        <div className="text-center">
          <PurchaseButton
            label="Acceder a las dos especialidades"
            variant="coral"
            onUnconfiguredCheckout={onUnconfiguredCheckout}
          />
        </div>
      </div>
    </section>
  );
};
