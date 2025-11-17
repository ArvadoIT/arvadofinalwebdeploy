"use client";

import { Reveal, SectionFade } from "../lib/scroll-motion";

const clients = [
  { name: "DentaLux Clinics", tag: "Healthcare" },
  { name: "Aura Nail Labs", tag: "Beauty" },
  { name: "Forge Athletics", tag: "Fitness" },
  { name: "North & Co. Realty", tag: "Real Estate" },
] as const;

const testimonials = [
  {
    quote:
      "“Arvado rebuilt our entire revenue engine in weeks. We went from manual handoffs to a full AI-enabled pipeline.”",
    author: "Sofia M., Managing Director",
    company: "DentaLux Clinics",
  },
  {
    quote:
      "“We finally have a growth partner who thinks past the launch. Every campaign now rolls into hard numbers the team can act on.”",
    author: "David L., Head of Growth",
    company: "Forge Athletics",
  },
] as const;

export default function TrustSignals() {
  return (
    <section className="relative py-20">
      <SectionFade>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div className="flex-1">
          <Reveal>
            <span className="tag mb-4">Trusted by operators hitting aggressive targets</span>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="grid grid-cols-2 gap-4 text-left text-sm text-white/70 sm:grid-cols-4 sm:text-center">
              {clients.map((client) => (
                <li
                  key={client.name}
                  className="rounded-2xl border border-white/5 bg-white/5 px-4 py-5 backdrop-blur-lg transition hover:border-white/15 hover:text-white"
                >
                  <p className="font-medium text-white">{client.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/40">{client.tag}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="flex-1 space-y-6">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.author} delay={index * 0.08}>
              <blockquote className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-sm text-white/70">
                <div className="pointer-events-none absolute -top-16 right-8 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl" />
                <p>{testimonial.quote}</p>
                <footer className="mt-4 text-xs uppercase tracking-[0.3em] text-white/45">
                  {testimonial.author} — {testimonial.company}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
      </SectionFade>
    </section>
  );
}


