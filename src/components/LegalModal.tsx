import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { LegalDocument } from '../config/siteConfig';

interface LegalModalProps {
  document: LegalDocument | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ document, onClose }) => {
  useEffect(() => {
    if (!document) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [document, onClose]);

  if (!document) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#342C30]/75 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#FCF6EC] text-[#342C30] border border-[#DEC9A8] rounded-lg p-7 sm:p-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar documento legal"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-[#5A4F54] hover:text-[#64162D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <p className="text-xs font-semibold tracking-[0.1em] uppercase text-[#9A7A4C] mb-2">
          Información legal configurable
        </p>

        <h3
          id="legal-modal-title"
          className="text-2xl sm:text-3xl font-bold text-[#64162D] mb-4"
        >
          {document.title}
        </h3>

        <p className="text-xs leading-relaxed text-[#5A4F54] bg-[#FFFFFF] border border-[#DEC9A8] rounded-md p-4 mb-6">
          {document.statusNote}
        </p>

        <div className="space-y-5">
          {document.sections.map((section) => (
            <div key={section.heading}>
              <h4 className="text-base font-bold text-[#64162D] mb-1.5">
                {section.heading}
              </h4>
              <p className="text-sm leading-relaxed text-[#5A4F54]">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-5 border-t border-[#DEC9A8] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-[#64162D] text-[#FFFFFF] text-xs font-bold tracking-[0.06em] uppercase rounded-md hover:bg-[#4B0F21] transition-colors cursor-pointer min-h-[44px]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
