import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  isPortuguese: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    // Detect browser language on first load
    const browserLang = navigator.language.toLowerCase();
    const isPortugueseBrowser = browserLang.startsWith('pt');
    
    if (isPortugueseBrowser && !localStorage.getItem('i18nextLng')) {
      setLanguage('pt');
    }
  }, []);

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    isPortuguese: currentLanguage === 'pt',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
