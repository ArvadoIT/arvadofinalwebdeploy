"use client";

import { useEffect, Suspense, lazy, useState } from "react";
import { useLenis } from "./lib/lenis";
import { getLenisInstance } from "./lib/lenis";
import { MotionProvider } from "./components/MotionProvider";
import Navigation from "./components/Navigation";
import StickyCTA from "./components/StickyCTA";
import BookCallDock from "./components/BookCallDock";
import ScrollProgress from "./components/ScrollProgress";
import CinematicHero from "./components_new/CinematicHero";
import LaunchSequence from "./components_new/LaunchSequence";
import Contact from "./components/Contact";
import LazyLoadSection from "./components/LazyLoadSection";
import Perspective3DShowcase from "./components_new/Perspective3DShowcase";

// Lazy load heavy 3D components for better performance
const ServiceGlobe = lazy(() => import("./components_new/ServiceGlobe"));

export default function PageClient() {
  const [isReady, setIsReady] = useState(false);
  useLenis(true);

  // Optimized scroll to top on page refresh/load - prevents glitchy reload
  useEffect(() => {
    // Prevent flash of unstyled content and ensure smooth initial load
    const init = () => {
      const lenis = getLenisInstance();
      if (lenis) {
        // Use immediate scroll to prevent visual glitch
        lenis.scrollTo(0, { immediate: true });
        // Mark as ready after a brief delay to ensure everything is initialized
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      } else {
        // Fallback to native scroll
        window.scrollTo(0, 0);
        setIsReady(true);
      }
    };

    // Use requestAnimationFrame for smoother initialization
    requestAnimationFrame(init);
  }, []);

  return (
    <MotionProvider>
      <ScrollProgress />
      <Navigation />
      <div className="pt-16 w-full overflow-x-hidden">
        <CinematicHero />
        <LazyLoadSection>
          <Suspense fallback={null}>
            <ServiceGlobe />
          </Suspense>
        </LazyLoadSection>
        <LaunchSequence />
        <Perspective3DShowcase />
        <LazyLoadSection>
          <Contact />
        </LazyLoadSection>
      </div>
      <StickyCTA />
      <BookCallDock />
    </MotionProvider>
  );
}
 
