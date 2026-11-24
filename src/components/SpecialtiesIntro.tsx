import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { siteConfig } from '../config/siteConfig';
import {
  CourseModule,
  FULL_CANVAS_MODULES,
  SEMI_ARTISANAL_MODULES,
} from '../data/courseContent';
import { ComparisonSection } from './ComparisonSection';
import { EditorialImage } from './EditorialImage';
import { ModuleAccordionList } from './ModuleAccordionList';
import { PurchaseButton } from './PurchaseButton';
import { Reveal } from './Reveal';

interface SpecialtiesIntroProps {
  onUnconfiguredCheckout: () => void;
}

interface SpecialtyPanelConfig {
  id: 'full-canvas' | 'semiartesanal';
  prefix: 'fc' | 'sa';
  badge: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  fallbackTitle: string;
  modules: CourseModule[];
  cardOrderClass: string;
  panelOrderClass: string;
}

const SPECIALTIES: SpecialtyPanelConfig[] = [
  {
    id: 'full-canvas',
    prefix: 'fc',
    badge: 'Especialidad I · 12 módulos',
    title: 'Sastrería Artesanal Full Canvas',
    description:
      'Procedimientos tradicionales de confección artesanal: estructura interna flotante, entretelas, picado manual y acabados de alta sastrería.',
    image: siteConfig.media.fullCanvasImage,
    imageAlt: siteConfig.media.fullCanvasImageAlt,
    fallbackTitle: 'Sastrería Artesanal Full Canvas',
    modules: FULL_CANVAS_MODULES,
    cardOrderClass: 'order-1 lg:order-1',
    panelOrderClass: 'order-2 lg:order-3 lg:col-span-2',
  },
  {
    id: 'semiartesanal',
    prefix: 'sa',
    badge: 'Especialidad II · 12 módulos',
    title: 'Sastrería Semiartesanal',
    description:
      'Método que combina técnicas de sastrería y producción semiartesanal: preparación de piezas, entretelado, armado y terminaciones precisas.',
    image: siteConfig.media.semiArtisanalImage,
    imageAlt: siteConfig.media.semiArtisanalImageAlt,
    fallbackTitle: 'Sastrería Semiartesanal',
    modules: SEMI_ARTISANAL_MODULES,
    cardOrderClass: 'order-3 lg:order-2',
    panelOrderClass: 'order-4 lg:order-4 lg:col-span-2',
  },
];

export const SpecialtiesIntro: React.FC<SpecialtiesIntroProps> = ({
  onUnconfiguredCheckout,
}) => {
  // En la vista inicial ambos temarios permanecen compactos (plegados) para reducir la longitud vertical
  const [expandedSpecialties, setExpandedSpecialties] = useState<
    Record<string, boolean>
  >({});
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const toggleSpecialtyPanel = (id: string) => {
    setExpandedSpecialties((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleModule = (key: string) => {
    setOpenModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAllFor = (prefix: string, modules: CourseModule[]) => {
    setOpenModules((prev) => {
      const next = { ...prev };
      modules.forEach((m) => {
        next[`${prefix}-${m.number}`] = true;
      });
      return next;
    });
  };

  const collapseAllFor = (prefix: string, modules: CourseModule[]) => {
    setOpenModules((prev) => {
      const next = { ...prev };
      modules.forEach((m) => {
        delete next[`${prefix}-${m.number}`];
      });
      return next;
    });
  };

  return (
    <section
      id="especialidades"
      className="bg-[#EAD5D7] text-[#342C30] py-12 sm:py-16 border-b border-[#DEC9A8] scroll-mt-18 overflow-x-clip"
    >
      <div id="temario" className="max-w-[1150px] mx-auto px-4 sm:px-8 scroll-mt-20">
        <Reveal className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#64162D] mb-1.5">
            Dos métodos complementarios · 24 módulos técnicos
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-[-0.02em] text-[#64162D] leading-[1.15] mb-2.5">
            Dos especialidades. Una formación completa.
          </h2>
          <p className="text-sm sm:text-[15px] leading-[1.65] text-[#5A4F54]">
            Explora el temario completo de cada especialidad y conoce los 24
            módulos incluidos en tu inscripción.
          </p>
        </Reveal>

        {/* Tarjetas de Especialidades + Paneles Desplegables de los 24 Módulos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          {SPECIALTIES.map((spec) => {
            const isPanelOpen = Boolean(expandedSpecialties[spec.id]);
            const allOpen = spec.modules.every(
              (m) => openModules[`${spec.prefix}-${m.number}`]
            );
            const anyOpen = spec.modules.some(
              (m) => openModules[`${spec.prefix}-${m.number}`]
            );

            return (
              <React.Fragment key={spec.id}>
                <article
                  id={spec.id}
                  className={`${spec.cardOrderClass} h-full flex flex-col bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg overflow-hidden shadow-xs scroll-mt-24`}
                >
                  <div className="relative">
                    <EditorialImage
                      src={spec.image}
                      alt={spec.imageAlt}
                      fallbackTitle={spec.fallbackTitle}
                      className="aspect-[16/9] w-full"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#64162D]/92 text-[#DEC9A8] text-[10.5px] sm:text-[11px] font-bold tracking-[0.08em] uppercase shadow-xs">
                      {spec.badge}
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#64162D] leading-snug mb-2">
                        {spec.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-[1.65] text-[#5A4F54] mb-4">
                        {spec.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSpecialtyPanel(spec.id)}
                      aria-expanded={isPanelOpen}
                      aria-controls={`temario-${spec.id}`}
                      className={`w-full px-4 py-3 rounded-md border font-bold text-xs sm:text-[13px] tracking-[0.05em] uppercase flex items-center justify-between gap-3 transition-colors duration-200 cursor-pointer min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64162D] ${
                        isPanelOpen
                          ? 'bg-[#64162D] border-[#64162D] text-[#FFFFFF]'
                          : 'bg-[#FFFDF9] border-[#DEC9A8] text-[#64162D] hover:border-[#64162D] hover:text-[#F05D3D]'
                      }`}
                    >
                      <span>
                        {isPanelOpen
                          ? `Ocultar los ${spec.modules.length} módulos`
                          : `Explorar los ${spec.modules.length} módulos`}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                          isPanelOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>

                {/* Panel Desplegable con los 12 Módulos Originales en Acordeón */}
                <AnimatePresence initial={false}>
                  {isPanelOpen && (
                    <motion.div
                      id={`temario-${spec.id}`}
                      role="region"
                      aria-label={`Temario completo de ${spec.title}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={`${spec.panelOrderClass} overflow-hidden`}
                    >
                      <div className="bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg p-4 sm:p-6 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#DEC9A8]/80">
                          <div>
                            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#9A7A4C]">
                              {spec.badge}
                            </p>
                            <h3 className="text-base sm:text-xl font-extrabold text-[#64162D] leading-snug">
                              Temario de {spec.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                expandAllFor(spec.prefix, spec.modules)
                              }
                              disabled={allOpen}
                              className="px-3 py-1.5 rounded-md border border-[#DEC9A8] bg-[#FCF6EC] text-[11px] font-bold uppercase tracking-[0.06em] text-[#64162D] hover:border-[#64162D] hover:text-[#F05D3D] disabled:opacity-45 disabled:pointer-events-none transition-colors cursor-pointer min-h-[36px]"
                            >
                              Expandir todos
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                collapseAllFor(spec.prefix, spec.modules)
                              }
                              disabled={!anyOpen}
                              className="px-3 py-1.5 rounded-md border border-[#DEC9A8] bg-[#FCF6EC] text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A4F54] hover:border-[#64162D] hover:text-[#64162D] disabled:opacity-45 disabled:pointer-events-none transition-colors cursor-pointer min-h-[36px]"
                            >
                              Contraer todos
                            </button>
                          </div>
                        </div>

                        <ModuleAccordionList
                          modules={spec.modules}
                          openNumbers={openModules}
                          onToggle={toggleModule}
                          prefix={spec.prefix}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </div>

        {/* Modificación 4: Comparación Técnica inicialmente contraída */}
        <ComparisonSection />

        {/* Botón de Compra Estratégico tras presentar las especialidades */}
        <Reveal className="mt-8 sm:mt-10">
          <div className="max-w-2xl mx-auto bg-[#FCF6EC] border border-[#DEC9A8] rounded-lg px-5 py-6 sm:px-8 sm:py-7 text-center shadow-xs">
            <p className="text-base sm:text-lg font-extrabold text-[#64162D] leading-snug mb-1">
              Accede a las dos especialidades con una sola inscripción
            </p>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.08em] text-[#9A7A4C] tabular-nums mb-4">
              {siteConfig.offer.formattedPrice} — PAGO ÚNICO · 24 MÓDULOS + LIBRO DE CORTESÍA
            </p>
            <div className="flex justify-center">
              <PurchaseButton
                label="Quiero acceder a las dos especialidades"
                location="after_curriculum"
                variant="coral"
                className="w-full sm:w-auto sm:min-w-[360px] min-h-[50px] py-3.5 text-[13px] sm:text-sm shadow-sm"
                onUnconfiguredCheckout={onUnconfiguredCheckout}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
