'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const AnimatedText = ({ 
  children, 
  className = '', 
  delay = 0,
  staggerDelay = 100 
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={textRef}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-8'
      } ${className}`}
      style={{
        transitionDelay: `${staggerDelay}ms`
      }}
    >
      {children}
    </div>
  );
};

interface StaggeredTextProps {
  children: React.ReactNode;
  className?: string;
  baseDelay?: number;
  staggerDelay?: number;
}

export const StaggeredText = ({ 
  children, 
  className = '', 
  baseDelay = 0,
  staggerDelay = 150 
}: StaggeredTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const timer = setTimeout(() => {
              setIsVisible(true);
            }, baseDelay);
            return () => clearTimeout(timer);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [baseDelay]);

  // children을 배열로 변환하여 각각에 애니메이션 적용
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={containerRef} className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-8'
          }`}
          style={{
            transitionDelay: `${isVisible ? index * staggerDelay : 0}ms`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;
