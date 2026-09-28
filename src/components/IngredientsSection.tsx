import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INGREDIENTS } from '../data/skincareData';
import { IngredientFeature } from '../types';
import { Activity, Droplet, Layers, Sparkles, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const IngredientsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeIngredient, setActiveIngredient] = useState<IngredientFeature>(INGREDIENTS[0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal marquee scrub on scroll
      gsap.to(marqueeRef.current, {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIngredientIcon = (id: string) => {
    switch (id) {
      case 'ceramides':
        return <Layers className="w-5 h-5 text-[#58C5C5]" />;
      case 'hyaluronic':
        return <Droplet className="w-5 h-5 text-[#83C9E5]" />;
      case 'niacinamide':
        return <Activity className="w-5 h-5 text-[#58C5C5]" />;
      case 'vitamin-c':
        return <Sparkles className="w-5 h-5 text-[#83C9E5]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#58C5C5]" />;
    }
  };

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 bg-[#F4FAFD] overflow-hidden"
    >
      {/* Oversized Moving Ingredient Names Marquee */}
      <div
        ref={marqueeRef}
        className="w-[200vw] font-display text-[16vw] font-black uppercase text-[#D9F0FA]/80 tracking-tighter whitespace-nowrap select-none pointer-events-none mb-10 -ml-[20vw]"
      >
        CERAMIDES · HYALURONIC · NIACINAMIDE · VITAMIN C ·
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#567C8E] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58C5C5]" />
            <span>Biomimetic Science</span>
            <span className="text-[#83C9E5]">·</span>
            <span>Section 05</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#1A3C4D] leading-[0.95]">
            INGREDIENTS <br />
            <span className="text-[#83C9E5]">THAT MATTER.</span>
          </h2>
          <p className="text-base text-[#4A7285] mt-4 leading-relaxed max-w-xl">
            No filler waxes, no volatile alcohols, and no marketing dust. Only clinical-strength bio-compatible molecules formulated in physiological ratios to match your epidermis.
          </p>
        </div>

        {/* Interactive Molecule Selector & Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ingredient Navigation Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {INGREDIENTS.map((item) => {
              const isSelected = activeIngredient.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIngredient(item)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#58C5C5] shadow-[0_12px_30px_-8px_rgba(88,197,197,0.3)] scale-[1.02]'
                      : 'bg-white/70 hover:bg-white border-[#D9F0FA] text-[#4A7285] hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#D9F0FA]' : 'bg-[#F2FAFD]'
                      }`}
                    >
                      {getIngredientIcon(item.id)}
                    </div>
                    <div>
                      <h3
                        className={`font-display text-base sm:text-lg font-bold transition-colors ${
                          isSelected ? 'text-[#1A3C4D]' : 'text-[#355B6E]'
                        }`}
                      >
                        {item.name}
                      </h3>
                      <span className="text-xs font-semibold text-[#58C5C5]">
                        {item.concentration}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#83C9E5]">
                    {item.molecularRole}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Molecular Spotlight Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-[#83C9E5]/30 shadow-[0_20px_60px_-15px_rgba(131,201,229,0.3)] relative overflow-hidden">
            {/* Ambient Water Drop Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#D9F0FA] to-transparent rounded-bl-full pointer-events-none" />

            <div className="relative z-10 space-y-8">
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="px-3.5 py-1.5 rounded-full bg-[#D9F0FA] text-[#1A3C4D] text-xs font-bold uppercase tracking-wider">
                  {activeIngredient.chemicalClass}
                </span>
                <span className="font-display text-sm font-black text-[#58C5C5] tracking-widest uppercase">
                  Target: {activeIngredient.molecularRole}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-[#1A3C4D]">
                  {activeIngredient.name}
                </h3>
                <div className="text-xs font-semibold text-[#567C8E] mt-1">
                  Standardized Concentration: {activeIngredient.concentration}
                </div>
              </div>

              {/* Biological Mechanism */}
              <div className="p-6 rounded-2xl bg-[#F4FAFD] border border-[#D9F0FA]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#567C8E] mb-2">
                  Epidermal Mechanism of Action:
                </div>
                <p className="text-sm text-[#254B62] font-medium leading-relaxed">
                  {activeIngredient.biologicalAction}
                </p>
              </div>

              {/* Clinical Outcome Metric */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#D9F0FA]/70 to-[#E8F6FC] border border-[#83C9E5]/40">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1A3C4D] mb-1">
                  <ShieldAlert className="w-4 h-4 text-[#58C5C5]" />
                  <span>Clinical Efficacy Benchmark:</span>
                </div>
                <p className="text-base font-bold text-[#1A3C4D] mt-2">
                  {activeIngredient.clinicalImpact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
