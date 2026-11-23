import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FAQ_ITEMS } from '../data/courseContent';
import { Reveal } from './Reveal';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="preguntas"
      className="bg-[#EAD5D7] text-[#342C30] py-20 sm:py-26"
    >
      <div className="max-w-[820px] mx-auto px-5 sm:px-8">
        <Reveal className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#64162D] mb-2.5">
            Resolución de dudas
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#64162D] leading-[1.14]">
            Preguntas frecuentes
          </h2>
        </Reveal>

        <div className="space-y-3.5">
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
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-5 text-left cursor-pointer hover:bg-[#FFFDF9] transition-colors min-h-[58px]"
                  >
                    <span className="text-base sm:text-[17px] font-semibold text-[#342C30] leading-snug">
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="px-5 sm:px-6 pb-5 pt-2 border-t border-[#DEC9A8]/60 bg-[#FFFDF9]"
                    >
                      <p className="text-sm sm:text-[15px] leading-[1.72] text-[#5A4F54]">
                        {item.answer}
                      </p>
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
