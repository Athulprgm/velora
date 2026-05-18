import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  const handleFloatingClick = () => {
    const message = "Hello Velora Handmade, I'm interested in this crochet product.";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919497219574?text=${encoded}`, '_blank');
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={handleFloatingClick}
        className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 font-bold text-xs tracking-wider uppercase group border-2 border-white"
        aria-label="Direct WhatsApp Order"
      >
        <MessageCircle size={20} className="fill-current" />
        <span className="hidden md:inline group-hover:inline transition-all">Direct Order</span>
      </button>
    </motion.div>
  );
}
