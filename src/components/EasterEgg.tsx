import { useEffect, useState } from "react";

const EasterEgg = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const target = "olkie";
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
      if (buffer === target) {
        setActive(true);
        setTimeout(() => setActive(false), 1800);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-none">
      <div className="absolute inset-0 animate-fade-up" style={{ background: "rgba(8,13,14,.85)" }} />
      <div className="absolute inset-0 grid place-items-center">
        <div
          data-text="ACCESS GRANTED"
          className="glitch font-display text-5xl md:text-7xl text-glow-cyan"
          style={{ color: "#71C9CE" }}
        >
          ACCESS GRANTED
        </div>
      </div>
      <div
        className="absolute inset-0 mix-blend-screen opacity-60"
        style={{
          background: "repeating-linear-gradient(0deg, transparent 0, transparent 4px, rgba(113,201,206,.12) 4px, rgba(113,201,206,.12) 5px)",
        }}
      />
    </div>
  );
};

export default EasterEgg;
