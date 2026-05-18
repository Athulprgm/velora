import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Bags', 'Pouches', 'Baby Clips'];

const products = [
  { id: 1, name: 'Simple Beige Tote', price: '₹699', image: '/crochet_bag_beige.png', category: 'Bags', tag: 'Bestseller', desc: 'Charming beginner-friendly everyday tote made with soft cotton yarn.' },
  { id: 2, name: 'Olive Granny Square Bag', price: '₹599', image: '/crochet_bag_olive.png', category: 'Bags', tag: 'Classic', desc: 'Classic and cozy olive green handbag crafted with traditional granny squares.' },
  { id: 3, name: 'Simple Pearl Pouch', price: '₹349', image: '/crochet_pouch_pearl.png', category: 'Pouches', tag: 'Elegant', desc: 'Cozy cream white crochet pouch adorned with simple pearl buttons.' },
  { id: 4, name: 'Simple Blush Pouch', price: '₹299', image: '/crochet_pouch_blush.png', category: 'Pouches', tag: 'Everyday', desc: 'Soft blush pink daily pouch with clean, beginner-friendly stitches.' },
  { id: 5, name: 'Simple Daisy Clips', price: '₹199', image: '/crochet_clips_daisy.png', category: 'Baby Clips', tag: 'Cute', desc: 'Gentle pastel daisy clips for delicate baby hair.' },
  { id: 6, name: 'Simple Bowknot Pins', price: '₹229', image: '/crochet_clips_bow.png', category: 'Baby Clips', tag: 'Gift Pick', desc: 'Charming cream and gold bowknot pins for cute baby styling.' },
];

function ProductCard({ product, index, onBuyClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="card-minimal overflow-hidden group flex flex-col justify-between shadow-sm"
    >
      <div className="relative overflow-hidden aspect-square bg-[var(--bg)] rounded-t-3xl">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/80 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-500" />
        <span className="absolute top-6 left-6 text-[10px] font-bold tracking-[0.3em] uppercase bg-[var(--accent)] text-white px-4 py-2 rounded-full shadow-md">
          {product.tag}
        </span>
      </div>

      <div className="p-8 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-heading text-[var(--text)] text-xl font-bold leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">{product.name}</h3>
            <span className="font-heading text-[var(--accent)] text-xl font-bold whitespace-nowrap">{product.price}</span>
          </div>
          <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-8 font-medium">{product.desc}</p>
        </div>
        <button
          onClick={() => onBuyClick(product)}
          className="gold-btn flex items-center justify-center gap-3 w-full py-4 text-xs font-bold uppercase tracking-widest shadow-md"
        >
          <ShoppingBag size={16} /> Buy Now
        </button>
      </div>
    </motion.article>
  );
}

export default function Shop() {
  const [active, setActive] = useState('All');
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = active === 'All' ? products : products.filter(p => p.category === active);

  const handleBuyClick = (product) => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div className="min-h-screen pt-36 pb-32 px-6 md:px-12 bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.5em] text-[var(--accent)] uppercase mb-3 font-bold">Handpicked for You</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-[var(--text)] leading-tight tracking-tight">The Collection</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-xs tracking-[0.3em] uppercase px-6 py-3 rounded-full border transition-all duration-400 font-bold ${
                  active === cat
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg scale-105'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.span className="gold-line mb-16 block" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.2 }} />

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onBuyClick={handleBuyClick} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
