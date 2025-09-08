'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SequentialParticleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  particleSize?: number;
  animationDuration?: number;
  recreationDelay?: number;
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  opacity: number;
  delay: number;
  size: number;
  completed: boolean;
}

export default function SequentialParticleText({ 
  text, 
  className = '', 
  style = {},
  particleSize = 3,
  animationDuration = 3000,
  recreationDelay = 2000
}: SequentialParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const createParticles = () => {
    if (!canvasRef.current || !textRef.current) return;
    
    const canvas = canvasRef.current;
    const textElement = textRef.current;
    const rect = textElement.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 텍스트를 캔버스에 그려서 픽셀 데이터 얻기
    ctx.font = getComputedStyle(textElement).font;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const textPixels: { x: number; y: number; distance: number }[] = [];
    
    // 텍스트가 있는 픽셀 위치 찾기 및 거리 계산
    for (let y = 0; y < canvas.height; y += particleSize) {
      for (let x = 0; x < canvas.width; x += particleSize) {
        const index = (y * canvas.width + x) * 4;
        if (imageData.data[index + 3] > 128) { // 알파값이 있는 픽셀
          // 왼쪽 위에서부터의 거리 계산 (대각선 거리)
          const distance = Math.sqrt(x * x + y * y);
          textPixels.push({ x, y, distance });
        }
      }
    }

    // 거리순으로 정렬 (왼쪽 위부터 오른쪽 아래로)
    textPixels.sort((a, b) => a.distance - b.distance);

    // 파티클 생성
    const newParticles: Particle[] = [];
    textPixels.forEach((pixel, index) => {
      newParticles.push({
        x: 0, // 왼쪽 위에서 시작
        y: 0,
        targetX: pixel.x,
        targetY: pixel.y,
        opacity: 0,
        delay: (index / textPixels.length) * animationDuration * 0.7, // 순차적 딜레이
        size: particleSize,
        completed: false
      });
    });
    
    setParticles(newParticles);
  };

  const animateParticles = (timestamp: number, startTime: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const elapsed = timestamp - startTime;
    let allCompleted = true;
    
    particles.forEach((particle) => {
      const particleStartTime = particle.delay;
      const particleDuration = 800; // 각 입자의 애니메이션 시간
      
      if (elapsed >= particleStartTime) {
        const particleProgress = Math.min((elapsed - particleStartTime) / particleDuration, 1);
        
        if (particleProgress > 0) {
          // easeOut 효과
          const eased = 1 - Math.pow(1 - particleProgress, 3);
          
          particle.x = particle.targetX * eased;
          particle.y = particle.targetY * eased;
          particle.opacity = Math.min(eased * 2, 1);
          
          ctx.globalAlpha = particle.opacity;
          ctx.fillStyle = style.color || '#336666';
          ctx.fillRect(
            particle.x - particle.size / 2, 
            particle.y - particle.size / 2, 
            particle.size, 
            particle.size
          );
          
          if (particleProgress >= 1) {
            particle.completed = true;
          }
        }
      }
      
      if (!particle.completed) {
        allCompleted = false;
      }
    });
    
    ctx.globalAlpha = 1;
    
    if (!allCompleted) {
      animationRef.current = requestAnimationFrame((ts) => animateParticles(ts, startTime));
    } else {
      // 애니메이션 완료 후 텍스트 표시
      setIsVisible(true);
      
      // 일정 시간 후 다시 시작
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        startAnimation();
      }, recreationDelay);
    }
  };

  const startAnimation = () => {
    createParticles();
    requestAnimationFrame((timestamp) => {
      animateParticles(timestamp, timestamp);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 100); // 컴포넌트 마운트 후 약간의 딜레이

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative ${className}`} style={{ ...style, position: 'relative' }}>
      <div
        ref={textRef}
        className="relative z-20"
        style={{
          ...style,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {text}
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 z-10"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}