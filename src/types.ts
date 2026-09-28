export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  size: string;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  textureDescription: string;
  keyIngredients: string[];
  clinicalHighlights: string[];
  ritualStep: 'Cleanse' | 'Hydrate' | 'Restore' | 'Protect';
  idealFor: string[];
  accentColor: string;
}

export interface SkinTypeProfile {
  id: string;
  name: string;
  kicker: string;
  headline: string;
  barrierState: string;
  characteristics: string[];
  recommendedIngredients: string[];
  targetProductIds: string[];
  ritualSummary: string;
}

export interface IngredientFeature {
  id: string;
  name: string;
  chemicalClass: string;
  concentration: string;
  biologicalAction: string;
  clinicalImpact: string;
  molecularRole: string;
}

export interface RoutineStep {
  stepNumber: string;
  timeOfDay: 'morning' | 'night' | 'both';
  action: string;
  productName: string;
  productSize: string;
  technique: string;
  benefit: string;
  productId: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
