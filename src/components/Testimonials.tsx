import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { Reveal } from './Reveal';

/**
 * Sección de testimonios reales y verificados.
 * Permanece oculta en la página pública mientras no existan datos reales en siteConfig.testimonials.
 */
export const Testimonials: React.FC = () => {
  const items = siteConfig.testimonials;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonios"
      className="bg-[#FCF6EC] text-[#342C30] py-20 sm:py-24 border-b border-[#DEC9A8]"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
            Experiencias de estudio
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#64162D]">
            La experiencia de quienes han estudiado estas técnicas.
          </h2>
        </Reveal>

        {/* Three-Column Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  {item.photoUrl && (
                    <img
                      src={item.photoUrl}
                      alt={item.studentName}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#DEC9A8] shrink-0"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#64162D]">
                      {item.studentName}
                    </p>
                    <p className="text-xs font-medium text-[#5A4F54]">
                      {item.country}
                    </p>
                  </div>
                </div>

                <blockquote className="text-sm leading-[1.7] text-[#342C30]">
                  «{item.quote}»
                </blockquote>
              </div>

              {item.garmentPhotoUrl && (
                <div className="mt-5 pt-4 border-t border-[#DEC9A8]/60">
                  <img
                    src={item.garmentPhotoUrl}
                    alt={`Prenda confeccionada por ${item.studentName}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover rounded-md border border-[#DEC9A8]"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
