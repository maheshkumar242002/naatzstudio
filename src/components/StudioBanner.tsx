import React from 'react';
import { Phone, Mail, Camera, Gift, Frame, Car, Heart } from 'lucide-react';
import { PRIMARY_WHATSAPP_NUMBER, STUDIO_CALL_NUMBER } from '../utils/whatsapp';

export const StudioBanner: React.FC = () => {
  return (
    <footer className="relative bg-brand-black border-t-2 border-brand-yellow/30 text-white pt-12 pb-8 overflow-hidden">
      {/* Decorative yellow paint brush splashes on corners */}
      <div className="absolute top-0 right-0 w-64 h-24 bg-brand-yellow/15 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-32 bg-brand-yellow/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Studio Brand & Contact Cards Row directly matching poster */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center pb-10 border-b border-brand-border/60">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-dark border-2 border-brand-yellow flex items-center justify-center shadow-yellow-glow">
              <Camera className="w-6 h-6 text-brand-yellow" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-wider text-white font-display">NAATZ STUDIO</h3>
              <p className="text-[11px] text-brand-yellow font-bold uppercase tracking-wider">
                Creative Studio & Shop
              </p>
            </div>
          </div>

          {/* Call / WhatsApp */}
          <a
            href={`https://wa.me/91${PRIMARY_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-brand-card/80 border border-brand-border hover:border-brand-yellow/80 hover:bg-brand-card transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-yellow text-brand-black flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Order / WhatsApp</span>
              <span className="text-sm font-black text-white group-hover:text-brand-yellow transition-colors">
                +{PRIMARY_WHATSAPP_NUMBER}
              </span>
              <span className="text-[10px] text-slate-500 block">Alt: {STUDIO_CALL_NUMBER}</span>
            </div>
          </a>

          {/* Instagram with SVG */}
          <a
            href="https://instagram.com/hari_naatz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-brand-card/80 border border-brand-border hover:border-brand-yellow/80 hover:bg-brand-card transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Follow Us on Instagram</span>
              <span className="text-sm font-black text-white group-hover:text-brand-yellow transition-colors">
                @hari_naatz
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:harinaatz@gmail.com"
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-brand-card/80 border border-brand-border hover:border-brand-yellow/80 hover:bg-brand-card transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-dark border border-brand-yellow/40 text-brand-yellow flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Email Us</span>
              <span className="text-xs font-bold text-white group-hover:text-brand-yellow transition-colors break-all">
                harinaatz@gmail.com
              </span>
            </div>
          </a>

        </div>

        {/* Central Studio Slogan */}
        <div className="py-8 text-center space-y-2">
          <p className="text-2xl sm:text-3xl font-brush text-brand-yellow tracking-wide">
            "Let's Create Something Amazing Together"
          </p>
          <p className="text-xs text-slate-400 font-medium">
            Photo Frames • Personalized Gifts • Anime Collectibles • 1:24 Die-Cast Supercars • Mobile Service
          </p>
        </div>

        {/* 4 Poster Icons Row: Capture | Gift | Decorate | Drive */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-4 border-t border-b border-brand-border/40 text-xs font-bold text-slate-300">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-brand-yellow" />
            <span>Capture</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-brand-yellow" />
            <span>Gift</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <Frame className="w-4 h-4 text-brand-yellow" />
            <span>Decorate</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-brand-yellow" />
            <span>Drive</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} NAATZ STUDIO. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-brand-yellow fill-brand-yellow" /> for creative memories.
          </p>
        </div>

      </div>
    </footer>
  );
};
