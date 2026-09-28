import React, { useState } from 'react';
import { IMAGES } from '../data/skincareData';
import { ArrowRight, Check, Droplet, Heart, Shield, Sparkles } from 'lucide-react';

interface CallToActionSectionProps {
  onExploreCollection: () => void;
  onOpenConsult: () => void;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onExploreCollection,
  onOpenConsult
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <section className="relative w-full bg-white pt-24 pb-16 overflow-hidden">
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-96 bg-gradient-to-r from-[#D9F0FA]/60 via-[#EAF7FD] to-[#D9F0FA]/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Main CTA Showcase */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D9F0FA] text-[#1A3C4D] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#58C5C5]" />
            <span>The New Standard in Barrier Health</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1A3C4D] leading-[0.92] tracking-tighter uppercase mb-8">
            YOUR GLOW <br />
            <span className="text-[#83C9E5]">STARTS HERE.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4A7285] max-w-xl mx-auto leading-relaxed mb-10">
            Formulated for lasting barrier resilience. Give your skin the 3 essential ceramides and multi-layer moisture it craves every single day.
          </p>

          {/* Floating Product Trinity Composition */}
          <div className="relative max-w-2xl mx-auto h-72 sm:h-84 my-10 flex items-center justify-center">
            {/* Left Product: Cleanser */}
            <div className="absolute left-[8%] sm:left-[14%] w-32 sm:w-44 rounded-2xl bg-white p-2 border border-[#D9F0FA] shadow-[0_20px_50px_-15px_rgba(131,201,229,0.4)] animate-float-slow">
              <img
                src={IMAGES.heroCleanser}
                alt="Ceramide Cleanser"
                className="w-full h-auto object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Center Product: Barrier Moisturizer */}
            <div className="relative z-10 w-36 sm:w-52 rounded-2xl bg-white p-2 border border-[#83C9E5]/40 shadow-[0_30px_70px_-15px_rgba(88,197,197,0.45)] transform scale-110">
              <img
                src={IMAGES.moisturizer}
                alt="Barrier Moisturizer"
                className="w-full h-auto object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Product: Serum */}
            <div className="absolute right-[8%] sm:right-[14%] w-30 sm:w-42 rounded-2xl bg-white p-2 border border-[#D9F0FA] shadow-[0_20px_50px_-15px_rgba(88,197,197,0.35)] animate-float-reverse">
              <img
                src={IMAGES.serum}
                alt="Aqua Serum"
                className="w-full h-auto object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button
              onClick={onExploreCollection}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#58C5C5] text-white hover:bg-[#48b5b5] font-bold text-xs tracking-wider uppercase shadow-[0_10px_30px_-5px_rgba(88,197,197,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenConsult}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D9F0FA] hover:bg-[#83C9E5]/30 text-[#1A3C4D] font-bold text-xs tracking-wider uppercase transition-colors"
            >
              <span>Find My Barrier Regimen</span>
            </button>
          </div>
        </div>

        {/* Brand Commitments Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 my-16 border-y border-[#D9F0FA] text-center">
          <div className="flex flex-col items-center">
            <Shield className="w-6 h-6 text-[#58C5C5] mb-2" />
            <h4 className="font-display font-bold text-sm text-[#1A3C4D]">100% Skin-Identical</h4>
            <p className="text-xs text-[#567C8E] mt-1">Formulated with biomimetic ceramide complexes</p>
          </div>
          <div className="flex flex-col items-center">
            <Droplet className="w-6 h-6 text-[#83C9E5] mb-2" />
            <h4 className="font-display font-bold text-sm text-[#1A3C4D]">Dermatologist Formulated</h4>
            <p className="text-xs text-[#567C8E] mt-1">Tested for hypersensitive & compromised skin</p>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="w-6 h-6 text-[#58C5C5] mb-2" />
            <h4 className="font-display font-bold text-sm text-[#1A3C4D]">Zero Harsh Additives</h4>
            <p className="text-xs text-[#567C8E] mt-1">Fragrance-free, paraben-free, sulfate-free</p>
          </div>
        </div>

        {/* Minimal Editorial Footer */}
        <footer className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
            {/* Brand column */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-black text-[#1A3C4D]">AURA</span>
                <span className="w-2 h-2 rounded-full bg-[#58C5C5]" />
              </div>
              <p className="text-xs text-[#567C8E] leading-relaxed max-w-sm">
                Luxury skin barrier science inspired by clinical purity and gentle daily restoration. Designed to restore your skin to its healthiest physiological state.
              </p>
            </div>

            {/* Nav links */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3C4D]">Regimen</div>
              <ul className="space-y-2 text-xs text-[#567C8E]">
                <li><a href="#ritual" className="hover:text-[#58C5C5] transition-colors">Daily Ritual</a></li>
                <li><a href="#collection" className="hover:text-[#58C5C5] transition-colors">Formulations</a></li>
                <li><a href="#skin-types" className="hover:text-[#58C5C5] transition-colors">Skin Diagnosis</a></li>
                <li><a href="#ingredients" className="hover:text-[#58C5C5] transition-colors">Active Science</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3C4D]">Philosophy</div>
              <ul className="space-y-2 text-xs text-[#567C8E]">
                <li><span className="cursor-pointer hover:text-[#58C5C5] transition-colors">Lipid Balance</span></li>
                <li><span className="cursor-pointer hover:text-[#58C5C5] transition-colors">Clinical Trials</span></li>
                <li><span className="cursor-pointer hover:text-[#58C5C5] transition-colors">Sustainability</span></li>
                <li><span className="cursor-pointer hover:text-[#58C5C5] transition-colors">Ethics & Care</span></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="md:col-span-4 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3C4D]">
                Join The Barrier Journal
              </div>
              <p className="text-xs text-[#567C8E]">
                Receive dermatological insights, seasonal routine updates, and private collection launches.
              </p>
              {subscribed ? (
                <div className="p-3 bg-[#D9F0FA] rounded-xl flex items-center gap-2 text-xs font-semibold text-[#1A3C4D]">
                  <Check className="w-4 h-4 text-[#58C5C5]" />
                  <span>Welcome to the journal. Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2.5 bg-[#F4FAFD] border border-[#D9F0FA] rounded-full text-xs text-[#1A3C4D] placeholder-[#83C9E5] focus:outline-none focus:border-[#58C5C5]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#1A3C4D] hover:bg-[#58C5C5] text-white text-xs font-bold tracking-wider uppercase transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-8 border-t border-[#D9F0FA] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#567C8E]">
            <div>© {new Date().getFullYear()} AURA SKIN SCIENCE INC. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span className="hover:text-[#1A3C4D] cursor-pointer">Privacy Policy</span>
              <span>·</span>
              <span className="hover:text-[#1A3C4D] cursor-pointer">Terms of Service</span>
              <span>·</span>
              <span className="hover:text-[#1A3C4D] cursor-pointer">Accessibility</span>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};
