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

  // 핑퐁 효과 구현 (재생-역재생-재생 무한루프)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isInView) return;

    let animationFrame: number;

    const handleEnded = () => {
      // 비디오가 끝나면 방향을 바꿔서 다시 재생
      setIsReversed(prev => !prev);
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
      if (isInView) {
        videoElement.play();
      }
    };

    // 역재생 효과 구현 (역재생 모드일 때)
    const updateTime = () => {
      if (!videoElement || !isReversed) return;

      const currentTime = videoElement.currentTime;
      const newTime = currentTime - 0.033; // 약 30fps

      if (newTime <= 0) {
        videoElement.currentTime = 0;
        setIsReversed(false); // 정방향으로 전환
        videoElement.play();
      } else {
        videoElement.currentTime = newTime;
        animationFrame = requestAnimationFrame(updateTime);
      }
    };

    // 역재생 모드 처리
    if (isReversed) {
      videoElement.pause();
      videoElement.currentTime = videoElement.duration;
      animationFrame = requestAnimationFrame(updateTime);
    } else {
      videoElement.currentTime = 0;
      if (isInView) {
        videoElement.play();
      }
    }

    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('loadeddata', handleLoadedData);

    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
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