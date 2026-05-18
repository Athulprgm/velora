import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    const t2 = setTimeout(() => setTooltip(false), 6000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-7 right-7 z-50 flex items-center gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="bg-[#111] border border-[rgba(212,175,55,0.2)] text-[#E8D5B0] text-xs px-4 py-2.5 rounded-xl whitespace-nowrap shadow-xl"
              >
                Chat with us 👋
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href="https://wa.me/919497219574?text=Hello%20Velora%20Handmade!"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            id="floating-whatsapp"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-transform hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #1DA851, #25D366)' }}
          >
            <MessageCircle size={24} className="text-white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
