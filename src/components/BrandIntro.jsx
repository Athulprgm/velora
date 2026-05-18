import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Star, Scissors } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Crafted with Love',
    desc: 'Every stitch is made by hand with genuine care and passion for the art of crochet.',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    desc: 'Using only the finest yarn and materials, ensuring luxurious feel and lasting durability.',
  },
  {
    icon: Scissors,
    title: 'Bespoke Artistry',
    desc: 'Each piece is unique — custom-made to order with meticulous attention to every detail.',
  },
];

function FeatureCard({ icon: Icon, title, desc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card glass-card-hover p-8 flex flex-col items-center text-center gap-4"
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.2), rgba(212,175,55,0.05))' }}>
        <Icon size={24} className="text-[#D4AF37]" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-[#E7D0A9]">{title}</h3>
      <p className="text-[#B89B6B] text-sm leading-relaxed font-light">{desc}</p>
    </motion.div>
  );
}

export default function BrandIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="brand" className="relative py-28 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.4em] text-[#D4AF37] uppercase mb-4">Our Promise</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-[#E7D0A9] leading-tight mb-6">
            Luxury Born from the<br />
            <em className="gold-gradient-text">Art of Handcraft</em>
          </h2>
          <div className="section-divider mt-6 mb-8" />
          <p className="text-[#B89B6B] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Velora Handmade creates premium crochet products blending elegance, softness, and timeless
            handmade beauty. Every piece is crafted with passion and attention to detail — a love letter
            woven in yarn.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={0.15 * i} />
          ))}
        </div>
      </div>
    </section>
  );
}
