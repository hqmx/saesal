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
  const [isReversed, setIsReversed] = useState(false);
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

  // 핑퐁 효과 구현
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isInView) return;

    const handleEnded = () => {
      setIsReversed(!isReversed);
      videoElement.currentTime = isReversed ? videoElement.duration : 0;
      videoElement.playbackRate = isReversed ? 1 : -1;
      videoElement.play();
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (isInView) {
        videoElement.play();
      }
    };

    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('loadeddata', handleLoadedData);

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isInView, isReversed]);

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