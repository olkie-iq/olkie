import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const stats = [
  { key: "stat.games"   as const, value: 3,    suffix: "+" },
  { key: "stat.videos"  as const, value: 42,   suffix: "+" },
  { key: "stat.members" as const, value: 1200, suffix: "+" },
  { key: "stat.projects"as const, value: 18,   suffix: "+" },
];

const useCountUp = (target: number, start: boolean, duration = 1400) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
};

const StatCard = ({ s, visible }: { s: typeof stats[number]; visible: boolean }) => {
  const { tr } = useI18n();
  const v = useCountUp(s.value, visible);
  return (
    <div className="surface-card corner-brackets p-6 text-center transition-all">
      <div className="font-display text-4xl font-black text-glow-cyan" style={{ color: "#CBF1F5" }}>
        {v}{s.suffix}
      </div>
      <div className="font-term text-xs mt-2 tracking-widest uppercase" style={{ color: "#3a5254" }}>
        {tr(s.key)}
      </div>
    </div>
  );
};

const About = () => {
  const { tr } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-28">
      <div className="container">
        <p className="section-label">{tr("about.label")}</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2 mb-12" style={{ color: "#E3FDFD" }}>
          {tr("about.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hex avatar */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div
              className="absolute inset-0 hex-clip animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #A6E3E9, #71C9CE)", opacity: 0.8 }}
            />
            <div className="absolute inset-[3px] hex-clip bg-background grid place-items-center">
              <div className="font-display text-6xl text-glow-cyan" style={{ color: "#71C9CE" }}>O</div>
            </div>
            <div
              className="absolute -inset-4 hex-clip border-2 border-dashed animate-rotate-slow"
              style={{ borderColor: "rgba(113,201,206,.35)" }}
            />
            <div className="absolute -top-3 -left-3 w-6 h-6" style={{ borderLeft: "1px solid #71C9CE", borderTop: "1px solid #71C9CE", boxShadow: "0 0 8px rgba(113,201,206,.4)" }} />
            <div className="absolute -bottom-3 -right-3 w-6 h-6" style={{ borderRight: "1px solid #71C9CE", borderBottom: "1px solid #71C9CE", boxShadow: "0 0 8px rgba(113,201,206,.4)" }} />
          </div>

          <div className="space-y-4 leading-relaxed">
            <p style={{ color: "rgba(227,253,253,.85)" }}>{tr("about.p1")}</p>
            <p style={{ color: "#3a5254" }}>{tr("about.p2")}</p>
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
          {stats.map((s) => <StatCard key={s.key} s={s} visible={visible} />)}
        </div>
      </div>
    </section>
  );
};

export default About;
