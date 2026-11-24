import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CHECKOUT_URL } from '../config/siteConfig';
import {
  CheckoutButtonLocation,
  trackInitiateCheckout,
} from '../utils/metaTracking';

interface PurchaseButtonProps {
  label: string;
  onUnconfiguredCheckout: () => void;
  location?: CheckoutButtonLocation;
  ariaLabel?: string;
  variant?: 'coral' | 'compact';
  fullWidth?: boolean;
  className?: string;
}

export const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  label,
  onUnconfiguredCheckout,
  location,
  ariaLabel,
  variant = 'coral',
  fullWidth = false,
  className = '',
}) => {
  const isConfigured =
    typeof CHECKOUT_URL === 'string' &&
    /^https?:\/\/.+/i.test(CHECKOUT_URL.trim());

  const variantClasses =
    variant === 'compact'
      ? 'bg-[#F05D3D] text-[#FFFFFF] hover:bg-[#D94C2D] active:bg-[#C64224] px-4 sm:px-5 py-2.5 text-xs font-bold tracking-[0.04em] uppercase rounded-md shadow-xs whitespace-nowrap'
      : 'bg-[#F05D3D] text-[#FFFFFF] hover:bg-[#D94C2D] active:bg-[#C64224] px-5 sm:px-7 py-3.5 sm:py-4 text-[13px] sm:text-sm font-bold tracking-[0.04em] uppercase rounded-md shadow-sm text-center leading-snug sm:whitespace-nowrap';

  const baseClasses = `inline-flex items-center justify-center gap-2 transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#64162D] max-w-full cursor-pointer min-h-[46px] ${
    fullWidth ? 'w-full' : ''
  } ${variantClasses} ${className}`;

  const handleTrackCheckout = () => {
    trackInitiateCheckout(location);
  };

  if (isConfigured) {
    return (
      <a
        href={CHECKOUT_URL.trim()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        onClick={handleTrackCheckout}
        className={baseClasses}
      >
        <span>{label}</span>
        <ArrowRight
          className="w-4 h-4 shrink-0"
          strokeWidth={2.25}
          aria-hidden="true"
        />
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onUnconfiguredCheckout}
      className={baseClasses}
    >
      <span>{label}</span>
      <ArrowRight
        className="w-4 h-4 shrink-0"
        strokeWidth={2.25}
        aria-hidden="true"
      />
    </button>
  );
};
