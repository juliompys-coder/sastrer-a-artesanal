import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { LegalDocument } from './config/siteConfig';
import { syncServerPageView } from './utils/metaTracking';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { FullCanvasSection } from './components/FullCanvasSection';
import { SemiArtisanalSection } from './components/SemiArtisanalSection';
import { SpecialtiesIntro } from './components/SpecialtiesIntro';
import { ComparisonSection } from './components/ComparisonSection';
import { CraftDetailsGallery } from './components/CraftDetailsGallery';
import { ComplimentaryBook } from './components/ComplimentaryBook';
import { LifetimeAccessSection } from './components/LifetimeAccessSection';
import { WorkGallery } from './components/WorkGallery';
import { AudienceSection } from './components/AudienceSection';
import { Testimonials } from './components/Testimonials';
import { PricingSection } from './components/PricingSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobilePurchaseBar } from './components/MobilePurchaseBar';
import { CheckoutConfigModal } from './components/CheckoutConfigModal';
import { LegalModal } from './components/LegalModal';

export function App() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocument | null>(
    null
  );

  useEffect(() => {
    syncServerPageView();
  }, []);

  const handleUnconfiguredCheckout = () => {
    setCheckoutModalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FCF6EC] text-[#342C30]">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F05D3D] focus:text-[#FFFFFF] focus:text-sm focus:font-bold focus:rounded-md"
        >
          Ir al contenido principal
        </a>

        <Header onUnconfiguredCheckout={handleUnconfiguredCheckout} />

        <main id="contenido-principal" className="flex-1">
          {/* 1. Portada (Crema + Video protagonista) */}
          <HeroSection onUnconfiguredCheckout={handleUnconfiguredCheckout} />

          {/* 2. Presentación de la técnica + Aprende desde cero (Burdeos) */}
          <CraftsmanshipSection />

          {/* 3. Contenido de los cursos en acordeones de 2 columnas (Rosa empolvado) */}
          <FullCanvasSection />
          <SemiArtisanalSection
            onUnconfiguredCheckout={handleUnconfiguredCheckout}
          />

          {/* 4. Qué recibirá el estudiante (Crema + Franja burdeos resumen + Galería) */}
          <SpecialtiesIntro />
          <ComparisonSection />
          <CraftDetailsGallery />
          <ComplimentaryBook />
          <LifetimeAccessSection />
          <WorkGallery />

          {/* 5. Para quién es la formación (Rosa empolvado) */}
          <AudienceSection
            onUnconfiguredCheckout={handleUnconfiguredCheckout}
          />

          {/* 6. Testimonios verificados (Crema — oculto hasta incorporar testimonios reales) */}
          <Testimonials />

          {/* 7. Precio e inscripción (Burdeos + Tarjeta grande crema) */}
          <PricingSection onUnconfiguredCheckout={handleUnconfiguredCheckout} />

          {/* 8. Preguntas frecuentes (Rosa empolvado) */}
          <FAQSection />

          {/* 9. Cierre final (Burdeos) */}
          <FinalCTA onUnconfiguredCheckout={handleUnconfiguredCheckout} />
        </main>

        <Footer onOpenLegal={setActiveLegalDoc} />

        <MobilePurchaseBar
          onUnconfiguredCheckout={handleUnconfiguredCheckout}
        />

        <CheckoutConfigModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
        />

        <LegalModal
          document={activeLegalDoc}
          onClose={() => setActiveLegalDoc(null)}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
