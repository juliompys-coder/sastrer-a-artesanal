import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { useScarcitySpots } from '../hooks/useScarcitySpots';

interface ScarcityCounterProps {
  /** 'light' para fondos crema (#FCF6EC / #FFFDF9), 'dark' para fondos burdeos (#64162D) */
  variant?: 'light' | 'dark';
  className?: string;
}

export const ScarcityCounter: React.FC<ScarcityCounterProps> = ({
  variant = 'light',
  className = '',
}) => {
  const { spotsLeft, filledPercentage } = useScarcitySpots();
  const prevSpotsRef = useRef<number>(spotsLeft);
  const [justDropped, setJustDropped] = useState(false);

  useEffect(() => {
    if (spotsLeft < prevSpotsRef.current) {
      setJustDropped(true);
      const id = window.setTimeout(() => setJustDropped(false), 1200);
      prevSpotsRef.current = spotsLeft;
      return () => window.clearTimeout(id);
    }
    prevSpotsRef.current = spotsLeft;
  }, [spotsLeft]);

  const isDark = variant === 'dark';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`rounded-md border px-4 py-3 text-center transition-colors duration-300 ${
        isDark
          ? justDropped
            ? 'border-[#F05D3D] bg-[#4B0F21]'
            : 'border-[#DEC9A8]/45 bg-[#4B0F21]/85'
          : justDropped
            ? 'border-[#F05D3D] bg-[#FFF5F2]'
            : 'border-[#DEC9A8] bg-[#FFFDF9]'
      } ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        <span
          className="relative flex h-2.5 w-2.5 shrink-0"
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F05D3D] opacity-70" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F05D3D]" />
        </span>

        <p
          className={`text-xs sm:text-[13px] font-bold leading-snug ${
            isDark ? 'text-[#FFFFFF]' : 'text-[#64162D]'
          }`}
        >
          Solo{' '}
          <span
            className={`inline-block font-extrabold tabular-nums transition-transform duration-300 ${
              justDropped ? 'scale-115' : 'scale-100'
            } ${isDark ? 'text-[#F05D3D]' : 'text-[#F05D3D]'}`}
          >
            {spotsLeft}
          </span>{' '}
          cupos disponibles del lote actual
        </p>
      </div>

      {/* Barra de ocupación del primer lote */}
      <div
        className={`mt-2.5 h-1.5 w-full overflow-hidden rounded-full ${
          isDark ? 'bg-[#FFFFFF]/15' : 'bg-[#EAD5D7]'
        }`}
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-[#F05D3D] transition-all duration-700 ease-out"
          style={{ width: `${filledPercentage}%` }}
        />
      </div>

      <p
        className={`mt-2 text-[11px] font-medium leading-snug ${
          isDark ? 'text-[#FCF6EC]/80' : 'text-[#5A4F54]'
        }`}
      >
        Lote 1 a{' '}
        <strong className={isDark ? 'text-[#DEC9A8]' : 'text-[#64162D]'}>
          {siteConfig.offer.formattedPrice}
        </strong>{' '}
        <span aria-hidden="true">·</span> Al completarse, el siguiente lote
        sube a{' '}
        <strong className={isDark ? 'text-[#FFFFFF]' : 'text-[#342C30]'}>
          {siteConfig.scarcity.nextBatchPrice}
        </strong>
        .
      </p>
    </div>
  );
};
