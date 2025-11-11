"use client";

import { motion } from "framer-motion";
import { Reveal, ParallaxY } from "../lib/scroll-motion";

const stages = [
  {
    label: "01 / Discovery Lab",
    headline: "Align on goals, brand voice, and success metrics.",
    detail: "A collaborative workshop to map customer journey pain points, define differentiation, and outline KPIs.",
  },
  {
    label: "02 / Prototyping",
    headline: "Rapid visuals mixed with live data and AI flows.",
    detail: "Interactive prototypes reveal the full experience early, so stakeholders sign off with confidence.",
  },
  {
    label: "03 / Build & Automate",
    headline: "Production-ready Next.js systems with AI touchpoints.",
    detail: "We develop, integrate, and QA everything—from site performance to agent handoffs and analytics.",
  },
  {
    label: "04 / Launch & Scale",
    headline: "Optimization loops, growth campaigns, and reporting.",
    detail: "After launch we run data-backed experiments and evolve creative, offers, and media weekly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="tag mb-4">Process</span>
          <h2 className="section-heading">How we ship momentum</h2>
          <p className="section-subtitle">
            A hybrid team of strategists, designers, engineers, and growth operators aligned to move fast.
          </p>
        </Reveal>
        <div className="mt-16 space-y-12">
          {stages.map((stage, index) => (
            <div key={stage.label} className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 px-6 py-10 md:px-10">
              <ParallaxY from={12} to={-12}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-xs uppercase tracking-[0.3em] text-white/50">{stage.label}</span>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{stage.headline}</h3>
                  <p className="mt-3 text-sm text-white/70 md:text-base">{stage.detail}</p>
                </motion.div>
              </ParallaxY>
              <motion.div
                className="absolute inset-y-0 right-0 w-1/3 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(56,189,248,0.25), transparent 60%)",
                }}
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

