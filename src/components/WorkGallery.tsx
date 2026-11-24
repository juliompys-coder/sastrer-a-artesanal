import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Image as ImageIcon,
} from 'lucide-react';
import { siteConfig, WorkGalleryItem } from '../config/siteConfig';
import { Reveal } from './Reveal';

const ANATOMY_EXTRA_PLATES: WorkGalleryItem[] = [
  {
    id: 'anatomy-pattern',
    title: 'Patronaje de alta precisión',
    category: 'Anatomía de la prenda',
    caption:
      'La precisión comienza con las medidas y la construcción del patrón.',
    imageUrl: siteConfig.media.patternImage,
    plateCode: 'Lámina 09',
  },
  {
    id: 'anatomy-collar-fit',
    title: 'Asentamiento del cuello y hombros',
    category: 'Anatomía de la prenda',
    caption:
      'Estudia los procedimientos para lograr un montaje limpio del cuello y la línea de hombros.',
    imageUrl: siteConfig.media.heroImage,
    plateCode: 'Lámina 10',
  },
  {
    id: 'anatomy-hand-buttonhole',
    title: 'Ojales y detalles de terminación',
    category: 'Anatomía de la prenda',
    caption:
      'Observa los procedimientos de terminación artesanal que completan la prenda.',
    imageUrl: siteConfig.media.buttonholeImage,
    plateCode: 'Lámina 11',
  },
];

const INITIAL_VISIBLE_COUNT = 4;

export const WorkGallery: React.FC = () => {
  const items = useMemo<WorkGalleryItem[]>(
    () => [...siteConfig.workGallery, ...ANATOMY_EXTRA_PLATES],
    []
  );
  const [showAll, setShowAll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE_COUNT);
  const remainingCount = Math.max(0, items.length - INITIAL_VISIBLE_COUNT);

  const showPrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const showNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : prev === items.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, items.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        showPrev();
      } else {
        showNext();
      }
    }
  };

  const activeItem: WorkGalleryItem | null =
    selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section
      id="trabajos-reales"
      className="bg-[#FCF6EC] text-[#342C30] py-12 sm:py-16 border-b border-[#DEC9A8] scroll-mt-18 overflow-x-clip"
    >
      <div id="detalles" className="max-w-[1150px] mx-auto px-4 sm:px-8 scroll-mt-20">
        <Reveal className="max-w-3xl mx-auto text-center mb-7 sm:mb-9">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-1.5">
            Anatomía de la prenda y galería de procesos
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-extrabold tracking-[-0.02em] leading-[1.15] text-[#64162D] mb-2.5">
            Descubre los detalles de la alta sastrería
          </h2>
          <p className="text-sm sm:text-[15px] leading-[1.65] text-[#5A4F54]">
            Observa acabados, estructura interna, solapas y procedimientos que
            aprenderás paso a paso. Pulsa cualquier fotografía para ampliarla.
          </p>
        </Reveal>

        {/* Cuadrícula inicial compacta (4 fotos: 2x2 en móvil, 1 fila de 4 en escritorio) */}
        <div
          id="galeria-trabajos-grid"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5"
        >
          {visibleItems.map((item, idx) => {
            const hasPhoto = Boolean(item.imageUrl && item.imageUrl.trim());

            return (
              <Reveal key={item.id} delay={(idx % 4) * 0.03}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`Ampliar fotografía: ${item.title}`}
                  className="group w-full h-full text-left bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg overflow-hidden hover:border-[#64162D] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64162D] transition-all duration-200 flex flex-col cursor-pointer shadow-xs"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#4B0F21]">
                    {hasPhoto ? (
                      <img
                        src={item.imageUrl}
                        alt={`${item.title} — ${item.category}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#64162D] p-4 flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.1em] uppercase text-[#DEC9A8]">
                          <span className="tabular-nums">{item.plateCode}</span>
                          <Maximize2
                            className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 transition-opacity"
                            aria-hidden="true"
                          />
                        </div>

                        <div className="text-center px-2">
                          <ImageIcon
                            className="w-5 h-5 text-[#DEC9A8]/85 mx-auto mb-1.5"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          <p className="text-sm font-bold text-[#FFFFFF] leading-snug">
                            {item.title}
                          </p>
                        </div>

                        <p className="text-[10px] tracking-[0.06em] uppercase text-[#FCF6EC]/70 text-center border-t border-[#DEC9A8]/25 pt-2">
                          Fotografía real editable
                        </p>
                      </div>
                    )}

                    {hasPhoto && (
                      <>
                        <span
                          className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#4B0F21]/85 text-[#DEC9A8] text-[9.5px] sm:text-[10px] font-bold tracking-[0.08em] uppercase tabular-nums"
                          aria-hidden="true"
                        >
                          {item.plateCode}
                        </span>
                        <span
                          className="absolute bottom-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#64162D]/88 text-[#FFFFFF] flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-xs"
                          aria-hidden="true"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.08em] uppercase text-[#9A7A4C] mb-1 leading-tight">
                      {item.category}
                    </p>
                    <h3 className="text-[13px] sm:text-sm font-bold text-[#64162D] leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-xs leading-relaxed text-[#5A4F54] line-clamp-2 sm:line-clamp-3">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Botón para desplegar las fotografías restantes */}
        {remainingCount > 0 && (
          <div className="mt-6 sm:mt-7 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              aria-controls="galeria-trabajos-grid"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-md border-2 border-[#64162D] bg-[#FFFDF9] text-[#64162D] hover:bg-[#64162D] hover:text-[#FFFFFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64162D] transition-colors duration-200 text-xs sm:text-[13px] font-bold tracking-[0.06em] uppercase cursor-pointer min-h-[46px] shadow-xs"
            >
              <span>
                {showAll
                  ? 'Mostrar menos fotografías'
                  : 'Ver todos los trabajos y procesos'}
              </span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                  showAll ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </div>

      {/* Accessible Lightbox Modal with Swipe & Keyboard Navigation */}
      {activeItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#23191D]/92 backdrop-blur-xs p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#FCF6EC] text-[#342C30] border border-[#DEC9A8] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[#64162D] text-[#FFFFFF] shrink-0">
              <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.08em] uppercase min-w-0">
                <span className="text-[#DEC9A8] tabular-nums shrink-0">
                  {activeItem.plateCode}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#FCF6EC]/90 truncate">
                  {activeItem.category}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Cerrar vista ampliada"
                className="w-10 h-10 -mr-1.5 flex items-center justify-center text-[#FFFFFF] hover:text-[#DEC9A8] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Visual Area */}
            <div className="relative w-full h-[46vh] sm:h-[58vh] bg-[#1F0B12] flex items-center justify-center shrink-0">
              {activeItem.imageUrl && activeItem.imageUrl.trim() ? (
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="max-w-md mx-auto p-8 text-center">
                  <ImageIcon
                    className="w-8 h-8 text-[#DEC9A8] mx-auto mb-4"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <p className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-3">
                    {activeItem.title}
                  </p>
                  <p className="text-sm leading-relaxed text-[#FCF6EC]/80">
                    Este espacio está preparado para incorporar tu fotografía
                    auténtica en{' '}
                    <code className="font-mono text-xs text-[#DEC9A8]">
                      siteConfig.workGallery
                    </code>
                    .
                  </p>
                </div>
              )}
            </div>

            {/* Caption & Navigation Controls */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FCF6EC] overflow-y-auto">
              <div className="min-w-0">
                <h3
                  id="lightbox-title"
                  className="text-lg sm:text-xl font-bold text-[#64162D] leading-snug"
                >
                  {activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5A4F54] mt-1 leading-relaxed">
                  {activeItem.caption}
                </p>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#DEC9A8]/60">
                <span className="text-xs font-semibold text-[#5A4F54] tabular-nums mr-2">
                  {selectedIndex + 1} / {items.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Lámina anterior"
                    className="w-11 h-11 rounded-md border border-[#DEC9A8] bg-[#FFFFFF] text-[#64162D] hover:border-[#64162D] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Siguiente lámina"
                    className="w-11 h-11 rounded-md border border-[#DEC9A8] bg-[#FFFFFF] text-[#64162D] hover:border-[#64162D] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
