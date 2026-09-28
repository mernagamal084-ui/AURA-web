import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROUTINE_STEPS, PRODUCTS } from '../data/skincareData';
import { Sun, Moon, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RoutineSectionProps {
  onProductClick: (id: string) => void;
}

export const RoutineSection: React.FC<RoutineSectionProps> = ({ onProductClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTimeOfDay, setActiveTimeOfDay] = useState<'morning' | 'night'>('morning');
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  const filteredSteps = ROUTINE_STEPS.filter(
    (s) => s.timeOfDay === 'both' || s.timeOfDay === activeTimeOfDay
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate steps on scroll
      const stepItems = stepsContainerRef.current?.querySelectorAll('.routine-step-card');
      if (stepItems && stepItems.length > 0) {
        gsap.fromTo(
          stepItems,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsContainerRef.current,
              start: 'top 75%',
              end: 'top 30%',
              scrub: 0.6
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTimeOfDay]);

  return (
    <section
      id="ritual"
      ref={sectionRef}
      className="relative w-full py-28 md:py-36 bg-gradient-to-b from-white via-[#F2FAFD] to-white overflow-hidden"
    >
      {/* Background connecting fluid lines & ambient circles */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#83C9E5]/30 to-transparent -translate-y-1/2 pointer-events-none" />
      <div className="absolute -top-32 right-10 w-[500px] h-[500px] rounded-full bg-[#D9F0FA]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-10 w-[500px] h-[500px] rounded-full bg-[#58C5C5]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headlineRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#567C8E] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#58C5C5]" />
              <span>Layering Architecture</span>
              <span className="text-[#83C9E5]">·</span>
              <span>Section 04</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1A3C4D] leading-[0.92]">
              YOUR DAILY <br />
              <span className="text-[#58C5C5]">RITUAL.</span>
            </h2>
          </div>

          {/* Interactive Morning / Night Switcher */}
          <div className="flex items-center p-1.5 bg-[#D9F0FA]/80 backdrop-blur-sm rounded-full border border-[#83C9E5]/40 self-start md:self-end">
            <button
              onClick={() => setActiveTimeOfDay('morning')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTimeOfDay === 'morning'
                  ? 'bg-white text-[#1A3C4D] shadow-md scale-102'
                  : 'text-[#4A7285] hover:text-[#1A3C4D]'
              }`}
            >
              <Sun className={`w-4 h-4 ${activeTimeOfDay === 'morning' ? 'text-[#58C5C5]' : ''}`} />
              <span>Morning Ritual</span>
            </button>
            <button
              onClick={() => setActiveTimeOfDay('night')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTimeOfDay === 'night'
                  ? 'bg-white text-[#1A3C4D] shadow-md scale-102'
                  : 'text-[#4A7285] hover:text-[#1A3C4D]'
              }`}
            >
              <Moon className={`w-4 h-4 ${activeTimeOfDay === 'night' ? 'text-[#83C9E5]' : ''}`} />
              <span>Night Ritual</span>
            </button>
          </div>
        </div>

        {/* Routine Story Description */}
        <div className="mb-14 p-6 rounded-2xl bg-white border border-[#D9F0FA] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#58C5C5] shrink-0" />
            <p className="text-sm font-medium text-[#254B62]">
              {activeTimeOfDay === 'morning'
                ? 'Awaken the lipid barrier, saturate cellular water channels, and seal against daily UV & environmental stressors.'
                : 'Dissolve residual daily debris, rebuild intercellular ceramide cement, and seal overnight regenerative moisture.'}
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#58C5C5] whitespace-nowrap">
            {filteredSteps.length} Precision Steps
          </span>
        </div>

        {/* Steps Flow Grid */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {filteredSteps.map((step, index) => {
            const product = PRODUCTS.find((p) => p.id === step.productId);

            return (
              <div
                key={`${step.stepNumber}-${activeTimeOfDay}`}
                className="routine-step-card group relative bg-white rounded-3xl p-6 border border-[#D9F0FA] shadow-[0_10px_35px_-10px_rgba(131,201,229,0.2)] hover:shadow-[0_20px_45px_-8px_rgba(88,197,197,0.3)] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Step Index & Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-black text-[#83C9E5] group-hover:text-[#58C5C5] transition-colors">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#567C8E] bg-[#D9F0FA] px-2.5 py-1 rounded-full">
                      {step.action.split(' ')[0]}
                    </span>
                  </div>

                  {/* Product Mini Preview */}
                  {product && (
                    <div
                      onClick={() => onProductClick(product.id)}
                      className="cursor-pointer relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F3FAFD] mb-5 group-hover:scale-103 transition-transform duration-500"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-[#58C5C5]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}

                  {/* Step Action & Product Title */}
                  <h3 className="font-display text-lg font-bold text-[#1A3C4D] leading-snug mb-2 group-hover:text-[#4A96B7] transition-colors">
                    {step.productName}
                  </h3>
                  <p className="text-xs text-[#4A7285] leading-relaxed mb-4">
                    {step.technique}
                  </p>
                </div>

                {/* Step Benefit Pill */}
                <div className="pt-4 border-t border-[#D9F0FA]">
                  <div className="flex items-start gap-2 text-[11px] text-[#2C5266] font-medium leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#58C5C5] shrink-0 mt-0.5" />
                    <span>{step.benefit}</span>
                  </div>
                  {product && (
                    <button
                      onClick={() => onProductClick(product.id)}
                      className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-[#1A3C4D] bg-[#F4FAFD] hover:bg-[#D9F0FA] rounded-full transition-colors"
                    >
                      <span>Explore Formula</span>
                      <ArrowRight className="w-3 h-3 text-[#58C5C5]" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
