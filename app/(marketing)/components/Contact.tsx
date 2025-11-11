"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Reveal } from "../lib/scroll-motion";
import { useCallback, useState } from "react";

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

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <Reveal>
            <span className="tag mb-4">Contact</span>
            <h2 className="section-heading">Let&apos;s build your unfair advantage</h2>
            <p className="section-subtitle text-left md:text-left">
              Tell us about your goals and we&apos;ll map a tailored growth plan—web, AI, and campaigns.
            </p>
          </Reveal>
          <div className="mt-10 space-y-6">
            {contactDetails.map((item) => (
              <Reveal key={item.label} delay={0.04}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                    <item.icon className="h-5 w-5 text-sky-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-base font-medium text-white hover:text-sky-400">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-white">{item.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.12}>
          <div className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10">
            <motion.form
              action={actionUrl}
              method="POST"
              className="space-y-6"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Name</label>
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@brand.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.3em] text-white/50">What do you need?</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what you want to launch or optimize."
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send message"}
              </button>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
