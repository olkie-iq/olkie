import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about",    key: "nav.about"    as const },
  { href: "#skills",   key: "nav.skills"   as const },
  { href: "#projects", key: "nav.projects" as const },
  { href: "#content",  key: "nav.content"  as const },
  { href: "#contact",  key: "nav.contact"  as const },
];

const Navbar = () => {
  const { tr, lang, toggle } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-xl ${
        scrolled
          ? "border-b"
          : "border-b border-transparent"
      }`}
      style={scrolled ? {
        background: "rgba(8,13,14,.85)",
        borderBottomColor: "rgba(113,201,206,.2)",
        boxShadow: "0 4px 24px -12px rgba(113,201,206,.3)"
      } : { background: "rgba(8,13,14,.3)" }}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="font-term text-lg tracking-widest" style={{ color: "#CBF1F5" }}>
          [OLKIE<span className="blink-cursor" />]
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            
              key={l.href}
              href={l.href}
              className="font-term text-xs uppercase tracking-widest transition-colors"
              style={{ color: "#3a5254" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#A6E3E9")}
              onMouseLeave={e => (e.currentTarget.style.color = "#3a5254")}
            >
              {tr(l.key)}
            </a>
          ))}
          <button
            onClick={toggle}
            data-cursor-grow
            className="font-term text-xs px-3 py-1 rounded-full transition-all"
            style={{ border: "1px solid rgba(113,201,206,.25)", color: "#71C9CE" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(113,201,206,.1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 8px rgba(113,201,206,.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
            aria-label="Toggle language"
          >
            {lang === "en" ? "AR" : "EN"} / {lang === "en" ? "EN" : "AR"}
          </button>
        </nav>

        <button
          className="md:hidden p-2"
          style={{ color: "#71C9CE" }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] backdrop-blur-xl md:hidden transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(8,13,14,.97)" }}
      >
        <div className="container flex h-16 items-center justify-between">
          <span className="font-term text-lg" style={{ color: "#CBF1F5" }}>[OLKIE]</span>
          <button onClick={() => setOpen(false)} className="p-2" style={{ color: "#71C9CE" }} aria-label="Close menu">
            <X />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center gap-8 mt-16">
          {links.map((l, i) => (
            
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl animate-fade-up"
              style={{ color: "#E3FDFD", animationDelay: `${i * 80}ms` }}
              onMouseEnter={e => (e.currentTarget.style.color = "#71C9CE")}
              onMouseLeave={e => (e.currentTarget.style.color = "#E3FDFD")}
            >
              {tr(l.key)}
            </a>
          ))}
          <button
            onClick={() => { toggle(); setOpen(false); }}
            className="mt-4 font-term text-sm px-4 py-2 rounded-full"
            style={{ border: "1px solid #71C9CE", color: "#71C9CE" }}
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
