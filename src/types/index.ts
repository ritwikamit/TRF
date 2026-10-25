export type PageId = 'home' | 'works' | 'about' | 'journal' | 'contact' | 'cookie-policy' | 'terms';

export type WeddingCategory = 'all' | 'wedding' | 'films' | 'prewedding' | 'ceremonies' | 'albums';

export interface WeddingSpecs {
  cameras: string;
  lenses: string;
  drone: string;
  deliverables: string;
  filmDuration?: string;
  albumType?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: WeddingCategory;
  categoryLabel: string;
  year: string;
  client: string;
  location: string;
  venue: string;
  description: string;
  challenge: string;
  approach: string;
  outcome: string;
  aspectRatio: string;
  artType: 'monolith' | 'monograph' | 'sculpture' | 'kinetic' | 'industrial' | 'archive' | 'grid' | 'waveform';
  imageUrl?: string;
  accentColor: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  specs: WeddingSpecs;
  videoUrl?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  location: string;
  excerpt: string;
  content: string[];
  tips: string[];
  artType: 'monolith' | 'monograph' | 'sculpture' | 'kinetic' | 'industrial' | 'grid';
  imageUrl?: string;
}

export interface WeddingInquiryData {
  coupleNames: string;
  phone: string;
  email: string;
  weddingDate: string;
  cityAndVenue: string;
  services: string[];
  eventTypes: string[];
  guestCount: string;
  notes: string;
}
