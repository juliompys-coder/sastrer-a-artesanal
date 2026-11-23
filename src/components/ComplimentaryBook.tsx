import React from 'react';
import { BookOpen } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { Reveal } from './Reveal';

export const ComplimentaryBook: React.FC = () => {
  const { coverImageUrl, specificTitle, format, pageCount } =
    siteConfig.complimentaryBook;

  const hasCover = Boolean(coverImageUrl && coverImageUrl.trim().length > 0);

  return (
    <section
      id="libro-de-cortesia"
      className="bg-[#FCF6EC] text-[#342C30] py-12 sm:py-16"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <Reveal className="bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg p-7 sm:p-11 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Book Visual */}
            <div className="lg:col-span-5 flex justify-center">
              {hasCover ? (
                <div className="py-2 px-2 flex items-center justify-center">
                  <img
                    src={coverImageUrl}
                    alt="Portada del Libro de Sastrería de cortesía"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full max-w-[300px] sm:max-w-[320px] h-auto object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="book-stage py-4 px-3">
                  <div className="book-volume relative w-[235px] sm:w-[265px] aspect-[3/4] shadow-[18px_22px_38px_rgba(100,22,45,0.22)]">
                    {/* Spine edge illusion */}
                    <div
                      className="absolute inset-y-0 -left-3.5 w-3.5 bg-gradient-to-r from-[#3A0B19] via-[#4B0F21] to-[#64162D] border-l border-[#DEC9A8]/40 rounded-l-xs"
                      aria-hidden="true"
                    />
                    {/* Page block edge illusion */}
                    <div
                      className="absolute inset-y-2 -right-2.5 w-2.5 bg-gradient-to-r from-[#E9DEC9] via-[#FCF6EC] to-[#D9C7A8] border-y border-r border-[#DEC9A8]"
                      aria-hidden="true"
                    />

                    <div className="w-full h-full bg-[#64162D] border border-[#DEC9A8]/60 rounded-r-xs p-6 flex flex-col justify-between text-center">
                      <div className="border-b border-[#DEC9A8]/35 pb-3.5">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#DEC9A8]">
                          Alta Sastrería Masculina
                        </p>
                      </div>

                      <div className="py-4">
                        <BookOpen
                          className="w-7 h-7 text-[#DEC9A8] mx-auto mb-4"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <p className="text-xl sm:text-2xl font-extrabold leading-tight text-[#FFFFFF] mb-3">
                          {specificTitle || 'Libro de Sastrería'}
                        </p>
                        <span
                          className="block w-10 h-0.5 bg-[#DEC9A8] mx-auto mb-3"
                          aria-hidden="true"
                        />
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#DEC9A8]">
                          Material de cortesía
                        </p>
                      </div>

                      <div className="border-t border-[#DEC9A8]/35 pt-3">
                        <p className="text-[10px] tracking-[0.1em] uppercase text-[#FCF6EC]/70">
                          Material de consulta
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Editorial Copy */}
            <div className="lg:col-span-7">
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2.5">
                Un obsequio para complementar tu aprendizaje
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#64162D] leading-[1.12] mb-5">
                Libro de Sastrería de cortesía
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base leading-[1.72] text-[#5A4F54] mb-6">
                <p>
                  La sastrería es un oficio en el que el estudio y la práctica
                  se complementan.
                </p>
                <p>
                  Por ello, junto con ambas especialidades recibirás un Libro de
                  Sastrería como material adicional de consulta.
                </p>
                <p>
                  Podrás utilizarlo para acompañar tus clases y continuar
                  estudiando los conocimientos relacionados con este oficio.
                </p>
              </div>

              {(specificTitle || format || pageCount) && (
                <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-[#DEC9A8]/70 pt-4 mb-6 text-sm">
                  {specificTitle && (
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#9A7A4C]">
                        Título
                      </dt>
                      <dd className="text-[#342C30] font-semibold">
                        {specificTitle}
                      </dd>
                    </div>
                  )}
                  {format && (
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#9A7A4C]">
                        Formato
                      </dt>
                      <dd className="text-[#342C30] font-semibold">{format}</dd>
                    </div>
                  )}
                  {pageCount && (
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#9A7A4C]">
                        Extensión
                      </dt>
                      <dd className="text-[#342C30] font-semibold tabular-nums">
                        {pageCount}
                      </dd>
                    </div>
                  )}
                </dl>
              )}

              <div className="inline-block border-t-2 border-b-2 border-[#DEC9A8] py-2.5">
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.12em] uppercase text-[#64162D]">
                  Incluido sin coste adicional.
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
