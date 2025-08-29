'use client';

import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';

interface Demo2SafetySectionProps {
  config: any;
}

export default function Demo2SafetySection({ config }: Demo2SafetySectionProps) {
  const titleRef = useInViewAnimation();
  const { safety } = config.components;
  
  return (
    <section 
      id="safety" 
      className="py-20 px-4"
      style={{ backgroundColor: config.theme.colors.background }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <StaggeredAnimationContainer delay={200}>
          <StaggeredItem>
            <div 
              className="max-w-4xl mx-auto text-center p-12 rounded-3xl shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${config.theme.colors.secondary}15, ${config.theme.colors.primary}10, ${config.theme.colors.accent}08)`,
                border: `3px solid ${config.theme.colors.secondary}30`
              }}
            >
              {/* Question */}
              <div className="mb-12">
                <div 
                  className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center shadow-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.theme.colors.accent}, ${config.theme.colors.primary})`
                  }}
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h2 
                  className="text-5xl md:text-6xl font-bold mb-6"
                  style={{ 
                    color: config.theme.colors.text.primary,
                    fontFamily: config.theme.typography.fontFamily.heading
                  }}
                >
                  {safety.title}
                </h2>
              </div>

              {/* Answer */}
              <div className="mb-12">
                <div 
                  className="text-8xl md:text-9xl font-black mb-8"
                  style={{ 
                    background: `linear-gradient(45deg, ${config.theme.colors.secondary}, ${config.theme.colors.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {safety.answer}
                </div>
                
                <p 
                  className="text-2xl leading-relaxed max-w-3xl mx-auto"
                  style={{ 
                    color: config.theme.colors.text.primary,
                    fontSize: config.theme.typography.fontSize['2xl']
                  }}
                >
                  {safety.description}
                </p>
              </div>

              {/* Safety Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div 
                  className="p-6 rounded-2xl shadow-lg"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-bold mb-3"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    100% Natural
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary }}
                  >
                    All ingredients are naturally occurring compounds found in the human body
                  </p>
                </div>

                <div 
                  className="p-6 rounded-2xl shadow-lg"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-bold mb-3"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    Organic Materials
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary }}
                  >
                    Certified organic compounds that work harmoniously with your skin's biology
                  </p>
                </div>

                <div 
                  className="p-6 rounded-2xl shadow-lg"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 
                    className="text-lg font-bold mb-3"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    Body Components
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary }}
                  >
                    Made from substances already present in human physiology
                  </p>
                </div>
              </div>

              {/* Safety Assurance */}
              <div 
                className="mt-12 p-8 rounded-2xl border-2"
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
                    className="text-2xl font-bold"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    Safety Guaranteed
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
                        style={{ color: config.theme.colors.text.secondary }}
                      >
                        No synthetic chemicals or harsh substances
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary }}
                      >
                        Biocompatible with human tissue
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary }}
                      >
                        No risk of allergic reactions
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
                        style={{ color: config.theme.colors.text.secondary }}
                      >
                        Works with your body's natural healing
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary }}
                      >
                        No long-term side effects
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary }}
                      >
                        Suitable for all skin types
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