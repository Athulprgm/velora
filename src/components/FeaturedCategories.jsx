import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'bags',
    name: 'Crochet Bags',
    image: '/crochet_bag_beige.png',
    desc: 'Handwoven boho totes & elegant handbags.',
    link: '/shop',
  },
  {
    id: 'flowers',
    name: 'Flowers',
    image: '/crochet_bouquet.png',
    desc: 'Everlasting yarn blooms & floral bouquets.',
    link: '/shop',
  },
  {
    id: 'keychains',
    name: 'Keychains',
    image: '/crochet_keychain.png',
    desc: 'Cute handmade crochet floral keychains.',
    link: '/shop',
  },
  {
    id: 'gifts',
    name: 'Custom Handmade Gifts',
    image: '/crochet_gift.png',
    desc: 'Bespoke gift boxes & custom amigurumi sets.',
    link: '/shop',
  },
];

export default function FeaturedCategories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="categories" className="py-28 px-6 md:px-12 bg-[var(--bg)] transition-colors duration-300 border-t border-[var(--border)]">
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
            <p className="text-xs tracking-[0.4em] text-[var(--accent-secondary)] uppercase mb-3 font-bold">
              Organic & Feminine
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--text)] leading-tight tracking-tight">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/shop"
            className="group flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          >
            Explore Full Catalog 
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </motion.div>

        {/* Categories Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col card-minimal overflow-hidden shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--bg)] rounded-t-3xl">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-500" />
              </div>

              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed font-medium mb-8">
                    {cat.desc}
                  </p>
                </div>

                <Link
                  to={cat.link}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300"
                >
                  View Collection <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
