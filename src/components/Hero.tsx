import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useI18n } from "@/i18n/I18nProvider";
import CodeRain from "./CodeRain";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const { tr, lang } = useI18n();
  const typedEl = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedEl.current) return;
    const strings = lang === "ar"
      ? ["مطوّر ألعاب", "مبرمج", "صانع محتوى", "مدير مجتمع"]
      : ["Game Developer", "Programmer", "Content Creator", "Community Manager"];
    const typed = new Typed(typedEl.current, {
      strings,
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1400,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, [lang]);

  return (
    <section id="top" className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-circuit opacity-60" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top left, rgba(113,201,206,.08), transparent 55%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at bottom right, rgba(166,227,233,.06), transparent 55%)" }} />

      <div className="container relative grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3 space-y-6">
          <p className="section-label animate-fade-up">{tr("hero.label")}</p>

          <h1
            data-text="OLKIE"
            className="glitch font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-widest"
          >
            OLKIE
          </h1>

          <div className="font-term text-xl md:text-2xl h-8 text-glow-cyan" style={{ color: "#71C9CE" }}>
            <span ref={typedEl} />
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            
              href="#projects"
              data-cursor-grow
              className="font-term text-sm tracking-widest px-6 py-3 transition-all"
              style={{
                background: "#71C9CE",
                color: "#080d0e",
                boxShadow: "0 0 20px rgba(113,201,206,.4)"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#A6E3E9";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(113,201,206,.6)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "#71C9CE";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(113,201,206,.4)";
              }}
            >
              {tr("hero.cta.projects")}
            </a>
            
              href="#contact"
              data-cursor-grow
              className="font-term text-sm tracking-widest px-6 py-3 transition-all"
              style={{ border: "1px solid rgba(113,201,206,.3)", color: "#A6E3E9" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "#71C9CE";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 10px rgba(113,201,206,.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(113,201,206,.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {tr("hero.cta.contact")}
            </a>
          </div>
        </div>

        <div className="md:col-span-2 h-[280px] sm:h-[380px] md:h-[460px] relative">
          <CodeRain />
        </div>
      </div>

      
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 font-term text-xs tracking-widest"
        style={{ color: "rgba(113,201,206,.6)" }}
      >
        <span>{tr("hero.scroll")}</span>
        <ChevronDown className="animate-scroll-bounce" size={20} />
      </a>
    </section>
  );
};

export default Hero;
