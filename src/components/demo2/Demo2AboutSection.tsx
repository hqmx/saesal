'use client';

import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';

interface Demo2AboutSectionProps {
  config: any;
}

export default function Demo2AboutSection({ config }: Demo2AboutSectionProps) {
  const titleRef = useInViewAnimation();
  const { about } = config.components;
  
  return (
    <section 
      id="about" 
      className="py-20 px-4"
      style={{ backgroundColor: config.theme.colors.surface }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <div 
          ref={titleRef}
          className="text-center mb-16 opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ 
              color: config.theme.colors.text.primary,
              fontFamily: config.theme.typography.fontFamily.heading
            }}
          >
            {about.title}
          </h2>
          <p 
            className="text-xl mb-4"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.xl
            }}
          >
            {about.subtitle}
          </p>
          <p 
            className="text-lg font-semibold"
            style={{ 
              color: config.theme.colors.primary,
              fontSize: config.theme.typography.fontSize.lg
            }}
          >
            {about.description}
          </p>
        </div>

        <StaggeredAnimationContainer className="grid lg:grid-cols-2 gap-16 items-center mb-20" delay={200}>
          <StaggeredItem>
            <div 
              className="p-10 rounded-3xl shadow-2xl border"
              style={{
                backgroundColor: `${config.theme.colors.primary}05`,
                borderColor: `${config.theme.colors.primary}20`
              }}
            >
              <div className="text-center mb-8">
                <div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`
                  }}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L8 4z" />
                  </svg>
                </div>
                
                <h3 
                  className="text-6xl font-bold mb-4"
                  style={{ 
                    background: `linear-gradient(45deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  SAESAL
                </h3>
                
                <div className="space-y-4">
                  <div 
                    className="inline-block px-6 py-3 rounded-full text-lg font-semibold"
                    style={{ 
                      backgroundColor: config.theme.colors.primary,
                      color: 'white'
                    }}
                  >
                    Perfect Solution
                  </div>
                  
                  <div 
                    className="inline-block px-6 py-3 rounded-full text-lg font-semibold ml-4"
                    style={{ 
                      backgroundColor: config.theme.colors.secondary,
                      color: 'white'
                    }}
                  >
                    Effective Way
                  </div>
                </div>
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="space-y-8">
              <div 
                className="p-8 rounded-2xl shadow-lg border-l-4"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  borderColor: config.theme.colors.primary
                }}
              >
                <h4 
                  className="text-2xl font-bold mb-4"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  Revolutionary Approach
                </h4>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  Unlike traditional laser treatments, Saesal works with your body's natural healing system 
                  to safely and effectively remove tattoo ink from all colors and types.
                </p>
              </div>

              <div 
                className="p-8 rounded-2xl shadow-lg border-l-4"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  borderColor: config.theme.colors.secondary
                }}
              >
                <h4 
                  className="text-2xl font-bold mb-4"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  Natural & Safe
                </h4>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  Our solution uses only natural and organic materials that are already 
                  components of the human body, ensuring maximum safety and effectiveness.
                </p>
              </div>

              <div 
                className="p-8 rounded-2xl shadow-lg border-l-4"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  borderColor: config.theme.colors.accent
                }}
              >
                <h4 
                  className="text-2xl font-bold mb-4"
                  style={{ color: config.theme.colors.text.primary }}
                >
                  Fast Results
                </h4>
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: config.theme.colors.text.secondary }}
                >
                  Complete tattoo removal in just 4 sessions, compared to 10+ sessions 
                  required by traditional laser treatments.
                </p>
              </div>
            </div>
          </StaggeredItem>
        </StaggeredAnimationContainer>

        <StaggeredAnimationContainer className="text-center" delay={400}>
          <StaggeredItem>
            <div 
              className="p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto"
              style={{
                background: `linear-gradient(135deg, ${config.theme.colors.accent}15, ${config.theme.colors.primary}10)`,
                border: `2px solid ${config.theme.colors.accent}20`
              }}
            >
              <div className="mb-8">
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.theme.colors.accent}, ${config.theme.colors.primary})`
                  }}
                >
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h3 
                  className="text-3xl font-bold mb-4"
                  style={{ 
                    color: config.theme.colors.text.primary,
                    fontFamily: config.theme.typography.fontFamily.heading
                  }}
                >
                  {about.meaning.title}
                </h3>
                
                <p 
                  className="text-xl leading-relaxed max-w-2xl mx-auto"
                  style={{ 
                    color: config.theme.colors.text.secondary,
                    fontSize: config.theme.typography.fontSize.xl
                  }}
                >
                  {about.meaning.description}
                </p>
              </div>

              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold"
                    style={{ color: config.theme.colors.primary }}
                  >
                    새살
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ color: config.theme.colors.text.muted }}
                  >
                    Korean
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold"
                    style={{ color: config.theme.colors.secondary }}
                  >
                    New Skin
                  </div>
                  <div 
                    className="text-sm font-medium"
                    style={{ color: config.theme.colors.text.muted }}
                  >
                    English
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