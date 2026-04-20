import { useI18n } from "@/i18n/I18nProvider";
import { Youtube, Send, MessageCircle, Github, Gamepad2 } from "lucide-react";

const socials = [
  { name: "YouTube",  icon: Youtube,       descKey: "socials.youtube.d"  as const, href: "https://youtube.com" },
  { name: "Telegram", icon: Send,           descKey: "socials.telegram.d" as const, href: "https://t.me" },
  { name: "Discord",  icon: MessageCircle,  descKey: "socials.discord.d"  as const, href: "https://discord.com" },
  { name: "GitHub",   icon: Github,         descKey: "socials.github.d"   as const, href: "https://github.com" },
  { name: "itch.io",  icon: Gamepad2,       descKey: "socials.itch.d"     as const, href: "https://itch.io" },
];

const Socials = () => {
  const { tr } = useI18n();
  return (
    <section className="relative py-28">
      <div className="container">
        <p className="section-label">{tr("socials.label")}</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2 mb-12" style={{ color: "#E3FDFD" }}>
          {tr("socials.title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-grow
                className="surface-card group p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(113,201,206,.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(113,201,206,.25)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <Icon
                  size={32}
                  className="group-hover:scale-110 transition-transform"
                  style={{ color: "#71C9CE" }}
                />
                <div className="font-display text-base" style={{ color: "#CBF1F5" }}>{s.name}</div>
                <div className="font-term text-[10px] uppercase tracking-widest" style={{ color: "#3a5254" }}>
                  {tr(s.descKey)}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Socials;
