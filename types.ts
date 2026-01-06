
export enum Language {
  BN = 'bn',
  EN = 'en'
}

export enum Category {
  DAILY = 'daily',
  INTERNATIONAL = 'international',
  NATIONAL = 'national',
  VIRAL = 'viral',
  TRAVEL = 'travel',
  BUSINESS = 'business',
  SPORTS = 'sports',
  ENTERTAINMENT = 'entertainment',
  HEALTH = 'health',
  TECH = 'tech'
}

export interface Article {
  id: string;
  category: Category;
  title: { [key in Language]: string };
  summary: { [key in Language]: string };
  content: { [key in Language]: string };
  image: string;
  gallery: string[];
  videoUrl?: string;
  author: string;
  authorId: string;
  date: string;
  isBreaking?: boolean;
  views: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  aiSubscription?: {
    expiryDate: string;
    isActive: boolean;
  };
  investment?: {
    sharePercentage: number;
    amountInvested: number;
    totalROI: number;
  };
  articlesPublished: string[]; // IDs
}

export interface SiteConfig {
  language: Language;
  theme: 'light' | 'dark';
}
