import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-[var(--card)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Image */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[60vh]"
        >
          <img 
            src="/crochet_decor.png" 
            alt="Crochet Details" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[var(--accent)] -mt-4 -mr-4 hidden md:block" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[var(--accent)] -mb-4 -ml-4 hidden md:block" />
        </motion.div>

        {/* Right Content */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] tracking-[0.4em] text-[var(--accent)] uppercase mb-6 font-semibold">
              The Velora Story
            </p>

            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--text)] leading-tight mb-8">
              Where tradition meets <br/>
              <span className="italic text-[var(--text-muted)] font-normal">modern luxury.</span>
            </h2>

            <div className="w-16 h-[1px] bg-[var(--border)] mb-8" />

            <div className="space-y-6 text-[var(--text-muted)] text-sm md:text-base font-light leading-relaxed">
              <p>
                Velora Handmade was born from a deep passion for the timeless art of crochet —
                a craft that transforms humble yarn into breathtaking works of beauty. We believe in slow fashion and creating pieces that hold genuine value.
              </p>
              <p>
                Every single creation is carefully handcrafted using the finest, ethically sourced materials. It's not just a product; it is a piece of art imbued with warmth, intention, and hours of meticulous dedication.
              </p>
            </div>

            {/* Signature / Embellishment */}
            <div className="mt-12 flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-[var(--accent)] flex items-center justify-center">
                <span className="font-heading text-xl text-[var(--accent)] font-bold">V</span>
              </div>
              <div>
                <p className="text-[11px] tracking-widest text-[var(--text)] uppercase font-semibold">Master Artisans</p>
                <p className="text-xs text-[var(--text-muted)]">Crafted in India</p>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
