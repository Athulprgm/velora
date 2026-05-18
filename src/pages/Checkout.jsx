import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, ShieldCheck, Truck, Package } from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || {
    name: 'Simple Beige Tote',
    price: '₹699',
    image: '/crochet_bag_beige.png',
  };

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    city: '',
    notes: '',
  });

  // Numeric price calculation
  const basePrice = parseInt(product.price.replace(/[^\d]/g, ''), 10);
  const deliveryCharge = 40;
  const totalPrice = basePrice + deliveryCharge;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    // Construct absolute URL for WhatsApp Rich Link Preview
    const baseUrl = window.location.origin;
    const imageUrl = `${baseUrl}${product.image}`;

    const message = `*NEW ORDER INQUIRY* ✦ Veloura Handmade
-----------------------------------------
*Product Details:*
• Item: ${product.name}
• Price: ₹${basePrice}
• Delivery Charge: ₹${deliveryCharge}
• *Total Payable: ₹${totalPrice}*

*Product Image:*
${imageUrl}

*Customer & Shipping Details:*
• Name: ${form.name}
• Phone: ${form.phone}
• Address: ${form.address}, ${form.city} - ${form.pincode}
• Special Notes: ${form.notes || 'None'}

-----------------------------------------
*Payment Mode:* Cash on Delivery / UPI Inquiry`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '919497219574';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-36 pb-32 px-6 md:px-12 bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors mb-12"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
          Back to Collection
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Order Summary & Trust Badges */}
          <div className="lg:col-span-5 space-y-8">
            <div className="card-minimal p-8 flex flex-col gap-8 shadow-xl">
              <h2 className="font-heading text-2xl font-bold text-[var(--text)] border-b border-[var(--border)] pb-6">
                Order Summary
              </h2>

              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-3xl overflow-hidden bg-[var(--bg)] border border-[var(--border)] flex-shrink-0 shadow-md group">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-[var(--text)] mb-2">{product.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] font-medium mb-4">100% Premium Handmade Yarn</p>
                  <p className="font-heading text-lg font-bold text-[var(--accent)]">{product.price}</p>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-6 space-y-4 text-xs font-medium">
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span>Subtotal</span>
                  <span>₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-[var(--text-muted)]">
                  <span className="flex items-center gap-2"><Truck size={14} className="text-[var(--accent)]" /> Delivery Charge</span>
                  <span>₹{deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-[var(--text)] font-bold text-base border-t border-[var(--border)] pt-4">
                  <span>Total Payable</span>
                  <span className="font-heading text-xl text-[var(--accent)]">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-minimal p-6 flex flex-col items-center text-center gap-3 shadow-md">
                <ShieldCheck size={24} className="text-[var(--accent)]" />
                <h4 className="font-heading font-bold text-sm text-[var(--text)]">Secure Ordering</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed">Direct verification with brand owner via WhatsApp Business.</p>
              </div>
              <div className="card-minimal p-6 flex flex-col items-center text-center gap-3 shadow-md">
                <Package size={24} className="text-[var(--accent)]" />
                <h4 className="font-heading font-bold text-sm text-[var(--text)]">Premium Packaging</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed">Eco-friendly bespoke unboxing experience.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="lg:col-span-7 card-minimal p-8 md:p-12 shadow-xl">
            <h2 className="font-heading text-3xl font-bold text-[var(--text)] mb-2 tracking-tight">
              Shipping & Contact
            </h2>
            <p className="text-xs text-[var(--text-muted)] font-medium mb-8 leading-relaxed">
              Please enter your delivery details below. Clicking "Proceed to WhatsApp" will instantly generate your order ticket with a rich image preview for the owner.
            </p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Meera Sharma"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-full px-6 py-4 text-xs text-[var(--text)] outline-none transition-all font-medium shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-full px-6 py-4 text-xs text-[var(--text)] outline-none transition-all font-medium shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-2">Detailed Address</label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address, apartment, suite, landmark"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-3xl px-6 py-4 text-xs text-[var(--text)] outline-none transition-all font-medium shadow-inner resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-2">City / District</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Kochi"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-full px-6 py-4 text-xs text-[var(--text)] outline-none transition-all font-medium shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-2">PIN Code</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 682001"
                    className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-full px-6 py-4 text-xs text-[var(--text)] outline-none transition-all font-medium shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-widest uppercase font-bold text-[var(--text-muted)] mb-2">Order Notes (Optional)</label>
                <input
                  type="text"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Special customization requests or delivery instructions"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] focus:border-[var(--accent)] rounded-full px-6 py-4 text-xs text-[var(--text)] outline-none transition-all font-medium shadow-inner"
                />
              </div>

              <button
                type="submit"
                className="gold-btn w-full flex items-center justify-center gap-3 py-5 text-xs font-bold uppercase tracking-widest mt-8 shadow-xl"
              >
                <MessageCircle size={18} className="fill-current" />
                Proceed to WhatsApp Order
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
