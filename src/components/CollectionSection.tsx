import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCTS } from '../data/skincareData';
import { Product } from '../types';
import { ArrowRight, Plus, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CollectionSectionProps {
  onProductClick: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onProductClick,
  onAddToCart
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const giantWordsRef = useRef<(HTMLDivElement | null)[]>([]);

  const giantWords = ['PURE', 'CARE', 'HYDRATE', 'SHIELD'];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background giant words across the screen on scroll
      giantWordsRef.current.forEach((wordEl, index) => {
        if (!wordEl) return;
        const direction = index % 2 === 0 ? -120 : 120;
        gsap.to(wordEl, {
          x: direction,
          ease: 'none',
          scrollTrigger: {
            trigger: wordEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        });
      });

      // Animate individual product showcase rows: scaling images, parallax text
      rowsRef.current.forEach((row, index) => {
        if (!row) return;
        const imgContainer = row.querySelector('.product-img-box');
        const textContainer = row.querySelector('.product-info-box');

        if (imgContainer) {
          gsap.fromTo(
            imgContainer,
            { scale: 0.88, y: 60, opacity: 0.85 },
            {
              scale: 1.05,
              y: -30,
              opacity: 1,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 1
              }
            }
          );
        }

        if (textContainer) {
          gsap.fromTo(
            textContainer,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 75%',
                end: 'top 40%',
                scrub: 0.5
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collection"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-white overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9F0FA] pb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#567C8E] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#58C5C5]" />
              <span>Curation & Formulations</span>
              <span className="text-[#83C9E5]">·</span>
              <span>Section 03</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1A3C4D] leading-[0.92]">
              THE SKINCARE <br />
              <span className="text-[#83C9E5]">COLLECTION.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#4A7285] leading-relaxed">
              Every formula is clinically designed around bio-compatible ceramides and multi-depth hydration. Pure textures engineered to heal, plump, and protect without compromise.
            </p>
          </div>
        </div>
      </div>

      {/* Dramatic Editorial Product Showcases (Alternating Asymmetric Rows) */}
      <div className="space-y-36 md:space-y-48 max-w-7xl mx-auto px-6 md:px-12">
        {PRODUCTS.map((product, idx) => {
          const isEven = idx % 2 === 0;
          const currentWord = giantWords[idx % giantWords.length];

          return (
            <div
              key={product.id}
              ref={(el) => {
                rowsRef.current[idx] = el;
              }}
              className="relative"
            >
              {/* Giant Background Word Scrubbing Behind the Row */}
              <div
                ref={(el) => {
                  giantWordsRef.current[idx] = el;
                }}
                className={`absolute top-1/2 -translate-y-1/2 font-display text-[26vw] md:text-[22vw] font-black uppercase tracking-tighter text-[#D9F0FA]/60 select-none pointer-events-none -z-0 ${
                  isEven ? '-left-[15%]' : '-right-[15%]'
                }`}
              >
                {currentWord}
              </div>

              {/* Product Content Grid */}
              <div
                className={`relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Product Image Column with 3D Float Box */}
                <div
                  className={`product-img-box lg:col-span-7 flex justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div
                    onClick={() => onProductClick(product.id)}
                    className="group relative cursor-pointer w-full max-w-lg rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-[#F3FAFD] to-white border border-[#D9F0FA] shadow-[0_30px_70px_-20px_rgba(131,201,229,0.35)] hover:shadow-[0_40px_80px_-15px_rgba(88,197,197,0.4)] transition-all duration-700"
                  >
                    {/* Image Container with delicate zoom */}
                    <div className="relative overflow-hidden rounded-2xl bg-white aspect-[3/4]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />

                      {/* Floating Texture Pill */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-xs text-[11px] font-semibold text-[#1A3C4D] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#58C5C5]" />
                        <span>{product.category}</span>
                      </div>

                      {/* Quick Discover overlay button */}
                      <div className="absolute inset-0 bg-[#1A3C4D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="px-6 py-2.5 rounded-full bg-white text-[#1A3C4D] text-xs font-bold tracking-wider uppercase shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                          Discover Details
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info Column */}
                <div
                  className={`product-info-box lg:col-span-5 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Metadata Header */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#58C5C5] uppercase tracking-wider">
                        Step 0{idx + 1} · {product.ritualStep}
                      </span>
                      <span className="text-[#83C9E5]">·</span>
                      <div className="flex items-center gap-1 text-xs text-[#567C8E]">
                        <Star className="w-3.5 h-3.5 fill-[#83C9E5] text-[#83C9E5]" />
                        <span className="font-bold text-[#1A3C4D]">{product.rating}</span>
                        <span>({product.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3
                        onClick={() => onProductClick(product.id)}
                        className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3C4D] leading-tight hover:text-[#4A96B7] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-base text-[#4A7285] font-medium mt-3 leading-relaxed">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Key Ingredients */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-[#567C8E] uppercase tracking-wider mb-2">
                        Active Bio-Lipids:
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-[#1A3C4D]">
                        {product.keyIngredients.map((ing, iIdx) => (
                          <span
                            key={iIdx}
                            className="bg-[#D9F0FA]/70 px-3 py-1 rounded-md text-[11px] font-medium text-[#254B62]"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Clinical Highlight */}
                    <div className="p-4 rounded-2xl bg-[#F4FAFD] border border-[#D9F0FA]">
                      <div className="flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-[#58C5C5] shrink-0 mt-0.5" />
                        <p className="text-xs font-medium text-[#2C5266] leading-relaxed">
                          {product.clinicalHighlights[0]}
                        </p>
                      </div>
                    </div>

                    {/* Pricing & Dual Action Buttons */}
                    <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#D9F0FA]">
                      <div>
                        <div className="text-2xl font-display font-extrabold text-[#1A3C4D] tabular-nums">
                          ${product.price}
                        </div>
                        <div className="text-[11px] text-[#567C8E] font-medium">
                          {product.size} · Free Delivery
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onProductClick(product.id)}
                          className="px-5 py-3 rounded-full text-xs font-bold text-[#1A3C4D] hover:text-[#58C5C5] hover:bg-[#D9F0FA]/60 transition-colors uppercase tracking-wider"
                        >
                          Discover Product
                        </button>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#58C5C5] text-white hover:bg-[#47b2b2] text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                        >
                          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                          <span>Add to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
