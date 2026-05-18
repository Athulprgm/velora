import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Sparkles, Scissors } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-[var(--card)] transition-colors duration-300 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left Image: Handmade Process Visuals */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[55vh] group cursor-pointer overflow-hidden rounded-3xl shadow-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500 bg-[var(--bg)]"
        >
          <img 
            src="/crochet_pouch_blush.png" 
            alt="Handmade Process Visuals" 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/30 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500" />
        </motion.div>

        {/* Right Content: Storytelling & Minimal Icons */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.4em] text-[var(--accent-secondary)] uppercase mb-4 font-bold">
              About Brand
            </p>

            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--text)] leading-tight mb-6 tracking-tight">
              Crafted with calm, <br/>
              <span className="italic text-[var(--text-muted)] font-normal">designed for luxury.</span>
            </h2>

            <div className="w-12 h-[2px] bg-[var(--accent)] mb-6 rounded-full" />

            <p className="text-[var(--text-muted)] text-sm md:text-base font-medium leading-relaxed mb-10 max-w-lg">
              Veloura Handmade is an organic exploration of traditional crochet artistry. We create premium, soft luxury creations that celebrate the warmth of slow fashion and heirloom craftsmanship.
            </p>

            {/* Minimal Icon Illustrations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[var(--border)]">
              <div className="flex flex-col gap-2">
                <Heart size={20} className="text-[var(--accent-secondary)] stroke-[1.5]" />
                <h4 className="font-heading font-bold text-sm text-[var(--text)]">100% Handcrafted</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-medium">Stitched with love & dedication.</p>
              </div>

              <div className="flex flex-col gap-2">
                <Sparkles size={20} className="text-[var(--accent)] stroke-[1.5]" />
                <h4 className="font-heading font-bold text-sm text-[var(--text)]">Premium Yarn</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-medium">Sustainable & ultra-soft materials.</p>
              </div>

              <div className="flex flex-col gap-2">
                <Scissors size={20} className="text-[var(--accent-secondary)] stroke-[1.5]" />
                <h4 className="font-heading font-bold text-sm text-[var(--text)]">Bespoke Design</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-medium">Tailored for elegant living.</p>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
