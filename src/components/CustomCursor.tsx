import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = dx + "px";
        dotRef.current.style.top  = dy + "px";
      }
    };

    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px";
        ringRef.current.style.top  = ry + "px";
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a,button,input,textarea,[data-cursor-grow]");
      if (ringRef.current) {
        ringRef.current.style.width       = interactive ? "44px" : "26px";
        ringRef.current.style.height      = interactive ? "44px" : "26px";
        ringRef.current.style.borderColor = interactive
          ? "rgba(203,241,245,.7)"
          : "rgba(113,201,206,.5)";
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="olkie-cursor" />
      <div ref={ringRef} className="olkie-cursor-ring" />
    </>
  );
};

export default CustomCursor;
