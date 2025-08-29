'use client';

import { useEffect, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection = ({ children, className = '' }: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </section>
  );
};

export default function ProductSection() {
  return (
    <AnimatedSection className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            What is Sasal?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sasal은 혁신적인 레이저 기술을 사용한 타투 제거 솔루션입니다. 
            안전하고 효과적인 치료로 자연스러운 피부 회복을 도와드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl p-8 shadow-lg">
              <div className="w-full h-80 bg-white rounded-2xl flex items-center justify-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-4">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-800 font-semibold">100% VEGAN</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                첨단 레이저 기술
              </h3>
              <p className="text-gray-600 leading-relaxed">
                최첨단 Q-스위치 레이저 기술을 사용하여 타투 잉크를 안전하게 분해합니다. 
                피부 조직 손상을 최소화하면서 효과적인 제거 결과를 제공합니다.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                개인 맞춤 치료
              </h3>
              <p className="text-gray-600 leading-relaxed">
                타투의 크기, 색상, 위치에 따라 개별적으로 맞춤화된 치료 계획을 수립합니다. 
                각 고객의 피부 타입과 타투 특성을 고려한 최적의 솔루션을 제공합니다.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                안전한 시술
              </h3>
              <p className="text-gray-600 leading-relaxed">
                FDA 승인을 받은 장비와 무독성 재료만을 사용합니다. 
                전문 의료진의 철저한 관리 하에 안전하고 효과적인 시술을 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}