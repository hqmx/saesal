'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComparisonSectionProps {
  config: any;
}

export default function ComparisonSection({ config }: ComparisonSectionProps) {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="comparison"
      className="relative pt-20 pb-0 px-2 sm:px-4 w-full"
      style={{
        minHeight: '100vh'
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(248, 250, 252, 0.1)'
        }}
      ></div>
      <div 
        className="relative z-10 mx-auto w-full overflow-x-hidden"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        {/* 제목 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 
            className="font-medium mb-4"
            style={{ 
              color: config.theme.colors.text.primary,
              fontFamily: config.theme.typography.fontFamily.heading,
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              lineHeight: '1.3'
            }}
          >
            {t('comparison.title')}
          </h2>
          <p 
            className="text-lg"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.lg
            }}
          >
            {t('comparison.subtitle')}
          </p>
        </motion.div>

        {/* 메인 비교 그리드 */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Laser 한계점 */}
          <motion.div
            variants={itemVariants}
            className="h-full p-4 sm:p-8 rounded-3xl shadow-xl border-2"
            style={{
              backgroundColor: 'rgba(254, 226, 226, 0.6)',
              borderColor: '#fca5a5'
            }}
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-3xl font-semibold text-red-800 mb-4">
                {t('comparison.laser.title')}
              </h3>
            </div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { title: t('comparison.laser.colorLimitation.title'), desc: t('comparison.laser.colorLimitation.description') },
                { title: t('comparison.laser.painful.title'), desc: t('comparison.laser.painful.description') },
                { title: t('comparison.laser.longProcess.title'), desc: t('comparison.laser.longProcess.description') },
                { title: t('comparison.laser.aftercare.title'), desc: t('comparison.laser.aftercare.description') }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  className="p-3 sm:p-6 rounded-2xl shadow-md border border-red-200"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-red-800 mb-2">{item.title}</h4>
                      <p className="text-base leading-relaxed" style={{ color: 'black', fontFamily: 'Montserrat, sans-serif' }}>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 text-center p-4 bg-red-100 rounded-2xl">
              <p className="text-red-800 font-semibold text-lg">
                {t('comparison.laser.summary')}
              </p>
            </div>
          </motion.div>

          {/* Saesal 장점 */}
          <motion.div
            variants={itemVariants}
            className="h-full p-4 sm:p-8 rounded-3xl shadow-xl border-2"
            style={{
              backgroundColor: `${config.theme.colors.secondary}10`,
              borderColor: config.theme.colors.secondary
            }}
          >
            <div className="text-center mb-8">
              <div 
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
              >
                <svg 
                  className="w-10 h-10" 
                  style={{ color: config.theme.colors.secondary }} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 
                className="text-3xl font-semibold mb-4"
                style={{ color: config.theme.colors.text.primary }}
              >
                {t('comparison.saesal.title')}
              </h3>
            </div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { title: t('comparison.saesal.allColors.title'), desc: t('comparison.saesal.allColors.description') },
                { title: t('comparison.saesal.safe.title'), desc: t('comparison.saesal.safe.description') },
                { title: t('comparison.saesal.fast.title'), desc: t('comparison.saesal.fast.description') },
                { title: t('comparison.saesal.easycare.title'), desc: t('comparison.saesal.easycare.description') }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={featureVariants}
                  className="p-3 sm:p-6 rounded-2xl shadow-md border"
                  style={{
                    backgroundColor: config.theme.colors.surface,
                    borderColor: `${config.theme.colors.secondary}30`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
                    >
                      <svg 
                        className="w-5 h-5" 
                        style={{ color: config.theme.colors.secondary }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 
                        className="font-semibold mb-2 text-lg"
                        style={{ color: config.theme.colors.text.primary }}
                      >
                        {item.title}
                      </h4>
                      <p 
                        className="text-base leading-relaxed"
                        style={{ color: 'black', fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div 
              className="mt-8 text-center p-4 rounded-2xl"
              style={{ backgroundColor: `${config.theme.colors.secondary}20` }}
            >
              <p 
                className="font-semibold text-lg"
                style={{ color: config.theme.colors.text.primary }}
              >
                {t('comparison.saesal.summary')}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* "The Clear Choice" 요약 비교 컨테이너 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
          className="p-6 lg:p-10 mt-8"
        >
          <h3 
            className="font-medium mb-8 text-center"
            style={{ 
              color: config.theme.colors.text.primary,
              fontSize: 'clamp(1.875rem, 4vw, 3rem)',
              lineHeight: '1.3'
            }}
          >
            {t('comparison.clearChoice')}
          </h3>
          
          <div className="max-w-6xl mx-auto px-4">
            {/* 모바일: 세로 배치, 데스크톱: 가로 배치 */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              {/* 레이저 치료 */}
              <motion.div
                className="h-full p-4 sm:p-8 rounded-3xl shadow-xl border-2 flex-1"
                style={{
                  backgroundColor: 'rgba(254, 226, 226, 0.3)',
                  borderColor: '#fca5a5'
                }}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
              >
                <div className="text-center">
                  <div 
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3"
                    style={{ color: '#dc2626' }}
                  >
                    10+
                  </div>
                  <div className="text-sm md:text-lg font-semibold text-red-600 mb-3 md:mb-4">
                    {t('comparison.laser.sessions')}
                  </div>
                  
                  {/* 레이저 치료의 한계점들 */}
                  <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: '#dc2626' }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left">{t('comparison.laser.colorLimitation.title')}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: '#dc2626' }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left">{t('comparison.laser.painful.title')}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: '#dc2626' }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left">{t('comparison.laser.longProcess.title')}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: '#dc2626' }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left whitespace-nowrap">{t('comparison.laser.aftercare.title')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* SæsaL 치료 */}
              <motion.div
                className="h-full p-4 sm:p-8 rounded-3xl shadow-xl border-2 flex-1"
                style={{
                  backgroundColor: `${config.theme.colors.secondary}10`,
                  borderColor: config.theme.colors.secondary
                }}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
              >
                <div className="text-center">
                  <div 
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3"
                    style={{ color: config.theme.colors.secondary }}
                  >
                    4
                  </div>
                  <div 
                    className="text-sm md:text-lg font-semibold mb-3 md:mb-4"
                    style={{ color: config.theme.colors.text.primary }}
                  >
                    {t('comparison.saesal.sessions')}
                  </div>
                  
                  {/* SæsaL 치료의 장점들 */}
                  <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: config.theme.colors.secondary }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left">{t('comparison.saesal.allColors.title')}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: config.theme.colors.secondary }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left">{t('comparison.saesal.safe.title')}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: config.theme.colors.secondary }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left">{t('comparison.saesal.fast.title')}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 md:space-x-2">
                      <svg 
                        className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" 
                        style={{ color: config.theme.colors.secondary }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-semibold text-left">{t('comparison.saesal.easycare.title')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}