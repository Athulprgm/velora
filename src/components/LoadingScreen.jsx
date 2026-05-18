import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Custom cubic-bezier equivalent for a very elegant, non-linear count
    const duration = 2200; // ms
    const startTime = performance.now();

    // Easing function: easeInOutQuart
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    let frame;
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Apply easing to the progress ratio
      const easedProgress = easeInOutQuart(progressRatio);
      setProgress(Math.floor(easedProgress * 100));

      if (progressRatio < 1) {
        frame = requestAnimationFrame(updateCounter);
      } else {
        // When progress hits 100%, wait a brief moment, then tell parent to unmount
        setTimeout(() => {
          onComplete();
        }, 400); 
      }
    };

    frame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  const slideUp = {
    initial: { y: 0 },
    exit: { 
      y: '-100vh', 
      transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  const fadeOutElements = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg)] will-change-transform"
    >
      <div className="relative flex flex-col items-center justify-center h-full w-full max-w-sm px-8">
        
        {/* Centered Logo */}
        <motion.div variants={fadeOutElements} initial="initial" animate="animate" exit="exit">
          <img 
            src="/logo.png" 
            alt="Velora Logo" 
            className="w-48 md:w-56 h-auto object-contain dark:invert" 
          />
        </motion.div>

        {/* Bottom Progress UI */}
        <motion.div 
          variants={fadeOutElements} 
          initial="initial" animate="animate" exit="exit"
          className="absolute bottom-16 md:bottom-24 w-full px-8"
        >
          <div className="flex justify-between items-end mb-4">
            <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--text-muted)] font-medium">
              Loading Experience
            </span>
            <span className="font-heading text-xl font-bold text-[var(--text)] leading-none tabular-nums">
              {progress}%
            </span>
          </div>
          
          <div className="w-full h-[1px] bg-[var(--border)] relative overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 bg-[var(--accent)] transition-all ease-linear"
              style={{ width: `${progress}%`, transitionDuration: '40ms' }}
            />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
