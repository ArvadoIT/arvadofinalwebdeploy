"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { getLenisInstance } from "../lib/lenis";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#launch" },
  { label: "Interactive Experience", href: "#showcase" },
  { label: "Contact", href: "#contact" },
];

const MagneticLink = motion.a;

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Optimized scroll handler using Lenis events
  useEffect(() => {
    const lenis = getLenisInstance();
    if (!lenis) return;

    let rafId: number;
    let lastScrollY = 0;
    
    const handleScroll = (e: any) => {
      const scrollY = e.scroll || window.scrollY;
      
      // Throttle scroll updates
      if (Math.abs(scrollY - lastScrollY) < 5) return;
      lastScrollY = scrollY;
      
      rafId = requestAnimationFrame(() => {
        setIsScrolled(scrollY > 20);
        
        // Update active section - only check when scroll changes significantly
        const sections = navLinks.map(link => link.href.replace('#', ''));
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        });
        setActiveSection(currentSection ? `#${currentSection}` : '');
      });
    };
    
    lenis.on('scroll', handleScroll);
    
    // Initial check
    handleScroll({ scroll: lenis.scroll || window.scrollY });
    
    return () => {
      lenis.off('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-sky-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8 relative">
        {/* Logo/Brand */}
        <MagneticLink
          href="#"
          className="text-lg font-semibold text-white relative group"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="relative z-10"
            whileHover={{ 
              textShadow: "0 0 20px rgba(14, 165, 233, 0.5)",
            }}
          >
            Arvado
          </motion.span>
          <motion.div
            className="absolute inset-0 bg-sky-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
        </MagneticLink>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <MagneticLink
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-white/70 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="relative z-10"
                  animate={{
                    color: isActive ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.7)",
                  }}
                  whileHover={{ color: "rgb(255, 255, 255)" }}
                >
                  {link.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sky-500 rounded-full"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.div
                  className="absolute -inset-2 bg-sky-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-sm"
                  transition={{ duration: 0.3 }}
                />
              </MagneticLink>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <motion.a
          href="#contact"
          className="hidden rounded-xl bg-sky-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all md:inline-block relative overflow-hidden group"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
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
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.a>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden relative overflow-hidden group"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />
          <motion.svg
            className="h-6 w-6 relative z-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </motion.svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-slate-950/95 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-7xl px-6 py-4 space-y-3"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm font-medium text-white/70 transition-colors hover:text-white relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-sky-500 rounded-full opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="pl-4">{link.label}</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMobileMenu}
                className="block rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white text-center shadow-lg shadow-sky-500/20 transition-all hover:bg-sky-400 mt-4 relative overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: navLinks.length * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Book a call</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navigation;

