import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Premium smooth progress counter reaching 100% in exactly 2.5 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // increments every 50ms -> 50 * 50 = 2500ms
      });
    }, 50);

    // Trigger smooth exit transition at 2.8 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  // Premium curtain lift exit animation
  const curtainExit = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      y: -40,
      scale: 1.02,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  return (
    <motion.div
      variants={curtainExit}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] will-change-transform px-6 overflow-hidden select-none"
    >
      {/* Ambient Luxury Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-radial from-[var(--accent)]/15 via-transparent to-transparent pointer-events-none animate-pulse blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-radial from-[var(--accent-secondary)]/10 via-transparent to-transparent pointer-events-none animate-pulse blur-3xl rounded-full" />

      {/* Centerpiece: Spinning Dashed Gold Ring + Beautiful Logo Image */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Spinning SVG Ring */}
        <motion.svg 
          className="absolute w-40 h-40 md:w-48 md:h-48 text-[var(--accent)] pointer-events-none"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        >
          <circle 
            cx="50" cy="50" r="46" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeDasharray="6 4" 
            opacity="0.6"
          />
          <circle 
            cx="50" cy="50" r="42" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            opacity="0.3"
          />
        </motion.svg>

        {/* Pulsating Logo Image */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[var(--border)] shadow-2xl p-1 bg-[var(--card)] flex items-center justify-center z-10"
        >
          <img 
            src="/logo.jpg" 
            alt="Velora Handmade Premium Logo" 
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
      </div>

      {/* Premium Typography */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center z-10"
      >
        <h2 className="font-logo text-4xl md:text-5xl font-normal text-[var(--accent)] tracking-normal mb-1">
          Velora
        </h2>
        <p className="text-[10px] tracking-[0.5em] text-[var(--text-muted)] uppercase font-bold">
          Handmade Crochet Creations
        </p>
      </motion.div>

    </motion.div>
  );
}
