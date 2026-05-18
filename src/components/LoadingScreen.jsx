import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Advanced smooth progress counter synchronized with the SVG writing animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Transition out exactly when the writing animation completes (2.8 seconds)
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const curtainExit = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      y: -50,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  // Calligraphy SVG Path for "Velora" in elegant cursive signature script
  const veloraPath = "M 50 80 C 65 35, 85 35, 95 75 C 105 115, 85 155, 115 150 C 145 145, 170 65, 160 55 C 150 45, 135 85, 140 135 C 155 140, 175 115, 170 100 C 165 85, 150 105, 160 135 C 175 135, 200 45, 190 40 C 180 35, 170 95, 180 135 C 195 135, 215 110, 205 100 C 195 90, 185 120, 200 130 C 210 130, 220 110, 230 110 C 240 110, 235 135, 245 135 C 260 135, 280 110, 270 100 C 260 90, 250 120, 265 135 C 280 135, 295 115, 305 105";
  
  // Elegant crochet needle / yarn loop underline flourish
  const flourishPath = "M 40 165 Q 180 185 320 155 Q 350 145 335 135 Q 320 125 295 145 Q 270 165 310 170";

  return (
    <motion.div
      variants={curtainExit}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] will-change-transform px-6 overflow-hidden"
    >
      {/* Decorative ambient glow */}
      <div className="absolute inset-0 bg-radial from-[var(--accent)]/10 via-transparent to-transparent pointer-events-none animate-pulse" />

      {/* Pure SVG Calligraphy Writing Animation Container (Transparent Background) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg aspect-video flex items-center justify-center overflow-hidden mb-8"
      >
        <svg viewBox="0 0 360 200" className="w-full h-full max-w-md text-[var(--accent)] drop-shadow-sm">
          {/* Main "Velora" Script */}
          <motion.path
            d={veloraPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Underline Flourish */}
          <motion.path
            d={flourishPath}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </motion.div>

      {/* Advanced Typography & Progress Strip */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-4 w-full max-w-xs z-10"
      >
        <div className="flex items-center justify-between w-full text-[10px] tracking-[0.4em] uppercase font-bold text-[var(--text-muted)]">
          <span>Velora Handmade</span>
          <span>{progress}%</span>
        </div>

        {/* Premium Slim Progress Bar */}
        <div className="w-full h-[2px] bg-[var(--border)] rounded-full overflow-hidden relative shadow-inner">
          <motion.div 
            className="h-full bg-[var(--accent)] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.05 }}
          />
        </div>

        <p className="text-[9px] tracking-[0.5em] text-[var(--accent-secondary)] uppercase font-heading font-bold mt-2">
          Est. 2026 • Crochet Creations
        </p>
      </motion.div>
    </motion.div>
  );
}
