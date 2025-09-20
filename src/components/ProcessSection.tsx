'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProcessSectionProps {
  config: any;
}

export default function ProcessSection({ config }: ProcessSectionProps) {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section
      id="process"
      className="relative py-20 px-2 sm:px-4"
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(248, 250, 252, 0.1)'
        }}
      ></div>
      <div 
        className="relative z-10 mx-auto space-y-32"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        
        {/* How Laser Treatment Works */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: config.theme.colors.text.primary }}>
                {t('process.laser.howWorks')}
              </h2>
              <div 
                className="mx-auto"
                style={{
                  width: 'fit-content',
                  height: '4px',
                  background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.8), rgba(239, 68, 68, 0.8))',
                  borderRadius: '2px',
                  paddingLeft: '2px',
                  paddingRight: '2px'
                }}
              >
                <div style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  <span style={{ visibility: 'hidden', fontSize: '2rem', fontWeight: 'bold' }}>{t('process.laser.howWorks')}</span>
                </div>
              </div>
            </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  {/* Step 1 */}
                  <div className="text-center">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/l1.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.laser.step1.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.laser.step1.description')}
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/l2.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.laser.step2.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.laser.step2.description')}
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/l3.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.laser.step3.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.laser.step3.description')}
                    </p>
                  </div>
                </div>

                {/* Warning text */}
                <div 
                  className="p-4 sm:p-6 rounded-xl text-center"
                  style={{ backgroundColor: '#FEE2E2', borderLeft: `4px solid #DC2626` }}
                >
                  <div className="space-y-2">
                    <p className="text-base font-medium text-red-700">
                      {t('process.laser.warning1')}
                    </p>
                    <p className="text-base font-medium text-red-700">
                      {t('process.laser.warning2')}
                    </p>
                    <p className="text-base font-medium text-red-700">
                      {t('process.laser.warning3')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* How Saesal Treatment Works */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: config.theme.colors.text.primary }}>
                {t('process.saesal.howWorks')}
              </h2>
              <div 
                className="mx-auto"
                style={{
                  width: 'fit-content',
                  height: '4px',
                  background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.8), rgba(13, 148, 136, 0.8))',
                  borderRadius: '2px',
                  paddingLeft: '2px',
                  paddingRight: '2px'
                }}
              >
                <div style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  <span style={{ visibility: 'hidden', fontSize: '2rem', fontWeight: 'bold' }}>{t('process.saesal.howWorks')}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  {/* Step 1 */}
                  <div className="text-center">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/s1.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.saesal.step1.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.saesal.step1.description')}
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/s2.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.saesal.step2.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.saesal.step2.description')}
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/s3.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.saesal.step3.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.saesal.step3.description')}
                    </p>
                  </div>
                </div>

                {/* Benefits text */}
                <div 
                  className="p-4 sm:p-6 rounded-xl text-center"
                  style={{ 
                    backgroundColor: `${config.theme.colors.secondary}10`,
                    border: `2px solid ${config.theme.colors.secondary}30`
                  }}
                >
                  <div className="space-y-2">
                    <p className="text-lg font-semibold" style={{ color: config.theme.colors.secondary }}>
                      {t('process.saesal.benefit1')}
                    </p>
                    <p className="text-lg font-semibold" style={{ color: config.theme.colors.secondary }}>
                      {t('process.saesal.benefit2')}
                    </p>
                    <p className="text-lg font-semibold" style={{ color: config.theme.colors.secondary }}>
                      {t('process.saesal.benefit3')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Natural Healing Process */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: config.theme.colors.text.primary }}>
                {t('process.healing.title')}
              </h2>
              <div 
                className="mx-auto"
                style={{
                  width: 'fit-content',
                  height: '4px',
                  background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.8), rgba(13, 148, 136, 0.8))',
                  borderRadius: '2px',
                  paddingLeft: '2px',
                  paddingRight: '2px'
                }}
              >
                <div style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}>
                  <span style={{ visibility: 'hidden', fontSize: '2rem', fontWeight: 'bold' }}>{t('process.healing.title')}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

              {/* Content */}
              <div className="p-8">
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  {/* Healing Step 1 */}
                  <div className="text-center w-80 max-w-sm">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/t1.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.healing.step1.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.healing.step1.description')}
                    </p>
                  </div>

                  {/* Healing Step 2 */}
                  <div className="text-center w-80 max-w-sm">
                    <div 
                      className="w-full mb-4 flex items-center justify-center relative"
                      style={{
                        aspectRatio: '4/3',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        backgroundImage: "url('/t2.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                      {t('process.healing.step2.title')}
                    </h4>
                    <p className="text-sm" style={{ color: config.theme.colors.text.secondary, fontFamily: 'Montserrat, sans-serif' }}>
                      {t('process.healing.step2.description')}
                    </p>
                  </div>

                </div>

                {/* Timeline indicator */}
                <div 
                  className="py-8 px-1 md:py-12 md:px-12 rounded-xl mx-0 md:mx-auto my-16"
                  style={{ 
                    backgroundColor: config.theme.colors.surface,
                    border: `2px solid ${config.theme.colors.secondary}`,
                    maxWidth: '800px'
                  }}
                >
                  <div className="flex items-center justify-between md:justify-center md:space-x-12">
                    <div className="flex flex-col items-center space-y-2 flex-1">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-pink-400 rounded-full"></div>
                      <span className="text-sm md:text-base font-semibold text-center leading-tight" style={{ color: config.theme.colors.text.primary, fontFamily: 'Montserrat, sans-serif' }}>
                        {t('process.healing.timeline.day').split('\n').map((line, i) => <span key={i}>{line}{i < t('process.healing.timeline.day').split('\n').length - 1 && <br />}</span>)}
                      </span>
                    </div>
                    <div className="w-6 md:w-12 h-0.5 mx-1 md:mx-0" style={{ backgroundColor: config.theme.colors.secondary }}></div>
                    <div className="flex flex-col items-center space-y-2 flex-1">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-amber-400 rounded-full"></div>
                      <span className="text-sm md:text-base font-semibold text-center leading-tight" style={{ color: config.theme.colors.text.primary, fontFamily: 'Montserrat, sans-serif' }}>
                        {t('process.healing.timeline.weeks2').split('\n').map((line, i) => <span key={i}>{line}{i < t('process.healing.timeline.weeks2').split('\n').length - 1 && <br />}</span>)}
                      </span>
                    </div>
                    <div className="w-6 md:w-12 h-0.5 mx-1 md:mx-0" style={{ backgroundColor: config.theme.colors.secondary }}></div>
                    <div className="flex flex-col items-center space-y-2 flex-1">
                      <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-400 rounded-full"></div>
                      <span className="text-sm md:text-base font-semibold text-center leading-tight" style={{ color: config.theme.colors.text.primary, fontFamily: 'Montserrat, sans-serif' }}>
                        {t('process.healing.timeline.weeks12').split('\n').map((line, i) => <span key={i}>{line}{i < t('process.healing.timeline.weeks12').split('\n').length - 1 && <br />}</span>)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key benefits */}
                <div 
                  className="p-4 sm:p-6 rounded-xl text-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.theme.colors.primary}10, ${config.theme.colors.secondary}10)`
                  }}
                >
                  <h4 className="text-xl font-bold mb-4" style={{ color: config.theme.colors.primary }}>
                    {t('process.healing.whyChoose')}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium" style={{ color: config.theme.colors.text.primary }}>
                        {t('process.healing.benefit1')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium" style={{ color: config.theme.colors.text.primary }}>
                        {t('process.healing.benefit2')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium" style={{ color: config.theme.colors.text.primary }}>
                        {t('process.healing.benefit3')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: config.theme.colors.secondary }}
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-medium" style={{ color: config.theme.colors.text.primary }}>
                        {t('process.healing.benefit4')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}