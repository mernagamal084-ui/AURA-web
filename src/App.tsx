import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkinTypesSection } from './components/SkinTypesSection';
import { CollectionSection } from './components/CollectionSection';
import { RoutineSection } from './components/RoutineSection';
import { IngredientsSection } from './components/IngredientsSection';
import { GlowExperienceSection } from './components/GlowExperienceSection';
import { CallToActionSection } from './components/CallToActionSection';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { SkinConsultModal } from './components/SkinConsultModal';
import { PRODUCTS } from './data/skincareData';
import { Product, CartItem } from './types';
import { Check, Sparkles } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }
  ]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to bag`);
  };

  const handleAddRegimenToBag = (products: Product[]) => {
    products.forEach((p) => handleAddToCart(p));
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#1A3C4D] selection:bg-[#D9F0FA] selection:text-[#184860]">
      {/* Navigation */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsult={() => setIsConsultOpen(true)}
        onSelectNav={(id) => scrollToSection(id)}
      />

      <main>
        {/* Section 1: Hero Section */}
        <HeroSection
          onDiscoverClick={() => scrollToSection('skin-types')}
          onProductClick={(id) => setSelectedProductId(id)}
        />

        {/* Section 2: Discover Your Skin */}
        <SkinTypesSection
          onProductClick={(id) => setSelectedProductId(id)}
          onOpenConsult={() => setIsConsultOpen(true)}
        />

        {/* Section 3: The Skincare Collection */}
        <CollectionSection
          onProductClick={(id) => setSelectedProductId(id)}
          onAddToCart={handleAddToCart}
        />

        {/* Section 4: The Perfect Routine */}
        <RoutineSection onProductClick={(id) => setSelectedProductId(id)} />

        {/* Section 5: Ingredients That Matter */}
        <IngredientsSection />

        {/* Section 6: The Glow Experience */}
        <GlowExperienceSection onExploreClick={() => scrollToSection('collection')} />

        {/* Section 7: Final Call to Action & Footer */}
        <CallToActionSection
          onExploreCollection={() => scrollToSection('collection')}
          onOpenConsult={() => setIsConsultOpen(true)}
        />
      </main>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Deep-Dive Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProductId(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Personalized Skin Diagnosis Modal */}
      <SkinConsultModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
        onAddRegimenToBag={handleAddRegimenToBag}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A3C4D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#58C5C5]/40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-5 h-5 rounded-full bg-[#58C5C5] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#83C9E5]" />
        </div>
      )}
    </div>
  );
}
