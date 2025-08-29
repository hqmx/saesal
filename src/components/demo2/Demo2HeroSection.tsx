'use client';

import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';

interface Demo2HeroSectionProps {
  config: any;
}

export default function Demo2HeroSection({ config }: Demo2HeroSectionProps) {
  const { hero } = config.components;
  
  return (
    <section 
      id="hero" 
      className="relative min-h-screen overflow-hidden -mt-20 pt-20 flex items-center"
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: config.theme.colors.background
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-60"></div>

      <div className="relative z-10 w-full">
        <div 
          className="mx-auto px-4 text-center"
          style={{ 
            maxWidth: config.layout.container.maxWidth,
            padding: config.layout.container.padding.mobile 
          }}
        >
          <div className="space-y-8">
            <div className="mb-12">
              <div 
                className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl border-4"
                style={{ 
                  background: `linear-gradient(135deg, ${config.theme.colors.surface}, ${config.theme.colors.background})`,
                  borderColor: config.theme.colors.primary
                }}
              >
                <img 
                  src="/logo.png" 
                  alt="SæsaL Logo" 
                  className="w-20 h-20 object-contain"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                style={{ 
                  color: config.theme.colors.text.primary,
                  fontFamily: config.theme.typography.fontFamily.heading
                }}
              >
                <span 
                  style={{ 
                    background: `linear-gradient(45deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {hero.title}
                </span>
              </h1>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 leading-relaxed"
                style={{ 
                  color: config.theme.colors.text.secondary,
                  fontFamily: config.theme.typography.fontFamily.heading
                }}
              >
                {hero.subtitle}
              </h2>
            </div>

            <p 
              className="text-2xl mb-12 max-w-2xl mx-auto font-medium"
              style={{ 
                color: config.theme.colors.text.primary,
                fontSize: config.theme.typography.fontSize['2xl']
              }}
            >
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                className="px-10 py-4 rounded-xl font-semibold text-xl transition-all shadow-xl hover:shadow-2xl text-white transform hover:scale-105"
                style={{ 
                  backgroundColor: config.theme.colors.primary,
                  fontSize: config.theme.typography.fontSize.xl
                }}
              >
                {hero.cta.primary}
              </button>
              <button
                className="px-10 py-4 rounded-xl font-semibold text-xl transition-all border-2 hover:shadow-xl transform hover:scale-105"
                style={{ 
                  color: config.theme.colors.secondary,
                  borderColor: config.theme.colors.secondary,
                  backgroundColor: 'transparent'
                }}
              >
                {hero.cta.secondary}
              </button>
            </div>

            {/* Solution Product Image */}
            <div className="mb-16">
              <div className="max-w-2xl mx-auto">
                <img 
                  src="/solution.png" 
                  alt="SæsaL Solution Product" 
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                    border: '4px solid white'
                  }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div 
                className="text-center p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: config.theme.colors.surface }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${config.theme.colors.primary}20` }}
                >
                  <svg className="w-8 h-8" style={{ color: config.theme.colors.primary }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  All Colors Work
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  Works on every color including cosmetic tattoos
                </p>
              </div>

              <div 
                className="text-center p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: config.theme.colors.surface }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
                >
                  <svg className="w-8 h-8" style={{ color: config.theme.colors.secondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  Only 4 Sessions
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  Complete removal in just 4 treatment sessions
                </p>
              </div>

              <div 
                className="text-center p-6 rounded-2xl shadow-lg"
                style={{ backgroundColor: config.theme.colors.surface }}
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${config.theme.colors.accent}20` }}
                >
                  <svg className="w-8 h-8" style={{ color: config.theme.colors.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  100% Natural
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  All natural and organic materials safe for skin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}