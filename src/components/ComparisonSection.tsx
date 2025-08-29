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

const FeatureCard = ({ 
  title, 
  description, 
  color = 'teal' 
}: { 
  title: string; 
  description: string; 
  color?: 'teal' | 'cyan' | 'blue' | 'green';
}) => {
  const colorClasses = {
    teal: 'from-teal-500 to-teal-600',
    cyan: 'from-cyan-500 to-cyan-600', 
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600'
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className={`w-full h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg mb-4`}></div>
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default function ComparisonSection() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <AnimatedSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Limitations of Laser Treatment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              기존 레이저 치료의 한계점을 파악하고 더 나은 솔루션을 제시합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <FeatureCard
              title="통증 및 불편함"
              description="기존 레이저 치료는 상당한 통증과 불편함을 동반할 수 있습니다."
              color="blue"
            />
            <FeatureCard
              title="긴 회복 기간"
              description="치료 후 피부 회복에 상당한 시간이 필요합니다."
              color="cyan"
            />
            <FeatureCard
              title="부작용 위험"
              description="색소침착, 흉터 형성 등의 부작용 가능성이 있습니다."
              color="teal"
            />
            <FeatureCard
              title="높은 비용"
              description="다회차 치료로 인한 높은 누적 비용이 부담됩니다."
              color="green"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              What about Sasal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sasal의 혁신적인 기술로 기존의 한계를 극복했습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="무통 치료"
              description="고급 냉각 시스템으로 통증을 최소화한 편안한 치료를 제공합니다."
              color="green"
            />
            <FeatureCard
              title="빠른 회복"
              description="개선된 기술로 치료 후 회복 시간을 대폭 단축했습니다."
              color="teal"
            />
            <FeatureCard
              title="안전한 시술"
              description="FDA 승인 장비와 전문 시술로 부작용 위험을 최소화합니다."
              color="cyan"
            />
            <FeatureCard
              title="합리적 가격"
              description="효율적인 치료 과정으로 전체 비용을 대폭 절감했습니다."
              color="blue"
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}