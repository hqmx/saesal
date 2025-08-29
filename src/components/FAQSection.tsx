'use client';

import { useEffect, useRef, useState } from 'react';

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

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold text-gray-800 pr-4">{question}</h3>
        <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "타투 제거 시술은 얼마나 아픈가요?",
      answer: "Sasal의 고급 냉각 시스템과 최신 레이저 기술로 통증을 최소화했습니다. 대부분의 고객들이 기존 방식보다 훨씬 편안하다고 평가하시며, 시술 중 불편함은 거의 느끼지 않습니다."
    },
    {
      question: "몇 번의 시술이 필요한가요?",
      answer: "타투의 크기, 색상, 깊이, 개인의 피부 타입에 따라 다르지만, 일반적으로 4-8회의 세션이 필요합니다. 초기 상담을 통해 정확한 치료 계획을 제시해드립니다."
    },
    {
      question: "시술 후 일상생활이 가능한가요?",
      answer: "네, 시술 후 바로 일상생활이 가능합니다. 간단한 애프터케어만 지키시면 되며, 특별한 회복 기간이 필요하지 않습니다. 다만 직사광선 노출은 2주간 피해주세요."
    },
    {
      question: "모든 색상의 타투 제거가 가능한가요?",
      answer: "대부분의 타투 색상 제거가 가능합니다. 검정, 빨강, 파랑색은 매우 잘 반응하며, 초록, 노랑색도 효과적으로 제거됩니다. 상담을 통해 정확한 제거 가능성을 확인해드립니다."
    },
    {
      question: "비용은 어떻게 되나요?",
      answer: "타투의 크기와 복잡성에 따라 비용이 결정됩니다. 합리적인 가격으로 분할 결제도 가능하며, 초기 상담에서 정확한 견적을 제시해드립니다."
    },
    {
      question: "부작용이나 흉터 위험은 없나요?",
      answer: "FDA 승인을 받은 장비와 전문 의료진의 시술로 부작용 위험을 최소화했습니다. 올바른 애프터케어를 지키시면 흉터나 색소침착 위험은 거의 없습니다."
    }
  ];

  return (
    <AnimatedSection id="faq" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            자주 묻는 질문
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            고객님들이 가장 궁금해하시는 질문들에 대한 답변입니다.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.includes(index)}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            더 궁금한 점이 있으시나요?
          </p>
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            전문가와 상담하기
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}