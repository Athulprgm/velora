import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleWhatsAppClick = () => {
    const message = "Hello Veloura Handmade, I'm interested in your crochet products. Please share catalog details.";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919497219574?text=${encoded}`, '_blank');
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to Veloura Handmade journal!');
  };

  return (
    <footer className="bg-[var(--card)] text-[var(--text)] transition-colors duration-300 border-t border-[var(--border)] pt-24 pb-16 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 pb-20 border-b border-[var(--border)]">
        
        {/* Brand & Story */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-3 leading-none group">
            <img src="/logo.jpg" alt="Veloura Handmade Logo" className="w-12 h-12 rounded-full object-cover border border-[var(--border)] shadow-md group-hover:scale-105 transition-transform flex-shrink-0" />
            <div className="flex flex-col items-start">
              <span className="font-logo text-4xl font-normal text-[var(--accent)] tracking-normal group-hover:opacity-80 transition-opacity">Veloura</span>
              <span className="text-[8px] tracking-[0.5em] text-[var(--text-muted)] uppercase font-bold -mt-1">Handmade</span>
            </div>
          </Link>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed font-medium max-w-sm">
            Premium minimal elegant crochet creations. Meticulously handcrafted with warm, sustainable yarn to bring calm and soft luxury into your everyday life.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all shadow-sm">
              <InstagramIcon size={16} />
            </a>
            <button onClick={handleWhatsAppClick} className="w-10 h-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent-secondary)] hover:text-white transition-all shadow-sm" aria-label="WhatsApp Order">
              <MessageCircle size={16} />
            </button>
            <a href="mailto:contact@velourahandmade.com" className="w-10 h-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all shadow-sm">
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="font-heading font-bold text-lg text-[var(--text)]">Navigation</h4>
          <ul className="space-y-4 text-xs font-medium text-[var(--text-muted)]">
            <li><Link to="/" className="hover:text-[var(--accent)] transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-[var(--accent)] transition-colors">Collection</Link></li>
            <li><a href="#about" className="hover:text-[var(--accent)] transition-colors">About Brand</a></li>
            <li><a href="#bestsellers" className="hover:text-[var(--accent)] transition-colors">Best Sellers</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <h4 className="font-heading font-bold text-lg text-[var(--text)]">Studio Contact</h4>
          <ul className="space-y-4 text-xs font-medium text-[var(--text-muted)]">
            <li className="flex items-center gap-3"><Phone size={14} className="text-[var(--accent-secondary)]" /> +91 94972 19574</li>
            <li className="flex items-center gap-3"><Mail size={14} className="text-[var(--accent)]" /> studio@velourahandmade.com</li>
            <li className="flex items-start gap-3"><MapPin size={16} className="text-[var(--accent-secondary)] flex-shrink-0 mt-0.5" /> Cheruvappadi, Hosdurg, Kerala 671313</li>
          </ul>
          {/* Studio Google Maps Embed */}
          <div className="w-full h-36 rounded-2xl overflow-hidden border border-[var(--border)] shadow-inner">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7797.622547943686!2d75.26396545869139!3d12.26104733138224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba467000730ffe1%3A0x4cb1c338b1ab3e10!2sCheruvappadi%20volleyball%20court!5e0!3m2!1sen!2sin!4v1779108633229!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Veloura Handmade Studio Map Pin"
            />
          </div>
        </div>

        {/* Minimal Newsletter */}
        <div className="lg:col-span-1 space-y-6">
          <h4 className="font-heading font-bold text-lg text-[var(--text)]">Journal</h4>
          <p className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed">
            Subscribe for exclusive releases, slow fashion insights, and bespoke private sales.
          </p>
          <form onSubmit={handleNewsletter} className="flex items-center bg-[var(--bg)] border border-[var(--border)] rounded-full overflow-hidden p-1 shadow-inner">
            <input 
              type="email" 
              required 
              placeholder="Your email address" 
              className="bg-transparent text-[11px] px-4 py-2 w-full text-[var(--text)] outline-none font-medium"
            />
            <button type="submit" className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 hover:bg-[var(--accent-hover)] transition-colors shadow-md">
              <ArrowRight size={14} />
            </button>
          </form>

          {/* WhatsApp CTA */}
          <button 
            onClick={handleWhatsAppClick}
            className="secondary-btn w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-widest shadow-md mt-4"
          >
            <MessageCircle size={14} className="fill-current" /> WhatsApp Direct CTA
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[var(--text-muted)] font-medium">
        <p>© 2026 Veloura Handmade. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Terms of Studio</a>
          <a href="#" className="hover:text-[var(--accent)] transition-colors">Shipping & Returns</a>
        </div>
      </div>
    </footer>
  );
}
