"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function IntroOverlay() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.12], [12, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.12], [1.02, 1]);
  const blurFilter = useTransform(blurAmount, (b) => `blur(${b}px)`);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[50] grid place-items-center"
      style={{ opacity: overlayOpacity, scale }}
      initial={{ opacity: 1 }}
      animate={{ opacity: mounted ? 1 : 1 }}
    >
      <motion.div
        className="relative mx-auto max-w-3xl px-8 py-16 text-center"
        style={{ filter: blurFilter }}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute -inset-40 -z-10 opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(700px 420px at 60% 35%, rgba(14,165,233,0.28), transparent 60%), radial-gradient(700px 380px at 40% 70%, rgba(236,72,153,0.25), transparent 60%)",
          }}
        />
        <motion.span
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Arvado
        </motion.span>
        <motion.h1
          className="mt-6 font-orbitron text-3xl uppercase tracking-[0.4em] text-white md:text-4xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Premium digital growth studio
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-white/70"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Cinematic web experiences, AI assistants, and performance campaigns delivered with luxury minimalism.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}


