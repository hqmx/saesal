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

export default function CTASection() {
  return (
    <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600">
      <AnimatedSection id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Work with us!
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              새로운 시작을 위한 첫걸음을 함께 시작해보세요. 
              전문가 상담을 통해 맞춤형 솔루션을 제공해드립니다.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-white text-teal-600 hover:bg-gray-100 px-10 py-4 rounded-lg text-lg font-bold transition-colors shadow-lg hover:shadow-xl">
              무료 상담 신청
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-teal-600 px-10 py-4 rounded-lg text-lg font-bold transition-colors">
              전화 문의하기
            </button>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">전문가 상담</h3>
              <p className="text-teal-100">
                경험 풍부한 전문의가 개인별 맞춤 상담을 제공합니다
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">안전 보장</h3>
              <p className="text-teal-100">
                FDA 승인 장비와 100% 비건 제품으로 안전한 시술
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">빠른 효과</h3>
              <p className="text-teal-100">
                최신 기술로 단기간에 최대 효과를 경험하세요
              </p>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-teal-400/30">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white">Sasal</h4>
                  <p className="text-teal-100 text-sm">Professional Tattoo Removal</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 text-center md:text-right">
                <div>
                  <p className="text-teal-100 text-sm">연락처</p>
                  <p className="text-white font-semibold">1588-0000</p>
                </div>
                <div>
                  <p className="text-teal-100 text-sm">운영시간</p>
                  <p className="text-white font-semibold">평일 09:00-18:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Dark Footer */}
      <div className="bg-gray-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 Sasal. All rights reserved. 타투 제거 전문 솔루션
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                개인정보처리방침
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                서비스 이용약관
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                고객센터
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}