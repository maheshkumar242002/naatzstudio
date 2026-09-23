import React, { useState, useEffect, useMemo } from 'react';
import type { Product, CartItem, CategoryId } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickOrderModal } from './components/QuickOrderModal';
import { Product3DModal } from './components/3d/Product3DModal';
import { ServiceModal } from './components/ServiceModal';
import { StudioBanner } from './components/StudioBanner';
import { 
  Sparkles, 
  SlidersHorizontal, 
  MessageCircle, 
  Wrench, 
  Check, 
  Flame, 
  Home, 
  Grid, 
  ShoppingBag 
} from 'lucide-react';
import { PRIMARY_WHATSAPP_NUMBER } from './utils/whatsapp';

export const App: React.FC = () => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('naatz_studio_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('naatz_studio_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cartItems]);

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [product3D, setProduct3D] = useState<Product | null>(null);
  const [quickOrderProduct, setQuickOrderProduct] = useState<Product | null>(null);

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleDirectWhatsAppOrder = (product: Product) => {
    setQuickOrderProduct(product);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const scrollToProducts = () => {
    const el = document.getElementById('studio-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-black text-slate-100 flex flex-col font-sans selection:bg-brand-yellow selection:text-brand-black pb-20 md:pb-0">
      {/* Global Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={(cat) => setSelectedCategory(cat as CategoryId | null)}
      />

      <main className="flex-1">
        {/* Hero Section with Live 3D Studio */}
        <Hero onExploreClick={scrollToProducts} />

        {/* Featured Poster Highlights Strip */}
        <section className="bg-brand-card/30 border-y border-brand-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="p-2 rounded-xl bg-brand-yellow text-brand-black font-black flex-shrink-0">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-brand-black" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white">Original Poster Products</h4>
                  <p className="text-[11px] sm:text-xs text-brand-yellow">
                    Frames • Gifts • Posters • Mobile • Service • Albums • Anime • Die-Cast Cars
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <a
                  href="/images/naatz_poster.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-yellow/15 border border-brand-yellow/40 hover:bg-brand-yellow hover:text-brand-black text-brand-yellow text-xs font-bold transition-all"
                  title="View Full Original Poster"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Original Poster HD</span>
                </a>

                {/* Service booking CTA button */}
                <button
                  onClick={() => setIsServiceModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-brand-dark hover:bg-slate-800 border border-brand-border hover:border-brand-yellow text-xs font-bold text-slate-200 transition-all"
                >
                  <Wrench className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Book Service</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="studio-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Studio Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
                Explore All Creations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Handpicked quality items crafted and curated right in Naatz Studio.
              </p>
            </div>

            {/* Sort & Filter controls */}
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div className="flex items-center gap-2 bg-brand-card px-3 py-2 rounded-xl border border-brand-border text-xs text-slate-300">
                <SlidersHorizontal className="w-4 h-4 text-brand-yellow" />
                <span className="hidden sm:inline font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  <option value="featured" className="bg-brand-card">Featured</option>
                  <option value="price-low" className="bg-brand-card">Price: Low to High</option>
                  <option value="price-high" className="bg-brand-card">Price: High to Low</option>
                  <option value="rating" className="bg-brand-card">Top Rated</option>
                </select>
              </div>

              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-brand-yellow underline hover:text-white"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>

          {/* 8 Categories Filter Pills */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Products Grid (1 col on tiny mobile, 2 cols on mobile/tablet, 3-4 cols on desktop) */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-lg font-bold text-white">No products found for "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-yellow text-brand-black font-bold text-xs"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen3D={(p) => setProduct3D(p)}
                  onAddToCart={handleAddToCart}
                  onQuickOrder={handleDirectWhatsAppOrder}
                />
              ))}
            </div>
          )}

          {/* Mobile Service Feature Card Showcase (From Poster) */}
          <div className="mt-12 sm:mt-16 p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-card via-brand-dark to-brand-card border border-brand-yellow/30 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-lg bg-brand-yellow text-brand-black">
                  On-Site Studio Service
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-display">
                  Mobile Service (All Brands) & Quick Repairs
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Screen Replacement (AMOLED/OLED), High-Capacity Battery Replacement, Software Updates,
                  Tempered Glass fitting, and original spare accessories fitting. Book directly via WhatsApp!
                </p>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 pt-2 text-xs font-bold text-brand-yellow">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Screen Replacement
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Battery Replacement
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Software Update
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Accessories Fitting
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 sm:gap-3 justify-end">
                <button
                  onClick={() => setIsServiceModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-2xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-black text-xs sm:text-sm shadow-yellow-glow"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book Mobile Service</span>
                </button>

                <a
                  href={`https://wa.me/91${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Naatz Studio! I need mobile service/screen replacement for my phone.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-2xl bg-brand-black hover:bg-slate-900 border border-slate-700 text-white font-bold text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp (+{PRIMARY_WHATSAPP_NUMBER})</span>
                </a>
              </div>
            </div>
          </div>

        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* WhatsApp Checkout with Address Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleClearCart}
      />

      {/* Quick Order Single Item Modal */}
      <QuickOrderModal
        product={quickOrderProduct}
        onClose={() => setQuickOrderProduct(null)}
      />

      {/* 360° Real-time 3D Inspector Modal */}
      <Product3DModal
        product={product3D}
        onClose={() => setProduct3D(null)}
        onAddToCart={handleAddToCart}
        onDirectWhatsApp={(p) => {
          setProduct3D(null);
          setQuickOrderProduct(p);
        }}
      />

      {/* Mobile Service Booking Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />

      {/* Footer Banner matching poster */}
      <StudioBanner />

      {/* Mobile Fixed Bottom App Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-brand-black/95 backdrop-blur-xl border-t border-brand-border/80 px-2 py-1.5 md:hidden flex items-center justify-around">
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-yellow p-1"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        <button
          onClick={scrollToProducts}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-yellow p-1"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Catalog</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-yellow p-1"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-medium">Cart</span>
          {totalCartCount > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-brand-yellow text-brand-black text-[9px] font-black flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsServiceModalOpen(true)}
          className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-brand-yellow p-1"
        >
          <Wrench className="w-5 h-5" />
          <span className="text-[10px] font-medium">Repair</span>
        </button>

        <a
          href={`https://wa.me/91${PRIMARY_WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-yellow text-brand-black font-black text-xs shadow-yellow-glow"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </nav>
    </div>
  );
};

export default App;
