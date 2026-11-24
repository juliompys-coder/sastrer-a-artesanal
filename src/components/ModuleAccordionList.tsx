import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { CourseModule } from '../data/courseContent';

interface ModuleAccordionListProps {
  modules: CourseModule[];
  openNumbers: Record<string, boolean>;
  onToggle: (key: string) => void;
  prefix: string;
}

interface AccordionColumnProps {
  modules: CourseModule[];
  openNumbers: Record<string, boolean>;
  onToggle: (key: string) => void;
  prefix: string;
}

const AccordionColumn: React.FC<AccordionColumnProps> = ({
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
          className={`bg-[#FCF6EC] border rounded-md shadow-xs overflow-hidden transition-colors duration-200 ${
            isOpen ? 'border-[#64162D]/60' : 'border-[#DEC9A8]'
          }`}
        >
          <h4>
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onToggle(key)}
              className="w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-3.5 text-left cursor-pointer hover:bg-[#FFFDF9] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#64162D] transition-colors min-h-[58px]"
            >
              <span className="text-[13.5px] sm:text-[15px] leading-snug text-[#342C30] min-w-0 break-words">
                <span className="font-extrabold uppercase tracking-[0.06em] text-[#9A7A4C] tabular-nums">
                  MÓDULO {mod.number}
                </span>
                <span
                  className="mx-1.5 text-[#9A7A4C] font-semibold"
                  aria-hidden="true"
                >
                  —
                </span>
                <span className="font-bold text-[#64162D]">{mod.title}</span>
              </span>

              <span
                className={`w-8 h-8 rounded-md border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                  isOpen
                    ? 'bg-[#64162D] border-[#64162D] text-[#FFFFFF]'
                    : 'bg-[#FFFDF9] border-[#DEC9A8] text-[#64162D]'
                }`}
                aria-hidden="true"
              >
                {isOpen ? (
                  <Minus className="w-4 h-4" strokeWidth={2.4} />
                ) : (
                  <Plus className="w-4 h-4" strokeWidth={2.4} />
                )}
              </span>
            </button>
          </h4>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-t border-[#DEC9A8]/65 bg-[#FFFDF9]">
                  <p className="text-xs sm:text-sm leading-[1.7] text-[#5A4F54]">
                    {mod.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    })}
  </div>
);

export const ModuleAccordionList: React.FC<ModuleAccordionListProps> = ({
  modules,
  openNumbers,
  onToggle,
  prefix,
}) => {
  const half = Math.ceil(modules.length / 2);
  const leftCol = modules.slice(0, half);
  const rightCol = modules.slice(half);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 items-start">
      <AccordionColumn
        modules={leftCol}
        openNumbers={openNumbers}
        onToggle={onToggle}
        prefix={prefix}
      />
      <AccordionColumn
        modules={rightCol}
        openNumbers={openNumbers}
        onToggle={onToggle}
        prefix={prefix}
      />
    </div>
  );
};
