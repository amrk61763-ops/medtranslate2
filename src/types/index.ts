export const TranslationStatus = {
  IDLE: 'IDLE',
  FILE_SELECTED: 'FILE_SELECTED',
  WATCHING_AD: 'WATCHING_AD',
  TRANSLATING: 'TRANSLATING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
  CANCELLED: 'CANCELLED'
} as const;

export type TranslationStatusType = typeof TranslationStatus[keyof typeof TranslationStatus];

export interface LanguageOption {
  code: string;
  name: string;
  nameNative: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

// Limited to only 2 languages: English and Arabic
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nameNative: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nameNative: 'العربية', flag: '🇸🇦', direction: 'rtl' },
];

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface AdConfig {
  rewardAdUnitId: string;
  interstitialAdUnitId: string;
}
