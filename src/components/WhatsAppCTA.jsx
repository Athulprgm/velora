import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppCTA() {
  return (
    <section id="contact" className="py-28 px-8 md:px-16 bg-[#030303]">
      <div className="max-w-5xl mx-auto">

        {/* Big editorial CTA layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="border border-[rgba(212,175,55,0.1)] rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          {/* Background number watermark */}
          <p className="absolute -bottom-6 -right-4 font-heading text-[140px] font-bold text-[#0A0800] select-none leading-none pointer-events-none">
            04
          </p>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">

            {/* Left text */}
            <div className="max-w-md">
              <p className="text-[10px] tracking-[0.5em] text-[#D4AF37] uppercase mb-5">Order Directly</p>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#E8D5B0] leading-tight mb-6">
                Ready to Own<br />
                Something<br />
                <em className="text-[#D4AF37]">Handcrafted?</em>
              </h2>
              <span className="block w-12 h-px bg-[#D4AF37] mb-6" />
              <p className="text-[#4A3C24] text-sm font-light leading-loose">
                Reach out directly on WhatsApp — place your order, request custom creations, or just say hello.
                We reply quickly and warmly.
              </p>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col items-start md:items-center gap-6">
              {/* Online indicator */}
              <div className="flex items-center gap-2.5">
                <span className="animate-pulse-gold w-2.5 h-2.5 rounded-full bg-[#25D366]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#4A3C24]">Usually replies in minutes</span>
              </div>

              <a
                href="https://wa.me/919497219574?text=Hello%20Veloura%20Handmade,%20I%20would%20like%20to%20place%20an%20order!"
                target="_blank"
                rel="noopener noreferrer"
                id="main-whatsapp-cta"
                className="gold-btn flex items-center gap-3 px-10 py-4 rounded-full text-sm uppercase"
              >
                <MessageCircle size={16} />
                Start Chatting
              </a>

              <p className="text-[#3A2E18] text-xs tracking-widest">+91 94972 19574</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
