"use client";

import { motion } from "framer-motion";

const work = [
  { client: "Nail Lounge Collective", headline: "+142% bookings", tag: "Beauty" },
  { client: "Greenwood Dental", headline: "-36% CPL", tag: "Healthcare" },
  { client: "Forge Athletics", headline: "3.1x ROAS", tag: "Fitness" },
];

export default function WorkReel() {
  return (
    <section className="relative py-24">
      <div className="mx-auto w-full max-w-6xl px-6 text-center lg:px-8">
        <div>
          <span className="tag mb-4">Selected work</span>
          <h2 className="section-heading">Results that compound</h2>
          <p className="section-subtitle">Design + AI + campaigns deployed together for outsized outcomes.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {work.map((w, i) => (
            <motion.article
              key={w.client}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-6 text-left"
            >
              <div className="pointer-events-none absolute -inset-16 -z-10 opacity-25 blur-3xl" />
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{w.tag}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{w.client}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.25em] text-sky-300/90">{w.headline}</p>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs text-white transition hover:bg-white/10"
                >
                  View approach
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}


