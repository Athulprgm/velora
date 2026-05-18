import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Aparna R.',
    loc: 'Kerala',
    comment: 'Absolutely premium craftsmanship and beautiful finishing. I was blown away — it feels truly luxurious.',
    init: 'A',
  },
  {
    id: 2,
    name: 'Meera S.',
    loc: 'Bangalore',
    comment: 'The crochet bag I ordered is a masterpiece. I get compliments everywhere I go!',
    init: 'M',
  },
  {
    id: 3,
    name: 'Divya K.',
    loc: 'Chennai',
    comment: 'Ordered as a gift — everyone loved it. The packaging itself was so beautiful. Velora is extraordinary.',
    init: 'D',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="testimonials" className="py-28 px-8 md:px-16 bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] text-[var(--accent)] uppercase mb-3">What Customers Say</p>
          <div className="flex items-end gap-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--text)]">
              Loved by Many
            </h2>
            <span className="hidden md:block flex-1 h-[1px] bg-gradient-to-r from-[var(--accent)] to-transparent mb-2 opacity-30" />
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="card-minimal rounded-2xl p-7 flex flex-col gap-5"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} fill="currentColor" className="text-[var(--accent)]" />
                ))}
              </div>

              <p className="text-[var(--text-muted)] text-sm leading-loose font-light italic flex-1">
                "{r.comment}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[var(--bg)] bg-[var(--accent)] font-heading flex-shrink-0">
                  {r.init}
                </div>
                <div>
                  <p className="text-[var(--text)] text-sm font-medium">{r.name}</p>
                  <p className="text-[var(--text-muted)] text-xs">{r.loc}</p>
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
          className="mt-12 flex items-center justify-center gap-4"
        >
          <span className="block w-8 h-[1px] bg-[var(--accent)] opacity-30" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-[var(--text-muted)]">
            4.9 / 5 from 500+ customers
          </span>
          <span className="block w-8 h-[1px] bg-[var(--accent)] opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}
