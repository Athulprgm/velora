import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { InstagramIcon } from "./icons/InstagramIcon";
import { Link } from "react-router-dom";

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-12 flex flex-col justify-center overflow-hidden bg-[var(--bg)]"
    >
      {/* Soft Floating Yarn / Organic Decorative Background Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 dark:opacity-10">
        <svg
          className="absolute top-10 left-10 w-96 h-96 text-[var(--accent)] animate-pulse"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            d="M 0,100 C 50,150 150,50 200,100"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            d="M 20,20 C 80,180 120,20 180,180"
          />
        </svg>
        <svg
          className="absolute bottom-10 right-10 w-96 h-96 text-[var(--accent-secondary)] animate-pulse"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            d="M 0,50 C 100,150 100,50 200,150"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 pt-10 lg:pt-0">
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-4 mb-6">
            <span className="block w-8 h-[2px] bg-[var(--accent)] rounded-full" />
            <span className="text-xs tracking-[0.4em] text-[var(--text-muted)] uppercase font-bold">
              Premium Minimal Elegant
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-bold text-[var(--text)] leading-[1.05] mb-6 tracking-tight"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            Handcrafted <br />
            <span className="italic text-[var(--accent-secondary)] font-normal">
              Soft Luxury
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed max-w-md font-medium mb-10"
          >
            Explore our organic crochet lifestyle collection. Every piece is
            meticulously handcrafted with warm, sustainable yarn to bring calm
            and luxury into your everyday life.
          </motion.p>

          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to="/shop"
              className="gold-btn flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase font-bold"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-btn flex items-center gap-3 px-8 py-4 text-xs tracking-widest uppercase font-bold"
            >
              <InstagramIcon size={16} />
              Instagram
            </a>
          </motion.div>
        </div>

        {/* Right Image: Crochet Lifestyle Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh] relative group cursor-pointer overflow-hidden rounded-3xl bg-[var(--card)] shadow-2xl border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500"
        >
          <img
            src="/crochet_ig1.png"
            alt="Crochet Lifestyle Showcase"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/30 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500" />
        </motion.div>
      </div>
    </section>
  );
}
