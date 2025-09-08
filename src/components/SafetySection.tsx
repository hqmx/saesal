'use client';

import { StaggeredAnimationContainer, StaggeredItem } from '@/hooks/useStaggeredAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

interface SafetySectionProps {
  config: any;
}

export default function SafetySection({ config }: SafetySectionProps) {
  const { t } = useLanguage();
  
  return (
    <section 
      id="safety" 
      className="py-13 px-2 sm:px-4"
      style={{ backgroundColor: config.theme.colors.background }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <StaggeredAnimationContainer delay={200}>
          <StaggeredItem>
            <div 
              className="max-w-4xl mx-auto text-center p-6 sm:p-12 rounded-3xl shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${config.theme.colors.secondary}15, ${config.theme.colors.primary}10, ${config.theme.colors.accent}08)`,
                border: `3px solid ${config.theme.colors.secondary}30`
              }}
            >
              <StaggeredAnimationContainer delay={1200}>
                {/* Title Animation First */}
                <StaggeredItem>
                  <div className="mb-8">
                    <h2 
                      className="font-medium mb-6"
                      style={{ 
                        color: config.theme.colors.text.primary,
                        fontFamily: config.theme.typography.fontFamily.heading,
                        fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                        lineHeight: '1.3'
                      }}
                    >
                      {t('safety.title')}
                    </h2>
                  </div>
                </StaggeredItem>
                
                {/* Answer Animation Second */}
                <StaggeredItem>
                  <div className="mb-12">
                    <div 
                      className="text-5xl md:text-6xl font-bold mb-8"
                      style={{ 
                        color: config.theme.colors.secondary
                      }}
                    >
                      {t('safety.answer')}
                    </div>
                    
                    <p 
                      className="text-2xl leading-relaxed max-w-3xl mx-auto"
                      style={{ 
                        color: config.theme.colors.text.primary,
                        fontSize: config.theme.typography.fontSize['2xl']
                      }}
                    >
                      {t('safety.description')}
                    </p>
                  </div>
                </StaggeredItem>
              </StaggeredAnimationContainer>

              {/* Safety Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div 
                  className="p-4 sm:p-6 rounded-2xl shadow-lg"
                  style={{ backgroundColor: config.theme.colors.surface }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
                  >
                    <svg 
                      className="w-8 h-8" 
                      style={{ color: config.theme.colors.secondary }} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    {t('safety.natural')}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('safety.naturalDescription')}
                  </p>
                </div>

                <div 
                  className="p-4 sm:p-6 rounded-2xl shadow-lg"
                  style={{ backgroundColor: config.theme.colors.surface }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${config.theme.colors.primary}20` }}
                  >
                    <svg 
                      className="w-8 h-8" 
                      style={{ color: config.theme.colors.primary }} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
                      <path d="8 12l2 2 4-4" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    {t('safety.professional')}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('safety.professionalDescription')}
                  </p>
                </div>

                <div 
                  className="p-4 sm:p-6 rounded-2xl shadow-lg"
                  style={{ backgroundColor: config.theme.colors.surface }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${config.theme.colors.accent}20` }}
                  >
                    <svg 
                      className="w-8 h-8" 
                      style={{ color: config.theme.colors.accent }} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L12 22M2 12L22 12" strokeWidth="1.5" />
                      <circle cx="7" cy="7" r="2" strokeWidth="1.5" />
                      <circle cx="17" cy="7" r="2" strokeWidth="1.5" />
                      <circle cx="7" cy="17" r="2" strokeWidth="1.5" />
                      <circle cx="17" cy="17" r="2" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-medium mb-3"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    {t('safety.bodyComponents')}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t('safety.bodyComponentsDescription')}
                  </p>
                </div>
              </div>

              {/* Safety Assurance */}
              <div 
                className="mt-12 p-4 sm:p-8 rounded-2xl border-2"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  borderColor: config.theme.colors.secondary
                }}
              >
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: config.theme.colors.secondary }}
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 
                    className="text-2xl font-medium"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    {t('safety.guaranteed')}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t('safety.guarantee1')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t('safety.guarantee2')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t('safety.guarantee3')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t('safety.guarantee4')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t('safety.guarantee5')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t('safety.guarantee6')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </StaggeredItem>
        </StaggeredAnimationContainer>
      </div>
    </section>
  );
}