'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavigationProps {
  activeSection?: string;
  config: any;
}

export default function Navigation({ activeSection, config }: NavigationProps) {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const navigationItems = [
    { id: 'about', label: t('nav.about'), href: '#about' },
    { id: 'comparison', label: t('nav.comparison'), href: '#comparison' },
    { id: 'process', label: t('nav.process'), href: '#process' },
    { id: 'safety', label: t('nav.safety'), href: '#safety' },
    { id: 'contact', label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 40;
      const additionalOffset = -40;
      
      if (targetId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - additionalOffset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }
    
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-transparent'
        }`}
        style={{
          backgroundColor: isScrolled ? config.layout.header.background : 'transparent',
          height: 'clamp(50px, 6vh, 70px)'
        }}
      >
        <nav 
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: config.layout.container.maxWidth }}
        >
          <div className="flex justify-between items-center" style={{ height: 'clamp(50px, 6vh, 70px)' }}>
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('#hero')}
                className="flex items-center group transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img 
                  src="/logo.png" 
                  alt="SæsaL Logo" 
                  className="w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                  style={{ 
                    height: 'clamp(50px, 5vw, 70px)', 
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    transform: 'translateZ(0)'
                  }}
                />
              </button>
            </div>

            <div 
              className="hidden lg:flex items-center"
              style={{ gap: 'clamp(8px, 1.5vw, 16px)' }}
            >
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    activeSection === item.id
                      ? ''
                      : 'hover:opacity-70'
                  }`}
                  style={{
                    color: activeSection === item.id ? '#5CBDB9' : config.theme.colors.text.primary
                  }}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 0 4.5 4.03 4.5 9s-2 9-4.5 9m0-18c-2.5 0-4.5 4.03-4.5 9s2 9 4.5 9M3 12h18m-9-9v18" />
                  </svg>
                </button>
                
                {isLanguageDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsLanguageDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-lg shadow-lg border z-40 max-h-64 overflow-y-auto">
                      {Object.entries(availableLanguages).map(([code, langInfo], index, array) => (
                        <button
                          key={code}
                          onClick={() => {
                            setLanguage(code as any);
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                            index === 0 ? 'rounded-t-lg' : ''
                          } ${
                            index === array.length - 1 ? 'rounded-b-lg' : ''
                          } ${
                            language === code ? 'bg-blue-50 text-blue-600' : ''
                          }`}
                        >
                          {langInfo.flag} {langInfo.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              style={{ color: config.theme.colors.text.primary }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div 
            className="fixed right-4 w-40 shadow-2xl rounded-xl z-50 lg:hidden"
            style={{ 
              top: 'clamp(50px, 6vh, 70px)',
              backgroundColor: config.theme.colors.surface 
            }}
          >
            <div className="py-6 px-0 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-center px-0 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    activeSection === item.id
                      ? 'border-l-4'
                      : 'hover:bg-white hover:bg-opacity-80'
                  }`}
                  style={{
                    backgroundColor: activeSection === item.id ? '#5CBDB910' : 'transparent',
                    color: activeSection === item.id ? '#5CBDB9' : config.theme.colors.text.primary,
                    borderColor: activeSection === item.id ? '#5CBDB9' : 'transparent'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}