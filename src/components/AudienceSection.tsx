import React from 'react';
import { Check } from 'lucide-react';
import { AUDIENCE_PROFILES } from '../data/courseContent';
import { PurchaseButton } from './PurchaseButton';
import { Reveal } from './Reveal';

interface AudienceSectionProps {
  onUnconfiguredCheckout: () => void;
}

export const AudienceSection: React.FC<AudienceSectionProps> = ({
  onUnconfiguredCheckout,
}) => {
  return (
    <section
      id="dirigido-a"
      className="bg-[#EAD5D7] text-[#342C30] py-20 sm:py-26 border-b border-[#DEC9A8]"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#64162D] mb-2.5">
            ¿Para quién es esta formación?
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#64162D] leading-[1.14]">
            Una formación para quienes desean aprender y perfeccionar el arte de
            la sastrería.
          </h2>
        </Reveal>

        {/* Two-Column Cream Cards with Circular Burgundy Check Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {AUDIENCE_PROFILES.map((profile, idx) => {
            const isLastOdd =
              idx === AUDIENCE_PROFILES.length - 1 &&
              AUDIENCE_PROFILES.length % 2 === 1;

            return (
              <Reveal
                key={profile.number}
                delay={(idx % 2) * 0.05}
                className={
                  isLastOdd ? 'md:col-span-2 md:max-w-[565px] md:mx-auto w-full' : ''
                }
              >
                <article className="h-full bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg p-6 sm:p-7 shadow-xs flex items-start gap-4">
                  <span
                    className="w-9 h-9 rounded-full bg-[#64162D] text-[#FFFFFF] flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Check className="w-4 h-4" strokeWidth={2.75} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-[#64162D] mb-1.5">
                      {profile.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-[1.68] text-[#5A4F54]">
                      {profile.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-lg font-bold text-[#64162D] leading-snug mb-8">
            No necesitas experiencia previa para comenzar. Necesitas interés por
            aprender y disposición para practicar.
          </p>

          <PurchaseButton
            label="Quiero comenzar mi formación"
            variant="coral"
            onUnconfiguredCheckout={onUnconfiguredCheckout}
          />
        </Reveal>
      </div>
    </section>
  );
};
