'use client';

import { useState } from 'react';
import { StaggeredAnimationContainer, StaggeredItem, useInViewAnimation } from '@/hooks/useStaggeredAnimation';

interface Demo2ContactSectionProps {
  config: any;
}

export default function Demo2ContactSection({ config }: Demo2ContactSectionProps) {
  const titleRef = useInViewAnimation();
  const { contact } = config.components;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    resume: null,
    portfolio: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Form submission logic here
  };
  
  return (
    <section 
      id="contact" 
      className="py-20 px-4"
      style={{
        background: `linear-gradient(135deg, ${config.theme.colors.primary}10, ${config.theme.colors.secondary}08, ${config.theme.colors.background})`
      }}
    >
      <div 
        className="mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <div 
          ref={titleRef}
          className="text-center mb-16 opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ 
              color: config.theme.colors.text.primary,
              fontFamily: config.theme.typography.fontFamily.heading
            }}
          >
            {contact.title}
          </h2>
          <p 
            className="text-xl"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.xl
            }}
          >
            {contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Contact Info */}
          <StaggeredAnimationContainer delay={200}>
            <StaggeredItem>
              <div 
                className="p-10 rounded-3xl shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`,
                  color: 'white'
                }}
              >
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6m8 0H8m0 0v2m0-2V4" />
                    </svg>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4">Join Our Team</h3>
                  <p className="text-lg opacity-90 mb-8">
                    Be part of the future of tattoo removal technology. We're looking for passionate individuals to help us revolutionize the industry.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Location</h4>
                      <p className="opacity-90">Seoul, South Korea</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="opacity-90">careers@saesal.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Response Time</h4>
                      <p className="opacity-90">24-48 hours</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-2xl backdrop-blur">
                  <h4 className="font-semibold text-lg mb-3">Open Positions</h4>
                  <div className="space-y-2">
                    {contact.form.fields.find((f: any) => f.name === 'position')?.options.slice(1).map((position: string, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="opacity-90">{position}</span>
                        <span className="text-sm opacity-70">Full-time</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </StaggeredItem>
          </StaggeredAnimationContainer>

          {/* Right Side - Application Form */}
          <StaggeredAnimationContainer delay={400}>
            <StaggeredItem>
              <div 
                className="p-8 rounded-3xl shadow-2xl"
                style={{
                  backgroundColor: config.theme.colors.surface,
                  border: `2px solid ${config.theme.colors.primary}20`
                }}
              >
                <div className="text-center mb-8">
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ 
                      color: config.theme.colors.text.primary,
                      fontFamily: config.theme.typography.fontFamily.heading
                    }}
                  >
                    {contact.form.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: config.theme.colors.text.secondary }}
                  >
                    Fill out the form below to apply for a position
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.theme.colors.text.primary }}
                    >
                      {contact.form.fields.find((f: any) => f.name === 'name')?.label}
                      {contact.form.fields.find((f: any) => f.name === 'name')?.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: config.theme.colors.background,
                        focusRingColor: config.theme.colors.primary
                      }}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.theme.colors.text.primary }}
                    >
                      {contact.form.fields.find((f: any) => f.name === 'phone')?.label}
                      {contact.form.fields.find((f: any) => f.name === 'phone')?.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: config.theme.colors.background,
                        focusRingColor: config.theme.colors.primary
                      }}
                      required
                      placeholder="010-0000-0000"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.theme.colors.text.primary }}
                    >
                      {contact.form.fields.find((f: any) => f.name === 'email')?.label}
                      {contact.form.fields.find((f: any) => f.name === 'email')?.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: config.theme.colors.background,
                        focusRingColor: config.theme.colors.primary
                      }}
                      required
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.theme.colors.text.primary }}
                    >
                      {contact.form.fields.find((f: any) => f.name === 'position')?.label}
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: config.theme.colors.background,
                        focusRingColor: config.theme.colors.primary
                      }}
                    >
                      {contact.form.fields.find((f: any) => f.name === 'position')?.options.map((option: string, index: number) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Resume */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.theme.colors.text.primary }}
                    >
                      {contact.form.fields.find((f: any) => f.name === 'resume')?.label}
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                      style={{ borderColor: `${config.theme.colors.primary}30` }}
                    >
                      <input
                        type="file"
                        name="resume"
                        onChange={handleInputChange}
                        className="hidden"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">파일 올리기</span>
                      </label>
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.theme.colors.text.primary }}
                    >
                      {contact.form.fields.find((f: any) => f.name === 'portfolio')?.label}
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                      style={{ borderColor: `${config.theme.colors.secondary}30` }}
                    >
                      <input
                        type="file"
                        name="portfolio"
                        onChange={handleInputChange}
                        className="hidden"
                        id="portfolio-upload"
                        accept=".pdf,.doc,.docx,.zip"
                      />
                      <label htmlFor="portfolio-upload" className="cursor-pointer">
                        <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-sm text-gray-600">파일 올리기</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-lg font-semibold text-lg text-white transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`,
                      fontSize: config.theme.typography.fontSize.lg
                    }}
                  >
                    Send Application
                  </button>
                </form>
              </div>
            </StaggeredItem>
          </StaggeredAnimationContainer>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div 
            className="p-8 rounded-2xl border"
            style={{
              backgroundColor: config.theme.colors.surface,
              borderColor: `${config.theme.colors.primary}20`
            }}
          >
            <div className="flex justify-center mb-4">
              <img 
                src="/images/saesal-logo.png" 
                alt="Saesal Logo" 
                className="h-16 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
            </div>
            <p 
              className="text-lg font-medium mb-4"
              style={{ color: config.theme.colors.text.primary }}
            >
              @Copyright Saesal, 2025. All Rights Reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <span style={{ color: config.theme.colors.text.secondary }}>Privacy Policy</span>
              <span style={{ color: config.theme.colors.text.secondary }}>Terms of Service</span>
              <span style={{ color: config.theme.colors.text.secondary }}>Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}