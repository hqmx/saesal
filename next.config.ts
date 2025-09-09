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
  
  // 웹팩 최적화
  webpack: (config, { dev, isServer }) => {
    // 프로덕션에서 번들 크기 최적화
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            enforce: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // 폰트 최적화
  optimizeFonts: true,
  
  // 정적 최적화
  trailingSlash: false,
  
  // 개발 시 빠른 새로고침
  reactStrictMode: true,
};

export default nextConfig;
