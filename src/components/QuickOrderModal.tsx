import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Product, ShippingAddress } from '../types';
import { generateCartWhatsAppUrl, PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface QuickOrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  product,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  if (!product) return null;

  const totalAmount = product.price * quantity;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!address.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!address.phone.trim() || address.phone.length < 10)
      errs.phone = 'Please enter a valid 10-digit mobile number';
    if (!address.streetAddress.trim())
      errs.streetAddress = 'Please enter door/house & street address';
    if (!address.city.trim()) errs.city = 'Please enter your city';
    if (!address.pincode.trim() || address.pincode.length < 6)
      errs.pincode = 'Please enter 6-digit postal code';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    confetti({
      particleCount: 80,
      spread: 60,
      colors: ['#FACC15', '#FFFFFF', '#090A0F'],
    });

    const items = [{ product, quantity, customNote: address.customizationDetails }];
    const url = generateCartWhatsAppUrl(items, address, totalAmount);
    setWhatsappLink(url);
    setIsSuccess(true);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[94vh] bg-brand-dark border border-brand-yellow/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border bg-brand-black flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 sm:p-2 rounded-xl bg-brand-yellow text-brand-black font-black text-sm">
              ⚡
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white font-display">
                Quick Order via WhatsApp
              </h3>
              <p className="text-[11px] text-brand-yellow font-medium">
                Dispatch to: <strong>+{PRIMARY_WHATSAPP_NUMBER}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-4 bg-brand-card overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-950/70 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-white">Order Sent to WhatsApp!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your order for <strong>{product.name}</strong> has been created with your delivery address.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-brand-yellow text-brand-black font-black text-xs shadow-yellow-glow"
              >
                Open WhatsApp (+{PRIMARY_WHATSAPP_NUMBER})
              </a>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleOrder} className="p-4 sm:p-6 space-y-3.5 bg-brand-card overflow-y-auto">
            {/* Product Summary Row */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-brand-black border border-brand-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-slate-900 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-brand-yellow font-bold uppercase">
                  {product.categoryName}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">{product.name}</h4>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-sm sm:text-base font-black text-brand-yellow">₹{product.price}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Free Delivery</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-1.5 bg-brand-card px-2 py-1 rounded-xl border border-slate-700 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-5 h-5 rounded text-slate-300 hover:text-white font-bold text-xs"
                >
                  -
                </button>
                <span className="text-xs font-bold text-white px-1">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-5 h-5 rounded text-slate-300 hover:text-white font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Address Form Inputs */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-400 mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                  />
                  {errors.phone && <p className="text-[10px] text-rose-400 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  House No., Street & Area *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 12/B, First Floor, Anna Nagar"
                  value={address.streetAddress}
                  onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
                {errors.streetAddress && (
                  <p className="text-[10px] text-rose-400 mt-0.5">{errors.streetAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chennai"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                  />
                  {errors.city && <p className="text-[10px] text-rose-400 mt-0.5">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="600001"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                  />
                  {errors.pincode && <p className="text-[10px] text-rose-400 mt-0.5">{errors.pincode}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Customization / Model Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Photo to be printed, Phone model, Color preference"
                  value={address.customizationDetails}
                  onChange={(e) => setAddress({ ...address, customizationDetails: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>

            {/* Total & Submit */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span>Total Amount:</span>
                <span className="text-base font-black text-brand-yellow">₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-black text-xs sm:text-sm shadow-yellow-glow"
              >
                <Send className="w-4 h-4" />
                <span>Confirm & Send to WhatsApp (+{PRIMARY_WHATSAPP_NUMBER})</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
