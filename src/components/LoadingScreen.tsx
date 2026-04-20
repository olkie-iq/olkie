import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
  const { tr } = useI18n();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 1700);
    const t2 = setTimeout(onDone, 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] grid place-items-center bg-background transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center px-6">
        <h1
          data-text="OLKIE"
          className="glitch font-display text-7xl md:text-9xl font-black tracking-widest"
        >
          OLKIE
        </h1>
        <div className="mt-8 h-[1px] w-64 mx-auto bg-muted overflow-hidden">
          <div
            className="h-full animate-loader-bar"
            style={{ background: "linear-gradient(90deg, #A6E3E9, #71C9CE)", boxShadow: "0 0 10px #71C9CE" }}
          />
        </div>
        <p className="mt-4 font-term text-xs tracking-[0.3em]" style={{ color: "#71C9CE" }}>
          {tr("loader.boot")}<span className="blink-cursor" />
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
