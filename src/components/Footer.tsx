import React from 'react';
import { siteConfig, LegalDocument } from '../config/siteConfig';

interface FooterProps {
  onOpenLegal: (doc: LegalDocument) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { brand, contact, legalDocuments } = siteConfig;
  const hasEmail = Boolean(contact.supportEmail && contact.supportEmail.trim());
  const hasSupportUrl = Boolean(
    contact.supportUrl && /^https?:\/\/.+/i.test(contact.supportUrl.trim())
  );

  const legalList: LegalDocument[] = [
    legalDocuments.terms,
    legalDocuments.privacy,
    legalDocuments.refunds,
    legalDocuments.lifetime,
  ];

  return (
    <footer
      id="footer-principal"
      className="bg-[#4B0F21] text-[#FCF6EC]/85 py-14 sm:py-16 border-t border-[#DEC9A8]/25"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#DEC9A8]/20">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <p className="text-xl font-extrabold text-[#FFFFFF] mb-1.5">
              {brand.name}
            </p>
            <p className="text-sm font-semibold text-[#DEC9A8] mb-3.5">
              {brand.concept}
            </p>
            <p className="text-xs leading-relaxed text-[#FCF6EC]/70 max-w-sm">
              Formación en video en español dedicada al estudio técnico de la
              Sastrería Artesanal Full Canvas y la Sastrería Semiartesanal.
            </p>
          </div>

          {/* Support & Contact Column */}
          <div className="md:col-span-3">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#DEC9A8] mb-3.5">
              Contacto y soporte
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                {hasEmail ? (
                  <a
                    href={`mailto:${contact.supportEmail.trim()}`}
                    className="hover:text-[#DEC9A8] transition-colors break-all"
                  >
                    {contact.supportEmail.trim()}
                  </a>
                ) : (
                  <span className="text-xs text-[#FCF6EC]/65">
                    Correo de contacto configurable en siteConfig.ts
                  </span>
                )}
              </li>
              <li>
                {hasSupportUrl ? (
                  <a
                    href={contact.supportUrl.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DEC9A8] transition-colors"
                  >
                    Centro de soporte
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenLegal(legalDocuments.refunds)}
                    className="text-left hover:text-[#DEC9A8] transition-colors cursor-pointer"
                  >
                    Soporte y atención al estudiante
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Legal Documents Column */}
          <div className="md:col-span-4">
            <p className="text-xs font-bold tracking-[0.12em] uppercase text-[#DEC9A8] mb-3.5">
              Información legal
            </p>
            <ul className="space-y-2.5 text-sm">
              {legalList.map((doc) => (
                <li key={doc.id}>
                  <button
                    type="button"
                    onClick={() => onOpenLegal(doc)}
                    className="text-left hover:text-[#DEC9A8] transition-colors cursor-pointer"
                  >
                    {doc.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#FCF6EC]/65">
          <p>
            © {brand.copyrightYear} {brand.name}. Todos los derechos reservados.
          </p>
          <p className="font-semibold text-[#DEC9A8]">{brand.motto}</p>
        </div>
      </div>
    </footer>
  );
};
