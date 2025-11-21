 "use client";
 
 import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
 import { useMotionSettings } from "./MotionProvider";
 import { useRef, useState, useEffect } from "react";
 
 export default function BookCallDock() {
   const { reduceMotion } = useMotionSettings();
   const { scrollYProgress } = useScroll({ layoutEffect: false });
   const ref = useRef<HTMLAnchorElement>(null);
   const x = useMotionValue(0);
   const y = useMotionValue(0);
   
   const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
   const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
 
   // Reveal the dock after initial hero scroll, keep subtle movement
   const opacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
   const yTransform = useTransform(scrollYProgress, [0.08, 0.18], [16, 0]);
   
   // Optimize will-change only during scroll
   const [isScrolling, setIsScrolling] = useState(false);
   useEffect(() => {
     let timeoutId: NodeJS.Timeout;
     const unsubscribe = scrollYProgress.on('change', () => {
       setIsScrolling(true);
       clearTimeout(timeoutId);
       timeoutId = setTimeout(() => setIsScrolling(false), 150);
     });
     return () => {
       unsubscribe();
       clearTimeout(timeoutId);
     };
   }, [scrollYProgress]);
 
   const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
   };

   const handleMouseLeave = () => {
     x.set(0);
     y.set(0);
   };
 
   return (
     <motion.div
       className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
       style={reduceMotion ? undefined : { 
         opacity, 
         y: yTransform,
         willChange: isScrolling ? 'transform, opacity' : 'auto',
       }}
       initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
     >
       <motion.a
         ref={ref}
         href="#contact"
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         style={{ x: mouseXSpring, y: mouseYSpring }}
         className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_40px_rgba(14,165,233,0.12)] backdrop-blur-md transition hover:bg-white/10 relative overflow-hidden group"
         aria-label="Book a call"
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
       >
         {/* Glow effect */}
         <motion.div
           className="absolute inset-0 bg-sky-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"
           animate={{
             scale: [1, 1.1, 1],
           }}
           transition={{ duration: 2, repeat: Infinity }}
         />
         
         {/* Shine effect */}
         <motion.div
           className="absolute inset-0 bg-white/10 rounded-2xl"
           initial={{ x: "-100%" }}
           whileHover={{ x: "100%" }}
           transition={{ duration: 0.6 }}
         />
         
         <motion.span 
           className="relative z-10"
           animate={{
             textShadow: [
               "0 0 0px rgba(14, 165, 233, 0)",
               "0 0 10px rgba(14, 165, 233, 0.5)",
               "0 0 0px rgba(14, 165, 233, 0)",
             ],
           }}
           transition={{ duration: 2, repeat: Infinity }}
         >
           Book a call
         </motion.span>
       </motion.a>
     </motion.div>
   );
 }
 

