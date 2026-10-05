export type Region = 'South Bombay' | 'Central Suburbs' | 'Western Suburbs' | 'Eastern Suburbs' | 'Coastal Fringe';

export type BudgetLevel = '₹' | '₹₹' | '₹₹₹';

export interface TrailSpot {
  id: string;
  name: string;
  historicYear?: string;
  neighborhood: string;
  address: string;
  timing: string;
  signatureDishes: string[];
  proTip: string;
  budgetLevel: BudgetLevel;
  priceRange: string;
  bestTimeToGo: string;
  trainStation: string;
}

export interface DishChecklistItem {
  id: string;
  dish: string;
  spot: string;
  description: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  pullQuote?: string;
  highlights?: string[];
}

export interface AudioAtmosphere {
  ambientTitle: string;
  description: string;
  soundNotes: string[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  kicker: string;
  neighborhood: string;
  region: Region;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    title: string;
  };
  heroImage: string;
  heroImageCaption: string;
  overview: string;
  dropCapInitial: string;
  sections: ArticleSection[];
  spots: TrailSpot[];
  trailMetrics: {
    totalSpots: number;
    distanceKm: string;
    suggestedPacing: string;
    dietaryFocus: 'Mixed Non-Veg & Veg' | 'Pure Vegetarian' | 'Seafood Specialties' | 'Bakes & Brews';
    spiceIndex: 'Mild' | 'Medium' | 'Fiery';
  };
  checklist: DishChecklistItem[];
  audioAtmosphere: AudioAtmosphere;
  tags: string[];
  featured?: boolean;
}

export interface GlossaryItem {
  term: string;
  marathiHindiScript?: string;
  pronunciation: string;
  definition: string;
  culturalLore: string;
  whereToOrder: string;
}
