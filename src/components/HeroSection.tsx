'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import { useLazyVideo } from '@/hooks/useLazyVideo';

interface HeroSectionProps {
  config: any;
}

const HeroSection = memo(function HeroSection({ config }: HeroSectionProps) {
  const { t, language } = useLanguage();
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const { videoRef, isInView, isLoaded, handleLoadedData } = useLazyVideo({ threshold: 0.1 });
  const [showContent, setShowContent] = useState(false);

  const text1 = language === 'ko' ? '타투 위에 타투' : 'Do Tattoo On Tattoo';
  const text2 = language === 'ko' ? '잉크가 제거됩니다' : 'Ink will Remove';

  useEffect(() => {
    // 간단한 딜레이 후 모든 컨텐츠 표시
    const timer = setTimeout(() => {
      setIsBackgroundLoaded(true);
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden flex items-center justify-center w-full"
      style={{
        backgroundColor: config.theme.colors.background,
        height: '100vh',
        width: '100vw',
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay={isInView}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'none'
        }}
        onLoadedData={() => {
          setIsBackgroundLoaded(true);
          handleLoadedData();
        }}
      >
        {isInView && (
          <>
            <source media="(max-width: 768px)" src="/mobbg.webm" type="video/webm" />
            <source src="/4kbg.webm" type="video/webm" />
          </>
        )}
      </video>
      
      {/* White overlay with 5% opacity */}
      <div 
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.26)' }}
      ></div>

      <div className="relative z-10 w-full flex items-center justify-center" style={{ paddingTop: '8vh' }}>
        <div 
          className="mx-auto px-2 sm:px-4 text-center"
          style={{ 
            maxWidth: config.layout.container.maxWidth,
            padding: config.layout.container.padding.mobile 
          }}
        >
          <div className="space-y-12">

            <div className="mb-12">
              <h1
                className="font-medium leading-tight"
                style={{
                  color: config.theme.colors.text.primary,
                  fontFamily: config.theme.typography.fontFamily.heading,
                  fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                  lineHeight: '1.3',
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 1s ease, transform 1s ease'
                }}
              >
                {text1}
                <br />
                {text2}
              </h1>
            </div>

            <p
              className="mb-16 max-w-2xl mx-auto font-medium"
              style={{
                color: config.theme.colors.text.primary,
                fontSize: 'clamp(0.9375rem, 2.5vw, 1.5rem)',
                opacity: showContent ? 1 : 0,
                transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s'
              }}
            >
              {t('hero.description')}
            </p>

          </div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      >
        <div 
          className="w-6 h-10 border-2 rounded-full flex justify-center cursor-pointer hover:opacity-80 transition-opacity"
          style={{ 
            borderColor: config.theme.colors.text.primary,
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <motion.div
            className="w-1 h-3 rounded-full mt-2"
            style={{ backgroundColor: config.theme.colors.text.primary }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
});

export default HeroSection;