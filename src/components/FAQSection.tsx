import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/courseContent';
import { Reveal } from './Reveal';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="preguntas"
      className="bg-[#EAD5D7] text-[#342C30] py-12 sm:py-16 scroll-mt-18 overflow-x-clip"
    >
      <div className="max-w-[820px] mx-auto px-4 sm:px-8">
        <Reveal className="text-center mb-7 sm:mb-9">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#64162D] mb-1.5">
            Resolución de dudas
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.02em] text-[#64162D] leading-[1.15]">
            Preguntas frecuentes
          </h2>
        </Reveal>

        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div
                key={item.id}
                className="bg-[#FCF6EC] border border-[#DEC9A8] rounded-md shadow-xs overflow-hidden"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#FFFDF9] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#64162D] transition-colors min-h-[58px]"
                  >
                    <span className="text-[15px] sm:text-[17px] font-semibold text-[#342C30] leading-snug">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#9A7A4C] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-[#DEC9A8]/60 bg-[#FFFDF9]"
                    >
                      <div className="px-4 sm:px-6 py-4 sm:py-5">
                        <p className="text-sm sm:text-[15px] leading-[1.72] text-[#5A4F54]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
