'use client';

import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';

interface Demo2ProcessSectionProps {
  config: any;
}

export default function Demo2ProcessSection({ config }: Demo2ProcessSectionProps) {
  const titleRef = useInViewAnimation();
  const { process } = config.components;
  
  return (
    <section 
      id="process" 
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
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: config.theme.colors.text.primary,
              fontFamily: config.theme.typography.fontFamily.heading
            }}
          >
            {process.title}
          </h2>
          <p 
            className="text-xl"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.xl
            }}
          >
            {process.subtitle}
          </p>
        </div>

        {/* Process Steps */}
        <StaggeredAnimationContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20" delay={200}>
          {process.steps.map((step: any, index: number) => (
            <StaggeredItem key={index}>
              <div className="text-center relative">
                {index < process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-current to-transparent opacity-30 z-0"
                       style={{ color: config.theme.colors.primary }} />
                )}
                
                <div 
                  className="relative z-10 w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl border-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.theme.colors.surface}, ${config.theme.colors.background})`,
                    borderColor: config.theme.colors.primary
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`
                    }}
                  >
                    <span 
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: config.theme.typography.fontFamily.heading }}
                    >
                      {index + 1}
                    </span>
                  </div>
                </div>
                
                <h3 
                  className="text-xl font-semibold mb-4"
                  style={{ 
                    color: config.theme.colors.text.primary,
                    fontFamily: config.theme.typography.fontFamily.heading
                  }}
                >
                  {step.title}
                </h3>
                
                <p 
                  className="leading-relaxed text-sm"
                  style={{ 
                    color: config.theme.colors.text.secondary
                  }}
                >
                  {step.description}
                </p>
              </div>
            </StaggeredItem>
          ))}
        </StaggeredAnimationContainer>

        {/* Medical Comparison */}
        <StaggeredAnimationContainer delay={400}>
          <StaggeredItem>
            <div 
              className="p-8 rounded-3xl shadow-2xl mb-16"
              style={{
                background: `linear-gradient(135deg, ${config.theme.colors.accent}10, ${config.theme.colors.primary}05)`,
                border: `2px solid ${config.theme.colors.accent}20`
              }}
            >
              <h3 
                className="text-3xl font-bold text-center mb-12"
                style={{ 
                  color: config.theme.colors.text.primary,
                  fontFamily: config.theme.typography.fontFamily.heading
                }}
              >
                {process.medical.title}
              </h3>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Laser Treatment */}
                <div 
                  className="p-8 rounded-2xl shadow-lg border-2 border-red-200"
                  style={{ backgroundColor: '#fef2f2' }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-red-800 mb-4">
                      {process.medical.laser.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 text-sm">Breaks ink particles into smaller pieces</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 text-sm">White blood cells carry particles to kidney</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-red-700 text-sm">Particles may accumulate in organs</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-800 text-sm font-medium">
                      ⚠️ Ink particles travel through bloodstream to internal organs
                    </p>
                  </div>
                </div>

                {/* Saesal Treatment */}
                <div 
                  className="p-8 rounded-2xl shadow-lg border-2"
                  style={{
                    backgroundColor: `${config.theme.colors.secondary}05`,
                    borderColor: `${config.theme.colors.secondary}30`
                  }}
                >
                  <div className="text-center mb-6">
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
                    <h4 
                      className="text-xl font-bold mb-4"
                      style={{ color: config.theme.colors.secondary }}
                    >
                      {process.medical.saesal.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      ></div>
                      <span 
                        className="text-sm"
                        style={{ color: config.theme.colors.text.secondary }}
                      >
                        Keeps ink particles in original size
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
                        Forms natural scabs with ink particles
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
                        Ink exits body naturally through skin
                      </span>
                    </div>
                  </div>

                  <div 
                    className="mt-6 p-4 rounded-lg border"
                    style={{
                      backgroundColor: `${config.theme.colors.secondary}10`,
                      borderColor: `${config.theme.colors.secondary}30`
                    }}
                  >
                    <p 
                      className="text-sm font-medium"
                      style={{ color: config.theme.colors.secondary }}
                    >
                      ✅ Ink particles stay external - no internal organ involvement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </StaggeredItem>
        </StaggeredAnimationContainer>

        {/* Timeline */}
        <StaggeredAnimationContainer delay={600}>
          <StaggeredItem>
            <div 
              className="p-10 rounded-3xl shadow-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${config.theme.colors.primary}08, ${config.theme.colors.surface})`,
                border: `2px solid ${config.theme.colors.primary}20`
              }}
            >
              <h3 
                className="text-3xl font-bold mb-8"
                style={{ color: config.theme.colors.text.primary }}
              >
                Treatment Timeline
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`
                    }}
                  >
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h4 
                    className="text-lg font-semibold mb-2"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    Treatment Day
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary }}
                  >
                    Saesal solution applied
                  </p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.theme.colors.secondary}, ${config.theme.colors.accent})`
                    }}
                  >
                    <span className="text-lg font-bold text-white">2W</span>
                  </div>
                  <h4 
                    className="text-lg font-semibold mb-2"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    2 Weeks Later
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary }}
                  >
                    Scabs fall off with ink
                  </p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.theme.colors.accent}, ${config.theme.colors.primary})`
                    }}
                  >
                    <span className="text-lg font-bold text-white">12W</span>
                  </div>
                  <h4 
                    className="text-lg font-semibold mb-2"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    12 Weeks Later
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary }}
                  >
                    Ready for next session
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