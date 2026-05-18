import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  {
    id: 1,
    name: 'Aparna R.',
    loc: 'Kerala',
    comment: 'Absolutely premium craftsmanship. The beige tote feels truly luxurious and elegant.',
    init: 'A',
    product: {
      id: 1,
      name: 'Luxury Beige Tote',
      price: '₹1,599',
      image: '/crochet_bag_beige.png',
      category: 'Bags',
    },
  },
  {
    id: 2,
    name: 'Meera S.',
    loc: 'Bangalore',
    comment: 'The pearl accent pouch is a masterpiece. I get compliments from everyone!',
    init: 'M',
    product: {
      id: 3,
      name: 'Pearl Accent Pouch',
      price: '₹799',
      image: '/crochet_pouch_pearl.png',
      category: 'Pouches',
    },
  },
  {
    id: 3,
    name: 'Divya K.',
    loc: 'Chennai',
    comment: 'Ordered the bouquet for my mother. The packaging itself was beautiful. Veloura is extraordinary.',
    init: 'D',
    product: {
      id: 2,
      name: 'Handmade Flower Bouquet',
      price: '₹999',
      image: '/crochet_bouquet.png',
      category: 'Flowers',
    },
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="testimonials" className="py-28 px-6 md:px-12 bg-[var(--card)] transition-colors duration-300 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="text-xs tracking-[0.4em] text-[var(--accent)] uppercase mb-3 font-bold">
              Customer Reviews
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--text)] leading-tight tracking-tight">
              Loved by Patrons
            </h2>
          </div>
          <div className="max-w-md text-xs text-[var(--text-muted)] font-medium leading-relaxed">
            Real feedback from verified patrons across India who have experienced the warmth and bespoke quality of Veloura Handmade.
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="card-minimal p-8 flex flex-col justify-between border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500 group shadow-sm bg-[var(--bg)]"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" className="text-[var(--accent-secondary)]" />
                  ))}
                </div>

                {/* Elegant Quote Typography */}
                <p className="font-heading text-[var(--text)] text-lg md:text-xl leading-relaxed italic mb-8">
                  "{r.comment}"
                </p>
              </div>

              <div>
                {/* Customer Info */}
                <div className="flex items-center gap-4 pb-6 border-b border-[var(--border)] mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[var(--bg)] bg-[var(--accent)] font-heading flex-shrink-0 shadow-md">
                    {r.init}
                  </div>
                  <div>
                    <p className="text-[var(--text)] text-sm font-bold group-hover:text-[var(--accent)] transition-colors">{r.name}</p>
                    <p className="text-[var(--text-muted)] text-xs font-medium">{r.loc} • Verified Buyer</p>
                  </div>
                </div>

                {/* Praised Product Cross-Sell Thumbnail & Link */}
                <div className="flex items-center justify-between gap-4 bg-[var(--card)] p-3 rounded-2xl border border-[var(--border)] group/item hover:border-[var(--accent)] transition-all shadow-sm">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img 
                      src={r.product.image} 
                      alt={r.product.name} 
                      className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-[var(--border)]"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] font-bold">Praised Item</p>
                      <p className="text-xs font-bold text-[var(--text)] truncate group-hover/item:text-[var(--accent)] transition-colors">{r.product.name}</p>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    state={{ product: r.product }}
                    className="flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--accent)] text-[var(--card)] hover:scale-105 transition-transform flex-shrink-0 shadow-md"
                    title="Buy This Item"
                  >
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          <span className="block w-12 h-[1px] bg-[var(--accent)] opacity-30" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--text-muted)] font-bold">
            4.9 / 5 Star Rating from 500+ Patrons Across India
          </span>
          <span className="block w-12 h-[1px] bg-[var(--accent)] opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}
