"use client";

import { motion } from "framer-motion";
import { Reveal, ParallaxY } from "../lib/scroll-motion";
import HeroR3FAmbient from "./HeroR3FAmbient";
import MaskedHeadline from "./MaskedHeadline";

export default function Hero(){
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <HeroR3FAmbient />
      <div className="pointer-events-none absolute -inset-32 -z-10 blur-3xl opacity-30"
        style={{background:"radial-gradient(1000px 600px at 60% 40%, rgba(14,165,233,0.22), transparent 60%), radial-gradient(800px 400px at 30% 70%, rgba(139,92,246,0.15), transparent 60%)"}} />
      <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-8">
        <ParallaxY from={-12} to={6}>
          <motion.span initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            Websites • AI Receptionists • SEO • Facebook Ads
          </motion.span>
        </ParallaxY>
        <Reveal>
          <h1 className="mt-6 font-orbitron tracking-widest uppercase text-white text-[clamp(2.25rem,2.5vw+1rem,4rem)] leading-tight">
            <MaskedHeadline>Build Faster. Look Premium. Grow Smarter.</MaskedHeadline>
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Conversion-first design with calm, luxury motion—results without the noise.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="rounded-2xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400 transition-colors">
              Get a Proposal
            </a>
            <a href="#services" className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white hover:bg-white/10 transition-colors">
              See Services
            </a>
          </div>
        </Reveal>
      </div>
      <div className="h-8 md:h-12" />
    </section>
  );
}

