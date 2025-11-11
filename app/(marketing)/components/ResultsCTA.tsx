import { Reveal } from "../lib/scroll-motion";

export default function ResultsCTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto w-full max-w-4xl px-6 text-center lg:px-8">
        <Reveal className="glass-panel relative overflow-hidden rounded-4xl px-8 py-16 md:px-12">
          <div
            className="pointer-events-none absolute -inset-32 -z-10 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(700px 400px at 65% 30%, rgba(14,165,233,0.28), transparent 60%), radial-gradient(600px 360px at 35% 80%, rgba(236,72,153,0.25), transparent 60%)",
            }}
          />
          <span className="tag mb-5">Results</span>
          <h2 className="section-heading">Ready for a premium growth partner?</h2>
          <p className="section-subtitle">
            Book a 30-minute strategy session to see how Arvado can elevate your brand, ops, and revenue in the next 90
            days.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
            >
              Book a strategy session
            </a>
            <a
              href="mailto:team@arvado.ca"
              className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Email the team
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

