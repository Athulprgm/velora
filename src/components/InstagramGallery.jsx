import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { InstagramIcon } from './icons/InstagramIcon';

const igPosts = [
  { id: 1, image: '/crochet_ig1.png', span: 'md:col-span-2 md:row-span-2', likes: '1.2k' },
  { id: 2, image: '/crochet_bag_beige.png', span: 'md:col-span-1 md:row-span-1', likes: '842' },
  { id: 3, image: '/crochet_bouquet.png', span: 'md:col-span-1 md:row-span-1', likes: '956' },
  { id: 4, image: '/crochet_gift.png', span: 'md:col-span-1 md:row-span-1', likes: '624' },
  { id: 5, image: '/crochet_keychain.png', span: 'md:col-span-1 md:row-span-1', likes: '731' },
];

export default function InstagramGallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="instagram" className="py-28 px-6 md:px-12 bg-[var(--bg)] transition-colors duration-300 border-t border-[var(--border)]">
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
              @VeloraHandmade
            </p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-[var(--text)] leading-tight tracking-tight">
              Instagram Gallery
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          >
            <InstagramIcon size={16} className="text-[var(--accent-secondary)]" /> Follow Our Journey
          </a>
        </motion.div>

        {/* Grid Masonry Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[240px]">
          {igPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500 ${post.span}`}
            >
              <img 
                src={post.image} 
                alt="Instagram Feed Preview" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/70 via-[var(--text)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-2 text-white font-bold text-sm">
                <InstagramIcon size={18} /> {post.likes}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
