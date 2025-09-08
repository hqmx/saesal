'use client';

import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

interface AboutSectionProps {
  config: any;
}

export default function AboutSection({ config }: AboutSectionProps) {
  const { t } = useLanguage();
  const titleRef = useInViewAnimation();
  const { about } = config.components;
  
  return (
    <section 
      id="about" 
      className="py-20 px-2 sm:px-4"
      style={{ backgroundColor: config.theme.colors.surface }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <div 
          ref={titleRef}
          className="text-center mb-16 opacity-0 -translate-y-8 scale-95 transition-all duration-700 ease-out"
        >
          <h2 
            className="font-medium mb-6"
            style={{ 
              color: config.theme.colors.text.primary,
              fontFamily: config.theme.typography.fontFamily.heading,
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              lineHeight: '1.3'
            }}
          >
            {t('about.title')}
          </h2>
          <p 
            className="text-xl mb-4"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.xl
            }}
          >
            {t('about.subtitle')}
          </p>
          <p 
            className="text-lg font-normal"
            style={{ 
              color: config.theme.colors.primary,
              fontSize: config.theme.typography.fontSize.lg
            }}
          >
            {t('about.description')}
          </p>
        </div>

        <StaggeredAnimationContainer className="grid lg:grid-cols-2 gap-16 items-center mb-20" delay={200}>
          <StaggeredItem>
            <div 
              className="p-10 relative overflow-hidden aspect-square sm:aspect-auto lg:aspect-square"
              style={{
                backgroundImage: "url('/mb-clear.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.35)'
                }}
              ></div>
              
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-0">
                  <div 
                    className="w-55 h-55 flex items-center justify-center"
                    style={{
                      borderRadius: '40px',
                      overflow: 'hidden',
                      backgroundImage: "url('/solution.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      margin: '0',
                      padding: '0'
                    }}
                  >
                  </div>
                  
                  <img 
                    src="/logo.png" 
                    alt="SæsaL Logo" 
                    className="object-contain"
                    style={{ 
                      height: '80px',
                      margin: '0',
                      marginTop: '-10px'
                    }}
                  />
                </div>
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="space-y-8">
              <div 
                className="p-4 sm:p-8 rounded-2xl shadow-lg border-l-4"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  borderColor: config.theme.colors.primary
                }}
              >
                <h4 
                  className="text-2xl font-medium mb-4"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  {t('about.revolutionary.title')}
                </h4>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  {t('about.revolutionary.description')}
                </p>
              </div>

              <div 
                className="p-4 sm:p-8 rounded-2xl shadow-lg border-l-4"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  borderColor: config.theme.colors.secondary
                }}
              >
                <h4 
                  className="text-2xl font-medium mb-4"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  {t('about.natural.title')}
                </h4>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  {t('about.natural.description')}
                </p>
              </div>

              <div 
                className="p-4 sm:p-8 rounded-2xl shadow-lg border-l-4"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  borderColor: config.theme.colors.accent
                }}
              >
                <h4 
                  className="text-2xl font-medium mb-4"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  {t('about.fast.title')}
                </h4>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  {t('about.fast.description')}
                </p>
              </div>
            </div>
          </StaggeredItem>
        </StaggeredAnimationContainer>

      </div>
    </section>
  );
}