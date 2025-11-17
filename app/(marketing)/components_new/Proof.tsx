"use client";

import { motion } from "framer-motion";

const logos = ["DentaLux Clinics", "Aura Nail Labs", "Forge Athletics", "North & Co. Realty"];
const quotes = [
  {
    quote:
      "“We rebuilt our revenue engine in weeks. From manual handoffs to an AI-enabled pipeline that just works.”",
    author: "Sofia M., Managing Director — DentaLux Clinics",
  },
  {
    quote:
      "“A growth partner who thinks past launch. Every campaign now rolls into numbers the team can act on.”",
    author: "David L., Head of Growth — Forge Athletics",
  },
];

export default function Proof() {
  return (
    <section className="relative py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="flex-1 text-center lg:text-left">
          <span className="tag mb-4">Trusted by operators</span>
          <ul className="mt-6 grid grid-cols-2 gap-4 text-left text-sm text-white/70 sm:grid-cols-4 sm:text-center">
            {logos.map((name, i) => (
              <motion.li
                key={name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-white/5 bg-white/5 px-4 py-5 backdrop-blur-lg transition hover:border-white/15 hover:text-white"
              >
                <p className="font-medium text-white">{name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">Client</p>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex-1 space-y-6 w-full">
          {quotes.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-sm text-white/70 w-full"
            >
              <div className="pointer-events-none absolute -top-16 right-8 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl" />
              <p>{t.quote}</p>
              <footer className="mt-4 text-xs uppercase tracking-[0.3em] text-white/45">{t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}


