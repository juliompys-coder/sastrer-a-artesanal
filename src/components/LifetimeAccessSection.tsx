import React from 'react';
import {
  BookOpen,
  Check,
  Infinity as InfinityIcon,
  Layers,
  PlayCircle,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { Reveal } from './Reveal';

const CORE_BENEFITS = [
  {
    title: 'Dos especialidades completas',
    description:
      'Sastrería Artesanal Full Canvas y Sastrería Semiartesanal (24 módulos técnicos).',
    icon: Layers,
  },
  {
    title: 'Clases en video organizadas por módulos',
    description:
      'Estudia paso a paso desde casa o desde tu taller, en celular, tableta o computadora.',
    icon: PlayCircle,
  },
  {
    title: 'Libro de Sastrería de cortesía',
    description:
      'Material complementario de consulta incluido sin coste adicional.',
    icon: BookOpen,
  },
  {
    title: 'Acceso de por vida',
    description:
      'Pago único de US$25, sin mensualidades, para repasar cada clase cuando lo necesites.',
    icon: InfinityIcon,
  },
] as const;

const AUDIENCE_GROUPS = [
  {
    title: 'Principiantes',
    description: 'Principiantes que desean aprender desde cero.',
  },
  {
    title: 'Conocimientos de costura',
    description:
      'Personas que ya saben coser y desean ampliar sus conocimientos.',
  },
  {
    title: 'Oficio, estudio y emprendimiento',
    description:
      'Sastres, confeccionistas, estudiantes y emprendedores interesados en perfeccionar sus técnicas.',
  },
] as const;

export const LifetimeAccessSection: React.FC = () => {
  const bookCover = siteConfig.complimentaryBook.coverImageUrl?.trim();

  return (
    <section
      id="que-recibiras"
      className="bg-[#64162D] text-[#FFFFFF] py-12 sm:py-16 border-b border-[#DEC9A8]/25 scroll-mt-18 overflow-x-clip"
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-8">
        {/* Encabezado de Sección 4 */}
        <Reveal className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#DEC9A8] mb-1.5">
            Todo lo que recibes con tu inscripción
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-[-0.02em] leading-[1.15] text-[#FFFFFF]">
            Qué incluye la formación
          </h2>
        </Reveal>

        {/* 4 Beneficios Clave en Cuadrícula Compacta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {CORE_BENEFITS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <article className="h-full bg-[#4B0F21] border border-[#DEC9A8]/35 rounded-lg p-4 sm:p-5 flex flex-col">
                  <span
                    className="w-9 h-9 rounded-md bg-[#64162D] border border-[#DEC9A8]/45 text-[#DEC9A8] inline-flex items-center justify-center shrink-0 mb-3"
                    aria-hidden="true"
                  >
                    <IconComponent className="w-4 h-4" strokeWidth={2} />
                  </span>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#FFFFFF] leading-snug mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] leading-[1.6] text-[#FCF6EC]/85">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Bloque Compacto Fusionado: Cómo estudiar + Libro de Sastrería de cortesía */}
        <Reveal delay={0.08} className="mb-8 sm:mb-10">
          <div
            id="libro-de-cortesia"
            className="bg-[#FCF6EC] text-[#342C30] border border-[#DEC9A8] rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-7 shadow-xs scroll-mt-24"
          >
            {bookCover && (
              <div className="shrink-0">
                <img
                  src={bookCover}
                  alt="Portada del Libro de Sastrería de cortesía"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-[104px] sm:w-[120px] h-auto object-contain rounded-md shadow-sm"
                />
              </div>
            )}
            <div className="text-center sm:text-left min-w-0">
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9A7A4C] mb-1">
                Estudio a tu ritmo · Libro de cortesía incluido
              </p>
              <h3 className="text-base sm:text-lg font-extrabold text-[#64162D] leading-snug mb-2">
                Cómo estudiar y consultar tus clases
              </h3>
              <p className="text-xs sm:text-sm leading-[1.68] text-[#5A4F54]">
                Después de inscribirte accedes a los videos organizados por
                módulo. Puedes pausar mientras practicas, repetir cualquier
                procedimiento las veces que necesites y apoyarte en el{' '}
                <strong className="font-semibold text-[#342C30]">
                  Libro de Sastrería de cortesía
                </strong>{' '}
                incluido sin coste adicional.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Subbloque Simplificado: ¿Para quién es esta formación? (3 grupos) */}
        <div
          id="dirigido-a"
          className="pt-7 sm:pt-8 border-t border-[#DEC9A8]/30 scroll-mt-24"
        >
          <Reveal className="text-center mb-5 sm:mb-6">
            <h3 className="text-lg sm:text-2xl font-extrabold tracking-[-0.015em] text-[#FFFFFF] leading-snug">
              ¿Para quién es esta formación?
            </h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {AUDIENCE_GROUPS.map((group, idx) => (
              <Reveal key={group.title} delay={idx * 0.04}>
                <article className="h-full bg-[#4B0F21]/90 border border-[#DEC9A8]/30 rounded-lg p-4 sm:p-5 flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full bg-[#DEC9A8] text-[#4B0F21] flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={2.75} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-[15px] font-bold text-[#FFFFFF] mb-1">
                      {group.title}
                    </h4>
                    <p className="text-xs sm:text-[13px] leading-[1.6] text-[#FCF6EC]/85">
                      {group.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
