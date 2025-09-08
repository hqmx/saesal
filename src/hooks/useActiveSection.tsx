'use client';

import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'comparison', 'process', 'safety', 'contact'];
    
    const handleScroll = () => {
      const headerHeight = 40;
      const scrollPosition = window.scrollY + headerHeight - 40; // 헤더 높이 + 여유분
      
      // 스크롤 위치에 따라 활성 섹션 결정
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // 초기 설정
    handleScroll();
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return activeSection;
}