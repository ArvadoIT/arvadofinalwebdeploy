"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal, SectionFade } from "../lib/scroll-motion";
import { useCallback, useState, useRef, useEffect } from "react";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "team@arvado.ca",
    href: "mailto:team@arvado.ca",
  },
  {
    icon: Phone,
    label: "Call",
    value: "(416) 555-0199",
    href: "tel:+14165550199",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Toronto & Remote",
  },
];

export default function Contact() {
  const actionUrl = "https://formsubmit.co/team@arvado.ca";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isSubmitting) return;

      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("_captcha", "false");
      formData.set("_template", "table");
      formData.set("_subject", "New Arvado inquiry");

      setIsSubmitting(true);
      setStatus("idle");

      try {
        const response = await fetch(`${actionUrl}/ajax`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        if (!response.ok) throw new Error("Request failed");

        const result = (await response.json()) as { success?: string };
        if (result?.success !== "true") throw new Error("Unsuccessful");

        setStatus("success");
        form.reset();
      } catch (error) {
        console.error("Contact form submission failed", error);
        setStatus("error");

        // Progressive enhancement fallback to default form submission
        form.action = actionUrl;
        form.submit();
      } finally {
        setIsSubmitting(false);
      }
    },
    [actionUrl, isSubmitting]
  );

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: false, amount: 0.3 });
  const [formHasAppeared, setFormHasAppeared] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,
    stiffness: 100,
    damping: 30,
  });

  const backgroundOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.2, 0.2, 0]);

  useEffect(() => {
    if (formInView && !formHasAppeared) {
      setFormHasAppeared(true);
    }
  }, [formInView, formHasAppeared]);

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: backgroundOpacity }}
        >
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        </motion.div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>
      </div>

      <SectionFade>
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 relative z-10">
          <div>
            <Reveal>
              <span className="tag mb-4">Contact</span>
              <h2 className="section-heading text-left">Let&apos;s build your unfair advantage</h2>
              <p className="section-subtitle text-left md:text-left">
                Tell us about your goals and we&apos;ll map a tailored growth plan—web, AI, and campaigns.
              </p>
            </Reveal>
            <div className="mt-10 space-y-6">
              {contactDetails.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: index * 0.08 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <item.icon className="h-5 w-5 text-sky-400 relative z-10" strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-base font-medium text-white hover:text-sky-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-white">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div ref={formRef}>
            <motion.div
              className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10"
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={formHasAppeared ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(12px)" }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Glow orb background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={formHasAppeared ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="absolute -inset-20 -z-10 rounded-full blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(14, 165, 233, 0.2), transparent 70%)",
                }}
              />

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 opacity-0"
                animate={formHasAppeared ? { opacity: 0.05 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              />

              <motion.form
                action={actionUrl}
                method="POST"
                className="space-y-6 relative z-10"
                initial={{ opacity: 0 }}
                animate={formHasAppeared ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
              >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Arvado inquiry" />
              <div className="sr-only">
                <label htmlFor="contact-hub">
                  Do not fill this field if you are human
                </label>
                <input
                  id="contact-hub"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formHasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Name</label>
                <motion.input
                  required
                  name="name"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60 transition-all"
                  whileFocus={{ borderColor: "rgba(14, 165, 233, 0.5)", scale: 1.01 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formHasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Email</label>
                <motion.input
                  required
                  type="email"
                  name="email"
                  placeholder="you@brand.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60 transition-all"
                  whileFocus={{ borderColor: "rgba(14, 165, 233, 0.5)", scale: 1.01 }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formHasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">What do you need?</label>
                <motion.textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what you want to launch or optimize."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60 transition-all resize-none"
                  whileFocus={{ borderColor: "rgba(14, 165, 233, 0.5)", scale: 1.01 }}
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all disabled:cursor-not-allowed disabled:opacity-70 relative overflow-hidden"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 20 }}
                animate={formHasAppeared ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(14, 165, 233, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0"
                  animate={isSubmitting ? { opacity: 0.3 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">{isSubmitting ? "Sending..." : "Send message"}</span>
              </motion.button>
              <div aria-live="polite" role="status" className="min-h-[1.25rem]">
                <AnimatePresence mode="wait" initial={false}>
                  {status === "success" && (
                    <motion.p
                      key="success"
                      className="mt-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Thanks! We’ll be in touch within one business day.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      key="error"
                      className="mt-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-xs text-rose-300"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Something went wrong. We opened a fallback email tab—feel free to reach out directly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-xs text-white/40">
                We reply within one business day. By submitting you agree to secure handling of your data.
              </p>
              </motion.form>

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-500/20 to-cyan-500/20 opacity-0 blur-2xl"
                animate={formHasAppeared ? { opacity: 0.15 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>
        </div>
      </SectionFade>
    </section>
  );
}
