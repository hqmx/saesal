'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface UseLazyVideoOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazyVideo(options: UseLazyVideoOptions = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options;
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isPingPongActive, setIsPingPongActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

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

  // 역재생 함수 (더 부드럽고 정확한 역재생)
  const reversePlayback = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isReversed || !isPingPongActive) return;

    const currentTime = videoElement.currentTime;
    const fps = 30; // 30fps로 고정
    const frameTime = 1 / fps;

    // 더 정확한 시간 감소
    const newTime = Math.max(0, currentTime - frameTime);

    if (newTime <= 0) {
      // 역재생 완료 - 정방향으로 전환
      videoElement.currentTime = 0;
      setIsReversed(false);
      videoElement.play().catch(console.error);
    } else {
      videoElement.currentTime = newTime;
      animationFrameRef.current = requestAnimationFrame(reversePlayback);
    }
  }, [isReversed, isPingPongActive]);

  // 비디오 이벤트 핸들러들
  const handleLoadedData = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoaded(true);

    // 비디오가 로드되면 핑퐁 효과 활성화
    if (isInView && !isPingPongActive) {
      setIsPingPongActive(true);
      videoElement.play().catch(console.error);
    }
  }, [isInView, isPingPongActive]);

  const handleEnded = useCallback(() => {
    if (!isPingPongActive) return;

    // 정방향 재생이 끝나면 역재생 시작
    setIsReversed(true);
  }, [isPingPongActive]);

  const handleTimeUpdate = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    lastTimeRef.current = videoElement.currentTime;
  }, []);

  // 핑퐁 효과 메인 로직
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isInView || !isLoaded) return;

    // 이벤트 리스너 등록
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);

    // 핑퐁 효과가 활성화되면 시작
    if (isPingPongActive && !isReversed) {
      videoElement.currentTime = 0;
      videoElement.play().catch(console.error);
    }

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isInView, isLoaded, isPingPongActive, isReversed, handleLoadedData, handleEnded, handleTimeUpdate]);

  // 역재생 실행
  useEffect(() => {
    if (isReversed && isPingPongActive) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      // 비디오 정지하고 끝 지점에서 시작
      videoElement.pause();
      if (videoElement.duration && !isNaN(videoElement.duration)) {
        videoElement.currentTime = videoElement.duration;
      }

      // 역재생 시작
      reversePlayback();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isReversed, isPingPongActive, reversePlayback]);

  return {
    videoRef,
    isInView,
    isLoaded,
    isReversed,
    isPingPongActive,
    handleLoadedData,
  };
}