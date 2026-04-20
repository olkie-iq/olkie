import { useEffect, useRef } from "react";

const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "01_<>{}[]/\\$#@*~01ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹ";
    let cols = 0;
    let drops: number[] = [];
    const fontSize = 14;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      ctx.scale(dpr, dpr);
      cols  = Math.floor(w / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * (h / fontSize));
    };

    resize();
    window.addEventListener("resize", resize);

    let raf = 0;

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.fillStyle = "rgba(8, 13, 14, 0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.975) {
          ctx.fillStyle = "#CBF1F5";
          ctx.shadowColor = "#71C9CE";
          ctx.shadowBlur = 10;
        } else {
          const lightness = 45 + Math.random() * 25;
          ctx.fillStyle = `hsl(187, 44%, ${lightness}%)`;
          ctx.shadowBlur = 0;
        }
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at center, transparent 30%, #080d0e 85%)" }}
      />
      <div
        className="pointer-events-none absolute inset-8 hex-clip"
        style={{ border: "1px solid rgba(113,201,206,.25)" }}
      />
    </div>
  );
};

export default CodeRain;
