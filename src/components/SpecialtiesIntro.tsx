import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { EditorialImage } from './EditorialImage';
import { Reveal } from './Reveal';

export const SpecialtiesIntro: React.FC = () => {
  return (
    <section
      id="que-recibiras"
      className="bg-[#FCF6EC] text-[#342C30] pt-20 pb-14 sm:pt-24 sm:pb-16"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2.5">
            Qué recibirás al inscribirte
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.02em] text-[#64162D] leading-[1.14] mb-4">
            Una formación integral en dos disciplinas de la alta sastrería.
          </h2>
          <p className="text-sm sm:text-base leading-[1.7] text-[#5A4F54]">
            Con un solo acceso obtendrás las dos especialidades completas en
            video, el Libro de Sastrería de cortesía y consulta de por vida.
          </p>
        </Reveal>

        {/* Two Large Editorial Cards in Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Specialty I Card */}
          <Reveal>
            <article className="h-full flex flex-col bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg overflow-hidden shadow-xs">
              <EditorialImage
                src={siteConfig.media.fullCanvasImage}
                alt={siteConfig.media.fullCanvasImageAlt}
                fallbackTitle="Especialidad I: Sastrería Artesanal Full Canvas"
                className="aspect-[16/10] w-full"
              />
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#9A7A4C] mb-1.5">
                    Especialidad I · Construcción tradicional
                  </p>
                  <h3 className="text-2xl font-bold text-[#64162D] mb-3">
                    Sastrería Artesanal Full Canvas
                  </h3>
                  <p className="text-sm sm:text-[15px] leading-[1.7] text-[#5A4F54] mb-6">
                    Estudio profundo de la estructura interna flotante de
                    entretelas, crin de caballo, picado manual del pecho y las
                    solapas, modelado tradicional del cuello, mangas de dos
                    piezas y ojales elaborados a mano.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DEC9A8]/70 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-[#5A4F54]">
                    12 bloques técnicos completos
                  </span>
                  <a
                    href="#full-canvas"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.06em] text-[#64162D] hover:text-[#F05D3D] transition-colors whitespace-nowrap"
                  >
                    <span>Ver temario</span>
                    <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Specialty II Card */}
          <Reveal delay={0.08}>
            <article className="h-full flex flex-col bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg overflow-hidden shadow-xs">
              <EditorialImage
                src={siteConfig.media.semiArtisanalImage}
                alt={siteConfig.media.semiArtisanalImageAlt}
                fallbackTitle="Especialidad II: Sastrería Semiartesanal"
                className="aspect-[16/10] w-full"
              />
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#9A7A4C] mb-1.5">
                    Especialidad II · Técnica y eficiencia
                  </p>
                  <h3 className="text-2xl font-bold text-[#64162D] mb-3">
                    Sastrería Semiartesanal
                  </h3>
                  <p className="text-sm sm:text-[15px] leading-[1.7] text-[#5A4F54] mb-6">
                    Un enfoque metódico que une fundamentos de patronaje y
                    sastrería clásica con operaciones mecanizadas de precisión
                    en entretelado, bolsillos, montaje de mangas, ojales y
                    forrado.
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DEC9A8]/70 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-[#5A4F54]">
                    12 bloques técnicos completos
                  </span>
                  <a
                    href="#semiartesanal"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.06em] text-[#64162D] hover:text-[#F05D3D] transition-colors whitespace-nowrap"
                  >
                    <span>Ver temario</span>
                    <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
