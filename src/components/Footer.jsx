import { motion } from 'framer-motion';
import { MessageCircle, Heart } from 'lucide-react';

function InstagramIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Collection', href: '#shop' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#testimonials' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] pt-20 pb-10 px-8 md:px-16 bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="font-heading text-3xl font-bold text-[var(--accent)] tracking-widest mb-1">VELORA</div>
            <div className="text-[9px] tracking-[0.55em] text-[var(--text-muted)] uppercase mb-6">Handmade</div>
            <p className="text-[var(--text-muted)] text-xs font-light leading-loose max-w-xs">
              Luxury crochet creations crafted with warmth, detail, and timeless beauty — made in India.
            </p>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-[9px] tracking-[0.45em] uppercase text-[var(--accent)] mb-6">Navigate</p>
            <div className="flex flex-col gap-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href}
                  className="text-[var(--text-muted)] hover:text-[var(--text)] text-xs tracking-widest transition-colors duration-300">
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[9px] tracking-[0.45em] uppercase text-[var(--accent)] mb-6">Connect</p>
            <div className="flex flex-col gap-4">
              <a href="https://wa.me/919497219574" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors group text-xs">
                <MessageCircle size={14} className="flex-shrink-0 text-green-500" />
                +91 94972 19574
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors text-xs">
                <InstagramIcon size={14} />
                @velorahandmade
              </a>
            </div>

            <div className="flex gap-3 mt-8">
              <a href="https://wa.me/919497219574" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-300">
                <MessageCircle size={13} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-all duration-300">
                <InstagramIcon size={13} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[var(--text-muted)] text-[10px] tracking-widest uppercase">VELORA HANDMADE © 2026</p>
          <p className="flex items-center gap-1.5 text-[var(--text-muted)] text-[10px] tracking-widest">
            Crafted with <Heart size={10} fill="currentColor" className="text-[var(--accent)]" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
