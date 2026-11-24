import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { LegalDocument } from './config/siteConfig';
import { syncServerPageView } from './utils/metaTracking';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SpecialtiesIntro } from './components/SpecialtiesIntro';
import { LifetimeAccessSection } from './components/LifetimeAccessSection';
import { WorkGallery } from './components/WorkGallery';
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
          {/* 1 y 2. Portada, beneficios, precio + Video demostrativo de las clases */}
          <HeroSection onUnconfiguredCheckout={handleUnconfiguredCheckout} />

          {/* 3. Dos especialidades, 24 módulos desplegables y comparativa contraída */}
          <SpecialtiesIntro
            onUnconfiguredCheckout={handleUnconfiguredCheckout}
          />

          {/* 4. Qué incluye la formación (4 beneficios, libro, cómo estudiar y 3 perfiles) */}
          <LifetimeAccessSection />

          {/* 5. Galería fusionada de trabajos y procedimientos (4 iniciales + ver todos) */}
          <WorkGallery />

          {/* Testimonios verificados (oculto automáticamente mientras no existan testimonios reales) */}
          <Testimonials />

          {/* 6. Oferta transparente e inscripción mediante Whop */}
          <PricingSection onUnconfiguredCheckout={handleUnconfiguredCheckout} />

          {/* 7. Preguntas frecuentes y cierre final */}
          <FAQSection />
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
