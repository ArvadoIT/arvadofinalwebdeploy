"use client";

import { motion } from "framer-motion";
import { Sparkles, Cpu, LineChart, Workflow } from "lucide-react";
import { Reveal } from "../lib/scroll-motion";

const services = [
  {
    icon: Sparkles,
    title: "Premium Web Experiences",
    copy: "Design systems, conversion-focused copy, elite polish—shipped in weeks, not quarters.",
    bullets: ["Next.js + Tailwind build", "SEO-ready architecture", "Performance tuned"],
  },
  {
    icon: Cpu,
    title: "AI Assistants & Automations",
    copy: "Custom agents that book appointments, qualify leads, and integrate with your existing stack.",
    bullets: ["Voice + chat receptionists", "CRM & calendar sync", "Analytics dashboards"],
  },
  {
    icon: LineChart,
    title: "Growth Campaigns",
    copy: "Paid social, local SEO, and reputation management engineered for consistent pipeline growth.",
    bullets: ["Meta & Google Ads", "Localized SEO playbooks", "Content & reviews ops"],
  },
  {
    icon: Workflow,
    title: "Lifecycle Systems",
    copy: "Automated onboarding, loyalty, and referral flows that retain and re-engage clients.",
    bullets: ["Email & SMS journeys", "Insight reporting", "Revenue attribution"],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <Reveal className="text-center">
          <span className="tag mb-4">Services</span>
          <h2 className="section-heading">Full-stack growth playbooks</h2>
          <p className="section-subtitle">
            One partner across web, AI, and performance to keep velocity high and ops effortless.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <Reveal key={service.title} className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10">
                  <service.icon className="h-6 w-6 text-sky-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm text-white/70">{service.copy}</p>
                <ul className="mt-6 space-y-2 text-sm text-white/60">
                  {service.bullets.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

