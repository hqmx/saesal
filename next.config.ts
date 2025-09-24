import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 이미지 최적화 설정
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 압축 설정
  compress: true,
  
  // 실험적 기능
  experimental: {
    // 현대적인 번들러 최적화
    optimizePackageImports: ['framer-motion'],
  },
  
  // Turbopack 설정 (webpack 대신 사용)
  turbopack: {
    // Turbopack 전용 최적화 설정
  },
  
  // Next.js는 기본적으로 폰트 최적화가 활성화되어 있음
  
  // 정적 최적화
  trailingSlash: false,
  
  // ESLint 및 TypeScript 설정
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 에러 무시
  },
  typescript: {
    ignoreBuildErrors: true, // 빌드 시 TypeScript 에러 무시
  },
  
  // 개발 시 빠른 새로고침
  reactStrictMode: true,
};

export default nextConfig;
