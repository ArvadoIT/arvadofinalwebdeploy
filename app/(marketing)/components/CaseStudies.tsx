"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { StickyChapter } from "../lib/scroll-motion";

const caseStudies = [
  {
    client: "Nail Lounge Collective",
    industry: "Beauty Studios",
    headline: "+142% bookings in 45 days",
    summary:
      "Rebuilt the site with pre-book flows, launched an AI receptionist, and synced CRM automations to stop leads from leaking.",
    highlights: [
      "AI phone + chat concierge with bilingual hand-off to staff",
      "Upsell-ready booking flow grew average order value by 28%",
      "Weekly campaign dashboards surfaced idle stylists in advance",
    ],
    gradient:
      "radial-gradient(circle at 30% 20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(6,182,212,0.32), transparent 65%)",
  },
  {
    client: "Greenwood Dental Studio",
    industry: "Dental Practices",
    headline: "-36% cost per lead",
    summary:
      "Mapped the full patient journey, produced authority-building content, and iterated Meta + Google Ads creative every week.",
    highlights: [
      "SEO pillar content lifted organic new-patient calls by 58%",
      "Local service ads plus reviews workflow secured top 3 map-pack spot",
      "Lead scoring routed high-intent Invisalign prospects straight to calendar",
    ],
    gradient:
      "radial-gradient(circle at 20% 30%, rgba(14,165,233,0.33), transparent 55%), radial-gradient(circle at 80% 75%, rgba(236,72,153,0.28), transparent 65%)",
  },
  {
    client: "Forge Athletics",
    industry: "Gyms & Studios",
    headline: "3.1x paid media ROAS",
    summary:
      "Launched a modular landing system, automated trials-to-membership nurturing, and dialed in audience expansion with creative sprints.",
    highlights: [
      "Dynamic offers matched to first-party audience cohorts",
      "Lifecycle email + SMS sequence converted 41% of trials to members",
      "Daily pacing guardrails protected CAC during seasonal spikes",
    ],
    gradient:
      "radial-gradient(circle at 25% 25%, rgba(236,72,153,0.32), transparent 60%), radial-gradient(circle at 70% 70%, rgba(56,189,248,0.3), transparent 65%)",
  },
] as const;

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const [active, setActive] = useState(0);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

  const activeStudy = caseStudies[active] ?? caseStudies[0];
  const navLabel = useMemo(() => caseStudies.map((study) => study.client), []);

  return (
    <StickyChapter heightVh={260}>
      <motion.section ref={containerRef} className="mx-auto max-w-5xl px-6">
        <header className="mb-10 text-center">
          <h2 className="font-orbitron text-3xl uppercase tracking-[0.4em] text-white md:text-4xl">
            Selected Outcomes
          </h2>
          <p className="mt-3 text-white/60">
            Scroll (or tap) through a few examples of how we deploy design, AI, and campaigns together.
          </p>
          <div className="relative mx-auto mt-6 h-1 w-full max-w-md overflow-hidden rounded-full bg-white/10">
            <motion.span className="absolute inset-y-0 left-0 rounded-full bg-sky-400/70" style={{ width: progressWidth }} />
          </div>
        </header>

        <div className="glass-panel relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-8 md:p-10">
          <motion.div
            aria-live="polite"
            className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl"
            style={{ background: activeStudy.gradient }}
            key={activeStudy.client}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStudy.client}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-10 md:grid-cols-[1.15fr_minmax(0,1fr)] md:gap-12"
            >
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.35em] text-white/50">{activeStudy.industry}</span>
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">{activeStudy.client}</h3>
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300/90">{activeStudy.headline}</p>
                </div>
                <p className="text-base text-white/75">{activeStudy.summary}</p>
                <ul className="space-y-3 text-sm text-white/70">
                  {activeStudy.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.div
                initial={{ opacity: 0.6, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 shadow-[0_0_120px_rgba(14,165,233,0.12)]"
              >
                <div>
                  <h4 className="text-sm uppercase tracking-[0.3em] text-white/40">Playbook Snapshot</h4>
                  <dl className="mt-6 space-y-4 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-white/60">Core services</dt>
                      <dd className="text-right text-white/90">
                        {active === 0 && "AI Reception • Full-site redesign"}
                        {active === 1 && "SEO + CRO • Paid media • Reviews Ops"}
                        {active === 2 && "Paid social • Landing systems • Lifecycle"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-white/60">Timeline</dt>
                      <dd className="text-right text-white/90">
                        {active === 0 && "Launch in 6 weeks"}
                        {active === 1 && "First 90-day program"}
                        {active === 2 && "12-week rollout"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-white/60">Ops automations</dt>
                      <dd className="text-right text-white/90">
                        {active === 0 && "CRM + waitlist sync"}
                        {active === 1 && "Lead scoring & routing"}
                        {active === 2 && "Trial nurture journeys"}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-5 text-sm text-white/70">
                  <p>
                    “The Arvado team blends top-tier creative with a partner mentality. We went from guessing to growing on
                    purpose.”
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/40">Client feedback, anonymized</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <nav
            aria-label="Select case study"
            className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.28em]"
          >
            {caseStudies.map((study, index) => {
              const isActive = index === active;
              return (
                <button
                  key={study.client}
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className={`rounded-full border px-4 py-2 transition ${
                    isActive
                      ? "border-sky-400/80 bg-sky-500/10 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Show results for ${study.client}`}
                >
                  {navLabel[index]}
                </button>
              );
            })}
          </nav>
        </div>
      </motion.section>
    </StickyChapter>
  );
}
