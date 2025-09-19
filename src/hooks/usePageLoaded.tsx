'use client';

import { useEffect, useState } from 'react';

export function usePageLoaded() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isDocumentReady, setIsDocumentReady] = useState(false);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    // Document ready 상태 확인
    if (document.readyState === 'complete') {
      setIsDocumentReady(true);
    } else {
      const handleDOMContentLoaded = () => setIsDocumentReady(true);
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
      window.addEventListener('load', handleDOMContentLoaded);

      return () => {
        document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
        window.removeEventListener('load', handleDOMContentLoaded);
      };
    }
  }, []);

  useEffect(() => {
    // 이미지 로딩 상태 확인
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) {
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; // 에러가 있어도 계속 진행
        });
      });

      Promise.all(imagePromises).then(() => {
        setIsImagesLoaded(true);
      });
    };

    if (isDocumentReady) {
      // 약간의 지연 후 이미지 로딩 확인
      setTimeout(checkImagesLoaded, 500);
    }
  }, [isDocumentReady]);

  useEffect(() => {
    // 모든 조건이 만족되면 페이지 로딩 완료
    if (isDocumentReady && isImagesLoaded) {
      // 추가 지연시간을 둬서 모든 렌더링이 완료되도록 함
      setTimeout(() => {
        setIsPageLoaded(true);
      }, 1000);
    }
  }, [isDocumentReady, isImagesLoaded]);

  return {
    isPageLoaded,
    isDocumentReady,
    isImagesLoaded
  };
}