import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { PurchaseButton } from './PurchaseButton';

interface HeaderProps {
  onUnconfiguredCheckout: () => void;
}

const NAV_LINKS = [
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#que-recibiras', label: 'Qué incluye' },
  { href: '#trabajos-reales', label: 'Galería' },
  { href: '#preguntas', label: 'Preguntas' },
];

export const Header: React.FC<HeaderProps> = ({ onUnconfiguredCheckout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#FCF6EC]/96 backdrop-blur-sm border-b border-[#DEC9A8]">
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8 h-16 sm:h-[74px] flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark on the left */}
        <a
          href="#inicio"
          className="text-lg sm:text-xl font-extrabold tracking-[-0.02em] text-[#64162D] hover:text-[#4B0F21] transition-colors whitespace-nowrap shrink-0"
        >
          {siteConfig.brand.name}
        </a>

        {/* Zone 2: Centered Navigation Links */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#342C30]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#64162D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#F05D3D]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Coral Primary CTA on the right + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <PurchaseButton
              label={`Inscribirme · ${siteConfig.offer.formattedPrice}`}
              location="header"
              variant="compact"
              onUnconfiguredCheckout={onUnconfiguredCheckout}
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-[#64162D] hover:bg-[#EAD5D7]/50 rounded-md transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#FCF6EC] border-t border-[#DEC9A8] px-5 py-6 shadow-md"
        >
          <nav
            aria-label="Navegación móvil"
            className="flex flex-col divide-y divide-[#DEC9A8]/60"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-base font-semibold text-[#342C30] hover:text-[#64162D] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#inversion"
              onClick={() => setMobileOpen(false)}
              className="py-3.5 text-base font-bold text-[#64162D]"
            >
              Inversión ({siteConfig.offer.formattedPrice})
            </a>
          </nav>

          <div className="mt-5 pt-5 border-t border-[#DEC9A8] sm:hidden">
            <PurchaseButton
              label="Quiero comenzar mi formación"
              location="header_mobile"
              variant="coral"
              fullWidth
              onUnconfiguredCheckout={() => {
                setMobileOpen(false);
                onUnconfiguredCheckout();
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
};
