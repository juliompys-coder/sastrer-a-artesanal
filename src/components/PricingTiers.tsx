import React from 'react';
import { Lock } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface PricingTiersProps {
  /** 'compact' para la portada (3 columnas horizontales) | 'card' para la tarjeta de inversión */
  layout?: 'compact' | 'card';
  className?: string;
}

export const PricingTiers: React.FC<PricingTiersProps> = ({
  layout = 'card',
  className = '',
}) => {
  const tiers = siteConfig.pricingTiers;

  if (layout === 'compact') {
    return (
      <div
        aria-label="Escala de precios por lotes"
        className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto text-left ${className}`}
      >
        {tiers.map((tier) => {
          const isActive = tier.status === 'active';
          return (
            <div
              key={tier.id}
              className={`rounded-md border px-3.5 py-2.5 transition-colors ${
                isActive
                  ? 'border-[#64162D] bg-[#FFFFFF] shadow-xs ring-1 ring-[#64162D]/15'
                  : 'border-[#DEC9A8] bg-[#FFFDF9]/80 opacity-85'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.08em] ${
                    isActive ? 'text-[#F05D3D]' : 'text-[#9A7A4C]'
                  }`}
                >
                  {tier.name}
                </span>
                {isActive ? (
                  <span className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#FFFFFF] bg-[#64162D] px-1.5 py-0.5 rounded">
                    Actual
                  </span>
                ) : (
                  <Lock
                    className="w-3 h-3 text-[#9A7A4C] shrink-0"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={`text-lg font-extrabold tabular-nums leading-none ${
                    isActive ? 'text-[#64162D]' : 'text-[#5A4F54]'
                  }`}
                >
                  {tier.formattedPrice}
                </span>
                <span className="text-[11px] font-medium text-[#5A4F54] text-right">
                  {tier.range}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      aria-label="Escala de precios por lotes"
      className={`rounded-md border border-[#DEC9A8] bg-[#FFFDF9] p-3.5 ${className}`}
    >
      <p className="text-[11px] font-bold tracking-[0.11em] uppercase text-[#64162D] mb-2.5 text-center">
        Valor por lotes de inscripción
      </p>

      <div className="space-y-2">
        {tiers.map((tier) => {
          const isActive = tier.status === 'active';
          return (
            <div
              key={tier.id}
              className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2.5 ${
                isActive
                  ? 'border-[#64162D] bg-[#64162D] text-[#FFFFFF]'
                  : 'border-[#DEC9A8]/80 bg-[#FCF6EC] text-[#5A4F54]'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  {!isActive && (
                    <Lock
                      className="w-3 h-3 text-[#9A7A4C] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.06em] ${
                      isActive ? 'text-[#DEC9A8]' : 'text-[#64162D]'
                    }`}
                  >
                    {tier.name}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.06em] bg-[#F05D3D] text-[#FFFFFF] px-1.5 py-0.5 rounded">
                      Activo
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] mt-0.5 ${
                    isActive ? 'text-[#FCF6EC]/90' : 'text-[#5A4F54]'
                  }`}
                >
                  {tier.range}
                </p>
              </div>

              <span
                className={`text-base sm:text-lg font-extrabold tabular-nums shrink-0 ${
                  isActive ? 'text-[#FFFFFF]' : 'text-[#342C30]'
                }`}
              >
                {tier.formattedPrice}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
