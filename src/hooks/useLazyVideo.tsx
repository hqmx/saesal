'use client';

import { useEffect, useRef, useState } from 'react';

interface UseLazyVideoOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyVideo(options: UseLazyVideoOptions = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options;
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  return {
    videoRef,
    isInView,
    isLoaded,
    handleLoadedData,
  };
}