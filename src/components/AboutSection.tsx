'use client';

import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from './OptimizedImage';

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
      className="relative py-20 px-2 sm:px-4"
      style={{ backgroundColor: 'transparent' }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <div
          ref={titleRef}
          className="text-center mb-16 opacity-100 translate-y-0 scale-100 transition-all duration-700 ease-out"
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

        <StaggeredAnimationContainer className="flex flex-col items-center gap-16 mb-20" delay={200}>
          <StaggeredItem>
            <div className="relative flex items-center justify-center min-h-[400px]">
              {/* 배경 오버레이 */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
              ></div>

              {/* Solution 이미지 */}
              <div className="relative z-10 flex items-center justify-center">
                <div
                  className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
                  style={{
                    backgroundImage: "url('/solution.png')",
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                </div>
              </div>

              {/* Logo at bottom */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <OptimizedImage
                  src="/logo.png"
                  alt="SæsaL Logo"
                  className="object-contain"
                  style={{
                    transform: 'scale(1.5)',
                    margin: '0',
                    marginTop: '-10px'
                  }}
                />
              </div>
            </div>
          </StaggeredItem>

          <StaggeredItem>
            <div className="space-y-8 max-w-4xl">
              <div className="rounded-2xl p-6 shadow-lg border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: config.theme.colors.primary }}>
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

              <div className="rounded-2xl p-6 shadow-lg border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: config.theme.colors.secondary }}>
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

              <div className="rounded-2xl p-6 shadow-lg border-l-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: config.theme.colors.primary }}>
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