'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LinearWordAnimationProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  wordDelay?: number;
  animationDuration?: number;
  recreationDelay?: number;
  lineBreakAfter?: string;
}

interface WordState {
  word: string;
  isVisible: boolean;
  delay: number;
  isLineBreak?: boolean;
}

export default function LinearWordAnimation({ 
  text, 
  className = '', 
  style = {},
  wordDelay = 100,
  animationDuration = 3000,
  recreationDelay = 2000,
  lineBreakAfter = 'Tattoo'
}: LinearWordAnimationProps) {
  const [words, setWords] = useState<WordState[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timeout>();

  const initializeWords = () => {
    const wordList = text.split(' ');
    const newWords: WordState[] = [];
    
    wordList.forEach((word, index) => {
      newWords.push({
        word,
        isVisible: false,
        delay: index * wordDelay
      });
      
      // lineBreakAfter 단어 뒤에 줄바꿈 추가 - 정확한 매칭
      console.log(`Word: "${word}", lineBreakAfter: "${lineBreakAfter}", Match: ${word === lineBreakAfter}`);
      if (word === lineBreakAfter && index < wordList.length - 1) {
        newWords.push({
          word: 'LINEBREAK',
          isVisible: false,
          delay: index * wordDelay,
          isLineBreak: true
        });
      }
    });
    
    console.log('Generated words:', newWords);
    setWords(newWords);
  };

  const startAnimation = () => {
    setIsVisible(false);
    initializeWords();
    
    // 단어들을 순차적으로 표시
    words.forEach((wordState, index) => {
      timeoutRef.current = setTimeout(() => {
        setWords(prev => prev.map((w, i) => 
          i === index ? { ...w, isVisible: true } : w
        ));
      }, wordState.delay);
    });

    // 모든 단어가 표시된 후 전체 텍스트 표시
    const totalDelay = (words.length - 1) * wordDelay + animationDuration;
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      
      // 일정 시간 후 다시 시작
      timeoutRef.current = setTimeout(() => {
        startAnimation();
      }, recreationDelay);
    }, totalDelay);
  };

  useEffect(() => {
    initializeWords();
    const timer = setTimeout(() => {
      startAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [text, wordDelay]);

  const renderAnimatedWords = () => {
    const lines: React.ReactNode[] = [];
    let currentLine: React.ReactNode[] = [];
    let wordIndex = 0;

    words.forEach((wordState, index) => {
      if (wordState.isLineBreak) {
        // 현재 라인을 완성하고 새 라인 시작
        if (currentLine.length > 0) {
          lines.push(
            <div key={`line-${lines.length}`}>
              {currentLine}
            </div>
          );
          currentLine = [];
        }
      } else {
        const totalNonBreakWords = words.filter(w => !w.isLineBreak).length;
        const progressDelay = (wordIndex / Math.max(totalNonBreakWords - 1, 1)) * 2000;
        wordIndex++;
        
        currentLine.push(
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: wordState.isVisible ? 1 : 0,
              filter: wordState.isVisible ? 'blur(0px)' : 'blur(10px)',
              transform: wordState.isVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
              transition: `all ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
              transitionDelay: `${progressDelay}ms`,
              marginRight: '0.3em'
            }}
          >
            {wordState.word}
          </span>
        );
      }
    });

    // 마지막 라인 추가
    if (currentLine.length > 0) {
      lines.push(
        <div key={`line-${lines.length}`}>
          {currentLine}
        </div>
      );
    }

    return lines.length > 0 ? lines : <div>{text}</div>;
  };

  return (
    <div className={`relative ${className}`} style={{ ...style, position: 'relative' }}>
      {/* 완전한 텍스트 (최종 표시용) */}
      <div
        className="relative z-20"
        style={{
          ...style,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {(() => {
          const wordList = text.split(' ');
          const breakIndex = wordList.findIndex(word => word === lineBreakAfter);
          if (breakIndex !== -1) {
            return (
              <>
                <div>{wordList.slice(0, breakIndex + 1).join(' ')}</div>
                <div>{wordList.slice(breakIndex + 1).join(' ')}</div>
              </>
            );
          }
          return <div>{text}</div>;
        })()}
      </div>
      
      {/* 애니메이션 텍스트 */}
      <div
        className="absolute top-0 left-0 z-10"
        style={{
          ...style,
          opacity: isVisible ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: 'none'
        }}
      >
        {renderAnimatedWords()}
      </div>
    </div>
  );
}