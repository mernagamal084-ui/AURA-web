import React, { useState } from 'react';
import { SKIN_TYPES, PRODUCTS } from '../data/skincareData';
import { Product } from '../types';
import { X, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface SkinConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRegimenToBag: (products: Product[]) => void;
}

export const SkinConsultModal: React.FC<SkinConsultModalProps> = ({
  isOpen,
  onClose,
  onAddRegimenToBag
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    feel: string;
    concern: string;
    climate: string;
  }>({
    feel: '',
    concern: '',
    climate: ''
  });
  const [resultId, setResultId] = useState<string | null>(null);

  if (!isOpen) return null;

  const questions = [
    {
      id: 'feel',
      title: 'How does your skin feel 2 hours after cleansing?',
      options: [
        { label: 'Tight, dry, or slightly rough with zero shine', type: 'dry' },
        { label: 'Slick or noticeably shiny across forehead and nose', type: 'oily' },
        { label: 'Oily on the T-zone but tight or normal on cheeks', type: 'combination' },
        { label: 'Prone to stinging, warmth, or sudden flushing', type: 'sensitive' }
      ]
    },
    {
      id: 'concern',
      title: 'What is your primary barrier restoration priority?',
      options: [
        { label: 'Soothing micro-flaking and deep parched dehydration', type: 'dry' },
        { label: 'Minimizing pore visibility without stripping oils', type: 'oily' },
        { label: 'Balancing uneven hydration and T-zone oiliness', type: 'combination' },
        { label: 'Calming sensitivity and rebuilding defensive mantle', type: 'sensitive' }
      ]
    },
    {
      id: 'climate',
      title: 'What environment does your skin currently inhabit?',
      options: [
        { label: 'Air-conditioned or dry heated urban spaces', type: 'dry' },
        { label: 'Humid or high-pollution metropolitan areas', type: 'oily' },
        { label: 'Fluctuating seasonal shifts and varying climates', type: 'combination' },
        { label: 'High sun exposure or reactive sensitivity triggers', type: 'sensitive' }
      ]
    }
  ];

  const handleSelectOption = (type: string) => {
    if (currentStep === 0) {
      setAnswers((prev) => ({ ...prev, feel: type }));
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setAnswers((prev) => ({ ...prev, concern: type }));
      setCurrentStep(2);
    } else {
      setAnswers((prev) => ({ ...prev, climate: type }));
      // Calculate dominant skin type
      setResultId(type);
      setCurrentStep(3);
    }
  };

  const matchedProfile = SKIN_TYPES.find((s) => s.id === (resultId || 'dry')) || SKIN_TYPES[0];
  const matchedProducts = PRODUCTS.filter((p) =>
    matchedProfile.targetProductIds.includes(p.id)
  );

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ feel: '', concern: '', climate: '' });
    setResultId(null);
  };

  const handleAddAll = () => {
    onAddRegimenToBag(matchedProducts);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#1A3C4D]/40 backdrop-blur-sm transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-[#D9F0FA] z-10 my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#567C8E] hover:text-[#1A3C4D] hover:bg-[#F4FAFD]"
        >
          <X className="w-6 h-6" />
        </button>

        {currentStep < 3 ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#58C5C5] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Barrier Diagnostic Engine · Step {currentStep + 1} of 3</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1A3C4D] mb-8 leading-snug">
              {questions[currentStep].title}
            </h3>

            <div className="space-y-3">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.type)}
                  className="w-full text-left p-5 rounded-2xl border border-[#D9F0FA] hover:border-[#58C5C5] hover:bg-[#F4FAFD] transition-all flex items-center justify-between group"
                >
                  <span className="text-sm font-semibold text-[#1A3C4D] group-hover:text-[#4A96B7] transition-colors">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#83C9E5] group-hover:text-[#58C5C5] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[#D9F0FA] text-[#58C5C5] mx-auto flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#58C5C5]">
              Diagnostic Complete
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-[#1A3C4D] mt-1 mb-2">
              {matchedProfile.name} Barrier State
            </h3>

            <p className="text-sm text-[#4A7285] max-w-md mx-auto mb-6">
              {matchedProfile.headline}
            </p>

            <div className="text-left bg-[#F4FAFD] rounded-2xl p-4 sm:p-6 border border-[#D9F0FA] mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1A3C4D] mb-3">
                Your Recommended 3-Step Ritual:
              </div>
              <div className="space-y-3">
                {matchedProducts.map((prod) => (
                  <div key={prod.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#D9F0FA]">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-14 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#58C5C5] uppercase">
                        {prod.ritualStep}
                      </span>
                      <h4 className="text-xs font-bold text-[#1A3C4D] truncate">
                        {prod.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#567C8E] tabular-nums">
                        ${prod.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddAll}
                className="flex-1 py-3.5 rounded-full bg-[#58C5C5] hover:bg-[#48b5b5] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
              >
                Add Complete Regimen to Bag
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-full bg-[#D9F0FA] hover:bg-[#83C9E5]/30 text-[#1A3C4D] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
