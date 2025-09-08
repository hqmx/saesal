'use client';

import { StaggeredAnimationContainer, StaggeredItem } from '@/hooks/useStaggeredAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

interface MeaningSectionProps {
  config: any;
}

export default function MeaningSection({ config }: MeaningSectionProps) {
  const { t } = useLanguage();
  const { about } = config.components;
  
  return (
    <section 
      className="py-20" 
      style={{
        background: `linear-gradient(135deg, ${config.theme.colors.primary}10, ${config.theme.colors.secondary}08, ${config.theme.colors.background})`
      }}
    >
      <div className="w-full">
        <StaggeredAnimationContainer className="text-center" delay={400}>
          <StaggeredItem>
            <div 
              className="p-6 sm:p-12 relative overflow-hidden w-full"
              style={{
                backgroundImage: "url('/mb.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.8
              }}
            >
              <div className="relative z-10 mb-8">
                <h3 
                  className="font-medium mb-4"
                  style={{ 
                    color: '#1a5a3a',
                    fontFamily: config.theme.typography.fontFamily.heading,
                    fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                    lineHeight: '1.3'
                  }}
                >
                  {t('about.meaning.title')}
                </h3>
                
              </div>

              <div className="flex justify-between items-center relative z-10 max-w-6xl mx-auto px-8">
                <div className="text-left">
                  <p 
                    className="text-lg font-medium"
                    style={{ 
                      color: '#1a5a3a',
                      fontFamily: config.theme.typography.fontFamily.heading
                    }}
                  >
                    {t('about.meaning.line1')}
                  </p>
                </div>
                <div className="text-right">
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ 
                      color: '#1a5a3a',
                      fontSize: config.theme.typography.fontSize.lg
                    }}
                  >
                    <span dangerouslySetInnerHTML={{__html: t('about.meaning.line2')}} />
                  </p>
                </div>
              </div>
            </div>
          </StaggeredItem>
        </StaggeredAnimationContainer>
      </div>
    </section>
  );
}