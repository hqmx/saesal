'use client';

import { StaggeredAnimationContainer, StaggeredItem } from '@/hooks/useStaggeredAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLazyVideo } from '@/hooks/useLazyVideo';
import { useState, useEffect } from 'react';

interface MeaningSectionProps {
  config: any;
}

export default function MeaningSection({ config }: MeaningSectionProps) {
  const { t } = useLanguage();
  const { videoRef, isInView, isLoaded, handleLoadedData, handleEnded, handleTimeUpdate } = useLazyVideo({
    threshold: 0.3,
    videoId: 'meaning'
  });
  const { about } = config.components;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${config.theme.colors.primary}10, ${config.theme.colors.secondary}08, ${config.theme.colors.background})`
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay={isInView}
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      >
        {isInView && (
          <>
            <source media="(max-width: 768px)" src="/footermobbgwebm.webm" type="video/webm" />
            <source src="/meaningbg.webm" type="video/webm" />
          </>
        )}
      </video>

      {/* 로딩 중 정적 이미지 */}
      {!isLoaded && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{}}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet="/footermob.jpg" />
            <img
              src="/footer.jpg"
              alt="Footer Background"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      )}
      
      
      <div className="relative z-10 w-full">
        <StaggeredAnimationContainer className="text-center" delay={400}>
          <StaggeredItem>
            <div 
              className="p-6 sm:p-12 relative overflow-hidden w-full"
              style={{
                background: 'transparent'
              }}
            >
              <div className="relative z-10 mb-8">
                <h3 
                  className="font-medium mb-4"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: config.theme.typography.fontFamily.heading,
                    fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                    lineHeight: '1.3'
                  }}
                >
                  {t('about.meaning.title')}
                </h3>
                
              </div>

              <div className="flex flex-col md:flex-row md:justify-between items-center relative z-10 max-w-6xl mx-auto px-4 sm:px-8 gap-4 md:gap-0">
                <div className="text-center md:text-left">
                  <p
                    className="text-lg font-medium"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: config.theme.typography.fontFamily.heading
                    }}
                  >
                    {t('about.meaning.line1')}
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: config.theme.typography.fontSize.lg
                    }}
                  >
                    <span dangerouslySetInnerHTML={{__html: t('about.meaning.line2')}} />
                  </p>
                </div>
              </div>

              {/* Footer Section */}
              <div className="relative z-10 mt-16 pt-12 border-t border-white border-opacity-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-8">
                  <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    
                    {/* Company Info */}
                    <div className="space-y-4">
                      <div className="flex justify-center md:justify-start">
                        <img 
                          src="/logo.png" 
                          alt="SæsaL Logo" 
                          className="h-12 object-contain"
                          style={{
                            filter: 'brightness(0) invert(1)'
                          }}
                        />
                      </div>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontFamily: config.theme.typography.fontFamily.heading
                        }}
                      >
                        Safe and effective tattoo removal solution using natural body components.
                      </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                      <h4 
                        className="text-lg font-semibold"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        Contact
                      </h4>
                      <div className="space-y-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        <p>Email: info@saesal.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                        <p>Hours: Mon-Fri 9AM-6PM</p>
                      </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                      <h4 
                        className="text-lg font-semibold"
                        style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                      >
                        Legal
                      </h4>
                      <div className="space-y-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                        <p>Medical Disclaimer</p>
                      </div>
                    </div>
                    
                  </div>

                  {/* Copyright */}
                  <div className="mt-12 pt-8 border-t border-white border-opacity-20 text-center">
                    <p 
                      className="text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    >
                      © 2024 SæsaL. All rights reserved.
                    </p>
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