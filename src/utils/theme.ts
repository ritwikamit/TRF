import { PageId } from '../types';

export interface PageThemeConfig {
  id: PageId;
  name: string;
  number: string;
  primaryColor: string; // Hex color for the circular transition and primary accents
  accentColor: string;
  pageBgClass: string; // Coordinated dominant background for the page
  textColor: string;
  badgeBg: string;
  borderColor: string;
}

export const PAGE_THEMES: Record<PageId, PageThemeConfig> = {
  home: {
    id: 'home',
    name: 'THE ROYAL FILMS',
    number: '01',
    primaryColor: '#FFFFFF', // White loading transition for home page
    accentColor: '#38BDF8',
    pageBgClass: 'bg-white text-black',
    textColor: 'text-black',
    badgeBg: 'text-black',
    borderColor: 'border-black/20'
  },
  works: {
    id: 'works',
    name: 'WEDDING STORIES & 4K FILMS',
    number: '02',
    primaryColor: '#EA580C', // Vibrant Orange
    accentColor: '#FB923C',
    pageBgClass: 'bg-[#EA580C] text-white',
    textColor: 'text-white',
    badgeBg: 'text-white',
    borderColor: 'border-white/30'
  },
  about: {
    id: 'about',
    name: 'STUDIO & NIRAJ SINGH',
    number: '03',
    primaryColor: '#7C3AED', // Vibrant Purple
    accentColor: '#A78BFA',
    pageBgClass: 'bg-[#7C3AED] text-white',
    textColor: 'text-white',
    badgeBg: 'text-white',
    borderColor: 'border-white/30'
  },
  journal: {
    id: 'journal',
    name: 'COUPLE PLANNING GUIDES',
    number: '04',
    primaryColor: '#16A34A', // Vibrant Parrot Green
    accentColor: '#4ADE80',
    pageBgClass: 'bg-[#16A34A] text-white',
    textColor: 'text-white',
    badgeBg: 'text-white',
    borderColor: 'border-white/30'
  },
  contact: {
    id: 'contact',
    name: 'RESERVE WEDDING DATES',
    number: '05',
    primaryColor: '#EAB308', // Vibrant Light Yellow
    accentColor: '#FDE047',
    pageBgClass: 'bg-[#EAB308] text-black',
    textColor: 'text-black',
    badgeBg: 'text-black',
    borderColor: 'border-black/30'
  },
  'cookie-policy': {
    id: 'cookie-policy',
    name: 'COOKIE PRIVACY POLICY',
    number: '06',
    primaryColor: '#0EA5E9', // Vibrant Sky Blue
    accentColor: '#38BDF8',
    pageBgClass: 'bg-[#0EA5E9] text-white',
    textColor: 'text-white',
    badgeBg: 'text-white',
    borderColor: 'border-white/30'
  },
  terms: {
    id: 'terms',
    name: 'TERMS & CONDITIONS',
    number: '07',
    primaryColor: '#475569', // Neutral Slate
    accentColor: '#94A3B8',
    pageBgClass: 'bg-[#475569] text-white',
    textColor: 'text-white',
    badgeBg: 'text-white',
    borderColor: 'border-white/30'
  }
};
