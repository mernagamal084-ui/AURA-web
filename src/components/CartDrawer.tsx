import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [selectedSample, setSelectedSample] = useState<string>('mini-serum');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 75;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
    }, 1200);
  };

  const handleResetOrder = () => {
    setOrderConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1A3C4D]/30 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#D9F0FA]">
          {/* Header */}
          <div className="p-6 border-b border-[#D9F0FA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-[#1A3C4D]">
                Your Skincare Bag
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#D9F0FA] text-[#1A3C4D]">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#567C8E] hover:text-[#1A3C4D] rounded-full hover:bg-[#F4FAFD]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Confirmation Screen */}
          {orderConfirmed ? (
            <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#D9F0FA] flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-[#58C5C5]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#58C5C5] mb-2">
                Order #AUR-8294 Verified
              </span>
              <h3 className="font-display text-2xl font-extrabold text-[#1A3C4D] mb-3">
                Your Barrier Care is on the Way
              </h3>
              <p className="text-sm text-[#567C8E] leading-relaxed mb-8">
                We are preparing your fresh cold-pressed formulas. A shipping confirmation with tracking details has been sent to your email.
              </p>
              <button
                onClick={handleResetOrder}
                className="w-full py-3.5 rounded-full bg-[#58C5C5] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#48b5b5] transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              {/* Free Shipping Tracker */}
              <div className="px-6 py-3.5 bg-[#F4FAFD] border-b border-[#D9F0FA]">
                <div className="flex justify-between text-xs font-medium text-[#254B62] mb-1.5">
                  {amountToFreeShipping === 0 ? (
                    <span className="font-bold text-[#58C5C5] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Complimentary Express Delivery Unlocked!</span>
                    </span>
                  ) : (
                    <span>Add ${amountToFreeShipping.toFixed(2)} for Free Shipping</span>
                  )}
                  <span className="tabular-nums font-bold">
                    {Math.round(progressToFreeShipping)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#D9F0FA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#58C5C5] rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#D9F0FA]">
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="text-sm text-[#567C8E] mb-4">Your bag is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full bg-[#D9F0FA] text-[#1A3C4D] text-xs font-bold uppercase tracking-wider hover:bg-[#83C9E5]/30 transition-colors"
                    >
                      Explore Formulations
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center">
                      <div className="w-18 h-20 rounded-xl overflow-hidden bg-[#F3FAFD] border border-[#D9F0FA] shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-[#58C5C5] uppercase tracking-wider">
                              {item.product.category}
                            </span>
                            <h4 className="font-display text-sm font-bold text-[#1A3C4D] truncate">
                              {item.product.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#83C9E5] hover:text-[#E25C5C] p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity stepper */}
                          <div className="flex items-center border border-[#D9F0FA] rounded-full bg-[#F4FAFD]">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 hover:text-[#58C5C5]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold tabular-nums text-[#1A3C4D]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 hover:text-[#58C5C5]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-sm font-extrabold text-[#1A3C4D] tabular-nums">
                            ${item.product.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* Complimentary Deluxe Sample Selector */}
                {cartItems.length > 0 && (
                  <div className="pt-5 pb-2">
                    <div className="text-xs font-bold text-[#1A3C4D] mb-2 flex items-center justify-between">
                      <span>Complimentary Deluxe Sample</span>
                      <span className="text-[10px] text-[#58C5C5] font-semibold uppercase">Free</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedSample('mini-serum')}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          selectedSample === 'mini-serum'
                            ? 'bg-[#D9F0FA]/50 border-[#58C5C5] font-semibold text-[#1A3C4D]'
                            : 'bg-white border-[#D9F0FA] text-[#567C8E]'
                        }`}
                      >
                        <div className="font-bold">Aqua Serum 15ml</div>
                        <div className="text-[10px]">Hydrating Mini</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedSample('mini-cream')}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          selectedSample === 'mini-cream'
                            ? 'bg-[#D9F0FA]/50 border-[#58C5C5] font-semibold text-[#1A3C4D]'
                            : 'bg-white border-[#D9F0FA] text-[#567C8E]'
                        }`}
                      >
                        <div className="font-bold">Barrier Crème 15ml</div>
                        <div className="text-[10px]">Recovery Mini</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-[#D9F0FA] bg-[#F4FAFD]/50 space-y-4">
                  <div className="space-y-1.5 text-xs text-[#567C8E]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-[#1A3C4D] tabular-nums">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-bold text-[#1A3C4D]">
                        {amountToFreeShipping === 0 ? 'FREE' : '$5.00'}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#D9F0FA] text-sm font-bold text-[#1A3C4D]">
                      <span>Estimated Total</span>
                      <span className="font-display font-extrabold text-base tabular-nums">
                        ${(subtotal + (amountToFreeShipping === 0 ? 0 : 5)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-full bg-[#58C5C5] hover:bg-[#48b5b5] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    {isCheckingOut ? (
                      <span className="animate-pulse">Securing Order...</span>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#567C8E]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#58C5C5]" />
                    <span>30-Day Barrier Satisfaction Guarantee · 100% Secure</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
