import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, ShieldCheck, Truck, Package, MapPin, Compass, AlertCircle } from 'lucide-react';

// Cheruvappadi Volleyball Court Studio Origin Coordinates (Hosdurg, Kerala 671313)
const CHERUVAPPADI_LAT = 12.3059;
const CHERUVAPPADI_LNG = 75.0947;

// Haversine formula to calculate distance in km between two GPS coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

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

  const [gpsState, setGpsState] = useState({
    detecting: false,
    detected: false,
    distanceKm: null,
    error: null,
    lat: null,
    lng: null,
  });

  // Base price extraction
  const basePrice = parseInt(product.price.replace(/[^\d]/g, ''), 10);

  // Dynamic delivery charge calculation based on distance from Cheruvappadi
  // User spec: Maximum applicable local delivery is 50 km. 
  // 50+ km is Speed Post (flat ₹40) and distance details are not shown to the user in the UI.
  let deliveryCharge = 40; // Default / Speed Post flat rate
  let isLocalDelivery = false;

  if (gpsState.detected && gpsState.distanceKm !== null) {
    if (gpsState.distanceKm <= 50) {
      isLocalDelivery = true;
      if (gpsState.distanceKm <= 5) {
        deliveryCharge = 20;
      } else {
        const extraKm = Math.ceil(gpsState.distanceKm - 5);
        deliveryCharge = 20 + extraKm * 10;
      }
    } else {
      // distance > 50km -> Speed post flat rate ₹40, hide local distance calculations in UI
      isLocalDelivery = false;
      deliveryCharge = 40;
    }
  }

  const totalPrice = basePrice + deliveryCharge;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // GPS Location Detection Handler
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsState(prev => ({ ...prev, error: 'GPS is not supported by your browser.' }));
      return;
    }

    setGpsState({ detecting: true, detected: false, distanceKm: null, error: null, lat: null, lng: null });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const dist = calculateDistance(CHERUVAPPADI_LAT, CHERUVAPPADI_LNG, latitude, longitude);
        
        setGpsState({
          detecting: false,
          detected: true,
          distanceKm: dist,
          error: null,
          lat: latitude,
          lng: longitude,
        });

        // Attempt reverse geocoding via OpenStreetMap Nominatim API to auto-fill City and Pincode
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.county || form.city;
            const pincode = data.address.postcode || form.pincode;
            const road = data.address.road || data.address.suburb || '';
            
            setForm(prev => ({
              ...prev,
              city: city || prev.city,
              pincode: pincode || prev.pincode,
              address: prev.address ? prev.address : road,
            }));
          }
        } catch (err) {
          console.warn('Reverse geocoding failed:', err);
        }
      },
      (error) => {
        let errorMsg = 'Failed to detect location.';
        if (error.code === 1) errorMsg = 'GPS location access was denied.';
        if (error.code === 2) errorMsg = 'GPS location is currently unavailable.';
        if (error.code === 3) errorMsg = 'GPS location detection timed out.';
        setGpsState({ detecting: false, detected: false, distanceKm: null, error: errorMsg, lat: null, lng: null });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    // Construct absolute URL for WhatsApp Rich Link Preview
    const baseUrl = window.location.origin;
    const imageUrl = `${baseUrl}${product.image}`;

    // GPS tracking info for studio owner (always include for admin reference)
    let gpsString = 'Not detected / Manual Address';
    if (gpsState.detected) {
      gpsString = `${gpsState.distanceKm.toFixed(1)} km from Cheruvappadi Studio (${isLocalDelivery ? 'Local Delivery' : 'Speed Post Shipping'})\n• Google Maps Pin: https://maps.google.com/?q=${gpsState.lat},${gpsState.lng}`;
    }

    const message = `*NEW ORDER INQUIRY* ✦ Veloura Handmade
-----------------------------------------
*Product Details:*
• Item: ${product.name}
• Price: ₹${basePrice}
• Delivery Charge: ₹${deliveryCharge} ${isLocalDelivery ? `(Calculated via GPS distance: ${gpsState.distanceKm.toFixed(1)} km from Cheruvappadi)` : '(Speed Post Flat Rate)'}
• *Total Payable: ₹${totalPrice}*

*Product Image:*
${imageUrl}

*Customer & Shipping Details:*
• Name: ${form.name}
• Phone: ${form.phone}
• Address: ${form.address}, ${form.city} - ${form.pincode}
• Special Notes: ${form.notes || 'None'}

*GPS Delivery Distance & Pin:*
• ${gpsString}

-----------------------------------------
*Payment Mode:* Cash on Delivery / UPI Inquiry`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '919497219574';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-36 pb-32 px-6 md:px-12 bg-[var(--bg)] transition-colors duration-300 select-none">
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
                
                {/* Delivery Charge Display with GPS Status */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[var(--text-muted)] items-center">
                    <span className="flex items-center gap-2">
                      <Truck size={14} className="text-[var(--accent)]" /> Delivery Charge
                    </span>
                    <span className="font-bold text-[var(--text)]">₹{deliveryCharge}</span>
                  </div>
                  {isLocalDelivery && (
                    <span className="text-[10px] text-[var(--accent-secondary)] font-bold flex items-center gap-1 mt-0.5">
                      <MapPin size={10} /> Local Studio Delivery ({gpsState.distanceKm.toFixed(1)} km)
                    </span>
                  )}
                  {!gpsState.detected && (
                    <span className="text-[10px] text-[var(--text-muted)] italic mt-0.5">
                      (Detect GPS below for local Cheruvappadi delivery rates)
                    </span>
                  )}
                  {gpsState.detected && !isLocalDelivery && (
                    <span className="text-[10px] text-[var(--text-muted)] italic mt-0.5">
                      (Standard Speed Post Delivery)
                    </span>
                  )}
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

          {/* Right Column: Checkout Form with GPS Detection */}
          <div className="lg:col-span-7 card-minimal p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[var(--border)] pb-6">
              <div>
                <h2 className="font-heading text-3xl font-bold text-[var(--text)] mb-1 tracking-tight">
                  Shipping & Contact
                </h2>
                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                  Please enter your delivery details below.
                </p>
              </div>

              {/* GPS Detection Button */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={gpsState.detecting}
                className="secondary-btn flex items-center justify-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-widest shadow-md hover:scale-105 transition-all flex-shrink-0 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Compass size={16} className={gpsState.detecting ? 'animate-spin' : ''} />
                {gpsState.detecting ? 'Detecting GPS...' : 'Detect GPS Location'}
              </button>
            </div>

            {/* GPS Status / Error Banners */}
            {gpsState.error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-3 font-medium">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{gpsState.error} Please enter your address manually below.</span>
              </div>
            )}

            {gpsState.detected && isLocalDelivery && (
              <div className="mb-6 p-4 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--text)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-medium shadow-sm">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[var(--accent)] flex-shrink-0" />
                  <span>Local Delivery Eligible: <strong>{gpsState.distanceKm.toFixed(1)} km</strong> from Studio.</span>
                </div>
                <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit sm:w-auto">
                  Delivery Charge: ₹{deliveryCharge}
                </span>
              </div>
            )}

            {gpsState.detected && !isLocalDelivery && (
              <div className="mb-6 p-4 rounded-2xl bg-[var(--border)]/20 border border-[var(--border)] text-[var(--text)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-medium shadow-sm">
                <div className="flex items-center gap-3">
                  <Truck size={16} className="text-[var(--accent)] flex-shrink-0" />
                  <span>Location detected. Eligible for nationwide Speed Post shipping.</span>
                </div>
                <span className="bg-[var(--accent)] text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit sm:w-auto whitespace-nowrap">
                  Speed Post: ₹40
                </span>
              </div>
            )}

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
