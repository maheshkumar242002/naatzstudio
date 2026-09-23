import React from 'react';
import { ShoppingBag, Search, Sparkles, MessageCircle } from 'lucide-react';
import { PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-brand-black/90 backdrop-blur-xl border-b border-brand-border/60 transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-brand-yellow text-brand-black text-xs font-bold py-1 px-4 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 mx-auto sm:mx-0 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>✨ FREE DELIVERY ON ALL CUSTOM PHOTO FRAMES & ORDERS OVER ₹799!</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-semibold">
          <span>Direct WhatsApp: <strong>+{PRIMARY_WHATSAPP_NUMBER}</strong></span>
          <span>•</span>
          <span>Insta: <strong>@hari_naatz</strong></span>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Poster Title */}
        <div
          onClick={() => onSelectCategory(null)}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Camera Lens Emblem */}
          <div className="relative w-10 h-10 rounded-xl bg-brand-dark border-2 border-brand-yellow flex items-center justify-center shadow-yellow-glow group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 rounded-full border-2 border-brand-yellow bg-brand-black flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
            </div>
            {/* Shutter Accent */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-brand-yellow animate-ping" />
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-brand-yellow transition-colors font-display">
                NAATZ
              </span>
              <span className="text-xl sm:text-2xl font-black text-brand-yellow font-display">
                STUDIO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              Capture • Create • Decorate • Drive
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search frames, anime toys, posters, die-cast cars..."
            className="w-full pl-10 pr-4 py-2 bg-brand-card/80 border border-brand-border rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow transition-all"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick WhatsApp Contact */}
          <a
            href={`https://wa.me/91${PRIMARY_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-brand-black transition-all text-xs font-bold"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>8220960818</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-extrabold text-sm transition-all shadow-yellow-glow active:scale-95"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-brand-black text-brand-yellow text-xs font-black flex items-center justify-center ml-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search frames, gifts, cars, anime toys..."
            className="w-full pl-9 pr-4 py-2 bg-brand-card border border-brand-border rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-yellow"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
