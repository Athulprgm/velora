import { motion } from 'framer-motion';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] }
});

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen pt-24 pb-12 flex flex-col justify-center overflow-hidden bg-[var(--bg)]">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 pt-10 lg:pt-0">
          
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 mb-8">
            <span className="block w-12 h-[1px] bg-[var(--accent)]" />
            <span className="text-[10px] tracking-[0.4em] text-[var(--text-muted)] uppercase font-semibold">
              Est. 2026
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-[var(--text)] leading-[1.05] mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
          >
            Handcrafted <br />
            <span className="italic text-[var(--text-muted)] font-normal">Elegance</span>
          </motion.h1>

          <motion.p 
            {...fadeUp(0.4)} 
            className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed max-w-md font-light mb-10"
          >
            Discover our premium collection of luxury crochet creations. Every piece is meticulously handcrafted with the finest yarn, blending timeless beauty with modern aesthetics.
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="flex flex-wrap items-center gap-5">
            <Link
              to="/shop"
              className="gold-btn flex items-center gap-3 px-8 py-4 rounded-none text-xs tracking-widest uppercase font-semibold hover:scale-105"
            >
              <ShoppingBag size={16} />
              Explore Shop
            </Link>
            
            <a
              href="https://wa.me/919497219574"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 text-xs tracking-widest uppercase text-[var(--text)] transition-all"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                <MessageCircle size={16} />
              </div>
              <span className="group-hover:text-[var(--accent)] transition-colors">Custom Order</span>
            </a>
          </motion.div>
        </div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] relative"
        >
          {/* Decorative outline frame */}
          <div className="absolute -inset-4 border border-[var(--border)] hidden lg:block" />
          
          <div className="w-full h-full relative overflow-hidden bg-[var(--card)]">
            <img 
              src="/crochet_bag.png" 
              alt="Luxury Crochet Bag" 
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle overlay to blend edges in dark mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating minimal badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 -left-8 bg-[var(--bg)] border border-[var(--border)] p-5 shadow-2xl hidden md:block"
          >
            <p className="font-heading text-xl font-bold text-[var(--accent)]">100%</p>
            <p className="text-[9px] tracking-widest uppercase text-[var(--text-muted)] mt-1">Handmade</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
