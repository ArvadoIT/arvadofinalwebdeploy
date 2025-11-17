"use client";

import { ParallaxY, Reveal } from "../lib/scroll-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMotionSettings } from "./MotionProvider";

const chapters = [
  {
    slug: "strategy",
    label: "Chapter 01",
    title: "Strategy Lab",
    summary:
      "A focused 90-minute workshop defines the opportunity: audience, value props, and the KPIs that matter most to your team.",
    outcomes: ["Persona + pain alignment", "North-star metrics & guardrails", "90-day momentum roadmap"],
    accent:
      "radial-gradient(540px 400px at 20% 25%, rgba(14,165,233,0.28), transparent 65%), radial-gradient(420px 360px at 80% 75%, rgba(20,184,166,0.22), transparent 60%)",
  },
  {
    slug: "design",
    label: "Chapter 02",
    title: "Design Sprints",
    summary:
      "We translate positioning into premium visuals, motion prototypes, and conversion flows so stakeholders can react to the real experience.",
    outcomes: ["Interactive Figma system", "Copy + offer hierarchy", "Motion language + aura states"],
    accent:
      "radial-gradient(520px 380px at 25% 30%, rgba(20,184,166,0.22), transparent 65%), radial-gradient(380px 320px at 70% 70%, rgba(56,189,248,0.25), transparent 60%)",
  },
  {
    slug: "build",
    label: "Chapter 03",
    title: "Build & Automate",
    summary:
      "Developers and automation specialists ship production-grade systems: lightning-fast Next.js, CRM bridges, and AI agents that feel on-brand.",
    outcomes: ["Next.js 14 + Tailwind implementation", "AI concierge & ops automations", "Analytics + attribution wiring"],
    accent:
      "radial-gradient(520px 380px at 30% 30%, rgba(56,189,248,0.28), transparent 65%), radial-gradient(420px 320px at 70% 70%, rgba(20,184,166,0.22), transparent 60%)",
  },
  {
    slug: "launch",
    label: "Chapter 04",
    title: "Launch & Scale",
    summary:
      "We move into experimentation mode with weekly growth sprints, CRO, and paid media iterations that build compounding wins.",
    outcomes: ["Go-live + QA checklist", "Test backlog & reporting cadence", "Paid + lifecycle campaigns activated"],
    accent:
      "radial-gradient(520px 380px at 70% 30%, rgba(56,189,248,0.26), transparent 65%), radial-gradient(420px 320px at 30% 70%, rgba(20,184,166,0.22), transparent 60%)",
  },
] as const;

export default function Chapters() {
  const { reduceMotion } = useMotionSettings();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section aria-labelledby="chapters-heading" className="relative overflow-hidden">
      {/* left progress rail */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-0 z-10 hidden h-full w-px bg-white/10 md:block"
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-0 z-10 hidden w-px bg-sky-400 md:block"
        style={reduceMotion ? undefined : { height: progressHeight }}
      />
      <div ref={containerRef} className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <span className="tag mb-4">Method</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id="chapters-heading" className="section-heading">
            Four-part launch spine
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="section-subtitle">
            Each chapter is run by a cross-functional pod so you never lose momentum between strategy, visuals, build, and growth.
          </p>
        </Reveal>
      </div>

      <ol className="snap-y">
        {chapters.map((chapter, index) => (
          <li
            key={chapter.slug}
            className="snap-start"
            aria-label={`${chapter.label}: ${chapter.title}`}
          >
            <div className="relative grid min-h-screen place-items-center px-6 py-16 sm:py-24 lg:px-12">
              <motion.div
                className="glass-panel relative w-full max-w-5xl overflow-hidden rounded-4xl border border-white/10 bg-white/5 px-8 py-12 text-left md:px-12 md:py-16"
                initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.9, delay: index * 0.02 }}
              >
                <div
                  className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl"
                  style={{ background: chapter.accent }}
                />
                <div className="grid gap-10 md:grid-cols-[0.4fr_minmax(0,1fr)] md:gap-14">
                  <div className="flex flex-col gap-6">
                    <ParallaxY from={24} to={-24}>
                      <span className="font-orbitron text-6xl uppercase tracking-[0.4em] text-white/10">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </ParallaxY>
                    <Reveal delay={0.06}>
                      <div className="space-y-3">
                        <span className="text-xs uppercase tracking-[0.35em] text-white/50">{chapter.label}</span>
                        <h3 className="text-2xl font-semibold text-white md:text-3xl">{chapter.title}</h3>
                      </div>
                    </Reveal>
                  </div>
                  <div className="space-y-8">
                    <Reveal delay={0.12}>
                      <p className="text-base text-white/75 md:text-lg">{chapter.summary}</p>
                    </Reveal>
                    <Reveal delay={0.18}>
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.3em] text-white/45">What you leave with</h4>
                        <ul className="mt-4 space-y-3 text-sm text-white/70">
                          {chapter.outcomes.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                    {index === chapters.length - 1 && (
                      <Reveal delay={0.24}>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                          <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                          >
                            Plan my launch roadmap
                          </a>
                          <a
                            href="mailto:team@arvado.ca"
                            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10"
                          >
                            Ask about retainers
                          </a>
                        </div>
                      </Reveal>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
