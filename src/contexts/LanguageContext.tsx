'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages, defaultLanguage, detectBrowserLanguage, saveLanguage, getStoredLanguage } from '@/lib/translations';

// Import all translation files
import enTranslations from '@/locales/en.json';
import koTranslations from '@/locales/ko.json';
import jaTranslations from '@/locales/ja.json';
import zhTranslations from '@/locales/zh.json';
import thTranslations from '@/locales/th.json';
import viTranslations from '@/locales/vi.json';
import esTranslations from '@/locales/es.json';
import svTranslations from '@/locales/sv.json';
import deTranslations from '@/locales/de.json';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: typeof languages;
}

// Centralized translations object
const translations = {
  en: enTranslations,
  ko: koTranslations,
  ja: jaTranslations,
  zh: zhTranslations,
  th: thTranslations,
  vi: viTranslations,
  es: esTranslations,
  sv: svTranslations,
  de: deTranslations
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Initialize language on client side
  useEffect(() => {
    const stored = getStoredLanguage();
    const detected = detectBrowserLanguage();
    const initialLanguage = stored || detected;
    
    setLanguageState(initialLanguage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if not found in fallback
          }
        }
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      availableLanguages: languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}