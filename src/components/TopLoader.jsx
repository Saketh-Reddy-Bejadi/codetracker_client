import React, { useEffect, useState } from "react";

const TopLoader = ({ isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;

    if (isVisible) {
      setVisible(true);
      setProgress(0);

      // Gradual, smooth fake loading effect
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev;
          const increment = (90 - prev) * 0.05;
          return prev + increment;
        });
      }, 60);
    } else if (!isVisible && visible) {
      // Finish and fade out
      const timeout = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 300);
      }, 120);
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-[9999] overflow-hidden">
      {/* Metallic gradient loader */}
      <div
        className="absolute top-0 left-0 h-full rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.25)]"
        style={{
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, #D3D3FF 0%, #a1a1aa 40%, #D3D3FF 80%, #D3D3FF 100%)",
          transition: "width 0.35s ease-out, opacity 0.6s ease-out",
          opacity: progress >= 100 ? 0 : 1,
        }}
      ></div>

      {/* Moving shimmer line */}
      <div
        className="absolute top-0 h-full w-[30%] opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D3D3FF, transparent)",
          left: `${progress - 20}%`,
          animation: "shimmerMove 1.5s linear infinite",
        }}
      ></div>

      <style>{`
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(600%); }
        }
      `}</style>
    </div>
  );
};

export default TopLoader;