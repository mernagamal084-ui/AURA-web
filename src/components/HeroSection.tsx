import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/skincareData';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onDiscoverClick: () => void;
  onProductClick: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscoverClick,
  onProductClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLHeadingElement>(null);
  const titleLine2Ref = useRef<HTMLHeadingElement>(null);
  const bottle1Ref = useRef<HTMLDivElement>(null);
  const bottle2Ref = useRef<HTMLDivElement>(null);
  const backgroundShapeRef = useRef<HTMLDivElement>(null);
  const editorialLabelRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Mouse tilt parallax on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMouseOffset({ x, y });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        backgroundShapeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4 }
      )
        .fromTo(
          titleLine1Ref.current,
          { y: 80, opacity: 0, letterSpacing: '0.05em' },
          { y: 0, opacity: 1, letterSpacing: '-0.03em', duration: 1.2 },
          '-=1.0'
        )
        .fromTo(
          titleLine2Ref.current,
          { y: 90, opacity: 0, letterSpacing: '0.05em' },
          { y: 0, opacity: 1, letterSpacing: '-0.03em', duration: 1.2 },
          '-=1.0'
        )
        .fromTo(
          bottle1Ref.current,
          { y: 120, opacity: 0, rotate: -6, scale: 0.9 },
          { y: 0, opacity: 1, rotate: -2, scale: 1, duration: 1.3, ease: 'back.out(1.2)' },
          '-=0.9'
        )
        .fromTo(
          bottle2Ref.current,
          { y: 140, opacity: 0, rotate: 8, scale: 0.9 },
          { y: 0, opacity: 1, rotate: 4, scale: 1, duration: 1.3, ease: 'back.out(1.2)' },
          '-=1.1'
        )
        .fromTo(
          editorialLabelRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        );

      // Scroll-scrub animation: Hero pinned transformation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      scrollTl
        // Text movement & scaling
        .to(titleLine1Ref.current, {
          xPercent: -35,
          scale: 1.15,
          opacity: 0.25,
          ease: 'none'
        }, 0)
        .to(titleLine2Ref.current, {
          xPercent: 35,
          scale: 1.15,
          opacity: 0.25,
          ease: 'none'
        }, 0)
        // Products move independently at 3D depths
        .to(bottle1Ref.current, {
          xPercent: -45,
          yPercent: -15,
          scale: 1.12,
          rotate: -8,
          ease: 'power1.inOut'
        }, 0)
        .to(bottle2Ref.current, {
          xPercent: 45,
          yPercent: 15,
          scale: 1.16,
          rotate: 10,
          ease: 'power1.inOut'
        }, 0)
        // Background expansion
        .to(backgroundShapeRef.current, {
          scale: 1.45,
          opacity: 0.9,
          borderRadius: '20%',
          ease: 'none'
        }, 0)
        .to(editorialLabelRef.current, {
          opacity: 0,
          y: -40,
          ease: 'none'
        }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen min-h-[720px] bg-white overflow-hidden flex flex-col justify-between pt-24 pb-10 select-none"
    >
      {/* Abstract light-blue & turquoise ambient backdrop glow */}
      <div
        ref={backgroundShapeRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] h-[72vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tr from-[#D9F0FA] via-[#EAF7FD] to-[#F3FBFE] opacity-90 blur-2xl pointer-events-none -z-0"
      />

      {/* Subtle organic turquoise water ring */}
      <div className="absolute top-[28%] left-[18%] w-80 h-80 rounded-full border border-[#83C9E5]/30 pointer-events-none animate-float-slow -z-0" />
      <div className="absolute bottom-[22%] right-[16%] w-96 h-96 rounded-full border border-[#58C5C5]/25 pointer-events-none animate-float-reverse -z-0" />

      {/* Top Editorial Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 flex justify-between items-start z-10">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#567C8E]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#58C5C5]" />
          <span>Clinical Barrier Science</span>
          <span className="text-[#83C9E5]">·</span>
          <span>Dermatologist Approved</span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-xs text-[#567C8E] font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#58C5C5]" />
            <span>3 Essential Ceramides</span>
          </div>
          <span className="text-[#83C9E5]">·</span>
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-[#83C9E5]" />
            <span>5D Multi-Hyaluronic</span>
          </div>
        </div>
      </div>

      {/* Center Stage: Oversized Typography + Layered Floating Skincare Products */}
      <div className="relative w-full flex-1 flex flex-col justify-center items-center px-4 overflow-visible my-auto">
        {/* Giant Headline Line 1: YOUR SKIN */}
        <h1
          ref={titleLine1Ref}
          className="font-display text-[15vw] sm:text-[14vw] md:text-[13vw] font-black leading-[0.88] tracking-tighter text-[#83C9E5] text-center uppercase whitespace-nowrap z-0 pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * -15}px, ${mouseOffset.y * -15}px, 0)`
          }}
        >
          YOUR SKIN,
        </h1>

        {/* Floating Skincare Products overlapping typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {/* Product 1: Hydro-Ceramide Cleanser (Left / Foreground) */}
            <div
              ref={bottle1Ref}
              onClick={() => onProductClick('aura-cleanser')}
              className="absolute left-[8%] md:left-[18%] top-[24%] md:top-[18%] w-48 sm:w-56 md:w-64 cursor-pointer pointer-events-auto group transition-all duration-300"
              style={{
                transform: `translate3d(${mouseOffset.x * 24}px, ${mouseOffset.y * 24}px, 0)`
              }}
            >
              <div className="relative p-2 rounded-2xl bg-white/40 backdrop-blur-xs border border-white/60 shadow-[0_30px_60px_-15px_rgba(131,201,229,0.35)] group-hover:shadow-[0_40px_70px_-10px_rgba(88,197,197,0.4)] group-hover:scale-105 transition-all duration-500">
                <img
                  src={IMAGES.heroCleanser}
                  alt="Hydro-Ceramide Cleansing Elixir"
                  className="w-full h-auto object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                {/* Floating Micro-Badge */}
                <div className="absolute -bottom-3 -right-2 bg-white/95 px-3 py-1 rounded-full border border-[#D9F0FA] shadow-md flex items-center gap-1.5 text-[10px] font-bold text-[#1A3C4D] tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#58C5C5] animate-pulse" />
                  <span>01 · CLEANSE</span>
                </div>
              </div>
            </div>

            {/* Product 2: Multi-Molecular Aqua Serum (Right / Midground) */}
            <div
              ref={bottle2Ref}
              onClick={() => onProductClick('aura-serum')}
              className="absolute right-[8%] md:right-[18%] bottom-[14%] md:bottom-[16%] w-44 sm:w-52 md:w-60 cursor-pointer pointer-events-auto group transition-all duration-300"
              style={{
                transform: `translate3d(${mouseOffset.x * -20}px, ${mouseOffset.y * -20}px, 0)`
              }}
            >
              <div className="relative p-2 rounded-2xl bg-white/40 backdrop-blur-xs border border-white/60 shadow-[0_30px_60px_-15px_rgba(88,197,197,0.3)] group-hover:shadow-[0_40px_70px_-10px_rgba(131,201,229,0.45)] group-hover:scale-105 transition-all duration-500">
                <img
                  src={IMAGES.serum}
                  alt="Multi-Molecular Aqua Plump Serum"
                  className="w-full h-auto object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
                {/* Floating Micro-Badge */}
                <div className="absolute -top-3 -left-2 bg-white/95 px-3 py-1 rounded-full border border-[#D9F0FA] shadow-md flex items-center gap-1.5 text-[10px] font-bold text-[#1A3C4D] tracking-wide">
                  <Sparkles className="w-3 h-3 text-[#58C5C5]" />
                  <span>02 · HYDRATE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Headline Line 2: YOUR GLOW */}
        <h2
          ref={titleLine2Ref}
          className="font-display text-[15vw] sm:text-[14vw] md:text-[13vw] font-black leading-[0.88] tracking-tighter text-[#1A3C4D] text-center uppercase whitespace-nowrap z-10 pointer-events-none transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * -8}px, ${mouseOffset.y * -8}px, 0)`
          }}
        >
          YOUR GLOW
        </h2>
      </div>

      {/* Bottom Interactive Area */}
      <div
        ref={editorialLabelRef}
        className="max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 z-20"
      >
        <div className="max-w-xs text-center sm:text-left">
          <p className="text-xs text-[#567C8E] leading-relaxed">
            Formulated with biomimetic lipid ratios to repair your natural mantle while infusing continuous deep hydration.
          </p>
        </div>

        {/* Magnetic Animated CTA: DISCOVER THE GLOW */}
        <button
          onClick={onDiscoverClick}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#58C5C5] text-white font-medium text-xs tracking-wider uppercase overflow-hidden shadow-[0_8px_25px_-5px_rgba(88,197,197,0.5)] hover:bg-[#48b5b5] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2 font-semibold">
            <span>Discover The Glow</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        <div className="hidden sm:block text-right">
          <span className="font-display text-xs font-bold text-[#83C9E5] tracking-widest uppercase">
            Chapter 01 / Awakening
          </span>
          <div className="text-[10px] text-[#567C8E]">Scroll to begin transformation</div>
        </div>
      </div>
    </section>
  );
};
