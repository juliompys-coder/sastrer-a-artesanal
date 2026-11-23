import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { BEGINNER_PATHS } from '../data/courseContent';
import { EditorialImage } from './EditorialImage';
import { Reveal } from './Reveal';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section
      id="el-arte"
      className="bg-[#64162D] text-[#FFFFFF] py-20 sm:py-26"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Title, Explanation, Pull-Quote & Tailoring Photography */}
          <Reveal className="lg:col-span-6">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] mb-3">
              El arte de la alta sastrería
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-[#FFFFFF] mb-6">
              La alta sastrería es mucho más que una prenda bien confeccionada.
            </h2>

            <div className="space-y-3.5 text-[15px] leading-[1.72] text-[#FCF6EC]/90 mb-7">
              <p>
                Detrás de un saco elegante existe mucho más que una tela bien
                cortada.
              </p>
              <p>
                Existe conocimiento, precisión, técnica y una tradición
                artesanal perfeccionada a lo largo de generaciones.
              </p>
              <p>
                La forma del pecho, el giro natural de las solapas, la
                construcción del cuello, la orientación de las mangas y la
                terminación de los ojales son detalles que marcan la diferencia.
              </p>
              <p>
                En la alta sastrería, cada pieza tiene una función y cada
                operación tiene una razón.
              </p>
              <p className="text-[#FFFFFF] font-semibold">
                Muchos de los conocimientos más importantes se encuentran en
                aquello que no se ve: la estructura interna de la prenda.
              </p>
            </div>

            <blockquote className="py-4 my-6 border-t border-b border-[#DEC9A8]/45">
              <p className="text-base sm:text-lg font-bold text-[#DEC9A8] leading-snug">
                «La excelencia de un saco comienza mucho antes de la última
                puntada.»
              </p>
            </blockquote>

            <div className="grid grid-cols-12 gap-3.5">
              <figure className="col-span-12 rounded-md overflow-hidden border border-[#DEC9A8]/45 bg-[#4B0F21]">
                <EditorialImage
                  src={siteConfig.media.heroImage}
                  alt={siteConfig.media.heroImageAlt}
                  fallbackTitle="Alta Sastrería Masculina"
                  className="aspect-[16/10] w-full"
                  imgClassName="object-cover object-top"
                />
              </figure>
              <figure className="col-span-6 rounded-md overflow-hidden border border-[#DEC9A8]/45 bg-[#4B0F21]">
                <EditorialImage
                  src={siteConfig.media.fullCanvasImage}
                  alt={siteConfig.media.fullCanvasImageAlt}
                  fallbackTitle="Estructura interna Full Canvas"
                  className="aspect-[4/3] w-full"
                />
              </figure>
              <figure className="col-span-6 rounded-md overflow-hidden border border-[#DEC9A8]/45 bg-[#4B0F21]">
                <EditorialImage
                  src={siteConfig.media.buttonholeImage}
                  alt={siteConfig.media.buttonholeImageAlt}
                  fallbackTitle="Ojales y solapas artesanales"
                  className="aspect-[4/3] w-full"
                />
              </figure>
            </div>
          </Reveal>

          {/* Right Column: Learn From Scratch + Three Numbered Blocks with Thin Horizontal Dividers */}
          <Reveal delay={0.08} className="lg:col-span-6">
            <div id="desde-cero">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] mb-3">
                Aprende desde cero
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold leading-[1.18] tracking-[-0.015em] text-[#FFFFFF] mb-3">
                ¿Nunca has confeccionado un saco? Esta formación también es para
                ti.
              </h3>
              <p className="text-base font-semibold text-[#DEC9A8] mb-5">
                No necesitas experiencia previa en sastrería para comenzar.
              </p>

              <div className="space-y-3 text-sm sm:text-[15px] leading-[1.7] text-[#FCF6EC]/88 mb-8">
                <p>
                  Esta formación ha sido preparada para que puedas estudiar las
                  técnicas desde sus fundamentos, siguiendo procedimientos
                  explicados paso a paso mediante videos.
                </p>
                <p>
                  Comenzarás comprendiendo las medidas, las piezas del patrón,
                  los materiales y las operaciones de confección.
                  Progresivamente conocerás técnicas más especializadas
                  utilizadas en la sastrería semiartesanal y en la construcción
                  artesanal Full Canvas.
                </p>
              </div>

              {/* Three Numbered Blocks Separated by Thin Horizontal Beige-Gold Dividers */}
              <ol className="border-t border-[#DEC9A8]/40 divide-y divide-[#DEC9A8]/40">
                {BEGINNER_PATHS.map((item) => (
                  <li key={item.index} className="py-6 flex items-start gap-5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#DEC9A8] tabular-nums leading-none shrink-0 pt-0.5">
                      {item.index}
                    </span>
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-[#FFFFFF] mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-[15px] leading-[1.68] text-[#FCF6EC]/88">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 pt-6 border-t border-[#DEC9A8]/45">
                <p className="text-base sm:text-lg font-bold text-[#FFFFFF] leading-snug">
                  No importa en qué etapa te encuentres. Lo importante es tu
                  deseo de aprender y perfeccionar tu técnica.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
