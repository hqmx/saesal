'use client';

import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';

interface Demo2ComparisonSectionProps {
  config: any;
}

export default function Demo2ComparisonSection({ config }: Demo2ComparisonSectionProps) {
  const titleRef = useInViewAnimation();
  const { comparison } = config.components;
  
  return (
    <section 
      id="comparison" 
      className="py-20 px-4"
      style={{ backgroundColor: config.theme.colors.background }}
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
            {comparison.title}
          </h2>
          <p 
            className="text-lg"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.lg
            }}
          >
            See the difference between traditional laser treatment and our innovative Saesal method
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Laser Limitations */}
          <StaggeredAnimationContainer delay={200}>
            <StaggeredItem>
              <div 
                className="h-full p-8 rounded-3xl shadow-xl border-2"
                style={{
                  backgroundColor: '#fee2e2',
                  borderColor: '#fca5a5'
                }}
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-red-800 mb-4">
                    {comparison.laser.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {comparison.laser.issues.map((issue: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-md border border-red-200">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-800 mb-2">{issue.title}</h4>
                          <p className="text-red-700 text-sm leading-relaxed">{issue.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center p-4 bg-red-100 rounded-2xl">
                  <p className="text-red-800 font-semibold">
                    10+ Sessions Required • Painful Process • Limited Colors
                  </p>
                </div>
              </div>
            </StaggeredItem>
          </StaggeredAnimationContainer>

          {/* Saesal Benefits */}
          <StaggeredAnimationContainer delay={400}>
            <StaggeredItem>
              <div 
                className="h-full p-8 rounded-3xl shadow-xl border-2"
                style={{
                  backgroundColor: `${config.theme.colors.secondary}10`,
                  borderColor: config.theme.colors.secondary
                }}
              >
                <div className="text-center mb-8">
                  <div 
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
                  >
                    <svg 
                      className="w-10 h-10" 
                      style={{ color: config.theme.colors.secondary }} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: config.theme.colors.secondary }}
                  >
                    {comparison.saesal.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {comparison.saesal.benefits.map((benefit: any, index: number) => (
                    <div key={index} 
                         className="p-6 rounded-2xl shadow-md border"
                         style={{
                           backgroundColor: config.theme.colors.surface,
                           borderColor: `${config.theme.colors.secondary}30`
                         }}
                    >
                      <div className="flex items-start space-x-4">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                          style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
                        >
                          <svg 
                            className="w-5 h-5" 
                            style={{ color: config.theme.colors.secondary }}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 
                            className="font-semibold mb-2"
                            style={{ color: config.theme.colors.secondary }}
                          >
                            {benefit.title}
                          </h4>
                          <p 
                            className="text-sm leading-relaxed"
                            style={{ color: config.theme.colors.text.secondary }}
                          >
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div 
                  className="mt-8 text-center p-4 rounded-2xl"
                  style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
                >
                  <p 
                    className="font-semibold"
                    style={{ color: config.theme.colors.secondary }}
                  >
                    Only 4 Sessions • Pain-Free • All Colors Supported
                  </p>
                </div>
              </div>
            </StaggeredItem>
          </StaggeredAnimationContainer>
        </div>

        {/* Summary Comparison */}
        <StaggeredAnimationContainer delay={600}>
          <StaggeredItem>
            <div 
              className="p-10 rounded-3xl shadow-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${config.theme.colors.primary}10, ${config.theme.colors.secondary}10)`,
                border: `2px solid ${config.theme.colors.primary}20`
              }}
            >
              <h3 
                className="text-3xl font-bold mb-8"
                style={{ color: config.theme.colors.text.primary }}
              >
                The Clear Choice
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div 
                    className="text-5xl font-bold mb-2"
                    style={{ color: '#dc2626' }}
                  >
                    10+
                  </div>
                  <div className="text-sm text-red-600 mb-1">Laser Sessions</div>
                  <div className="text-xs text-gray-500">Traditional Method</div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-2">VS</div>
                    <svg className="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-center">
                  <div 
                    className="text-5xl font-bold mb-2"
                    style={{ color: config.theme.colors.secondary }}
                  >
                    4
                  </div>
                  <div 
                    className="text-sm mb-1"
                    style={{ color: config.theme.colors.secondary }}
                  >
                    Saesal Sessions
                  </div>
                  <div className="text-xs text-gray-500">Revolutionary Method</div>
                </div>
              </div>
            </div>
          </StaggeredItem>
        </StaggeredAnimationContainer>
      </div>
    </section>
  );
}