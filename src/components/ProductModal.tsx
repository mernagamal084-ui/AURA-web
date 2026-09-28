import React from 'react';
import { Product } from '../types';
import { X, Check, Plus, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A3C4D]/40 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-[#D9F0FA] z-10 overflow-hidden my-8">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-6 right-6 p-2 rounded-full text-[#567C8E] hover:text-[#1A3C4D] hover:bg-[#F4FAFD] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Product Image & Texture */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F3FAFD] border border-[#D9F0FA]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-bold text-[#1A3C4D] uppercase">
                {product.category}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F4FAFD] border border-[#D9F0FA] text-xs text-[#254B62]">
              <span className="font-bold text-[#1A3C4D] block mb-1">Sensory Texture:</span>
              {product.textureDescription}
            </div>
          </div>

          {/* Product Specifications & Details */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-xs text-[#83C9E5]">
                  <Star className="w-3.5 h-3.5 fill-[#83C9E5]" />
                  <span className="font-bold text-[#1A3C4D]">{product.rating}</span>
                  <span className="text-[#567C8E]">({product.reviewsCount} reviews)</span>
                </div>
                <span className="text-[#D9F0FA]">·</span>
                <span className="text-xs font-bold text-[#58C5C5] uppercase">
                  {product.ritualStep}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1A3C4D] leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#567C8E] mt-1">{product.size}</p>
            </div>

            <p className="text-sm text-[#3E6578] leading-relaxed">
              {product.description}
            </p>

            {/* Clinical Evidence */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3C4D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#58C5C5]" />
                <span>Clinical Trials:</span>
              </div>
              <ul className="space-y-1.5">
                {product.clinicalHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#4A7285]">
                    <Check className="w-3.5 h-3.5 text-[#58C5C5] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Active Lipids */}
            <div>
              <div className="text-[11px] font-bold text-[#567C8E] uppercase tracking-wider mb-2">
                Active Bio-Lipids:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.keyIngredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-[#D9F0FA] text-[#1A3C4D] px-2.5 py-1 rounded-md"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing and Action */}
            <div className="pt-4 border-t border-[#D9F0FA] flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-display font-black text-[#1A3C4D] tabular-nums">
                  ${product.price}
                </div>
                <div className="text-[10px] text-[#58C5C5] font-semibold">
                  In Stock · Ready to Ship
                </div>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#58C5C5] hover:bg-[#48b5b5] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
