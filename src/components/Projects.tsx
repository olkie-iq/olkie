import { useI18n } from "@/i18n/I18nProvider";
import { Gamepad2, Plus, ExternalLink } from "lucide-react";

const projects = [
  {
    titleKey: "projects.alien.t"  as const,
    descKey:  "projects.alien.d"  as const,
    tags: ["#Unity", "#Shooter", "#Arcade"],
    url: "https://itch.io",
    accent: "rgba(113,201,206,.15)",
  },
  {
    titleKey: "projects.cannon.t" as const,
    descKey:  "projects.cannon.d" as const,
    tags: ["#GameMaker", "#Strategy"],
    url: "https://itch.io",
    accent: "rgba(166,227,233,.12)",
  },
  {
    titleKey: "projects.pong.t"   as const,
    descKey:  "projects.pong.d"   as const,
    tags: ["#Godot", "#Arcade", "#Classic"],
    url: "https://itch.io",
    accent: "rgba(203,241,245,.10)",
  },
];

const ProjectCard = ({ p }: { p: typeof projects[number] }) => {
  const { tr } = useI18n();
  return (
    <div className="surface-card group h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div
        className="relative h-44 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${p.accent}, rgba(8,13,14,.8))` }}
      >
        <div className="absolute inset-0 bg-circuit opacity-30" />
        <div className="absolute inset-0 grid place-items-center">
          <Gamepad2
            className="transition-all duration-500 group-hover:scale-110"
            size={56}
            style={{ color: "rgba(113,201,206,.3)" }}
          />
        </div>
        <div
          className="absolute top-3 left-3 font-term text-[10px] tracking-widest px-2 py-1"
          style={{ background: "rgba(8,13,14,.7)", border: "1px solid rgba(113,201,206,.3)", color: "#71C9CE" }}
        >
          [ GAME ]
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3
          className="font-display text-xl transition-colors"
          style={{ color: "#E3FDFD" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#71C9CE")}
          onMouseLeave={e => (e.currentTarget.style.color = "#E3FDFD")}
        >
          {tr(p.titleKey)}
        </h3>
        <p className="text-sm mt-1 flex-1" style={{ color: "#3a5254" }}>{tr(p.descKey)}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="font-term text-[10px] px-2 py-0.5 rounded-full"
              style={{ border: "1px solid rgba(113,201,206,.25)", color: "rgba(113,201,206,.7)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        
          href={p.url}
          target="_blank"
          rel="noreferrer"
          data-cursor-grow
          className="mt-4 flex items-center justify-center gap-2 font-term text-xs tracking-widest py-2 transition-all"
          style={{ border: "1px solid rgba(113,201,206,.3)", color: "#71C9CE" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "#71C9CE";
            (e.currentTarget as HTMLElement).style.color = "#080d0e";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "#71C9CE";
          }}
        >
          {tr("projects.play")} <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const { tr } = useI18n();
  return (
    <section id="projects" className="relative py-28">
      <div className="container">
        <p className="section-label">{tr("projects.label")}</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2 mb-12" style={{ color: "#E3FDFD" }}>
          {tr("projects.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => <ProjectCard key={p.titleKey} p={p} />)}

          <div
            className="surface-card md:col-span-3 grid place-items-center min-h-[120px] border-dashed animate-pulse-glow"
          >
            <div className="flex items-center gap-3 font-term tracking-widest" style={{ color: "#71C9CE" }}>
              <Plus size={18} /> {tr("projects.more")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
