"use client";

import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import ResultsCTA from "./components/ResultsCTA";
import Contact from "./components/Contact";
import Chapters from "./components/Chapters";
import CaseStudies from "./components/CaseStudies";
import TrustSignals from "./components/TrustSignals";
import { useLenis } from "./lib/lenis";

export default function PageClient() {
  useLenis(true);
  return (
    <>
      <main className="site-reveal">
        <Hero />
        <Services />
        <HowItWorks />
        <CaseStudies />
        <TrustSignals />
        <Chapters />
        <ResultsCTA />
        <Contact />
      </main>
    </>
  );
}

