'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface FooterProps {
  config: any;
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer 
      className="py-16 px-4"
      style={{ 
        backgroundColor: '#4a5c5a', // Dark teal color from screenshot
        color: '#20b2aa' // Light teal color for text
      }}
    >
      <div 
        className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16"
        style={{ maxWidth: config.layout.container.maxWidth }}
      >
        {/* Left Section - SNS Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-lg font-medium mb-4" style={{ color: '#9ca3af' }}>
            SNS
          </h3>
          <div className="space-y-4">
            <div>
              <a 
                href="#" 
                className="text-lg hover:opacity-80 transition-opacity duration-300"
                style={{ color: '#20b2aa' }}
              >
                Instagram
              </a>
            </div>
            <div>
              <a 
                href="#" 
                className="text-lg hover:opacity-80 transition-opacity duration-300"
                style={{ color: '#20b2aa' }}
              >
                Facebook
              </a>
            </div>
            <div>
              <a 
                href="#" 
                className="text-lg hover:opacity-80 transition-opacity duration-300"
                style={{ color: '#20b2aa' }}
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
          className="flex justify-center items-start md:items-center"
        >
          <div className="text-center">
            <Image
              src="/logo.png"
              alt="SæsaL Logo"
              width={200}
              height={60}
              className="mx-auto mb-4"
              style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(140deg)' }} // Teal filter
            />
          </div>
        </motion.div>

        {/* Right Section - Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-right space-y-6"
        >
          <h3 className="text-lg font-medium mb-4" style={{ color: '#9ca3af' }}>
            Contact Us
          </h3>
          <div className="space-y-4">
            <div>
              <p 
                className="text-lg"
                style={{ color: '#20b2aa' }}
              >
                010-1234-5678
              </p>
            </div>
            <div>
              <p 
                className="text-lg"
                style={{ color: '#20b2aa' }}
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
        className="border-t mt-12 pt-8 text-center"
        style={{ borderColor: 'rgba(32, 178, 170, 0.3)' }}
      >
        <p 
          className="text-sm"
          style={{ color: '#9ca3af' }}
        >
          @Copyright Saesal, 2025. All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
}