"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Reveal, SectionFade } from "../lib/scroll-motion";

const stages = [
  {
    label: "01 / Discovery Lab",
    headline: "Align on goals, brand voice, and success metrics.",
    detail: "A collaborative workshop to map customer journey pain points, define differentiation, and outline KPIs.",
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.25)",
  },
  {
    label: "02 / Prototyping",
    headline: "Rapid visuals mixed with live data and AI flows.",
    detail: "Interactive prototypes reveal the full experience early, so stakeholders sign off with confidence.",
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.25)",
  },
  {
    label: "03 / Build & Automate",
    headline: "Production-ready Next.js systems with AI touchpoints.",
    detail: "We develop, integrate, and QA everything—from site performance to agent handoffs and analytics.",
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    label: "04 / Launch & Scale",
    headline: "Optimization loops, growth campaigns, and reporting.",
    detail: "After launch we run data-backed experiments and evolve creative, offers, and media weekly.",
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.25)",
  },
];

function StageItem({ stage, index }: { stage: typeof stages[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
    setIsActive(isInView);
  }, [isInView, hasAppeared]);

  // Parallax and scale effects
  const y = useTransform(smoothProgress, [0, 1], [40, -40]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.7]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.96]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative"
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 px-6 py-10 md:px-10 backdrop-blur-xl"
        animate={isActive ? { borderColor: "rgba(255,255,255,0.15)" } : { borderColor: "rgba(255,255,255,0.05)" }}
        transition={{ duration: 0.4 }}
      >
        {/* Glow orb background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={hasAppeared ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="absolute -inset-20 -z-10 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${stage.glowColor}, transparent 70%)`,
          }}
        />

        {/* Animated gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0`}
          animate={isActive ? { opacity: 0.08 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Content */}
        <div className="relative z-10">
          <motion.span
            className="text-xs uppercase tracking-[0.3em] text-white/50 inline-block"
            initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
            animate={hasAppeared ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }}
          >
            {stage.label}
          </motion.span>
          
          <motion.h3
            className="mt-4 text-2xl font-semibold text-white"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={hasAppeared ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 + 0.15 }}
          >
            {stage.headline}
          </motion.h3>
          
          <motion.p
            className="mt-3 text-sm text-white/70 md:text-base"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={hasAppeared ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 + 0.3 }}
          >
            {stage.detail}
          </motion.p>

          {/* Progress indicator */}
          <motion.div
            className="mt-6 h-0.5 bg-white/5 rounded-full overflow-hidden"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={hasAppeared ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.45 }}
          >
            <motion.div
              className={`h-full bg-gradient-to-r ${stage.color} rounded-full`}
              initial={{ scaleX: 0 }}
              animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ originX: 0 }}
            />
          </motion.div>
        </div>

        {/* Corner accent */}
        <motion.div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stage.color} opacity-0 blur-2xl`}
          animate={isActive ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.2, 0.2, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: backgroundOpacity }}
        >
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl" />
        </motion.div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>
      </div>

      <SectionFade>
        <div className="mx-auto w-full max-w-5xl px-6 lg:px-8 relative z-10">
          <Reveal className="text-center">
            <span className="tag mb-4">Process</span>
            <h2 className="section-heading">How we ship momentum</h2>
            <p className="section-subtitle">
              A hybrid team of strategists, designers, engineers, and growth operators aligned to move fast.
            </p>
          </Reveal>
          <div className="mt-16 md:mt-20 space-y-12 md:space-y-16">
            {stages.map((stage, index) => (
              <StageItem key={stage.label} stage={stage} index={index} />
            ))}
          </div>
        </div>
      </SectionFade>
    </section>
  );
}

