import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../data/skincareData';
import { Sparkles, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GlowExperienceSectionProps {
  onExploreClick: () => void;
}

export const GlowExperienceSection: React.FC<GlowExperienceSectionProps> = ({
  onExploreClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textLeftRef = useRef<HTMLHeadingElement>(null);
  const textRightRef = useRef<HTMLHeadingElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=130%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1
        }
      });

      pinTl
        // Text pulls apart
        .to(textLeftRef.current, {
          xPercent: -40,
          scale: 1.2,
          opacity: 0.2,
          ease: 'power1.inOut'
        }, 0)
        .to(textRightRef.current, {
          xPercent: 40,
          scale: 1.2,
          opacity: 0.2,
          ease: 'power1.inOut'
        }, 0)
        // Center image expands & scales up
        .fromTo(
          imageRevealRef.current,
          { scale: 0.75, opacity: 0.6, borderRadius: '48px' },
          { scale: 1.05, opacity: 1, borderRadius: '24px', ease: 'power2.out' },
          0
        )
        // Bottle orbits into foreground
        .fromTo(
          bottleRef.current,
          { yPercent: 60, scale: 0.8, rotate: -15, opacity: 0 },
          { yPercent: -10, scale: 1.15, rotate: 6, opacity: 1, ease: 'back.out(1.4)' },
          0.1
        )
        // Light glow ring expansion
        .to(glowRingRef.current, {
          scale: 1.8,
          opacity: 0.8,
          ease: 'none'
        }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="glow-experience"
      ref={containerRef}
      className="relative w-full h-screen min-h-[750px] bg-white overflow-hidden flex flex-col justify-between py-12 select-none"
    >
      {/* Expanding luminous glow caustics ring */}
      <div
        ref={glowRingRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tr from-[#D9F0FA] via-[#E6F6FC] to-[#58C5C5]/20 blur-3xl opacity-40 pointer-events-none -z-0"
      />

      {/* Top Editorial Kicker */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#567C8E]">
          <Sparkles className="w-3.5 h-3.5 text-[#58C5C5]" />
          <span>The Radiant Finale · Chapter 06</span>
        </div>
        <div className="text-xs font-semibold text-[#83C9E5] tracking-wider uppercase">
          Continuous Dewiness 72H
        </div>
      </div>

      {/* Center Climax Composition */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-visible my-auto">
        {/* Giant Left Typography: LET YOUR */}
        <h2
          ref={textLeftRef}
          className="absolute left-[3%] md:left-[6%] font-display text-[15vw] md:text-[14vw] font-black leading-none tracking-tighter text-[#83C9E5] uppercase z-10 pointer-events-none whitespace-nowrap"
        >
          LET YOUR
        </h2>

        {/* Center Editorial Glowing Skin Showcase */}
        <div
          ref={imageRevealRef}
          className="relative z-20 w-[68vw] sm:w-[50vw] md:w-[38vw] max-w-[500px] aspect-[4/3] sm:aspect-square overflow-hidden shadow-[0_30px_80px_-20px_rgba(74,150,183,0.45)] border border-white"
        >
          <img
            src={IMAGES.editorialGlow}
            alt="Editorial Radiant Glowing Dewy Skin"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3C4D]/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold tracking-wide flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-[#58C5C5]" />
              <span>Bio-Cellular Luminosity</span>
            </span>
            <span className="bg-white/30 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold">
              Pure Glow
            </span>
          </div>
        </div>

        {/* Floating Skincare Bottle Overlapping */}
        <div
          ref={bottleRef}
          className="absolute right-[12%] sm:right-[18%] bottom-[8%] sm:bottom-[12%] z-30 w-36 sm:w-48 md:w-56 pointer-events-none drop-shadow-[0_25px_40px_rgba(88,197,197,0.4)]"
        >
          <div className="p-2 rounded-2xl bg-white/70 backdrop-blur-xs border border-white">
            <img
              src={IMAGES.serum}
              alt="Multi-Molecular Aqua Serum"
              className="w-full h-auto object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Giant Right Typography: SKIN GLOW */}
        <h2
          ref={textRightRef}
          className="absolute right-[3%] md:right-[6%] font-display text-[15vw] md:text-[14vw] font-black leading-none tracking-tighter text-[#1A3C4D] uppercase z-10 pointer-events-none whitespace-nowrap"
        >
          SKIN GLOW
        </h2>
      </div>

      {/* Bottom Action */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 z-20">
        <p className="text-xs text-[#567C8E] max-w-sm text-center sm:text-left">
          Luminosity is the natural byproduct of a repaired lipid barrier. When moisture is preserved, skin illuminates from within.
        </p>
        <button
          onClick={onExploreClick}
          className="px-8 py-3 rounded-full bg-[#58C5C5] hover:bg-[#48b5b5] text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          Shop The Glow Regimen
        </button>
      </div>
    </section>
  );
};
