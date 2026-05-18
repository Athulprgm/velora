import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Bags', 'Bouquets', 'Toys', 'Decor'];

const products = [
  { id: 1, name: 'Luxury Crochet Bag', price: '₹1,499', image: '/crochet_bag.png', category: 'Bags', tag: 'Bestseller', desc: 'Handwoven boho tote with golden accent threading.' },
  { id: 2, name: 'Handmade Flower Bouquet', price: '₹999', image: '/crochet_bouquet.png', category: 'Bouquets', tag: 'Popular', desc: 'Everlasting yarn blooms — forever in season.' },
  { id: 3, name: 'Velora Plush Toy', price: '₹1,299', image: '/crochet_plush.png', category: 'Toys', tag: 'Gift Pick', desc: 'Soft premium amigurumi for the ones you love.' },
  { id: 4, name: 'Crochet Home Decor', price: '₹1,799', image: '/crochet_decor.png', category: 'Decor', tag: 'New', desc: 'Elevate your space with handcrafted elegance.' },
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
      className="card-minimal rounded-2xl overflow-hidden group"
    >
      <div className="relative overflow-hidden aspect-square bg-[var(--bg)]">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute top-4 left-4 text-[9px] font-semibold tracking-[0.3em] uppercase bg-[var(--accent)] text-black px-3 py-1.5 rounded-full">
          {product.tag}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-[var(--text)] text-base font-medium leading-snug">{product.name}</h3>
          <span className="font-heading text-[var(--accent)] text-lg font-bold whitespace-nowrap">{product.price}</span>
        </div>
        <p className="text-[var(--text-muted)] text-xs leading-relaxed mb-5 font-light">{product.desc}</p>
        <button
          onClick={() => onBuyClick(product)}
          className="gold-btn flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[11px] uppercase"
        >
          <ShoppingBag size={12} /> Buy Now
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
    <div className="min-h-screen pt-32 pb-28 px-8 md:px-16 bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <p className="text-[10px] tracking-[0.5em] text-[var(--accent)] uppercase mb-3">Handpicked for You</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text)] leading-tight">The Collection</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-[10px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                  active === cat
                    ? 'bg-[var(--accent)] text-black border-[var(--accent)] font-semibold'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.span className="gold-line mb-14 block" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1, delay: 0.2 }} />

        <AnimatePresence mode="popLayout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onBuyClick={handleBuyClick} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
