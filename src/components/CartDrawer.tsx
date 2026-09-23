import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen sm:max-w-md bg-brand-dark border-l border-brand-border flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-brand-black/70 flex-shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-yellow" />
              <h2 className="text-base sm:text-lg font-bold text-white font-display">Studio Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-yellow/20 text-brand-yellow">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-brand-card flex items-center justify-center text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Discover our custom frames, anime collectibles, die-cast cars, and posters!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-brand-yellow text-brand-black font-extrabold text-xs shadow-yellow-glow"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-brand-card border border-brand-border/80 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-700 bg-brand-black flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors flex-shrink-0"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[10px] text-brand-yellow font-medium">
                        {item.product.categoryName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 sm:pt-2">
                      <span className="text-xs sm:text-sm font-black text-brand-yellow">
                        ₹{item.product.price * item.quantity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-brand-black px-2 py-0.5 sm:py-1 rounded-xl border border-slate-700">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-slate-400 hover:text-white p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-slate-400 hover:text-white p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-brand-border bg-brand-black/90 space-y-3.5 flex-shrink-0">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Delivery & Packing</span>
                  <span className="text-emerald-400 font-semibold">FREE (Promo)</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-black text-white pt-1.5 border-t border-slate-800">
                  <span>Total Payable</span>
                  <span className="text-brand-yellow text-base sm:text-lg">₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-black text-xs sm:text-sm transition-all shadow-yellow-glow active:scale-95"
              >
                <span>Enter Address & Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
