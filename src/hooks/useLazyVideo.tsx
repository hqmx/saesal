'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useVideoManager } from '@/contexts/VideoManagerContext';

interface UseLazyVideoOptions {
  threshold?: number;
  rootMargin?: string;
  videoId: string; // 각 비디오의 고유 ID
}

export function useLazyVideo(options: UseLazyVideoOptions) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    videoId
  } = options;
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { registerVideo, unregisterVideo, setActiveVideo, activeVideoId } = useVideoManager();

  // 비디오 등록/해제
  useEffect(() => {
    registerVideo(videoId, videoRef);
    return () => {
      unregisterVideo(videoId);
    };
  }, [videoId, registerVideo, unregisterVideo]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          // 뷰포트에 들어오면 이 비디오를 활성화
          setActiveVideo(videoId);
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
  }, [threshold, rootMargin, videoId, setActiveVideo]);


  // 비디오 이벤트 핸들러들
  const handleLoadedData = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoaded(true);
    console.log(`Video loaded: ${videoId}`);
  }, [videoId]);

  const handleEnded = useCallback(() => {
    // 영상이 끝나면 마지막 프레임에서 정지
    console.log(`Video ended: ${videoId} - staying at last frame`);
  }, [videoId]);

  const handleTimeUpdate = useCallback(() => {
    // 더 이상 필요 없음
  }, []);

  // 활성 비디오가 변경될 때만 재생
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !isLoaded) return;

    // 이 비디오가 활성 비디오이고 아직 재생되지 않았다면 재생
    if (activeVideoId === videoId && !hasPlayed) {
      console.log(`Starting playback for active video: ${videoId}`);
      videoElement.play().catch(console.error);
      setHasPlayed(true);
    }
  }, [activeVideoId, videoId, isLoaded, hasPlayed]);

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