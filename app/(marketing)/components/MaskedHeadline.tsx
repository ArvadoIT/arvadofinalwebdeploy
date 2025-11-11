"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function MaskedHeadline({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-block">
      <motion.span
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: .7, ease: [0.22,1,0.36,1] }}
        className="bg-clip-text text-transparent
                   bg-[linear-gradient(90deg,#fff_30%,#60a5fa_50%,#fff_70%)]
                   bg-[length:200%_100%] animate-[shine_2.6s_ease_.4s_1]"
      >
        {children}
      </motion.span>
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }
      `}</style>
    </div>
  );
}

