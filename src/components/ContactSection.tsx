'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { countries, Country } from '@/data/countries';
import { locations, searchCities, getCitiesByCountry } from '@/data/locations';

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

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [countryQuery, setCountryQuery] = useState('');
  const [countrySuggestions, setCountrySuggestions] = useState<Country[]>(countries.slice(0, 8));
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [isCountrySearchMode, setIsCountrySearchMode] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  
  const countryDropdownRef = useRef<HTMLDivElement>(null);

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

  const handleCountrySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setCountryQuery(query);
    
    if (query.trim()) {
      // 정확한 검색: 시작하는 단어 우선, 포함하는 단어 후순위
      const exactMatches = countries.filter(country =>
        country.name.toLowerCase().startsWith(query.toLowerCase())
      );
      const partialMatches = countries.filter(country =>
        !country.name.toLowerCase().startsWith(query.toLowerCase()) &&
        (country.name.toLowerCase().includes(query.toLowerCase()) ||
         country.dialCode.includes(query) ||
         country.code.toLowerCase().includes(query.toLowerCase()))
      );
      
      const suggestions = [...exactMatches, ...partialMatches].slice(0, 10);
      setCountrySuggestions(suggestions);
    } else {
      setCountrySuggestions(countries.slice(0, 8));
    }
    setShowCountrySuggestions(true);
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setCountryQuery('');
    setIsCountrySearchMode(false);
    setShowCountrySuggestions(false);
  };

  const toggleCountrySearch = () => {
    setIsCountrySearchMode(!isCountrySearchMode);
    if (!isCountrySearchMode) {
      setShowCountrySuggestions(true);
      setCountrySuggestions(countries.slice(0, 8));
    } else {
      setShowCountrySuggestions(false);
      setCountryQuery('');
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocationQuery(query);
    setSelectedLocationIndex(-1);
    
    if (query.trim()) {
      // 더 정확한 도시 검색
      const allCities = locations.flatMap(loc => 
        loc.cities.map(city => ({ city, country: loc.country }))
      );
      
      const exactMatches = allCities.filter(item =>
        item.city.toLowerCase().startsWith(query.toLowerCase())
      );
      const partialMatches = allCities.filter(item =>
        !item.city.toLowerCase().startsWith(query.toLowerCase()) &&
        item.city.toLowerCase().includes(query.toLowerCase())
      );
      
      const suggestions = [...exactMatches, ...partialMatches]
        .slice(0, 10)
        .map(item => `${item.city}, ${item.country}`);
        
      setLocationSuggestions(suggestions);
      setShowLocationSuggestions(true);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
    
    setFormData(prev => ({
      ...prev,
      location: query
    }));
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent) => {
    if (!showLocationSuggestions || locationSuggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedLocationIndex(prev => 
          prev < locationSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedLocationIndex(prev => 
          prev > 0 ? prev - 1 : locationSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedLocationIndex >= 0 && selectedLocationIndex < locationSuggestions.length) {
          selectLocation(locationSuggestions[selectedLocationIndex]);
        }
        break;
      case 'Escape':
        setShowLocationSuggestions(false);
        setSelectedLocationIndex(-1);
        break;
    }
  };

  const selectLocation = (city: string) => {
    setLocationQuery(city);
    setFormData(prev => ({
      ...prev,
      location: city
    }));
    setShowLocationSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountrySuggestions(false);
        setIsCountrySearchMode(false);
        setCountryQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  return (
    <section
      id="contact"
      className="relative py-20 px-4"
      style={{
        background: `linear-gradient(135deg, ${config.theme.colors.primary}10, ${config.theme.colors.secondary}08, transparent)`
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${config.theme.colors.primary}10, ${config.theme.colors.secondary}08, ${config.theme.colors.background})`,
          opacity: 0.95
        }}
      ></div>
      <div 
        className="relative z-10 mx-auto"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 
            className="font-medium mb-6"
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
            className="text-xl mb-4"
            style={{ 
              color: config.theme.colors.text.secondary,
              fontSize: config.theme.typography.fontSize.xl
            }}
          >
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - 상담 전 준비사항 안내 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div 
              className="p-6 lg:p-10 rounded-3xl shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})`,
                color: 'white'
              }}
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">{t('contact.info.title')}</h3>
                <p className="text-lg lg:text-xl opacity-90 mb-6">
                  {t('contact.info.subtitle')}
                </p>
              </div>

              <div className="space-y-6">
                {/* Tattoo Photos */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h4 className="font-semibold text-lg">{t('contact.info.photo.title')}</h4>
                  </div>
                  <p className="opacity-90 text-base ml-7">{t('contact.info.photo.description')}</p>
                </div>

                {/* Tattoo History */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="font-semibold text-lg">{t('contact.info.history.title')}</h4>
                  </div>
                  <p className="opacity-90 text-base ml-7">{t('contact.info.history.description')}</p>
                </div>

                {/* Medical History */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h4 className="font-semibold text-lg">{t('contact.info.medical.title')}</h4>
                  </div>
                  <p className="opacity-90 text-base ml-7">{t('contact.info.medical.description')}</p>
                </div>

                {/* Skin Condition */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h4 className="font-semibold text-lg">{t('contact.info.skin.title')}</h4>
                  </div>
                  <p className="opacity-90 text-base ml-7">{t('contact.info.skin.description')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-2xl">
              <div className="flex justify-center mb-6">
                <img 
                  src="/logo.png" 
                  alt="SaesaL Logo" 
                  className="h-12 object-contain"
                />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.name')} *
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.email')} *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.phone')} *
                  </label>
                  <div className="flex">
                    <div className="relative w-24 sm:w-28" ref={countryDropdownRef}>
                      {!isCountrySearchMode ? (
                        <button
                          type="button"
                          onClick={toggleCountrySearch}
                          className="w-full flex items-center justify-center px-2 py-4 border border-gray-300 rounded-l-xl hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                          <span className="text-lg mr-1">{selectedCountry.flag}</span>
                          <span className="text-xs text-gray-600">{selectedCountry.dialCode}</span>
                          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      ) : (
                        <div className="flex items-center border border-gray-300 rounded-l-xl">
                          <span className="px-1 text-lg">{selectedCountry.flag}</span>
                          <input
                            type="text"
                            value={countryQuery}
                            onChange={handleCountrySearch}
                            className="flex-1 p-2 text-xs border-0 focus:ring-0 focus:outline-none"
                            placeholder="Search..."
                            autoComplete="off"
                            autoFocus
                          />
                        </div>
                      )}
                      {showCountrySuggestions && countrySuggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-64 sm:w-72 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                          {countrySuggestions.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => selectCountry(country)}
                              className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 transition-colors"
                            >
                              <span className="mr-3 text-lg">{country.flag}</span>
                              <span className="flex-1">{country.name}</span>
                              <span className="text-sm text-gray-500">{country.dialCode}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="flex-1 p-4 border border-l-0 border-gray-300 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.location')} *
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="location"
                      value={locationQuery}
                      onChange={handleLocationChange}
                      onKeyDown={handleLocationKeyDown}
                      onFocus={() => locationSuggestions.length > 0 && setShowLocationSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                      required
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Search for your city..."
                      autoComplete="off"
                    />
                    {showLocationSuggestions && locationSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                        {locationSuggestions.map((cityLocation, index) => {
                          const [city, country] = cityLocation.split(', ');
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => selectLocation(cityLocation)}
                              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                                index === selectedLocationIndex 
                                  ? 'bg-blue-50 border-l-2 border-blue-500' 
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              <span className="font-medium">{city}</span>
                              <span className="text-sm text-gray-500">{country}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.images')}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="tattooImages"
                      onChange={handleInputChange}
                      multiple
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      id="tattooImages"
                    />
                    <div className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all bg-gray-50 hover:bg-blue-50 cursor-pointer flex flex-col items-center justify-center min-h-[120px]">
                      <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-sm font-medium text-gray-700 mb-1">{t('contact.form.uploadPhotos')}</p>
                      <p className="text-xs text-gray-500">{t('contact.form.dragDrop')}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block font-semibold mb-2" style={{ color: config.theme.colors.text.primary }}>
                    {t('contact.form.message')} *
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 hover:transform hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${config.theme.colors.primary}, ${config.theme.colors.secondary})` }}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </button>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-600 text-center font-medium">
                      {t('contact.form.successMessage')}
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-center font-medium">
                      {t('contact.form.errorMessage')}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}