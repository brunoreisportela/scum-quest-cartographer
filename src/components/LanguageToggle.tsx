import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import BrazilianFlag from './BrazilianFlag';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, setLanguage, isPortuguese } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(isPortuguese ? 'en' : 'pt');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="outline"
      size="sm"
      className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 font-semibold"
      title={isPortuguese ? 'Switch to English' : 'Mudar para Português'}
    >
      {isPortuguese ? (
        <>
          <span className="text-xs font-bold mr-2">EN</span>
          <span className="text-xs">🇺🇸</span>
        </>
      ) : (
        <>
          <BrazilianFlag size="sm" className="mr-2" />
          <span className="text-xs">PT</span>
        </>
      )}
    </Button>
  );
};

export default LanguageToggle;
