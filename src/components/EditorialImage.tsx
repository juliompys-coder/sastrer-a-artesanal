import React, { useState } from 'react';
import { Scissors } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = '',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#64162D] text-[#FCF6EC] p-6 text-center border border-[#DEC9A8]/40 ${className}`}
      >
        <Scissors className="w-6 h-6 text-[#DEC9A8] mb-3" aria-hidden="true" />
        <p className="font-semibold text-base text-[#FFFFFF]">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#4B0F21] ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
};
