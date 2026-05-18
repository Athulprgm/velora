import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';

const bestSellers = [
  {
    id: 1,
    name: 'Luxury Beige Tote',
    price: '₹1,599',
    image: '/crochet_bag_beige.png',
    rating: '4.9',
    desc: 'High-end beige crochet tote with golden accent threading.',
  },
  {
    id: 2,
    name: 'Handmade Flower Bouquet',
    price: '₹999',
    image: '/crochet_bouquet.png',
    rating: '4.8',
    desc: 'Everlasting yarn blooms crafted for timeless elegance.',
  },
  {
    id: 3,
    name: 'Pearl Accent Pouch',
    price: '₹799',
    image: '/crochet_pouch_pearl.png',
    rating: '4.9',
    desc: 'Cream white crochet pouch adorned with pearl buttons.',
  },
];

export default function BestSellers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const handleQuickWhatsAppOrder = (product) => {
    const message = `Hello Velora Handmade, I'm interested in this crochet product: *${product.name}* (${product.price}). Please share delivery details.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919497219574?text=${encoded}`, '_blank');
  };

  return (
    <section id="bestsellers" className="py-28 px-6 md:px-12 bg-[var(--bg)] transition-colors duration-300 border-t border-[var(--border)]">
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
              Customer Favorites
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--text)] leading-tight tracking-tight">
              Best Sellers
            </h2>
          </div>
          <div className="max-w-md text-xs text-[var(--text-muted)] font-medium leading-relaxed">
            Our most highly praised creations. Click 'Quick WhatsApp Order' to instantly secure your piece with our direct studio ordering.
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestSellers.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col card-minimal overflow-hidden shadow-sm bg-[var(--card)] justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--bg)] rounded-t-3xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/80 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity duration-500" />
                <span className="absolute top-6 right-6 flex items-center gap-1 text-[10px] font-bold bg-[var(--card)] text-[var(--text)] px-3 py-1.5 rounded-full shadow-md border border-[var(--border)]">
                  <Star size={12} className="text-[var(--accent-secondary)] fill-current" /> {item.rating}
                </span>
              </div>

              <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-heading text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="font-heading text-xl font-bold text-[var(--accent-secondary)] whitespace-nowrap">{item.price}</span>
                  </div>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                {/* Quick WhatsApp Order Button */}
                <button
                  onClick={() => handleQuickWhatsAppOrder(item)}
                  className="secondary-btn flex items-center justify-center gap-3 w-full py-4 text-xs font-bold uppercase tracking-widest shadow-md"
                >
                  <MessageCircle size={16} className="fill-current" /> Quick WhatsApp Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
