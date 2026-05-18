import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/shop' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--border)] shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        {/* Logo with Image & Allura Script */}
        <Link to="/" className="flex items-center gap-3 leading-none group">
          <img src="/logo.jpg" alt="Velora Handmade Logo" className="w-10 h-10 rounded-full object-cover border border-[var(--border)] shadow-sm group-hover:scale-105 transition-transform flex-shrink-0" />
          <div className="flex flex-col items-start">
            <span className="font-logo text-3xl md:text-4xl font-normal text-[var(--accent)] tracking-normal group-hover:opacity-80 transition-opacity">Velora</span>
            <span className="text-[8px] tracking-[0.5em] text-[var(--text-muted)] uppercase font-bold -mt-1">Handmade</span>
          </div>
        </Link>

        {/* Desktop links & CTA */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(l => (
            <Link key={l.href} to={l.href}
              className="text-[11px] font-bold tracking-[0.35em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <button onClick={toggleTheme} className="text-[var(--text)] hover:text-[var(--accent)] transition-colors p-2 rounded-full hover:bg-[var(--card)]" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Sticky Conversion CTA */}
          <Link
            to="/shop"
            className="gold-btn flex items-center gap-2 px-6 py-3 text-[11px] font-bold tracking-widest uppercase shadow-md hover:scale-105 transition-all"
          >
            <ShoppingBag size={14} />
            Explore Shop
          </Link>
        </div>

        {/* Mobile toggle & Theme */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="text-[var(--text)] hover:text-[var(--accent)] p-2 rounded-full bg-[var(--card)] border border-[var(--border)]">
             {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="text-[var(--text)] p-2 rounded-full bg-[var(--card)] border border-[var(--border)]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden shadow-xl"
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              {navLinks.map(l => (
                <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}
                  className="text-xs font-bold tracking-[0.4em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                  {l.label}
                </Link>
              ))}
              <Link
                to="/shop"
                onClick={() => setMenuOpen(false)}
                className="gold-btn flex items-center justify-center gap-2 py-4 text-xs font-bold tracking-widest uppercase shadow-md mt-2"
              >
                <ShoppingBag size={16} />
                Explore Shop
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
