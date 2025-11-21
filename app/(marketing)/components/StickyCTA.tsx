"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { getLenisInstance } from "../lib/lenis";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const lenis = getLenisInstance();
    if (!lenis) {
      // Fallback to native scroll if Lenis not available
      const handleScroll = () => {
        setIsVisible(window.scrollY > 600);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    let rafId: number;
    const handleScroll = (e: any) => {
      rafId = requestAnimationFrame(() => {
        const scrollY = e.scroll || window.scrollY;
        setIsVisible(scrollY > 600);
      });
    };
    
    lenis.on('scroll', handleScroll);
    handleScroll({ scroll: lenis.scroll || window.scrollY });
    
    return () => {
      lenis.off('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
        >
          <motion.a
            ref={ref}
            href="#contact"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: translateX, y: translateY }}
            className="group flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-2xl shadow-sky-500/40 transition-all hover:bg-sky-400 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing glow */}
            <motion.div
              className="absolute inset-0 bg-sky-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            
            <motion.span 
              className="relative z-10"
              animate={{
                textShadow: [
                  "0 0 0px rgba(255, 255, 255, 0)",
                  "0 0 10px rgba(255, 255, 255, 0.5)",
                  "0 0 0px rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Book a call
            </motion.span>
            <motion.svg
              className="h-4 w-4 relative z-10 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

