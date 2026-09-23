import React from 'react';
import { Hero3DStudio } from './3d/Hero3DStudio';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { PRIMARY_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Brand Story & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tagline Badge from Poster */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YOUR MEMORIES... OUR CREATION...</span>
            </div>

            {/* Poster Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-display">
                Welcome to <br />
                <span className="text-brand-yellow relative inline-block">
                  NAATZ STUDIO
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-brand-yellow/40 skew-x-12 rounded-full" />
                </span>
              </h1>

              <p className="text-xl sm:text-2xl font-extrabold text-slate-200 font-brush tracking-wide pt-2">
                "More Than Just a Shop... <br className="hidden sm:inline" />
                <span className="text-brand-yellow underline decoration-brand-yellow decoration-wavy decoration-2">
                  It's Your Creative Space!
                </span>"
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              We specialize in custom handcrafted photo frames, personalized luxury gifts,
              collector anime action figures, 1:24 die-cast supercars, wall art posters,
              and professional mobile repair. Explore our interactive 3D studio and order directly via WhatsApp!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-extrabold text-sm sm:text-base transition-all shadow-yellow-glow-lg hover:scale-105 active:scale-95"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/91${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Naatz Studio! I would like to inquire about custom orders.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand-dark/90 hover:bg-slate-800 text-white font-bold text-sm sm:text-base transition-all border border-brand-border hover:border-brand-yellow"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Custom Order (8220960818)</span>
              </a>
            </div>

            {/* 4 Core Pillars from poster: Capture, Create, Decorate, Drive */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-brand-border/60">
              <div className="p-2.5 rounded-xl bg-brand-card/50 border border-brand-border/40">
                <span className="text-brand-yellow text-xs font-black block">📸 CAPTURE</span>
                <span className="text-[11px] text-slate-400">Photo & Albums</span>
              </div>
              <div className="p-2.5 rounded-xl bg-brand-card/50 border border-brand-border/40">
                <span className="text-brand-yellow text-xs font-black block">🎁 CREATE</span>
                <span className="text-[11px] text-slate-400">Custom Gifts</span>
              </div>
              <div className="p-2.5 rounded-xl bg-brand-card/50 border border-brand-border/40">
                <span className="text-brand-yellow text-xs font-black block">🖼️ DECORATE</span>
                <span className="text-[11px] text-slate-400">Frames & Posters</span>
              </div>
              <div className="p-2.5 rounded-xl bg-brand-card/50 border border-brand-border/40">
                <span className="text-brand-yellow text-xs font-black block">🏎️ DRIVE</span>
                <span className="text-[11px] text-slate-400">Die-Cast Models</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Studio Interactive Canvas */}
          <div className="lg:col-span-6 relative">
            <Hero3DStudio />
          </div>

        </div>

        {/* Feature Badges Bar */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-brand-border">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-brand-card/40 border border-brand-border">
            <div className="p-2.5 rounded-xl bg-brand-yellow/10 text-brand-yellow">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Quality Guaranteed</h4>
              <p className="text-xs text-slate-400">Archival photo prints & authentic collectibles</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-brand-card/40 border border-brand-border">
            <div className="p-2.5 rounded-xl bg-brand-yellow/10 text-brand-yellow">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Fast Courier Dispatch</h4>
              <p className="text-xs text-slate-400">Careful multi-layer bubble packing on all frames</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-brand-card/40 border border-brand-border">
            <div className="p-2.5 rounded-xl bg-brand-yellow/10 text-brand-yellow">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct WhatsApp Support</h4>
              <p className="text-xs text-slate-400">Quick proofing & address updates on 8220960818</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
