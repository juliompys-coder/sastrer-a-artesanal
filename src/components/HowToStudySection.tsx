import React from 'react';
import { ArrowUp, Compass, KeyRound, PlayCircle } from 'lucide-react';
import { Reveal } from './Reveal';

const STUDY_STEPS = [
  {
    number: '01',
    label: 'Paso 1',
    title: 'Accede a tu formación',
    description:
      'Ingresa a la plataforma de estudio utilizando las instrucciones de acceso que recibirás después de completar tu inscripción.',
    icon: KeyRound,
  },
  {
    number: '02',
    label: 'Paso 2',
    title: 'Elige una especialidad',
    description:
      'Explora las clases de Sastrería Artesanal Full Canvas o Sastrería Semiartesanal.',
    icon: Compass,
  },
  {
    number: '03',
    label: 'Paso 3',
    title: 'Aprende a tu propio ritmo',
    description:
      'Reproduce las clases, pausa los videos y vuelve a consultar cada procedimiento mientras practicas.',
    icon: PlayCircle,
  },
] as const;

export const HowToStudySection: React.FC = () => {
  return (
    <section
      id="como-estudiaras"
      className="bg-[#EAD5D7] text-[#342C30] py-14 sm:py-20 border-b border-[#DEC9A8] overflow-x-clip"
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-9 sm:mb-12">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#64162D] mb-2">
            Acceso y metodología en video
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-[-0.02em] leading-[1.15] text-[#64162D] mb-3">
            Así estudiarás tu formación desde dentro
          </h2>
          <p className="text-sm sm:text-[15px] leading-[1.68] text-[#5A4F54]">
            Accede a tus clases, selecciona el procedimiento que deseas estudiar
            y repite las explicaciones todas las veces que necesites.
          </p>
        </Reveal>

        {/* 3-Step Access Grid */}
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {STUDY_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <Reveal key={step.number} delay={index * 0.06}>
                <li className="h-full bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg p-5 sm:p-6 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[#DEC9A8]/80">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-md bg-[#64162D] text-[#DEC9A8] inline-flex items-center justify-center shrink-0">
                        <StepIcon
                          className="w-4 h-4"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9A7A4C]">
                        {step.label}
                      </span>
                    </div>
                    <span className="text-xl sm:text-2xl font-extrabold text-[#64162D]/25 tabular-nums leading-none">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#64162D] leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-[1.68] text-[#5A4F54]">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>

        {/* Authentic Video Reference Bar (no fabricated UI mockups) */}
        <Reveal delay={0.14} className="mt-7 sm:mt-8">
          <div className="max-w-3xl mx-auto bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-[#5A4F54] leading-relaxed">
              Puedes comprobar el formato real de las lecciones directamente en
              el video demostrativo de la sección superior.
            </p>
            <a
              href="#demostracion"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#64162D] hover:text-[#F05D3D] transition-colors shrink-0 py-1"
            >
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ver vista previa</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
