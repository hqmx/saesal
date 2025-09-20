'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface VideoManagerContextType {
  activeVideoId: string | null;
  registerVideo: (id: string, videoRef: React.RefObject<HTMLVideoElement>) => void;
  unregisterVideo: (id: string) => void;
  setActiveVideo: (id: string) => void;
  pauseAllVideos: () => void;
}

const VideoManagerContext = createContext<VideoManagerContextType | undefined>(undefined);

export function VideoManagerProvider({ children }: { children: React.ReactNode }) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, React.RefObject<HTMLVideoElement>>>(new Map());

  const registerVideo = useCallback((id: string, videoRef: React.RefObject<HTMLVideoElement>) => {
    videoRefs.current.set(id, videoRef);
    console.log(`Video registered: ${id}`);
  }, []);

  const unregisterVideo = useCallback((id: string) => {
    videoRefs.current.delete(id);
    console.log(`Video unregistered: ${id}`);
  }, []);

  const pauseAllVideos = useCallback(() => {
    console.log('Pausing all videos');
    videoRefs.current.forEach((videoRef, id) => {
      const video = videoRef.current;
      if (video && !video.paused) {
        video.pause();
        console.log(`Paused video: ${id}`);
      }
    });
  }, []);

  const setActiveVideo = useCallback((id: string) => {
    console.log(`Setting active video: ${id}, previous: ${activeVideoId}`);

    // 이전 활성 비디오와 같으면 무시
    if (activeVideoId === id) return;

    // 모든 비디오 일시정지
    pauseAllVideos();

    // 새로운 활성 비디오 설정
    setActiveVideoId(id);

    // 잠시 후 새 비디오 재생 (pause가 완료된 후)
    setTimeout(() => {
      const videoRef = videoRefs.current.get(id);
      const video = videoRef?.current;
      if (video && video.paused) {
        video.play().catch(console.error);
        console.log(`Started playing: ${id}`);
      }
    }, 100);
  }, [activeVideoId, pauseAllVideos]);

  return (
    <VideoManagerContext.Provider value={{
      activeVideoId,
      registerVideo,
      unregisterVideo,
      setActiveVideo,
      pauseAllVideos
    }}>
      {children}
    </VideoManagerContext.Provider>
  );
}

export function useVideoManager() {
  const context = useContext(VideoManagerContext);
  if (context === undefined) {
    throw new Error('useVideoManager must be used within a VideoManagerProvider');
  }
  return context;
}