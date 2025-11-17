"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, ParallaxY, StickyChapter } from "../lib/scroll-motion";
import HeroR3FAmbient from "./HeroR3FAmbient";
import MaskedHeadline from "./MaskedHeadline";
import { useRef } from "react";
import { useMotionSettings } from "./MotionProvider";

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { reduceMotion } = useMotionSettings();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const logoOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.08, 0.06, 0.04]);
  const headlineY = useTransform(scrollYProgress, [0, 0.5], [0, -32]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const ctaOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.25, 0.55], [12, 0]);

  return (
    <StickyChapter heightVh={160} className="overflow-hidden">
      <section ref={ref} className="relative w-full pt-28 md:pt-36">
        <HeroR3FAmbient />

        <div className="mx-auto w-full max-w-7xl px-6 text-center lg:px-8">
          <ParallaxY from={-8} to={6}>
            <motion.span
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
            >
              Premium Websites • AI Assistants • SEO • Paid Media
            </motion.span>
          </ParallaxY>

          <Reveal>
            <motion.h1
              className="mt-6 font-orbitron tracking-widest uppercase text-white text-[clamp(2.25rem,2.5vw+1rem,4rem)] leading-tight"
              style={reduceMotion ? undefined : { y: headlineY, opacity: headlineOpacity }}
            >
              <MaskedHeadline>Build Faster. Look Premium. Grow Smarter.</MaskedHeadline>
            </motion.h1>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-white/70 max-w-2xl mx-auto">
              Conversion-first design with calm, cinematic motion—results without the noise.
            </p>
          </Reveal>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={reduceMotion ? undefined : { opacity: ctaOpacity, y: ctaY }}
          >
            <a
              href="#contact"
              className="rounded-2xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-colors hover:bg-sky-400"
            >
              Book a call
            </a>
            <a
              href="#services"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
            >
              Explore services
            </a>
          </motion.div>
        </div>
        <div className="h-8 md:h-12" />
      </section>
    </StickyChapter>
  );
}

