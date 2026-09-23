import React, { useState } from 'react';
import { X, Send, MapPin, User, Phone, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CartItem, ShippingAddress } from '../types';
import { generateCartWhatsAppUrl, PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    phone: '',
    streetAddress: '',
    landmark: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    customizationDetails: '',
    paymentMethod: 'whatsapp_pay',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!address.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!address.phone.trim() || address.phone.length < 10)
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    if (!address.streetAddress.trim())
      newErrors.streetAddress = 'Please enter your door no & street address';
    if (!address.city.trim()) newErrors.city = 'Please enter your city / town';
    if (!address.pincode.trim() || address.pincode.length < 6)
      newErrors.pincode = 'Please enter a valid 6-digit postal pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FACC15', '#FEE715', '#EAB308', '#FFFFFF', '#090A0F'],
    });

    const url = generateCartWhatsAppUrl(items, address, totalAmount);
    setGeneratedWhatsAppUrl(url);
    setOrderPlaced(true);

    window.open(url, '_blank');
  };

  const handleFinish = () => {
    onOrderSuccess();
    setOrderPlaced(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[94vh] bg-brand-dark border border-brand-yellow/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border bg-brand-black/80 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-brand-yellow/15 text-brand-yellow border border-brand-yellow/30 flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-display">
                {orderPlaced ? 'Order Ready for WhatsApp!' : 'Delivery Address & WhatsApp Checkout'}
              </h2>
              <p className="text-[11px] sm:text-xs text-brand-yellow font-medium">
                Sent to: <strong>+{PRIMARY_WHATSAPP_NUMBER}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrollable) */}
        {orderPlaced ? (
          <div className="p-5 sm:p-8 text-center space-y-5 bg-brand-card overflow-y-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-950/60 border-2 border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">Opening WhatsApp to Confirm!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                We have prepared your order details and delivery address for WhatsApp number{' '}
                <strong className="text-brand-yellow">+{PRIMARY_WHATSAPP_NUMBER}</strong>.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-brand-black/80 border border-slate-700 text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="text-brand-yellow font-bold uppercase tracking-wider mb-1">
                📍 Order Dispatch Summary:
              </div>
              <p className="text-slate-300">
                <strong>Recipient:</strong> {address.fullName} ({address.phone})
              </p>
              <p className="text-slate-300">
                <strong>Address:</strong> {address.streetAddress}, {address.city}, {address.state} - {address.pincode}
              </p>
              <p className="text-slate-300">
                <strong>Items:</strong> {items.length} item(s) • Total: <strong>₹{totalAmount}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center pt-2">
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-brand-black font-black text-xs sm:text-sm shadow-lg transition-transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>Open in WhatsApp (+{PRIMARY_WHATSAPP_NUMBER})</span>
              </a>

              <button
                onClick={handleFinish}
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700"
              >
                Clear Cart & Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 bg-brand-card overflow-y-auto">
            {/* Quick Order Overview Banner */}
            <div className="p-3 rounded-2xl bg-brand-black/70 border border-brand-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-brand-yellow" />
                <span>
                  {items.length} Item(s) | Grand Total:
                </span>
              </div>
              <span className="text-base sm:text-lg font-black text-brand-yellow">₹{totalAmount}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hari Naatz"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
                {errors.fullName && <p className="text-[10px] text-rose-400 mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Mobile / WhatsApp Number *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 82209608180"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-brand-black border border-brand-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
                {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Flat, House No., Building, Street Address *
              </label>
              <textarea
                required
                rows={2}
                placeholder="e.g. No. 42, Cross Street, Near Studio Junction"
                value={address.streetAddress}
                onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
              />
              {errors.streetAddress && (
                <p className="text-[10px] text-rose-400 mt-1">{errors.streetAddress}</p>
              )}
            </div>

            {/* Landmark, City, State, Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="Near Temple / School"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chennai / Madurai"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
                {errors.city && <p className="text-[10px] text-rose-400 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="600001"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
                {errors.pincode && <p className="text-[10px] text-rose-400 mt-1">{errors.pincode}</p>}
              </div>
            </div>

            {/* Customization Details Note */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Customization Details & Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Photo details, Phone model for cover, Car color preference"
                value={address.customizationDetails}
                onChange={(e) => setAddress({ ...address, customizationDetails: e.target.value })}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Preferred Payment Mode:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'whatsapp_pay', label: 'WhatsApp UPI', desc: 'GPay / PhonePe / Paytm' },
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when delivered' },
                  { id: 'upi', label: 'Direct QR Pay', desc: 'Instant Studio UPI' },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setAddress({ ...address, paymentMethod: m.id as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${address.paymentMethod === m.id
                        ? 'border-brand-yellow bg-brand-yellow/15 text-white'
                        : 'border-brand-border bg-brand-black/60 text-slate-400 hover:border-slate-600'
                      }`}
                  >
                    <span className="block text-xs font-bold text-white">{m.label}</span>
                    <span className="block text-[10px] text-slate-400">{m.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 px-6 rounded-2xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-black text-sm sm:text-base shadow-yellow-glow-lg transition-transform hover:scale-[1.01] active:scale-95"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Place Order on WhatsApp (+{PRIMARY_WHATSAPP_NUMBER})</span>
              </button>
              <p className="text-center text-[10px] sm:text-[11px] text-slate-400 mt-2 font-mono">
                🔒 Orders directly sent with your address to Naatz Studio WhatsApp
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
