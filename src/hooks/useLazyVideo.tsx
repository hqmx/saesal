'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseLazyVideoOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyVideo(options: UseLazyVideoOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px'
  } = options;
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer for lazy loading
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


  // 비디오 이벤트 핸들러들
  const handleLoadedData = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoaded(true);
    console.log('Video loaded');

    // 뷰포트에 있고 아직 재생되지 않았다면 재생 시작
    if (isInView && !hasPlayed) {
      videoElement.play().catch(console.error);
      setHasPlayed(true);
    }
  }, [isInView, hasPlayed]);

  const handleEnded = useCallback(() => {
    // 영상이 끝나면 마지막 프레임에서 정지
    console.log('Video ended - staying at last frame');
  }, []);

  const handleTimeUpdate = useCallback(() => {
    // 더 이상 필요 없음
  }, []);

  // 뷰포트에 들어오면 비디오 재생
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isInView || !isLoaded || hasPlayed) return;

    // 한 번만 재생
    videoElement.play().catch(console.error);
    setHasPlayed(true);
  }, [isInView, isLoaded, hasPlayed]);

  return {
    videoRef,
    isInView,
    isLoaded,
    hasPlayed,
    handleLoadedData,
    handleEnded,
    handleTimeUpdate,
  };
}