import React, { useState, useRef } from 'react';
import type { Product } from '../types';
import { Eye, ShoppingBag, Send, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpen3D: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpen3D,
  onAddToCart,
  onQuickOrder,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply 3D tilt on devices with hover capability
    if (window.matchMedia('(hover: none)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: none)').matches) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
      className="group relative flex flex-col justify-between bg-brand-card rounded-2xl sm:rounded-3xl border border-brand-border/80 hover:border-brand-yellow/50 overflow-hidden shadow-lg hover:shadow-yellow-glow transition-colors duration-300"
    >
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-black/30" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider rounded-lg bg-brand-yellow text-brand-black shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        {/* 3D View Floating Trigger */}
        <button
          onClick={() => onOpen3D(product)}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-brand-black/85 backdrop-blur-md border border-brand-yellow/40 text-brand-yellow text-[11px] sm:text-xs font-bold hover:bg-brand-yellow hover:text-brand-black transition-all shadow-md active:scale-95"
          title="Interactive 3D Inspector"
        >
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>3D View</span>
        </button>

        {/* Customizable Indicator */}
        {product.customizable && (
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-amber-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-400/30">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-yellow" />
            <span>Customizable</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-yellow/80">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-400 font-bold">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-1 mb-0.5">
            {product.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="pt-2.5 border-t border-brand-border/60">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-brand-yellow">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Free Delivery
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 rounded-xl text-xs font-bold transition-all border ${justAdded
                  ? 'bg-emerald-500 text-brand-black border-emerald-500'
                  : 'bg-brand-dark/90 hover:bg-slate-800 text-slate-200 border-brand-border hover:border-brand-yellow'
                }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="truncate">{justAdded ? 'Added!' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={() => onQuickOrder(product)}
              className="flex items-center justify-center gap-1 py-2 sm:py-2.5 px-2 rounded-xl bg-brand-yellow hover:bg-brand-gold text-brand-black text-xs font-black transition-all shadow-yellow-glow active:scale-95"
              title="Order on WhatsApp with 8220960818"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
