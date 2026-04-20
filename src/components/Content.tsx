import { useI18n } from "@/i18n/I18nProvider";
import { Youtube, Play } from "lucide-react";

const tickerItems = [
  "DEVLOG #12 — BUILDING ALIEN FIGHT",
  "UNITY VS GODOT — HONEST COMPARISON",
  "C# IN 10 MINUTES",
  "MAKING A GAME IN 48 HOURS",
  "PIXEL ART CRASH COURSE",
  "GAME FEEL — JUICE IT OR LOSE IT",
];

const Content = () => {
  const { tr } = useI18n();
  return (
    <section id="content" className="relative py-28" style={{ background: "hsl(var(--surface) / 0.4)" }}>
      <div className="container">
        <p className="section-label">{tr("content.label")}</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2 mb-12" style={{ color: "#E3FDFD" }}>
          {tr("content.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <p className="leading-relaxed" style={{ color: "rgba(227,253,253,.85)" }}>{tr("content.body")}</p>
            
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              data-cursor-grow
              className="inline-flex items-center gap-2 font-term text-sm tracking-widest px-5 py-2.5 transition-all"
              style={{ border: "1px solid rgba(113,201,206,.35)", color: "#71C9CE", boxShadow: "0 0 8px rgba(113,201,206,.2)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "#71C9CE";
                (e.currentTarget as HTMLElement).style.color = "#080d0e";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#71C9CE";
              }}
            >
              <Youtube size={16} /> {tr("content.visit")}
            </a>
          </div>

          {/* Mock channel card */}
          <div className="surface-card overflow-hidden group">
            <div
              className="relative aspect-video overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(113,201,206,.15), rgba(8,13,14,.9))" }}
            >
              <div className="absolute inset-0 bg-circuit opacity-25" />
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="w-20 h-20 rounded-full grid place-items-center group-hover:scale-110 transition-transform"
                  style={{
                    background: "rgba(113,201,206,.9)",
                    boxShadow: "0 0 28px rgba(113,201,206,.5)"
                  }}
                >
                  <Play size={32} fill="#080d0e" style={{ color: "#080d0e", marginLeft: "4px" }} />
                </div>
              </div>
              <div
                className="absolute bottom-3 right-3 font-term text-[10px] px-2 py-0.5"
                style={{ background: "rgba(8,13,14,.8)", border: "1px solid rgba(113,201,206,.3)", color: "#71C9CE" }}
              >
                LIVE FEED
              </div>
            </div>
            <div className="p-4">
              <div className="font-display text-lg" style={{ color: "#E3FDFD" }}>@OLKIE</div>
              <div className="font-term text-xs tracking-wider mt-1" style={{ color: "#3a5254" }}>
                YOUTUBE.COM/@OLKIE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div
        className="mt-16 overflow-hidden py-4"
        style={{ borderTop: "1px solid rgba(113,201,206,.15)", borderBottom: "1px solid rgba(113,201,206,.15)", background: "rgba(8,13,14,.4)" }}
      >
        <div className="flex w-max animate-ticker font-term tracking-widest text-sm text-glow-cyan" style={{ color: "#71C9CE" }}>
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="px-8 flex items-center gap-3">
              <span style={{ color: "#A6E3E9" }}>▌</span>{item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Content;
