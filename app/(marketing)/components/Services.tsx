"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Cpu, LineChart, Workflow } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Reveal, SectionFade } from "../lib/scroll-motion";

const services = [
  {
    icon: Sparkles,
    title: "Premium Web Experiences",
    copy: "Design systems, conversion-focused copy, elite polish—shipped in weeks, not quarters.",
    bullets: ["Next.js + Tailwind build", "SEO-ready architecture", "Performance tuned"],
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.2)",
  },
  {
    icon: Cpu,
    title: "AI Assistants & Automations",
    copy: "Custom agents that book appointments, qualify leads, and integrate with your existing stack.",
    bullets: ["Voice + chat receptionists", "CRM & calendar sync", "Analytics dashboards"],
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.2)",
  },
  {
    icon: LineChart,
    title: "Growth Campaigns",
    copy: "Paid social, local SEO, and reputation management engineered for consistent pipeline growth.",
    bullets: ["Meta & Google Ads", "Localized SEO playbooks", "Content & reviews ops"],
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.2)",
  },
  {
    icon: Workflow,
    title: "Lifecycle Systems",
    copy: "Automated onboarding, loyalty, and referral flows that retain and re-engage clients.",
    bullets: ["Email & SMS journeys", "Insight reporting", "Revenue attribution"],
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.2)",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    if (isInView && !hasAppeared) {
      setHasAppeared(true);
    }
  }, [isInView, hasAppeared]);

  // Parallax and scale effects
  const y = useTransform(smoothProgress, [0, 1], [30, -30]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.96]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10"
        animate={isHovered ? { borderColor: "rgba(255,255,255,0.2)", scale: 1.02 } : { borderColor: "rgba(255,255,255,0.1)", scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow orb background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={hasAppeared ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute -inset-20 -z-10 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${service.glowColor}, transparent 70%)`,
          }}
        />

        {/* Animated gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0`}
          animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/10 relative"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={hasAppeared ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
          >
            {/* Icon glow */}
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 blur-xl`}
              animate={isHovered ? { opacity: 0.4 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <service.icon className="h-6 w-6 text-sky-400 relative z-10" strokeWidth={1.5} />
          </motion.div>

          <motion.h3
            className="text-xl font-semibold text-white"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={hasAppeared ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 + 0.15 }}
          >
            {service.title}
          </motion.h3>

          <motion.p
            className="mt-3 text-sm text-white/70"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={hasAppeared ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 + 0.3 }}
          >
            {service.copy}
          </motion.p>

          <motion.ul
            className="mt-6 space-y-2 text-sm text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 + 0.45 }}
          >
            {service.bullets.map((item, bulletIndex) => (
              <motion.li
                key={item}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={hasAppeared ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 + bulletIndex * 0.05 }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-sky-400"
                  animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Corner accent */}
        <motion.div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 blur-2xl`}
          animate={isHovered ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.2, 0.2, 0]);

  return (
    <section id="services" ref={sectionRef} className="relative py-28 md:py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: backgroundOpacity }}
        >
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />
        </motion.div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>
      </div>

      <SectionFade>
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 relative z-10">
          <Reveal className="text-center">
            <span className="tag mb-4">Services</span>
            <h2 className="section-heading">Full-stack growth playbooks</h2>
            <p className="section-subtitle">
              One partner across web, AI, and performance to keep velocity high and ops effortless.
            </p>
          </Reveal>
          <div className="mt-16 md:mt-20 grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </SectionFade>
    </section>
  );
}

