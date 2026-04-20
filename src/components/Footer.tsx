import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const links = [
  { href: "#about",    key: "nav.about"    as const },
  { href: "#projects", key: "nav.projects" as const },
  { href: "#contact",  key: "nav.contact"  as const },
];

const Footer = () => {
  const { tr } = useI18n();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://api.countapi.xyz/hit/olkie.dev/visits");
        if (!res.ok) throw new Error("countapi");
        const data = await res.json();
        if (!cancelled) setCount(data.value);
      } catch {
        const key = "olkie:visits";
        const v = Number(localStorage.getItem(key) || "0") + 1;
        localStorage.setItem(key, String(v));
        if (!cancelled) setCount(v);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const display = count == null ? "....." : String(count).padStart(5, "0");

  return (
    <footer
      className="relative"
      style={{ borderTop: "1px solid rgba(113,201,206,.2)", background: "#080d0e", boxShadow: "0 -4px 24px -12px rgba(113,201,206,.2)" }}
    >
      <div className="container py-8 grid md:grid-cols-3 gap-6 items-center text-center md:text-start">
        <div className="font-term text-xs tracking-widest" style={{ color: "#3a5254" }}>
          {tr("footer.rights")}
        </div>
        <div className="flex gap-6 justify-center font-term text-xs">
          {links.map((l) => (
            
              key={l.href}
              href={l.href}
              className="uppercase tracking-wider transition-colors"
              style={{ color: "#3a5254" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#71C9CE")}
              onMouseLeave={e => (e.currentTarget.style.color = "#3a5254")}
            >
              {tr(l.key)}
            </a>
          ))}
        </div>
        <div className="font-term text-xs tracking-widest text-glow-cyan md:text-end" style={{ color: "#71C9CE" }}>
          [ {tr("footer.visitors")}: {display} ]
        </div>
      </div>
    </footer>
  );
};

export default Footer;
