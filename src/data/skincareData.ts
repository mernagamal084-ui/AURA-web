import { Product, SkinTypeProfile, IngredientFeature, RoutineStep } from '../types';

export const IMAGES = {
  heroCleanser: '/src/assets/images/hero_ceramide_cleanser_1790607328389.jpg',
  serum: '/src/assets/images/product_hyaluronic_serum_1790607342453.jpg',
  moisturizer: '/src/assets/images/product_barrier_moisturizer_1790607354688.jpg',
  sunscreen: '/src/assets/images/product_hydrating_sunscreen_1790607367602.jpg',
  editorialGlow: '/src/assets/images/editorial_glowing_skin_1790607378194.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'aura-cleanser',
    name: 'Hydro-Ceramide Cleansing Elixir',
    tagline: 'Non-stripping amino acid lipid wash that preserves moisture during cleansing',
    category: 'Facial Cleanser',
    price: 38,
    size: '200 ml / 6.7 fl oz',
    image: IMAGES.heroCleanser,
    rating: 4.9,
    reviewsCount: 384,
    description: 'An ultra-soothing, pH-balanced cleansing emulsion engineered with 3 essential skin-identical ceramides and hydrating hyaluronic acid. Melt away impurities while fortifying the lipid mantle without tightness.',
    textureDescription: 'Velvety milk-to-dew emulsion with zero foaming surfactants',
    keyIngredients: ['Ceramides NP, AP, EOP', 'Hydrolyzed Hyaluronic Acid', 'Oat Amino Acid Complex', 'Phytosphingosine'],
    clinicalHighlights: [
      'Preserves 98% of natural epidermal lipids after wash',
      'Instant 42% reduction in trans-epidermal moisture loss',
      'Tested 100% hypoallergenic on compromised skin barriers'
    ],
    ritualStep: 'Cleanse',
    idealFor: ['Dry to ultra-dry skin', 'Post-treatment redness', 'Barrier restoration'],
    accentColor: '#83C9E5'
  },
  {
    id: 'aura-serum',
    name: 'Multi-Molecular Aqua Plump Serum',
    tagline: 'Quenches parched dermal layers with 5 distinct weights of hyaluronic acid',
    category: 'Hydrating Serum',
    price: 64,
    size: '50 ml / 1.7 fl oz',
    image: IMAGES.serum,
    rating: 5.0,
    reviewsCount: 512,
    description: 'A crystalline fluid suspended with five molecular dimensions of fermented hyaluronic acid, bio-engineered marine algae, and provitamin B5. Binds water molecules deep into stratum corneum for an instant bouncy, glass-skin dewiness.',
    textureDescription: 'Featherlight crystalline fluid with immediate flash-absorption',
    keyIngredients: ['5D Hyaluronic Acid Matrix', 'Pure Provitamin B5 (Panthenol 5%)', 'Glacier Micro-Algae Exopolysaccharide', 'Trehalose'],
    clinicalHighlights: [
      '+182% cellular hydration after 15 minutes',
      'Sustained 48-hour moisture reservoir',
      'Smoothes fine dehydration creases by 37%'
    ],
    ritualStep: 'Hydrate',
    idealFor: ['All skin types', 'Dehydrated dull skin', 'Glass skin luminosity'],
    accentColor: '#58C5C5'
  },
  {
    id: 'aura-cream',
    name: 'Cellular Barrier Recovery Crème',
    tagline: 'Dermatological lipid matrix designed to repair compromised protective shields',
    category: 'Barrier Moisturizer',
    price: 58,
    size: '60 ml / 2.0 fl oz',
    image: IMAGES.moisturizer,
    rating: 4.9,
    reviewsCount: 620,
    description: 'The golden ratio of barrier restoration: 3:1:1 physiological balance of Ceramides, Cholesterol, and Free Fatty Acids. Infused with 4% Niacinamide to restore the skin’s biological shield against city stressors and micro-irritation.',
    textureDescription: 'Whipped cloud soufflé that seals without occlusive stickiness',
    keyIngredients: ['Bio-Identical Ceramide Trio 3%', 'Medical Grade Cholesterol', 'Niacinamide (Vitamin B3 4%)', 'Squalane'],
    clinicalHighlights: [
      'Rebuilds 94% of degraded barrier integrity in 72 hours',
      'Visibly calms dermal redness within 30 minutes',
      'Locks in active serum moisture for continuous 72 hours'
    ],
    ritualStep: 'Restore',
    idealFor: ['Sensitive skin', 'Dry barrier dysfunction', 'Night repair sealing'],
    accentColor: '#83C9E5'
  },
  {
    id: 'aura-spf',
    name: 'Invisible Water-Gel Mineral SPF 50',
    tagline: 'Ultra-sheer broad-spectrum shield with zero white cast and dewy moisture finish',
    category: 'Daily Sun Protection',
    price: 46,
    size: '75 ml / 2.5 fl oz',
    image: IMAGES.sunscreen,
    rating: 4.8,
    reviewsCount: 295,
    description: 'The holy grail daily mineral defense: non-nano zinc oxide dispersed in a featherlight hydrating water-gel matrix. Infused with antioxidant ectoin and marine minerals to defend against UV, blue light, and urban pollution.',
    textureDescription: 'Weightless water-drop fluid with natural dewy velvet finish',
    keyIngredients: ['Non-Nano Micronized Zinc Oxide (14.2%)', 'Pure Ectoin 1.5%', 'Hydra-Shield Marine Minerals', 'Allantoin'],
    clinicalHighlights: [
      'SPF 50+ Broad Spectrum UVA/UVB PA++++ defense',
      'Zero chalkiness or white residue on all skin tones',
      '+68% daytime barrier antioxidant defense'
    ],
    ritualStep: 'Protect',
    idealFor: ['Daily morning defense', 'Sensitive reactive skin', 'Under-makeup priming'],
    accentColor: '#58C5C5'
  }
];

export const SKIN_TYPES: SkinTypeProfile[] = [
  {
    id: 'dry',
    name: 'Dry & Parched',
    kicker: 'Lipid Deficient',
    headline: 'Depleted lipid mantle lacking essential ceramides and natural sebum.',
    barrierState: 'Tightness, micro-flaking, accelerated fine line appearance, loss of bounce.',
    characteristics: ['Constant feeling of skin tightness', 'Prone to dry flaky patches in climate shifts', 'Dullness from lack of light reflection'],
    recommendedIngredients: ['Ceramide Complex (NP, AP, EOP)', 'Plant-Derived Squalane', 'Pure Cholesterol'],
    targetProductIds: ['aura-cleanser', 'aura-cream', 'aura-serum'],
    ritualSummary: 'Cleanse gently with lipid milk, layer 5D hydration, and lock in with rich barrier recovery crème.'
  },
  {
    id: 'oily',
    name: 'Oily & Congested',
    kicker: 'Sebum Hyper-Activity',
    headline: 'Overactive sebaceous glands frequently triggered by surface dehydration.',
    barrierState: 'Visible shine, enlarged pores, surface oil with underlying parched cells.',
    characteristics: ['Midday shine on T-zone and cheeks', 'Prone to clogged pores and texture bumps', 'Skin feels heavy with thick moisturizers'],
    recommendedIngredients: ['Niacinamide 4%', 'Micro-Molecular Hyaluronic Acid', 'Zinc PCA'],
    targetProductIds: ['aura-cleanser', 'aura-serum', 'aura-spf'],
    ritualSummary: 'Reset with non-stripping cleanser, hydrate with weightless watery hyaluronic serum, and protect with breathable SPF.'
  },
  {
    id: 'combination',
    name: 'Combination & Zonal',
    kicker: 'Dual Equilibrium',
    headline: 'T-zone oil excess paired with parched or sensitive cheek perimeters.',
    barrierState: 'Uneven moisture distribution across facial zones requiring targeted balancing.',
    characteristics: ['Oily forehead and nose alongside tight dry cheeks', 'Seasonal volatility in barrier balance', 'Requires customizable hydration layering'],
    recommendedIngredients: ['Panthenol B5', 'Multi-Ceramide Complex', 'Marine Hydration Minerals'],
    targetProductIds: ['aura-cleanser', 'aura-serum', 'aura-cream', 'aura-spf'],
    ritualSummary: 'Balance with gentle pH wash, apply universal hydration serum, and spot-moisturize drier perimeters.'
  },
  {
    id: 'sensitive',
    name: 'Sensitive & Reactive',
    kicker: 'Hyper-Permeable Shield',
    headline: 'Compromised defensive shield vulnerable to irritation, climate, and stress.',
    barrierState: 'Elevated nerve reactivity, erythema, stinging from environmental triggers.',
    characteristics: ['Frequent flushing or redness from temperature changes', 'Stinging sensation from synthetic fragrances', 'Easily compromised barrier structure'],
    recommendedIngredients: ['Phytosphingosine', 'Oat Beta-Glucan', '100% Non-Nano Mineral Filters'],
    targetProductIds: ['aura-cleanser', 'aura-cream', 'aura-spf'],
    ritualSummary: 'Minimalist 3-step soothing protocol free of drying alcohols, fragrance, and harsh foaming agents.'
  }
];

export const INGREDIENTS: IngredientFeature[] = [
  {
    id: 'ceramides',
    name: 'Essential Ceramides (1, 3, 6-II)',
    chemicalClass: 'Sphingolipids',
    concentration: '3.0% Physiological Ratio',
    biologicalAction: 'Acts as the intercellular mortar bonding corneocytes into an impermeable moisture retention wall.',
    clinicalImpact: 'Restores the epidermal lipid shield, reducing trans-epidermal water loss by 58% in 48 hours.',
    molecularRole: 'Barrier Cement'
  },
  {
    id: 'hyaluronic',
    name: '5D Hyaluronic Acid Matrix',
    chemicalClass: 'Glycosaminoglycan Polymers',
    concentration: '2.5% Fermented Complex',
    biologicalAction: 'Ultra-low to high dalton weights target multiple skin depths simultaneously for multi-tier plumpness.',
    clinicalImpact: 'Binds up to 1,000 times its weight in water, expanding cellular volume and smoothing dehydration lines.',
    molecularRole: 'Moisture Sponge'
  },
  {
    id: 'niacinamide',
    name: 'Refined Vitamin B3 (Niacinamide)',
    chemicalClass: 'Water-Soluble Vitamin',
    concentration: '4.0% Clinical Grade',
    biologicalAction: 'Stimulates natural ceramide synthesis while regulating follicular sebum production and calming redness.',
    clinicalImpact: 'Minimizes pore visibility, enhances cellular energy (NAD+), and reinforces lipid synthesis.',
    molecularRole: 'Tone & Barrier Architect'
  },
  {
    id: 'vitamin-c',
    name: 'Tetrahexyldecyl Ascorbate (Lipid-Soluble Vitamin C)',
    chemicalClass: 'Ascorbic Acid Ester',
    concentration: '5.0% Ultra-Stable',
    biologicalAction: 'Penetrates the lipid barrier 50x deeper than standard L-ascorbic acid without causing surface acidity or irritation.',
    clinicalImpact: 'Neutralizes free radical cascades from UV and pollution while stimulating collagen synthesis for radiant glow.',
    molecularRole: 'Radiance Engine'
  }
];

export const ROUTINE_STEPS: RoutineStep[] = [
  {
    stepNumber: '01',
    timeOfDay: 'both',
    action: 'Purify Without Stripping',
    productName: 'Hydro-Ceramide Cleansing Elixir',
    productSize: '200 ml',
    technique: 'Massage 2 pumps onto damp skin in circular motions for 60 seconds. Rinse with lukewarm water.',
    benefit: 'Clears environmental micro-dust while infusing skin-identical lipids.',
    productId: 'aura-cleanser'
  },
  {
    stepNumber: '02',
    timeOfDay: 'both',
    action: 'Deep Cellular Quenching',
    productName: 'Multi-Molecular Aqua Plump Serum',
    productSize: '50 ml',
    technique: 'Dispense 4 drops onto damp skin immediately after cleansing. Press gently with palms.',
    benefit: 'Draws moisture 5 epidermal layers deep for long-lasting cushion and glass-like radiance.',
    productId: 'aura-serum'
  },
  {
    stepNumber: '03',
    timeOfDay: 'both',
    action: 'Lipid Shield Rebuilding',
    productName: 'Cellular Barrier Recovery Crème',
    productSize: '60 ml',
    technique: 'Warm a hazelnut-sized portion between fingertips and press over face, neck, and décolleté.',
    benefit: 'Replaces depleted cholesterol and ceramides, sealing all hydration inside.',
    productId: 'aura-cream'
  },
  {
    stepNumber: '04',
    timeOfDay: 'morning',
    action: 'Photoprotective Defense',
    productName: 'Invisible Water-Gel Mineral SPF 50',
    productSize: '75 ml',
    technique: 'Apply three finger-lengths evenly across face and neck as the final morning step.',
    benefit: 'All-day broad-spectrum defense with clean non-comedogenic hydration.',
    productId: 'aura-spf'
  }
];
