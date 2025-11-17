"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { StickyChapter } from "../lib/scroll-motion";

const slides = [
  { k: "Nail Lounge", result: "+142% bookings", copy: "AI receptionist + site refresh → more calls converted." },
  { k: "Dental Studio", result: "-36% CPA", copy: "SEO + FB Ads creative iteration → cheaper leads." },
  { k: "Local Gym", result: "3.1x ROAS", copy: "Landing page testing + paid-social optimization." },
];

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value < 0.33) setActive(0);
      else if (value < 0.66) setActive(1);
      else setActive(2);
    });
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  return (
    <StickyChapter heightVh={260}>
      <motion.div ref={containerRef} className="mx-auto max-w-4xl px-6">
        <div className="mb-8 text-center">
          <h2 className="font-orbitron text-3xl uppercase tracking-[0.4em] text-white md:text-4xl">Selected Results</h2>
          <p className="mt-3 text-white/60">Sticky case studies that reveal as you scroll past each chapter.</p>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="grid md:grid-cols-2">
            <div className="relative p-8">
              {slides.map((s, i) => (
                <motion.div
                  key={s.k}
                  animate={{ opacity: active === i ? 1 : 0, y: active === i ? 0 : 16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute md:static grid gap-3"
                >
                  <span className="text-sm uppercase tracking-[0.3em] text-white/40">{s.k}</span>
                  <span className="text-2xl font-semibold text-white">{s.result}</span>
                  <p className="text-sm text-white/70">{s.copy}</p>
                </motion.div>
              ))}
            </div>
            <div className="relative min-h-[300px] md:min-h-[420px]">
              {[0, 1, 2].map((n) => (
                <motion.div
                  key={n}
                  className="absolute inset-0"
                  animate={{ opacity: active === n ? 1 : 0, scale: active === n ? 1 : 0.94 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="h-full w-full rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,.25),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,.25),transparent_60%)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </StickyChapter>
  );
}
// AUTO-GENERATED TEMP PLACEHOLDER. Replace with real implementation.
