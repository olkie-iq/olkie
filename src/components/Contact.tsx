import { useState, type FormEvent } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

const Contact = () => {
  const { tr } = useI18n();
  const [sent, setSent]   = useState(false);
  const [busy, setBusy]   = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const data = new FormData(e.currentTarget);
    try {
      if (FORMSPREE_ID !== "YOUR_FORMSPREE_ID") {
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setSent(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="contact" className="relative py-28" style={{ background: "hsl(var(--surface) / 0.4)" }}>
      <div className="container grid md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="section-label">{tr("contact.label")}</p>
          <h2 className="font-display text-4xl md:text-5xl mt-2 mb-6" style={{ color: "#E3FDFD" }}>
            {tr("contact.title")}
          </h2>
          <p className="leading-relaxed max-w-md" style={{ color: "rgba(227,253,253,.85)" }}>
            {tr("contact.body")}
          </p>
          <div className="mt-8 font-term text-xs space-y-1" style={{ color: "#3a5254" }}>
            <div>&gt; ENCRYPTED: TLS 1.3</div>
            <div>&gt; LATENCY: ~24h</div>
            <div>&gt; STATUS: <span style={{ color: "#71C9CE" }}>OPEN</span></div>
          </div>
        </div>

        <div className="surface-card p-6 md:p-8">
          {sent ? (
            <div className="font-term py-12 text-center text-glow-cyan" style={{ color: "#71C9CE" }}>
              {tr("contact.success")}
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="font-term text-xs tracking-widest" style={{ color: "#71C9CE" }}>
                  &gt; {tr("contact.name")}
                </label>
                <input required name="name" className="term-input mt-1" autoComplete="name" />
              </div>
              <div>
                <label className="font-term text-xs tracking-widest" style={{ color: "#71C9CE" }}>
                  &gt; {tr("contact.email")}
                </label>
                <input required type="email" name="email" className="term-input mt-1" autoComplete="email" />
              </div>
              <div>
                <label className="font-term text-xs tracking-widest" style={{ color: "#71C9CE" }}>
                  &gt; {tr("contact.message")}
                </label>
                <textarea required name="message" rows={5} className="term-input mt-1 resize-none" />
              </div>
              <button
                type="submit"
                disabled={busy}
                data-cursor-grow
                className="w-full font-term text-sm tracking-widest py-3 transition-all disabled:opacity-40"
                style={{ background: "#71C9CE", color: "#080d0e", boxShadow: "0 0 16px rgba(113,201,206,.35)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#A6E3E9")}
                onMouseLeave={e => (e.currentTarget.style.background = "#71C9CE")}
              >
                {busy ? "TRANSMITTING..." : tr("contact.send")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
