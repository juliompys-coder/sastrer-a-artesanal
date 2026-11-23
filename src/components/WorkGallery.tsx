import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { siteConfig, WorkGalleryItem } from '../config/siteConfig';
import { Reveal } from './Reveal';

export const WorkGallery: React.FC = () => {
  const items = siteConfig.workGallery;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : prev === 0 ? items.length - 1 : prev - 1
        );
      }
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : prev === items.length - 1 ? 0 : prev + 1
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items.length]);

  const activeItem: WorkGalleryItem | null =
    selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <section
      id="trabajos-reales"
      className="bg-[#FCF6EC] text-[#342C30] pt-10 pb-20 sm:pt-12 sm:pb-24 border-b border-[#DEC9A8]"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
            Galería del taller
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold leading-[1.16] text-[#64162D] mb-3">
            Conoce los trabajos y procesos de esta formación.
          </h2>
          <p className="text-sm sm:text-[15px] leading-[1.7] text-[#5A4F54]">
            Explora los trabajos y procesos técnicos de la formación. Pulsa
            sobre cualquier lámina para abrir la vista ampliada.
          </p>
        </Reveal>

        {/* 8-Plate Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => {
            const hasPhoto = Boolean(item.imageUrl && item.imageUrl.trim());

            return (
              <Reveal key={item.id} delay={(idx % 4) * 0.04}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  aria-label={`Ampliar ${item.title}`}
                  className="group w-full h-full text-left bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg overflow-hidden hover:border-[#64162D] transition-colors flex flex-col cursor-pointer shadow-xs"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#64162D]">
                    {hasPhoto ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
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
                      <span
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-md bg-[#64162D]/85 text-[#FFFFFF] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#9A7A4C] mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-base font-bold text-[#64162D] leading-snug mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#5A4F54]">
                      {item.caption}
                    </p>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#342C30]/88 backdrop-blur-xs p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#FCF6EC] text-[#342C30] border border-[#DEC9A8] rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#64162D] text-[#FFFFFF]">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.08em] uppercase">
                <span className="text-[#DEC9A8] tabular-nums">
                  {activeItem.plateCode}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#FCF6EC]/85">{activeItem.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Cerrar vista ampliada"
                className="w-10 h-10 flex items-center justify-center text-[#FFFFFF] hover:text-[#DEC9A8] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Visual Area */}
            <div className="aspect-[16/10] w-full bg-[#4B0F21] flex items-center justify-center">
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
                    </code>{' '}
                    sin presentar imágenes genéricas como resultados del taller.
                  </p>
                </div>
              )}
            </div>

            {/* Caption & Controls */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FCF6EC]">
              <div>
                <h3
                  id="lightbox-title"
                  className="text-xl font-bold text-[#64162D]"
                >
                  {activeItem.title}
                </h3>
                <p className="text-sm text-[#5A4F54] mt-1">
                  {activeItem.caption}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-[#5A4F54] tabular-nums mr-2">
                  {selectedIndex + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      selectedIndex === 0 ? items.length - 1 : selectedIndex - 1
                    )
                  }
                  aria-label="Lámina anterior"
                  className="w-11 h-11 rounded-md border border-[#DEC9A8] bg-[#FFFFFF] text-[#64162D] hover:border-[#64162D] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      selectedIndex === items.length - 1 ? 0 : selectedIndex + 1
                    )
                  }
                  aria-label="Siguiente lámina"
                  className="w-11 h-11 rounded-md border border-[#DEC9A8] bg-[#FFFFFF] text-[#64162D] hover:border-[#64162D] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
