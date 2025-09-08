'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParticleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
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
}

export default function ParticleText({ 
  text, 
  className = '', 
  style = {},
  particleCount = 150,
  animationDuration = 2000,
  recreationDelay = 1000
}: ParticleTextProps) {
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
    const textPixels: { x: number; y: number }[] = [];
    
    // 텍스트가 있는 픽셀 위치 찾기
    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;
        if (imageData.data[index + 3] > 128) { // 알파값이 있는 픽셀
          textPixels.push({ x, y });
        }
      }
    }

    // 파티클 생성
    const newParticles: Particle[] = [];
    for (let i = 0; i < Math.min(particleCount, textPixels.length); i++) {
      const randomPixel = textPixels[Math.floor(Math.random() * textPixels.length)];
      newParticles.push({
        x: 0, // 왼쪽 위에서 시작
        y: 0,
        targetX: randomPixel.x,
        targetY: randomPixel.y,
        opacity: 0,
        delay: Math.random() * 500,
        size: Math.random() * 2 + 1
      });
    }
    
    setParticles(newParticles);
  };

  const animateParticles = (timestamp: number, startTime: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / animationDuration, 1);
    
    particles.forEach((particle) => {
      const particleProgress = Math.max(0, Math.min((elapsed - particle.delay) / (animationDuration - particle.delay), 1));
      
      if (particleProgress > 0) {
        // easeOut 효과
        const eased = 1 - Math.pow(1 - particleProgress, 3);
        
        particle.x = particle.targetX * eased;
        particle.y = particle.targetY * eased;
        particle.opacity = Math.min(eased * 2, 1);
        
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = style.color || '#336666';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    ctx.globalAlpha = 1;
    
    if (progress < 1) {
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
          transition: 'opacity 0.3s ease-in-out'
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