"use client";

import { motion, useScroll } from "framer-motion";
import { useMotionSettings } from "./MotionProvider";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll({ layoutEffect: false }); // Performance optimization
  const { reduceMotion } = useMotionSettings();

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    >
      {/* Main progress bar */}
      <div className="h-full w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-purple-500 shadow-lg shadow-sky-500/50" />
    </motion.div>
  );
}

