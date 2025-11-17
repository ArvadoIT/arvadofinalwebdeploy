"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Sparkles, Cpu, LineChart, Workflow } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const items = [
  {
    icon: Sparkles,
    title: "Premium Web Experiences",
    copy: "Design systems, conversion copy, elite polish—shipped in weeks, not quarters.",
    bullets: ["Next.js + Tailwind", "SEO-ready architecture", "Performance tuned"],
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.15)",
  },
  {
    icon: Cpu,
    title: "AI Assistants & Automations",
    copy: "Agents that book, qualify, and route—seamlessly integrated with your stack.",
    bullets: ["Voice + chat concierge", "CRM & calendar sync", "Analytics dashboards"],
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.15)",
  },
  {
    icon: LineChart,
    title: "Growth Campaigns",
    copy: "Paid social, local SEO, and reputation programs engineered for pipeline growth.",
    bullets: ["Meta & Google Ads", "Localized SEO playbooks", "Content & reviews ops"],
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    icon: Workflow,
    title: "Lifecycle Systems",
    copy: "Automated onboarding, loyalty, and referral flows that keep customers engaged.",
    bullets: ["Email & SMS journeys", "Insight reporting", "Revenue attribution"],
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.15)",
  },
];

function ServiceCard({ item, index }: { item: typeof items[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hasAppeared, setHasAppeared] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.25"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.96, 1, 1, 0.96]);

  useEffect(() => {
    if (isInView && !hasAppeared) {
      setHasAppeared(true);
    }
  }, [isInView, hasAppeared]);

  const iconColors = ['#06b6d4', '#a855f7', '#10b981', '#f97316'];

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative min-h-[400px] md:min-h-[500px] flex items-center"
    >
      <motion.article
        initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
        animate={hasAppeared ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: index * 0.15 }}
        className="glass-panel relative w-full overflow-hidden rounded-[2rem] border border-white/10 p-10 md:p-12 lg:p-16 group"
      >
        {/* Subtle gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0`}
          animate={hasAppeared ? { opacity: 0.03 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        />

        {/* Glow orb */}
        <motion.div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-0"
          animate={hasAppeared ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2, delay: index * 0.15 + 0.5 }}
          style={{
            background: `radial-gradient(circle, ${item.glowColor}, transparent 70%)`,
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={hasAppeared ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -180 }}
            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: index * 0.15 + 0.3 }}
            className="mb-8"
          >
            <div className="relative inline-flex">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 blur-2xl rounded-3xl`} />
              <div className={`relative w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} opacity-10 border border-white/10 flex items-center justify-center`}>
                <item.icon 
                  className="w-10 h-10" 
                  strokeWidth={1.5}
                  style={{ stroke: iconColors[index] }}
                />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 + 0.5 }}
            className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight"
          >
            {item.title}
          </motion.h3>

          {/* Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 + 0.6 }}
            className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl"
          >
            {item.copy}
          </motion.p>

          {/* Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.15 + 0.7 }}
            className="space-y-4"
          >
            {item.bullets.map((bullet, bulletIndex) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, x: -20 }}
                animate={hasAppeared ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.8 + bulletIndex * 0.1 }}
                className="flex items-center gap-4 text-base md:text-lg text-white/60"
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${item.color} flex-shrink-0`} />
                <span>{bullet}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${item.color} opacity-0`}
          animate={hasAppeared ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 1, delay: index * 0.15 + 1 }}
        />
      </motion.article>
    </motion.div>
  );
}

export default function ValueGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 0.15, 0.15, 0]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: backgroundOpacity }}
        >
          <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/3 blur-3xl" />
          <div className="absolute bottom-[20%] right-[15%] w-[700px] h-[700px] rounded-full bg-purple-500/3 blur-3xl" />
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mx-auto mb-24 md:mb-32"
        >
          <motion.span
            className="tag mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            What we deliver
          </motion.span>

          <motion.h2
            className="section-heading mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            A single team for full‑stack growth
          </motion.h2>

          <motion.p
            className="section-subtitle max-w-3xl text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            One partner across web, AI, and performance so your momentum never stalls.
          </motion.p>
        </motion.div>

        {/* Cards - 2 column grid */}
        <div className="grid gap-12 md:gap-16 lg:gap-20 md:grid-cols-2 w-full">
          {items.map((item, i) => (
            <ServiceCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
