import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenConsult: () => void;
  onSelectNav: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenConsult,
  onSelectNav
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ritual', href: '#ritual' },
    { label: 'Collection', href: '#collection' },
    { label: 'Skin Types', href: '#skin-types' },
    { label: 'Science', href: '#ingredients' },
    { label: 'Experience', href: '#glow-experience' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    onSelectNav(href.replace('#', ''));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#D9F0FA]/80 py-3.5 shadow-[0_4px_20px_-10px_rgba(131,201,229,0.2)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-1.5 focus-visible:outline-none"
        >
          <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter text-[#1A3C4D] group-hover:text-[#58C5C5] transition-colors">
            AURA
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#58C5C5] shadow-[0_0_8px_#58C5C5]" />
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide font-medium text-[#4A7285]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative py-1 hover:text-[#1A3C4D] transition-colors group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#58C5C5] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsult}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#1A3C4D] bg-[#D9F0FA] hover:bg-[#83C9E5]/40 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#58C5C5]" />
            <span>Skin Diagnosis</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Shopping bag"
            className="relative p-2 text-[#1A3C4D] hover:text-[#58C5C5] transition-colors rounded-full hover:bg-[#D9F0FA]/60"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-[#58C5C5] rounded-full shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 text-[#1A3C4D] hover:text-[#58C5C5]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-[#D9F0FA] px-6 py-6 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4 text-sm font-medium text-[#1A3C4D]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-1 text-[#355B6E] hover:text-[#58C5C5] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#D9F0FA]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsult();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#1A3C4D] bg-[#D9F0FA] rounded-full hover:bg-[#83C9E5]/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#58C5C5]" />
                <span>Personalized Skin Diagnosis</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
