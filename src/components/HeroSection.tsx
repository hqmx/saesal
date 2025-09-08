'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  config: any;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const { t, language } = useLanguage();
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [charStates1, setCharStates1] = useState<number[]>([]);
  const [charStates2, setCharStates2] = useState<number[]>([]);
  const [showSubtitle, setShowSubtitle] = useState(false);

  const text1 = language === 'ko' ? '타투 위에 타투' : 'Do Tattoo On Tattoo';
  const text2 = language === 'ko' ? '잉크가 제거됩니다' : 'Ink will Remove';

  useEffect(() => {
    // 배경 애니메이션 시작 (가장 먼저)
    const backgroundTimer = setTimeout(() => {
      setIsBackgroundLoaded(true);
    }, 100);

    // 글자 상태 초기화 (0: 공백, 1: 불투명, 2: 투명/완성)
    setCharStates1(new Array(text1.length).fill(0));
    setCharStates2(new Array(text2.length).fill(0));

    // 첫 번째 줄 글자 애니메이션 시작 (배경보다 28% 늦게)
    const startAnimation1 = setTimeout(() => {
      text1.split('').forEach((char, index) => {
        // 각 글자마다 시작 시간이 다름
        setTimeout(() => {
          // 1단계: 불투명 상태
          setCharStates1(prev => {
            const newStates = [...prev];
            newStates[index] = 1;
            return newStates;
          });
          
          // 2단계: 투명/완성 상태 (300ms 후)
          setTimeout(() => {
            setCharStates1(prev => {
              const newStates = [...prev];
              newStates[index] = 2;
              return newStates;
            });
          }, 300);
        }, index * 150); // 각 글자마다 150ms씩 지연
      });

      // 첫 번째 줄 완성 후 두 번째 줄 시작
      setTimeout(() => {
        text2.split('').forEach((char, index) => {
          setTimeout(() => {
            // 1단계: 불투명 상태
            setCharStates2(prev => {
              const newStates = [...prev];
              newStates[index] = 1;
              return newStates;
            });
            
            // 2단계: 투명/완성 상태 (300ms 후)
            setTimeout(() => {
              setCharStates2(prev => {
                const newStates = [...prev];
                newStates[index] = 2;
                return newStates;
              });
            }, 300);
          }, index * 150); // 각 글자마다 150ms씩 지연
        });
      }, text1.length * 150 + 500); // 첫 번째 줄 완성 후 500ms 대기
    }, 100 + (2000 * 0.28)); // 배경보다 28% 늦게 시작

    // 소제목 애니메이션 (모든 글자 완성 후)
    const totalAnimationTime = 100 + (2000 * 0.28) + (text1.length * 150) + 500 + (text2.length * 150) + 300 + 500;
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, totalAnimationTime);

    return () => {
      clearTimeout(backgroundTimer);
      clearTimeout(startAnimation1);
      clearTimeout(subtitleTimer);
    };
  }, [text1, text2]);
  
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden -mt-20 pt-48 pb-10 flex items-center w-full"
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundColor: config.theme.colors.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '95vh',
        filter: isBackgroundLoaded ? 'blur(0px)' : 'blur(30px)',
        transition: 'filter 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {/* Temporarily removed overlay to check background */}
      {/* <div className="absolute inset-0 bg-white bg-opacity-20"></div> */}

      <div className="relative z-10 w-full">
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
                  minHeight: '160px' // 애니메이션 중 레이아웃 시프트 방지
                }}
              >
                <span style={{ display: 'inline-block' }}>
                  {text1.split('').map((char, index) => (
                    <span
                      key={`line1-${index}`}
                      style={{
                        opacity: charStates1[index] === 0 ? 0 : 
                                charStates1[index] === 1 ? 0.3 : 1,
                        filter: charStates1[index] === 1 ? 'blur(2px)' : 'blur(0px)',
                        transition: 'opacity 0.3s ease, filter 0.3s ease',
                        display: 'inline-block'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <br />
                <span style={{ display: 'inline-block' }}>
                  {text2.split('').map((char, index) => (
                    <span
                      key={`line2-${index}`}
                      style={{
                        opacity: charStates2[index] === 0 ? 0 : 
                                charStates2[index] === 1 ? 0.3 : 1,
                        filter: charStates2[index] === 1 ? 'blur(2px)' : 'blur(0px)',
                        transition: 'opacity 0.3s ease, filter 0.3s ease',
                        display: 'inline-block'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            <p 
              className="mb-16 max-w-2xl mx-auto font-medium"
              style={{ 
                color: config.theme.colors.text.primary,
                fontSize: 'clamp(0.9375rem, 2.5vw, 1.5rem)',
                opacity: showSubtitle ? 1 : 0,
                transform: showSubtitle ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >
              {t('hero.description')}
            </p>


            

          </div>
        </div>
      </div>
    </section>
  );
}