import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const deliveryCharge = 40;
  const productPrice = product ? parseInt(product.price.replace(/[^0-9]/g, '')) : 0;
  const total = productPrice + deliveryCharge;

  useEffect(() => {
    if (!product) {
      navigate('/shop');
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleBuyNow = (e) => {
    e.preventDefault();
    const { name, phone, address, city, pincode } = formData;
    
    if(!name || !phone || !address || !city || !pincode) {
      alert('Please fill all details');
      return;
    }

    // Generating an absolute URL so WhatsApp can create a rich link preview
    const imageUrl = window.location.origin + product.image;
    
    const message = `*New Order Request*%0A%0A*Product:* ${product.name}%0A*Product Image:* ${imageUrl}%0A*Price:* ₹${productPrice}%0A*Delivery Charge:* ₹${deliveryCharge}%0A*Total Amount:* ₹${total}%0A%0A*Customer Details:*%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}, ${city}, ${pincode}%0A%0AHello Velora, I would like to place this order!`;
    
    window.open(`https://wa.me/919497219574?text=${message}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] mb-8 transition-colors">
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="font-heading text-3xl font-bold mb-8 text-[var(--text)]">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Summary */}
        <div>
          <div className="card-minimal rounded-2xl p-6 sticky top-32">
             <h2 className="text-lg font-semibold mb-4 border-b border-[var(--border)] pb-2 text-[var(--text)]">Order Summary</h2>
             
             <div className="flex gap-4 mb-6">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl" />
                <div>
                   <h3 className="font-medium text-[var(--text)]">{product.name}</h3>
                   <p className="text-sm text-[var(--text-muted)] mt-1">{product.category}</p>
                </div>
             </div>

             <div className="space-y-3 text-sm text-[var(--text)] border-b border-[var(--border)] pb-4 mb-4">
               <div className="flex justify-between">
                 <span>Subtotal</span>
                 <span>₹{productPrice}</span>
               </div>
               <div className="flex justify-between text-[var(--text-muted)]">
                 <span>Delivery Charge</span>
                 <span>₹{deliveryCharge}</span>
               </div>
             </div>

             <div className="flex justify-between font-bold text-lg text-[var(--accent)] mb-6">
               <span>Total</span>
               <span>₹{total}</span>
             </div>

             <div className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p>Payment will be collected via UPI/Bank Transfer after order confirmation on WhatsApp.</p>
             </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleBuyNow} className="space-y-5">
           <h2 className="text-lg font-semibold mb-4 text-[var(--text)]">Delivery Details</h2>
           
           <div>
             <label className="block text-sm mb-1 text-[var(--text-muted)]">Full Name</label>
             <input required type="text" name="name" value={formData.name} onChange={handleChange}
               className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors" />
           </div>

           <div>
             <label className="block text-sm mb-1 text-[var(--text-muted)]">Phone Number (WhatsApp)</label>
             <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
               className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors" />
           </div>

           <div>
             <label className="block text-sm mb-1 text-[var(--text-muted)]">Complete Address</label>
             <textarea required name="address" rows="3" value={formData.address} onChange={handleChange}
               className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors"></textarea>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-[var(--text-muted)]">City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm mb-1 text-[var(--text-muted)]">Pincode</label>
                <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2 text-[var(--text)] focus:border-[var(--accent)] focus:outline-none transition-colors" />
              </div>
           </div>

           <button type="submit" className="w-full gold-btn py-3.5 rounded-xl font-bold uppercase tracking-wider mt-4">
             Proceed to WhatsApp
           </button>
        </form>
      </div>
    </div>
  );
}
