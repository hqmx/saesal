export type Language = 'en' | 'ko' | 'ja' | 'zh' | 'zh-tw' | 'th' | 'vi' | 'es' | 'sv' | 'de';

export const languages: Record<Language, { name: string; nativeName: string; flag: string }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  zh: { name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳' },
  'zh-tw': { name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼' },
  th: { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  sv: { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
};

export const defaultLanguage: Language = 'en';

// Browser language detection
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return defaultLanguage;
  
  const browserLang = navigator.language.toLowerCase();
  
  // Map browser language codes to our supported languages
  const langMap: Record<string, Language> = {
    'en': 'en',
    'en-us': 'en',
    'en-gb': 'en',
    'ko': 'ko',
    'ko-kr': 'ko',
    'ja': 'ja',
    'ja-jp': 'ja',
    'zh': 'zh',
    'zh-cn': 'zh',
    'zh-tw': 'zh-tw',
    'th': 'th',
    'th-th': 'th',
    'vi': 'vi',
    'vi-vn': 'vi',
    'es': 'es',
    'es-es': 'es',
    'es-mx': 'es',
    'sv': 'sv',
    'sv-se': 'sv',
    'de': 'de',
    'de-de': 'de'
  };
  
  return langMap[browserLang] || defaultLanguage;
}

// Storage helpers
export function saveLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('preferred-language', lang);
  document.cookie = `language=${lang};path=/;max-age=31536000`; // 1 year
}

export function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;
  
  // Try localStorage first
  const stored = localStorage.getItem('preferred-language');
  if (stored && Object.keys(languages).includes(stored)) {
    return stored as Language;
  }
  
  // Fallback to cookie
  const cookies = document.cookie.split(';');
  const langCookie = cookies.find(c => c.trim().startsWith('language='));
  if (langCookie) {
    const lang = langCookie.split('=')[1];
    if (Object.keys(languages).includes(lang)) {
      return lang as Language;
    }
  }
  
  return null;
}