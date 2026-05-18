import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'Happy Customers' },
  { value: 1000, suffix: '+', label: 'Pieces Crafted' },
  { value: 15, suffix: '+', label: 'Cities Delivered' },
  { value: 100, suffix: '%', label: 'Handmade' },
];

function CountUp({ target, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="py-20 px-8 md:px-16 border-y border-[rgba(212,175,55,0.08)] bg-black">
      <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <p className="font-heading text-4xl md:text-5xl font-bold text-[#D4AF37] mb-2">
              <CountUp target={s.value} suffix={s.suffix} inView={inView} />
            </p>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#4A3C24]">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
