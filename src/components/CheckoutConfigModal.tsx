import React, { useEffect } from 'react';
import { X, Settings2 } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface CheckoutConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutConfigModal: React.FC<CheckoutConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#342C30]/75 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-config-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FCF6EC] text-[#342C30] border border-[#DEC9A8] rounded-lg p-7 sm:p-9 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar aviso de configuración"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#5A4F54] hover:text-[#64162D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[#64162D] mb-2.5">
          <Settings2 className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Estado de configuración de pago</span>
        </div>

        <h3
          id="checkout-config-title"
          className="text-2xl font-bold text-[#64162D] leading-tight mb-4"
        >
          Enlace de checkout pendiente de configuración
        </h3>

        <p className="text-sm leading-relaxed text-[#5A4F54] mb-5">
          Esta página no simula pagos ni recolecta datos de tarjetas. Todos los
          botones de inscripción están conectados a la constante{' '}
          <code className="font-mono text-xs bg-[#FFFFFF] border border-[#DEC9A8] rounded-xs px-1.5 py-0.5 text-[#64162D]">
            CHECKOUT_URL
          </code>{' '}
          en{' '}
          <code className="font-mono text-xs bg-[#FFFFFF] border border-[#DEC9A8] rounded-xs px-1.5 py-0.5 text-[#64162D]">
            src/config/siteConfig.ts
          </code>
          .
        </p>

        <div className="border-t border-b border-[#DEC9A8] py-4 mb-6 space-y-2.5 text-sm text-[#342C30]">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[#5A4F54]">Formación seleccionada</span>
            <span className="font-semibold text-right">
              Full Canvas + Semiartesanal + Libro de cortesía
            </span>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[#5A4F54]">Inversión única configurada</span>
            <span className="text-xl font-extrabold text-[#64162D] tabular-nums">
              {siteConfig.offer.formattedPrice} ({siteConfig.offer.currency})
            </span>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-[#5A4F54] mb-6">
          Para activar la compra real, asigna la URL de tu pasarela externa
          segura (por ejemplo Hotmart, Stripe Checkout o PayPal) a{' '}
          <code className="font-mono text-[#64162D]">CHECKOUT_URL</code>.
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-[#64162D] text-[#FFFFFF] text-xs font-bold tracking-[0.06em] uppercase rounded-md hover:bg-[#4B0F21] transition-colors cursor-pointer min-h-[44px]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
