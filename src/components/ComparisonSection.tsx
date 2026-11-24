import React, { useState } from 'react';
import { ChevronDown, Columns2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COMPARISON_ROWS } from '../data/courseContent';

export const ComparisonSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="comparativa" className="mt-6 sm:mt-8 scroll-mt-24">
      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="tabla-comparativa-panel"
          className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 rounded-md border-2 border-[#64162D] bg-[#FFFDF9] text-[#64162D] hover:bg-[#64162D] hover:text-[#FFFFFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64162D] transition-colors duration-200 text-xs sm:text-[13px] font-bold tracking-[0.06em] uppercase cursor-pointer min-h-[46px] shadow-xs"
        >
          <Columns2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>
            {isOpen
              ? 'Ocultar diferencias entre los dos métodos'
              : 'Ver diferencias entre los dos métodos'}
          </span>
          <ChevronDown
            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="tabla-comparativa-panel"
            role="region"
            aria-label="Comparativa técnica entre las dos especialidades"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5 sm:pt-6">
              {/* Desktop & Tablet Comparison Table */}
              <div className="hidden md:block border border-[#DEC9A8] rounded-lg overflow-hidden bg-[#FFFDF9] shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#64162D] text-[#FFFFFF]">
                      <th
                        scope="col"
                        className="py-3.5 px-5 text-xs font-bold tracking-[0.1em] uppercase text-[#DEC9A8] w-[24%]"
                      >
                        Aspecto técnico
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-5 text-sm font-bold text-[#FFFFFF] w-[38%] border-l border-[#DEC9A8]/25"
                      >
                        Sastrería Artesanal Full Canvas
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-5 text-sm font-bold text-[#FFFFFF] w-[38%] border-l border-[#DEC9A8]/25"
                      >
                        Sastrería Semiartesanal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DEC9A8]/70 text-sm leading-relaxed">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr
                        key={row.aspect}
                        className={
                          idx % 2 === 1 ? 'bg-[#FCF6EC]/75' : 'bg-[#FFFDF9]'
                        }
                      >
                        <th
                          scope="row"
                          className="py-3.5 px-5 font-bold text-[#64162D]"
                        >
                          {row.aspect}
                        </th>
                        <td className="py-3.5 px-5 text-[#342C30] border-l border-[#DEC9A8]/55">
                          {row.fullCanvas}
                        </td>
                        <td className="py-3.5 px-5 text-[#342C30] border-l border-[#DEC9A8]/55">
                          {row.semiArtisanal}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked Cards (Zero horizontal overflow) */}
              <div className="md:hidden space-y-2.5">
                {COMPARISON_ROWS.map((row) => (
                  <div
                    key={row.aspect}
                    className="border border-[#DEC9A8] rounded-lg bg-[#FFFDF9] overflow-hidden shadow-xs"
                  >
                    <h4 className="text-xs font-extrabold text-[#FFFFFF] bg-[#64162D] px-3.5 py-2 uppercase tracking-[0.04em]">
                      {row.aspect}
                    </h4>
                    <dl className="divide-y divide-[#DEC9A8]/60 text-xs">
                      <div className="px-3.5 py-2.5">
                        <dt className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#9A7A4C] mb-0.5">
                          Sastrería Artesanal Full Canvas
                        </dt>
                        <dd className="text-[#342C30] leading-relaxed">
                          {row.fullCanvas}
                        </dd>
                      </div>
                      <div className="px-3.5 py-2.5 bg-[#FCF6EC]/60">
                        <dt className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#9A7A4C] mb-0.5">
                          Sastrería Semiartesanal
                        </dt>
                        <dd className="text-[#342C30] leading-relaxed">
                          {row.semiArtisanal}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>

              {/* Highlighted Burgundy Closing Message */}
              <div className="max-w-3xl mx-auto text-center mt-5">
                <div className="inline-block rounded-lg bg-[#64162D] text-[#FFFFFF] border border-[#DEC9A8]/40 px-4 py-3 sm:px-7 sm:py-3.5 shadow-xs">
                  <p className="text-xs sm:text-sm font-bold leading-snug">
                    No tienes que elegir una sola especialidad: ambas están
                    incluidas en tu formación.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
