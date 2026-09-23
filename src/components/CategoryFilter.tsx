import React from 'react';
import { CATEGORIES } from '../data/products';
import type { CategoryId } from '../types';
import { 
  Frame, 
  Gift, 
  Palette, 
  Smartphone, 
  Wrench, 
  BookOpen, 
  Sparkles, 
  Car,
  LayoutGrid
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryId | null;
  onSelectCategory: (id: CategoryId | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Frame': return <Frame className="w-4 h-4" />;
      case 'Gift': return <Gift className="w-4 h-4" />;
      case 'Palette': return <Palette className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Car': return <Car className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full py-4 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2.5 min-w-max pb-2">
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
            selectedCategory === null
              ? 'bg-brand-yellow text-brand-black shadow-yellow-glow scale-105'
              : 'bg-brand-card/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-brand-border'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>All Studio Products</span>
        </button>

        {/* 8 Poster Categories */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                isSelected
                  ? 'bg-brand-yellow text-brand-black shadow-yellow-glow scale-105'
                  : 'bg-brand-card/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-brand-border'
              }`}
            >
              <span className={isSelected ? 'text-brand-black' : 'text-brand-yellow'}>
                {getIcon(cat.iconName)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
