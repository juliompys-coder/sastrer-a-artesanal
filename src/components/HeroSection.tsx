import React, { useState } from 'react';
import { Check, Play, Film } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { HERO_BENEFITS, VIDEO_PROCESS_LIST } from '../data/courseContent';
import { PurchaseButton } from './PurchaseButton';
import { EditorialImage } from './EditorialImage';
import { PricingTiers } from './PricingTiers';
import { ScarcityCounter } from './ScarcityCounter';

interface HeroSectionProps {
  onUnconfiguredCheckout: () => void;
}

type ParsedVideo =
  | { type: 'youtube'; embedUrl: string }
  | { type: 'vimeo'; embedUrl: string }
  | { type: 'mp4'; src: string }
  | { type: 'unconfigured' };

function parseVideoUrl(rawUrl: string): ParsedVideo {
  const trimmed = rawUrl.trim();
  if (!trimmed) return { type: 'unconfigured' };

  // Full Vimeo player embed URL (preserves privacy hash h=... and query params verbatim)
  if (/^https?:\/\/player\.vimeo\.com\/video\/\d+/i.test(trimmed)) {
    return {
      type: 'vimeo',
      embedUrl: trimmed,
    };
  }

  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autopause=0`,
    };
  }

  if (/^https?:\/\/.+\.(mp4|webm)(\?.*)?$/i.test(trimmed)) {
    return { type: 'mp4', src: trimmed };
  }

  return { type: 'unconfigured' };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onUnconfiguredCheckout,
}) => {
  const parsedVideo = parseVideoUrl(siteConfig.demoVideo.url);
  const [isPlaying, setIsPlaying] = useState(parsedVideo.type === 'vimeo');
  const [showPendingNotice, setShowPendingNotice] = useState(false);

  const handlePlayClick = () => {
    if (parsedVideo.type === 'unconfigured') {
      setShowPendingNotice(true);
      return;
    }
    setIsPlaying(true);
  };

  const containerAspectClass =
    'relative w-full aspect-video min-h-[240px] sm:min-h-0 bg-[#1A080E]';

  return (
    <section
      id="inicio"
      className="bg-[#FCF6EC] text-[#342C30] pt-10 pb-16 sm:pt-14 sm:pb-22 border-b border-[#DEC9A8]"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        {/* Centered Header Copy */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-[#9A7A4C] mb-2">
            {siteConfig.brand.eyebrow} <span aria-hidden="true">·</span>{' '}
            {siteConfig.brand.concept}
          </p>

          <h1 className="text-[2rem] leading-[1.12] sm:text-[2.75rem] lg:text-[3.35rem] font-extrabold tracking-[-0.025em] text-[#64162D] mb-5">
            Aprende el arte de confeccionar sacos de{' '}
            <span className="text-[#F05D3D]">Alta Sastrería</span>, incluso si
            comienzas <span className="text-[#F05D3D]">desde cero</span>.
          </h1>

          <div className="max-w-3xl mx-auto space-y-3 text-[15px] sm:text-base leading-[1.68] text-[#5A4F54] mb-9">
            <p>
              Descubre las técnicas de Sastrería Artesanal Full Canvas y
              Sastrería Semiartesanal, desde la toma de medidas y el patronaje
              hasta la construcción del pecho, la colocación del cuello y las
              mangas y los acabados profesionales.
            </p>
            <p>
              Aprende mediante clases completas en video, explicadas paso a paso
              y disponibles para consultar a tu propio ritmo.
            </p>
          </div>
        </div>

        {/* Centerpiece Video Container with Burgundy Info Strip Above */}
        <div
          id="demostracion"
          className="-mx-3 sm:mx-auto max-w-[960px] rounded-lg overflow-hidden border border-[#DEC9A8] bg-[#FFFFFF] shadow-sm mb-9"
        >
          {/* Burgundy Informational Bar Above Video */}
          <div className="bg-[#64162D] text-[#FFFFFF] px-3 py-2 sm:px-5 sm:py-3 text-center">
            <p className="text-[11px] sm:text-sm font-semibold tracking-[0.02em] leading-snug">
              <span className="block sm:inline text-[10px] sm:text-xs text-[#DEC9A8] uppercase tracking-[0.08em] sm:mr-2">
                Una mirada al interior de las clases:
              </span>
              <span className="block sm:inline">
                Observa la técnica. Comprende el proceso.
              </span>
            </p>
          </div>

          {/* Responsive Video Player */}
          <div className={containerAspectClass}>
            {isPlaying && parsedVideo.type === 'youtube' && (
              <iframe
                src={parsedVideo.embedUrl}
                title={siteConfig.demoVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {isPlaying && parsedVideo.type === 'vimeo' && (
              <iframe
                src={parsedVideo.embedUrl}
                title={siteConfig.demoVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}

            {isPlaying && parsedVideo.type === 'mp4' && (
              <video
                src={parsedVideo.src}
                poster={siteConfig.demoVideo.posterUrl}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                Tu navegador no admite la reproducción de video HTML5.
              </video>
            )}

            {!isPlaying && (
              <>
                <EditorialImage
                  src={siteConfig.demoVideo.posterUrl}
                  alt={siteConfig.media.finalBackdropImageAlt}
                  fallbackTitle="Demostración de Alta Sastrería Masculina"
                  priority
                  className="absolute inset-0 w-full h-full"
                  imgClassName="opacity-75"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#4B0F21]/88 via-[#4B0F21]/40 to-[#4B0F21]/25"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                  {parsedVideo.type === 'unconfigured' && (
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-[#DEC9A8] mb-4">
                      Portada provisional · Demostración pendiente de video
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handlePlayClick}
                    aria-label={
                      parsedVideo.type === 'unconfigured'
                        ? 'Ver estado de configuración del video demostrativo'
                        : 'Reproducir video demostrativo de la formación'
                    }
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#F05D3D] text-[#FFFFFF] hover:bg-[#D94C2D] transition-colors duration-200 flex items-center justify-center cursor-pointer shadow-lg ring-4 ring-[#FCF6EC]/25"
                  >
                    <Play
                      className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current"
                      aria-hidden="true"
                    />
                  </button>

                  <p className="mt-4 text-base sm:text-lg font-bold text-[#FFFFFF] max-w-lg">
                    {siteConfig.demoVideo.title}
                  </p>

                  {showPendingNotice && parsedVideo.type === 'unconfigured' && (
                    <div
                      role="status"
                      className="mt-4 max-w-md bg-[#FCF6EC] text-[#342C30] border border-[#DEC9A8] rounded-md px-4 py-3 text-left text-xs leading-relaxed shadow-md"
                    >
                      <div className="flex items-center gap-2 text-[#64162D] font-bold mb-1">
                        <Film className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Video demostrativo listo para configurar</span>
                      </div>
                      <p>
                        Añade tu enlace real de YouTube, Vimeo o archivo MP4 en{' '}
                        <code className="font-mono text-[#64162D]">
                          siteConfig.demoVideo.url
                        </code>{' '}
                        dentro de{' '}
                        <code className="font-mono text-[#64162D]">
                          src/config/siteConfig.ts
                        </code>
                        . No se muestran videos ajenos.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Processes Observed in the Video */}
          <div className="bg-[#FFFDF9] border-t border-[#DEC9A8] px-5 py-5 sm:px-7 sm:py-6">
            <p className="text-xs sm:text-sm font-semibold text-[#64162D] mb-3.5 text-center">
              En esta presentación podrás observar fragmentos reales de los
              procesos que forman parte de la formación:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-2 text-xs sm:text-sm text-[#5A4F54]">
              {VIDEO_PROCESS_LIST.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check
                    className="w-4 h-4 text-[#64162D] shrink-0 mt-0.5"
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 pt-3.5 border-t border-[#DEC9A8]/60 text-center text-xs sm:text-sm font-semibold text-[#342C30]">
              Descubre el trabajo que se encuentra detrás de cada detalle.
            </p>
          </div>
        </div>

        {/* Centered Price + Batch Roadmap + Coral Primary CTA + Scarcity Counter Below Video */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-1">
              Lote 1 vigente · Primeros 50 alumnos
            </p>
            <div className="flex items-baseline justify-center gap-2.5">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#64162D] tabular-nums">
                {siteConfig.offer.formattedPrice}
              </span>
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] text-[#5A4F54]">
                {siteConfig.offer.currency} · Pago único
              </span>
            </div>
            <p className="mt-1.5 text-sm text-[#5A4F54]">
              Ambas especialidades + Libro de Sastrería de cortesía.
            </p>
          </div>

          <PricingTiers layout="compact" className="mb-6" />

          <div className="flex justify-center">
            <PurchaseButton
              label="Quiero comenzar mi formación"
              variant="coral"
              className="w-full sm:w-auto sm:min-w-[340px]"
              onUnconfiguredCheckout={onUnconfiguredCheckout}
            />
          </div>

          <ScarcityCounter
            variant="light"
            className="max-w-md mx-auto mt-3.5 mb-5"
          />

          <p className="text-xs font-medium text-[#5A4F54] mb-7">
            Un solo pago <span aria-hidden="true">·</span> Acceso de por vida{' '}
            <span aria-hidden="true">·</span> Formación en español.
          </p>

          {/* Compact Summary of Immediate Benefits */}
          <ul
            aria-label="Beneficios principales de la formación"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 pt-6 border-t border-[#DEC9A8] text-xs sm:text-sm font-medium text-[#342C30]"
          >
            {HERO_BENEFITS.map((benefit) => (
              <li key={benefit} className="inline-flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full bg-[#64162D] text-[#FFFFFF] inline-flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
