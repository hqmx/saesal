'use client';

import { useEffect, useRef } from 'react';

interface StaggeredAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function StaggeredAnimationContainer({ 
  children, 
  className = '', 
  delay = 100,
  duration = 700 
}: StaggeredAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                child.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
              }, index * delay);
            });
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
  }, [delay]);

  return (
    <div
      ref={containerRef}
      className={className}
    >
      {children}
    </div>
  );
}

export function StaggeredItem({ 
  children, 
  className = '',
  duration = 700 
}: { 
  children: React.ReactNode; 
  className?: string;
  duration?: number;
}) {
  return (
    <div
      className={`stagger-item opacity-0 translate-y-8 scale-95 transition-all ease-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionProperty: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
}

// 개별 애니메이션을 위한 훅
export function useInViewAnimation() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return elementRef;
}