import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { ChevronDown } from "lucide-react";

interface Skill { name: string; level: number; }
interface Category {
  titleKey: "skills.cat.programming" | "skills.cat.gamedev" | "skills.cat.tools" | "skills.cat.content";
  skills: Skill[];
}

const categories: Category[] = [
  {
    titleKey: "skills.cat.programming",
    skills: [
      { name: "C#",          level: 90 },
      { name: "Python",      level: 80 },
      { name: "GDScript",    level: 75 },
      { name: "JavaScript",  level: 85 },
      { name: "HTML / CSS",  level: 88 },
    ],
  },
  {
    titleKey: "skills.cat.gamedev",
    skills: [
      { name: "Unity",      level: 88 },
      { name: "Godot",      level: 78 },
      { name: "GameMaker",  level: 70 },
    ],
  },
  {
    titleKey: "skills.cat.tools",
    skills: [
      { name: "Git",              level: 85 },
      { name: "VS Code",          level: 95 },
      { name: "Photoshop",        level: 70 },
      { name: "Blender (basic)",  level: 45 },
    ],
  },
  {
    titleKey: "skills.cat.content",
    skills: [
      { name: "Video Editing",        level: 80 },
      { name: "Thumbnail Design",     level: 78 },
      { name: "Community Management", level: 85 },
    ],
  },
];

const SkillBar = ({ s, animate }: { s: Skill; animate: boolean }) => (
  <div className="space-y-1">
    <div className="flex justify-between font-term text-xs">
      <span style={{ color: "rgba(227,253,253,.85)" }}>{s.name}</span>
      <span style={{ color: "#71C9CE" }}>{s.level}%</span>
    </div>
    <div className="h-[1px] overflow-hidden" style={{ background: "rgba(113,201,206,.12)" }}>
      <div
        className="h-full transition-[width] duration-1000 ease-out"
        style={{
          width: animate ? `${s.level}%` : "0%",
          background: "linear-gradient(90deg, #A6E3E9, #71C9CE)",
          boxShadow: "0 0 6px rgba(113,201,206,.4)"
        }}
      />
    </div>
  </div>
);

const CategoryPanel = ({ cat, idx }: { cat: Category; idx: number }) => {
  const { tr } = useI18n();
  const [open, setOpen]       = useState(idx < 2);
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setAnimate(true),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="surface-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 font-term tracking-wider transition-colors"
        style={{ color: "#71C9CE" }}
      >
        <span>{tr(cat.titleKey)}</span>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          size={18}
          style={{ color: "#71C9CE" }}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 space-y-4 pt-4" style={{ borderTop: "1px solid rgba(113,201,206,.1)" }}>
            {cat.skills.map((s) => <SkillBar key={s.name} s={s} animate={open && animate} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { tr } = useI18n();
  return (
    <section id="skills" className="relative py-28" style={{ background: "hsl(var(--surface) / 0.4)" }}>
      <div className="container">
        <p className="section-label">{tr("skills.label")}</p>
        <h2 className="font-display text-4xl md:text-5xl mt-2 mb-12" style={{ color: "#E3FDFD" }}>
          {tr("skills.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((c, i) => <CategoryPanel key={c.titleKey} cat={c} idx={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
