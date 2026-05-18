import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
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
          ? 'bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-heading text-lg font-bold text-[var(--accent)] tracking-widest">VELORA</span>
          <span className="text-[8px] tracking-[0.5em] text-[var(--text-muted)] uppercase">Handmade</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(l => (
            <Link key={l.href} to={l.href}
              className="text-[10px] tracking-[0.35em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          
          <button onClick={toggleTheme} className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="text-[var(--text)] hover:text-[var(--accent)]">
             {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="text-[var(--text)]" onClick={() => setMenuOpen(!menuOpen)}>
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
            className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] overflow-hidden"
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              {navLinks.map(l => (
                <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}
                  className="text-[11px] tracking-[0.4em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
