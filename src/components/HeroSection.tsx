import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  Film,
  Globe,
  Infinity as InfinityIcon,
  Layers,
  ListChecks,
  PenTool,
  Play,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { HERO_BENEFITS, VIDEO_TECHNIQUES } from '../data/courseContent';
import { PurchaseButton } from './PurchaseButton';
import { EditorialImage } from './EditorialImage';

interface HeroSectionProps {
  onUnconfiguredCheckout: () => void;
}

const HERO_BENEFIT_ICONS = [
  Layers,
  ListChecks,
  BookOpen,
  InfinityIcon,
  Globe,
];

const TECHNIQUE_ICONS = [
  Ruler,
  Scissors,
  Layers,
  PenTool,
  Shirt,
  Sparkles,
];

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
    'relative w-full aspect-video min-h-[225px] sm:min-h-0 bg-[#1A080E]';

  return (
    <section
      id="inicio"
      className="bg-[#FCF6EC] text-[#342C30] pt-6 pb-10 sm:pt-10 sm:pb-14 border-b border-[#DEC9A8] overflow-x-clip"
    >
      <div className="max-w-[1150px] mx-auto px-4 sm:px-8">
        {/* Sección 1: Portada, Beneficios Principales y Precio */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase text-[#9A7A4C] mb-2">
            {siteConfig.brand.eyebrow} <span aria-hidden="true">·</span>{' '}
            {siteConfig.brand.concept}
          </p>

          <h1 className="text-[1.75rem] leading-[1.14] sm:text-[2.55rem] lg:text-[3.05rem] font-extrabold tracking-[-0.025em] text-[#64162D] mb-3.5 sm:mb-4">
            Aprende a confeccionar sacos de{' '}
            <span className="text-[#F05D3D]">alta sastrería</span> desde cero,
            paso a paso.
          </h1>

          <div className="max-w-3xl mx-auto space-y-2 text-[14px] sm:text-[15.5px] leading-[1.6] text-[#5A4F54] mb-5 sm:mb-6">
            <p>
              Descubre las técnicas de Sastrería Artesanal Full Canvas y
              Sastrería Semiartesanal mediante clases completas en video, desde
              la toma de medidas y el patronaje hasta la confección y los
              acabados profesionales.
            </p>
            <p className="font-medium text-[#342C30]">
              Aprende desde casa, a tu propio ritmo y sin necesidad de
              experiencia previa.
            </p>
          </div>

          {/* Resumen de 5 Beneficios Clave */}
          <ul
            aria-label="Beneficios principales de la formación"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5 sm:gap-y-2 py-3 sm:py-3.5 px-2.5 sm:px-4 mb-5 sm:mb-6 border-y border-[#DEC9A8]/85 bg-[#FFFDF9]/70 rounded-md text-xs sm:text-[13px] font-medium text-[#342C30]"
          >
            {HERO_BENEFITS.map((benefit, index) => {
              const IconComponent = HERO_BENEFIT_ICONS[index] ?? Check;
              return (
                <li
                  key={benefit}
                  className="inline-flex items-center gap-1.5 sm:gap-2"
                >
                  <IconComponent
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#9A7A4C] shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{benefit}</span>
                </li>
              );
            })}
          </ul>

          {/* Bloque de Precio y Botón Principal de Inscripción */}
          <div className="max-w-2xl mx-auto mb-7 sm:mb-9">
            <p className="text-[15px] sm:text-xl font-extrabold tracking-[0.03em] uppercase text-[#64162D] leading-snug mb-1">
              Accede a toda la formación por{' '}
              <span className="text-[#F05D3D] tabular-nums">
                {siteConfig.offer.formattedPrice}
              </span>
            </p>

            <p className="text-xs sm:text-sm font-medium text-[#5A4F54] mb-3.5 sm:mb-4">
              Pago único <span aria-hidden="true">·</span> Sin mensualidades{' '}
              <span aria-hidden="true">·</span> Acceso de por vida
            </p>

            <div className="flex justify-center">
              <PurchaseButton
                label="Quiero comenzar mi formación"
                location="hero"
                variant="coral"
                className="w-full sm:w-auto sm:min-w-[360px] min-h-[52px] py-3.5 sm:py-4 text-[13.5px] sm:text-sm shadow-md"
                onUnconfiguredCheckout={onUnconfiguredCheckout}
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Video Demostrativo de las Clases */}
        <div
          id="demostracion"
          className="w-full max-w-[940px] mx-auto rounded-lg overflow-hidden border border-[#DEC9A8] bg-[#FFFFFF] shadow-sm scroll-mt-20"
        >
          {/* Encabezado Burdeos Premium del Video */}
          <div className="bg-[#64162D] text-[#FFFFFF] px-4 py-4 sm:px-8 sm:py-5 text-center border-b border-[#DEC9A8]/30">
            <p className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase text-[#DEC9A8] border-b border-[#DEC9A8]/50 pb-1 mb-2">
              Vista previa de la formación
            </p>
            <h2 className="text-base sm:text-2xl font-extrabold tracking-[-0.015em] text-[#FFFFFF] leading-snug">
              Descubre cómo son las clases antes de inscribirte
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm font-normal text-[#FCF6EC]/90 leading-relaxed max-w-2xl mx-auto">
              Conoce por dentro nuestra formación y observa fragmentos reales de
              los procedimientos de sastrería que estudiarás paso a paso.
            </p>
          </div>

          {/* Reproductor de Video Responsive */}
          <div className={containerAspectClass}>
            {isPlaying && parsedVideo.type === 'youtube' && (
              <iframe
                src={parsedVideo.embedUrl}
                title={siteConfig.demoVideo.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {isPlaying && parsedVideo.type === 'vimeo' && (
              <iframe
                src={parsedVideo.embedUrl}
                title={siteConfig.demoVideo.title}
                loading="lazy"
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

          {/* Mensaje de Contexto + Cuadrícula Compacta de 6 Técnicas */}
          <div className="bg-[#FFFDF9] border-t border-[#DEC9A8] px-4 py-4 sm:px-6 sm:py-5">
            <h3 className="text-[15px] sm:text-lg font-extrabold tracking-[-0.015em] text-[#64162D] text-center mb-3.5 sm:mb-4">
              Estas son algunas de las técnicas que aprenderás
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {VIDEO_TECHNIQUES.map((technique, index) => {
                const TechIcon = TECHNIQUE_ICONS[index] ?? Check;
                return (
                  <li
                    key={technique.id}
                    className="flex items-start gap-2.5 rounded-md border border-[#DEC9A8]/85 bg-[#FCF6EC] p-3 text-left"
                  >
                    <span
                      className="w-7 h-7 rounded-md bg-[#64162D] text-[#DEC9A8] inline-flex items-center justify-center shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <TechIcon className="w-3.5 h-3.5" strokeWidth={1.9} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] sm:text-[13px] font-bold text-[#64162D] leading-snug">
                        {technique.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] sm:text-xs leading-relaxed text-[#5A4F54]">
                        {technique.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
