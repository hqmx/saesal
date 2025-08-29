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

export default function SolutionSection() {
  return (
    <div className="bg-white py-20">
      <AnimatedSection className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Solution is Safe?
            </h2>
            <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full mb-8">
              <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-green-800 font-bold text-lg">100% VEGAN</span>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              모든 성분과 시술 과정이 비건 인증을 받았으며, 동물 실험을 거치지 않은 
              친환경적이고 윤리적인 솔루션입니다.
            </p>
          </div>

          {/* Treatment Process Visualization */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
              치료 과정
            </h3>
            
            {/* Step 1 */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-1 mb-4">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Step 1: 초기 상담 및 진단</h4>
                  <p className="text-gray-600">
                    전문의가 타투의 상태, 크기, 색상을 정확히 분석하고 개인 맞춤 치료 계획을 수립합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-4xl bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg p-8">
                  <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold">●●●</span>
                      </div>
                      <p className="text-sm text-gray-700">타투 잉크 입자</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold">●●●</span>
                      </div>
                      <p className="text-sm text-gray-700">피부 조직</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold">●●●</span>
                      </div>
                      <p className="text-sm text-gray-700">건강한 피부</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-600 mb-4">
                레이저가 타투 잉크 입자를 선택적으로 분해하여 자연스러운 제거 과정을 시작합니다.
              </p>
            </div>

            {/* Step 2 */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-1 mb-4">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Step 2: 레이저 치료</h4>
                  <p className="text-gray-600">
                    첨단 Q-스위치 레이저로 타투 잉크를 안전하게 분해합니다. 통증은 최소화하고 효과는 최대화합니다.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-4xl bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg p-8">
                  <div className="text-center mb-4">
                    <div className="flex justify-center items-center space-x-4">
                      <div className="w-8 h-1 bg-teal-500"></div>
                      <div className="w-8 h-1 bg-teal-400"></div>
                      <div className="w-8 h-1 bg-teal-300"></div>
                      <span className="text-teal-600 font-bold">레이저 빔</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold">●●</span>
                      </div>
                      <p className="text-sm text-gray-700">잉크 분해 시작</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white font-bold">●</span>
                      </div>
                      <p className="text-sm text-gray-700">잉크 입자 축소</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-gray-400 font-bold">○</span>
                      </div>
                      <p className="text-sm text-gray-700">자연 배출</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-600 mb-4">
                분해된 잉크 입자들이 인체의 자연스러운 면역 시스템을 통해 체외로 배출됩니다.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-1 mb-4">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Step 3: 회복 및 관리</h4>
                  <p className="text-gray-600">
                    치료 후 피부 회복을 위한 전문적인 애프터케어와 관리 방법을 안내드립니다.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="w-full max-w-4xl">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg p-6">
                      <h5 className="font-semibold text-gray-800 mb-4">Before Treatment</h5>
                      <div className="w-full h-32 bg-pink-400 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">타투 상태</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-6">
                      <h5 className="font-semibold text-gray-800 mb-4">After Treatment</h5>
                      <div className="w-full h-32 bg-pink-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 font-bold text-lg">깨끗한 피부</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Meaning of 'Sasal'
            </h3>
            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                'Sasal(사살)'은 한국어로 <strong>'완전히 제거하다'</strong>라는 의미입니다.
              </p>
              <p className="text-gray-600 leading-relaxed">
                우리의 목표는 단순히 타투를 흐리게 만드는 것이 아니라, 
                완전하고 안전하게 제거하여 원래의 건강한 피부로 되돌려 드리는 것입니다.
                이 이름에는 고객의 새로운 시작을 응원하는 우리의 마음이 담겨있습니다.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}