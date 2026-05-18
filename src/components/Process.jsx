import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Choose Your Pattern',
    desc: 'Every piece starts as a vision — we carefully select premium yarn and design the pattern.',
  },
  {
    num: '02',
    title: 'Hand-Stitched',
    desc: 'Crafted stitch by stitch using traditional crochet techniques passed down with love.',
  },
  {
    num: '03',
    title: 'Quality Checked',
    desc: 'Each piece is inspected for perfection — only the finest leave the Velora studio.',
  },
  {
    num: '04',
    title: 'Delivered to You',
    desc: 'Packaged beautifully and delivered with warmth, straight to your doorstep.',
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="process" className="py-28 px-8 md:px-16 bg-black">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-3">How We Create</p>
          <div className="flex items-end gap-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#E8D5B0] leading-tight">
              The Velora Process
            </h2>
            <span className="hidden md:block flex-1 h-px bg-gradient-to-r from-[rgba(212,175,55,0.3)] to-transparent mb-2" />
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[rgba(212,175,55,0.06)]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-black p-8 group hover:bg-[#060604] transition-colors duration-300"
            >
              {/* Number */}
              <p className="font-heading text-5xl font-bold text-[#1A1408] group-hover:text-[#2A2010] transition-colors mb-6 select-none">
                {step.num}
              </p>

              {/* Gold line */}
              <span
                className="block h-px mb-6 bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-500"
                style={{ width: '40px' }}
              />

              <h3 className="font-heading text-lg font-semibold text-[#E8D5B0] mb-3 leading-snug">
                {step.title}
              </h3>
              <p className="text-[#4A3C24] text-xs leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
