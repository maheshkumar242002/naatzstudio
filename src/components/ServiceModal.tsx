import React, { useState } from 'react';
import { X, Wrench, Send, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateServiceBookingWhatsAppUrl, PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose }) => {
  const [serviceType, setServiceType] = useState('Screen Replacement');
  const [phoneModel, setPhoneModel] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phoneModel || !phone) return;

    confetti({
      particleCount: 70,
      spread: 60,
      colors: ['#FACC15', '#38BDF8', '#FFFFFF'],
    });

    const url = generateServiceBookingWhatsAppUrl(
      serviceType,
      phoneModel,
      issueDetails || 'General diagnosis & service required',
      `${customerName} (${phone})`,
      address || 'Studio Walk-in / Contact for pickup'
    );

    setWhatsappLink(url);
    setIsBooked(true);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-brand-dark border border-brand-yellow/30 rounded-3xl overflow-hidden shadow-2xl my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-brand-border bg-brand-black flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-brand-yellow text-brand-black">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white font-display">
                Naatz Mobile Service Desk
              </h3>
              <p className="text-xs text-brand-yellow font-medium">
                All Brands • Screen • Battery • Software
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isBooked ? (
          <div className="p-8 text-center space-y-4 bg-brand-card">
            <div className="w-16 h-16 rounded-full bg-emerald-950/70 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-white">Booking Sent via WhatsApp!</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our technician at Naatz Studio will review your device details for <strong>{phoneModel}</strong> and reply shortly.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-brand-yellow text-brand-black font-black text-xs shadow-yellow-glow"
              >
                Open WhatsApp (+{PRIMARY_WHATSAPP_NUMBER})
              </a>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 bg-brand-card">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Select Service</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Screen Replacement',
                  'Battery Replacement',
                  'Software Update',
                  'Accessories Fitting',
                  'Charging Port Repair',
                  'Full Diagnostic',
                ].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setServiceType(s)}
                    className={`p-2 rounded-xl border text-left font-medium transition-all ${
                      serviceType === s
                        ? 'border-brand-yellow bg-brand-yellow/15 text-brand-yellow font-bold'
                        : 'border-brand-border bg-brand-black/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Device Model & Issue */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mobile Model & Brand *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 13 / Redmi Note 12"
                  value={phoneModel}
                  onChange={(e) => setPhoneModel(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Pickup Address / Location (Optional)
              </label>
              <input
                type="text"
                placeholder="Street, City, Landmark (or Walk-in)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Issue Details</label>
              <textarea
                rows={2}
                placeholder="Describe screen flicker, battery drain, touch not responding, etc."
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-black text-sm shadow-yellow-glow"
            >
              <Send className="w-4 h-4" />
              <span>Book Service via WhatsApp (+{PRIMARY_WHATSAPP_NUMBER})</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
