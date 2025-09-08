'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FooterProps {
  config: any;
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer 
      className="py-10 px-4"
      style={{ 
        backgroundColor: '#1d3739', // Dark teal matching screenshot
        color: '#4fd1c7' // Teal color for text
      }}
    >
      <div 
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        {/* Left Section - SNS Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-base font-normal mb-4" style={{ color: '#9ca3af' }}>
            SNS
          </h3>
          <div className="space-y-3">
            <div>
              <a 
                href="#" 
                className="text-lg font-light hover:opacity-80 transition-opacity duration-300"
                style={{ color: '#4fd1c7' }}
              >
                Instagram
              </a>
            </div>
            <div>
              <a 
                href="#" 
                className="text-lg font-light hover:opacity-80 transition-opacity duration-300"
                style={{ color: '#4fd1c7' }}
              >
                Facebook
              </a>
            </div>
            <div>
              <a 
                href="#" 
                className="text-lg font-light hover:opacity-80 transition-opacity duration-300"
                style={{ color: '#4fd1c7' }}
              >
                Linkedin
              </a>
            </div>
          </div>
        </motion.div>

        {/* Center Section - Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center items-center"
        >
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="SæsaL Logo"
              width={150}
              height={45}
              className="mx-auto"
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(72%) sepia(49%) saturate(392%) hue-rotate(127deg) brightness(98%) contrast(85%)',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        </motion.div>

        {/* Right Section - Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-right space-y-4"
        >
          <h3 className="text-base font-normal mb-4" style={{ color: '#9ca3af' }}>
            Contact Us
          </h3>
          <div className="space-y-3">
            <div>
              <p 
                className="text-lg font-light"
                style={{ color: '#4fd1c7' }}
              >
                010-1234-5678
              </p>
            </div>
            <div>
              <p 
                className="text-lg font-light leading-relaxed"
                style={{ color: '#4fd1c7' }}
              >
                501, Wonhyo-ro, Yongsan-gu, Seoul
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section - Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-8 pt-4 text-center"
      >
        <p 
          className="text-sm font-light"
          style={{ color: '#9ca3af' }}
        >
          @Copyright Saesal, 2025. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}