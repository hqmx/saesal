'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactSectionProps {
  config: any;
}

export default function ContactSection({ config }: ContactSectionProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    tattooImages: null as FileList | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).files
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tattooImages' && value) {
          Array.from(value as FileList).forEach((file, index) => {
            formDataToSend.append(`tattooImage${index}`, file);
          });
        } else if (value) {
          formDataToSend.append(key, value as string);
        }
      });

      const response = await fetch('/api/consultation', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          message: '',
          tattooImages: null
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

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
        duration: 0.6
      }
    }
  };

  return (
    <section 
      id="contact" 
      className="py-20 px-2 sm:px-4"
      style={{ backgroundColor: config.theme.colors.background }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
            {t('contact.title')}
          </h2>
          <p 
            className="text-xl"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.xl
            }}
          >
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Consultation Info */}
          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6" style={{ color: config.theme.colors.text.primary }}>
                {t('contact.info.title')}
              </h3>
              <p className="text-lg mb-6" style={{ color: config.theme.colors.text.secondary }}>
                {t('contact.info.subtitle')}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center" style={{ color: config.theme.colors.text.primary }}>
                    📸 {t('contact.info.photo.title')}
                  </h4>
                  <p className="text-sm" style={{ color: config.theme.colors.text.secondary }}>
                    {t('contact.info.photo.description')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center" style={{ color: config.theme.colors.text.primary }}>
                    ⏰ {t('contact.info.history.title')}
                  </h4>
                  <p className="text-sm" style={{ color: config.theme.colors.text.secondary }}>
                    {t('contact.info.history.description')}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center" style={{ color: config.theme.colors.text.primary }}>
                    🏥 {t('contact.info.medical.title')}
                  </h4>
                  <p className="text-sm" style={{ color: config.theme.colors.text.secondary }}>
                    {t('contact.info.medical.description')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6" style={{ color: config.theme.colors.text.primary }}>
                {t('contact.form.title')}
              </h3>
              <p className="text-lg mb-6" style={{ color: config.theme.colors.text.secondary }}>
                {t('contact.form.subtitle')}
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.name')}
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.form.name')}
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.email')}
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.form.email')}
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.phone')}
                  </label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.form.phone')}
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.location')}
                  </label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('contact.form.location')}
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.images')}
                  </label>
                  <input 
                    type="file" 
                    name="tattooImages"
                    onChange={handleInputChange}
                    multiple
                    accept="image/*"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.message')}
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 disabled:opacity-50"
                  style={{ backgroundColor: config.theme.colors.primary }}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </button>
                
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm text-center mt-2">
                    {t('contact.form.successMessage')}
                  </p>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    {t('contact.form.errorMessage')}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}