"use client";

import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Target, Palette, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    label: "01",
    title: "Strategy & Foundation",
    text: "Define audience, offers, and success metrics.",
    icon: Target,
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6, 182, 212, 0.3)",
    description: "We map your market, crystallize your value proposition, and establish the metrics that matter.",
  },
  {
    label: "02",
    title: "Design & Experience",
    text: "Translate positioning into visuals and flows.",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.3)",
    description: "Every pixel, every interaction, every flow—crafted to convert and create lasting impressions.",
  },
  {
    label: "03",
    title: "Build & Integrate",
    text: "Ship production-grade Next.js with AI touchpoints.",
    icon: Rocket,
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.3)",
    description: "Production-ready code, AI-powered features, and seamless integrations—shipped fast, built to last.",
  },
  {
    label: "04",
    title: "Launch & Optimize",
    text: "Go live, then iterate weekly with CRO and campaigns.",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500",
    glowColor: "rgba(249, 115, 22, 0.3)",
    description: "We launch, measure, and optimize continuously—turning data into growth, week after week.",
  },
];

function StepItem({ step, idx, totalSteps }: { step: typeof steps[0]; idx: number; totalSteps: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [hasAppeared, setHasAppeared] = useState(false);
  const [isActive, setIsActive] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.3"],
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
  const y = useTransform(smoothProgress, [0, 1], [80, -80]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.92]);
  
  // Icon animations
  const iconScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const iconRotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center w-full"
    >

      {/* Main content container */}
      <div className="relative w-full grid md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-center justify-center">
        {/* Left: Number & Icon */}
        <div className="relative flex flex-col items-center gap-6 justify-center">
          {/* Glow orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={hasAppeared ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="absolute inset-0 rounded-full blur-3xl -z-10"
            style={{
              background: `radial-gradient(circle, ${step.glowColor}, transparent 70%)`,
              width: "200px",
              height: "200px",
            }}
          />

          {/* Number badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={hasAppeared ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: idx * 0.15 }}
            className="relative"
          >
            <div className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br ${step.color} p-[2px]`}>
              <div className="w-full h-full rounded-3xl bg-slate-950 flex items-center justify-center">
                <motion.span
                  className={`text-5xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}
                >
                  {step.label}
                </motion.span>
              </div>
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0"
                animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: `0 0 40px ${step.glowColor}`,
                }}
              />
            </div>
          </motion.div>

          {/* Icon */}
          <motion.div
            style={{ scale: iconScale, rotate: iconRotate }}
            className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1.5px]`}
          >
            <div className="w-full h-full rounded-2xl bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
              <step.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 60, filter: "blur(12px)" }}
          animate={hasAppeared ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(12px)" }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: idx * 0.15 + 0.3 }}
          className="relative"
        >
          {/* Glass panel background */}
          <motion.div
            className="glass-panel rounded-3xl p-8 md:p-10 relative overflow-hidden"
            animate={isActive ? { borderColor: "rgba(255,255,255,0.2)" } : { borderColor: "rgba(255,255,255,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient overlay */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0`}
              animate={isActive ? { opacity: 0.05 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.h3
                className="text-2xl md:text-3xl font-semibold mb-3 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: idx * 0.15 + 0.5 }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p
                className="text-xl md:text-2xl font-light leading-relaxed text-white/90 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: idx * 0.15 + 0.6 }}
              >
                {step.text}
              </motion.p>

              <motion.p
                className="text-base text-white/60 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={hasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: idx * 0.15 + 0.7 }}
              >
                {step.description}
              </motion.p>

              {/* Progress indicator */}
              <motion.div
                className="mt-6 h-1 bg-white/5 rounded-full overflow-hidden"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={hasAppeared ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15 + 0.9 }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                  initial={{ scaleX: 0 }}
                  animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </motion.div>
            </div>

            {/* Corner accent */}
            <motion.div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-0 blur-2xl`}
              animate={isActive ? { opacity: 0.2 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LaunchSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.3, 0.3, 0]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      id="launch" 
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-40"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: backgroundOpacity }}
        >
          <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />
        </motion.div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <AnimatePresence>
          {loaded && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-20 md:mb-32 mx-auto"
            >
              <motion.span
                className="tag mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Launch method
              </motion.span>
              
              <motion.h2
                className="section-heading mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Four scenes to ship momentum
              </motion.h2>
              
              <motion.p
                className="section-subtitle max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                A cinematic journey from strategy to scale—each scene builds on the last, 
                creating unstoppable momentum that compounds into real results.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps */}
        <div className="space-y-24 md:space-y-32 w-full">
          {steps.map((step, idx) => (
            <StepItem key={step.label} step={step} idx={idx} totalSteps={steps.length} />
          ))}
        </div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 text-center mx-auto"
        >
          <motion.p
            className="text-white/50 text-sm uppercase tracking-widest mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Ready to launch?
          </motion.p>
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            whileHover={{ gap: 8 }}
          >
            <span>Let's build your momentum</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}


