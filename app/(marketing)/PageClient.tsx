"use client";

import { useEffect } from "react";
import { useLenis } from "./lib/lenis";
import { getLenisInstance } from "./lib/lenis";
import { MotionProvider } from "./components/MotionProvider";
import Navigation from "./components/Navigation";
import StickyCTA from "./components/StickyCTA";
import BookCallDock from "./components/BookCallDock";
import CinematicHero from "./components_new/CinematicHero";
import ValueGrid from "./components_new/ValueGrid";
import LaunchSequence from "./components_new/LaunchSequence";
import CTA from "./components_new/CTA";
import ContactSimple from "./components_new/ContactSimple";

export default function PageClient() {
  useLenis(true);

  // Scroll to top on page refresh/load
  useEffect(() => {
    // Wait for Lenis to be initialized, then scroll to top
    const scrollToTop = () => {
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        // Fallback to native scroll
        window.scrollTo(0, 0);
      }
    };

    // Try immediately
    scrollToTop();

    // Also try after a short delay to ensure Lenis is initialized
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <MotionProvider>
      <Navigation />
      <div className="pt-16 w-full overflow-x-hidden">
        <CinematicHero />
        <section id="services">
          <ValueGrid />
        </section>
        <LaunchSequence />
        <CTA />
        <ContactSimple />
      </div>
      <StickyCTA />
      <BookCallDock />
    </MotionProvider>
  );
}
 
