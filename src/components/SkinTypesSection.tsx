import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKIN_TYPES, PRODUCTS } from '../data/skincareData';
import { SkinTypeProfile } from '../types';
import { ArrowRight, Droplets, Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkinTypesSectionProps {
  onProductClick: (id: string) => void;
  onOpenConsult: () => void;
}

export const SkinTypesSection: React.FC<SkinTypesSectionProps> = ({
  onProductClick,
  onOpenConsult
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedSkinType, setSelectedSkinType] = useState<SkinTypeProfile>(SKIN_TYPES[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background large typography scrub
      gsap.to(bgTextRef.current, {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      // Cards staggered entry and asymmetric parallax
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const yOffset = index % 2 === 0 ? 60 : 120;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: yOffset,
            rotate: index % 2 === 0 ? -1.5 : 1.5
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.8
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skin-types"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 bg-[#D9F0FA] overflow-hidden"
    >
      {/* Huge Background Typography Scrub */}
      <div
        ref={bgTextRef}
        className="absolute top-12 left-0 font-display text-[22vw] font-black uppercase text-white/50 tracking-tighter whitespace-nowrap pointer-events-none select-none z-0"
      >
        BARRIER · EPIDERMIS · LIPIDS
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        {/* Section Header */}
        <div ref={headlineRef} className="max-w-3xl mb-16 md:mb-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#567C8E] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58C5C5]" />
            <span>Cellular Typology</span>
            <span className="text-[#83C9E5]">·</span>
            <span>Section 02</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#1A3C4D] leading-[0.95] mb-6">
            GET TO KNOW <br />
            <span className="text-[#4A96B7]">YOUR SKIN.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#3E6578] font-normal leading-relaxed max-w-2xl">
            Healthy skin is not a standard type—it is a living ecosystem. Select your skin state to examine its cellular moisture deficit and unlock targeted physiological replenishment.
          </p>
        </div>

        {/* Asymmetrical 4-Card Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {SKIN_TYPES.map((type, idx) => {
            const isSelected = selectedSkinType.id === type.id;
            // Asymmetrical positioning offsets
            const offsetClasses =
              idx === 1
                ? 'md:mt-12'
                : idx === 2
                ? 'md:-mt-6'
                : idx === 3
                ? 'md:mt-6'
                : '';

            return (
              <div
                key={type.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onClick={() => setSelectedSkinType(type)}
                className={`group cursor-pointer rounded-3xl p-8 sm:p-10 transition-all duration-500 backdrop-blur-md ${offsetClasses} ${
                  isSelected
                    ? 'bg-white shadow-[0_20px_50px_-10px_rgba(74,150,183,0.3)] border-2 border-[#58C5C5] scale-[1.02]'
                    : 'bg-white/75 hover:bg-white/95 border border-white/80 shadow-[0_10px_30px_-8px_rgba(131,201,229,0.25)] hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold text-[#58C5C5] uppercase tracking-wider">
                      {type.kicker}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#1A3C4D] mt-1 group-hover:text-[#4A96B7] transition-colors">
                      {type.name}
                    </h3>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#58C5C5] text-white shadow-sm'
                        : 'bg-[#D9F0FA] text-[#4A7285] group-hover:bg-[#83C9E5] group-hover:text-white'
                    }`}
                  >
                    {isSelected ? <Check className="w-5 h-5" /> : <Droplets className="w-4 h-4" />}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#3E6578] font-medium leading-relaxed mb-6">
                  {type.headline}
                </p>

                {/* Characteristics list */}
                <div className="space-y-2.5 pt-4 border-t border-[#D9F0FA]">
                  {type.characteristics.map((char, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2.5 text-xs text-[#567C8E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#83C9E5] shrink-0" />
                      <span>{char}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#D9F0FA]/60">
                  <div className="text-[11px] font-semibold tracking-wider text-[#58C5C5] uppercase">
                    Barrier State
                  </div>
                  <span className="text-xs font-bold text-[#1A3C4D] group-hover:text-[#58C5C5] flex items-center gap-1">
                    <span>{isSelected ? 'Regimen Active' : 'View Protocol'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Skin Type Targeted Protocol Showcase */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(74,150,183,0.25)] border border-[#83C9E5]/30">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-[#D9F0FA]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#58C5C5] mb-2">
                <Sparkles className="w-4 h-4 text-[#58C5C5]" />
                <span>Recommended Barrier Protocol for {selectedSkinType.name}</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1A3C4D]">
                {selectedSkinType.ritualSummary}
              </h4>
            </div>

            <button
              onClick={onOpenConsult}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A3C4D] text-white hover:bg-[#58C5C5] transition-all text-xs font-semibold tracking-wider uppercase whitespace-nowrap shadow-md"
            >
              <span>Full Barrier Diagnostic Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Targeted Product Recommendations */}
          <div className="mt-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[#567C8E] mb-6">
              Precision Formulations for This Barrier State:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {PRODUCTS.filter((p) => selectedSkinType.targetProductIds.includes(p.id)).map(
                (product) => (
                  <div
                    key={product.id}
                    onClick={() => onProductClick(product.id)}
                    className="group bg-[#F4FAFD] hover:bg-[#D9F0FA]/50 p-5 rounded-2xl border border-[#D9F0FA] cursor-pointer transition-all duration-300 hover:shadow-md flex items-center gap-4"
                  >
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-white shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#58C5C5] uppercase tracking-wider">
                        {product.ritualStep}
                      </span>
                      <h5 className="font-display text-sm font-bold text-[#1A3C4D] truncate group-hover:text-[#4A96B7] transition-colors">
                        {product.name}
                      </h5>
                      <div className="text-xs font-bold text-[#1A3C4D] mt-1 tabular-nums">
                        ${product.price}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
