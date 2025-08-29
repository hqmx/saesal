'use client';

import { useState, useEffect } from 'react';

interface Demo2NavigationProps {
  activeSection?: string;
  config: any;
}

export default function Demo2Navigation({ activeSection, config }: Demo2NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'comparison', label: 'Comparison', href: '#comparison' },
    { id: 'process', label: 'Process', href: '#process' },
    { id: 'safety', label: 'Safety', href: '#safety' },
    { id: 'contact', label: 'Contact', href: '#contact' },
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
      const headerHeight = 80;
      
      if (targetId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        
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
          height: `${config.layout.header.height}px`
        }}
      >
        <nav 
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: config.layout.container.maxWidth }}
        >
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <button
                onClick={() => handleNavClick('#hero')}
                className="flex items-center group"
              >
                <img 
                  src="/logo.png" 
                  alt="SæsaL Logo" 
                  className="h-12 w-auto object-contain group-hover:opacity-80 transition-opacity"
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                />
              </button>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'border-b-2'
                      : 'hover:opacity-70'
                  }`}
                  style={{
                    color: activeSection === item.id ? '#5CBDB9' : config.theme.colors.text.primary,
                    borderBottomColor: activeSection === item.id ? '#5CBDB9' : 'transparent'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => handleNavClick('#contact')}
                className="px-6 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg text-white"
                style={{ 
                  backgroundColor: config.theme.colors.secondary,
                }}
              >
                Work with Us
              </button>
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          <div 
            className="fixed top-20 right-0 w-80 max-w-sm shadow-2xl z-50 lg:hidden"
            style={{ backgroundColor: config.theme.colors.surface }}
          >
            <div className="p-6 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'border-l-4 shadow-md'
                      : 'hover:bg-gray-50'
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
              
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full px-6 py-3 rounded-lg font-medium transition-colors text-white"
                  style={{ backgroundColor: config.theme.colors.secondary }}
                >
                  Work with Us
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}