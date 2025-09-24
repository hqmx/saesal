import { Geist, Geist_Mono, Montserrat, Questrial } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: ["400"],
});

// 메타데이터 설정
export const metadata: Metadata = {
  title: "SaesaL - Professional Tattoo Removal Solution",
  description: "Professional and safe tattoo removal solution. Remove tattoos naturally with SaesaL treatment - effective for all colors, painless process, and easy aftercare.",
  keywords: "tattoo removal, laser alternative, safe tattoo removal, natural healing, all colors, painless",
  authors: [{ name: "SaesaL Team" }],
  creator: "SaesaL",
  publisher: "SaesaL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saesal.hqmx.net'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ko': '/ko',
      'ja': '/ja',
      'zh': '/zh',
      'zh-tw': '/zh-tw',
      'th': '/th',
      'vi': '/vi',
      'es': '/es',
      'sv': '/sv',
      'de': '/de',
    },
  },
  openGraph: {
    title: "SaesaL - Professional Tattoo Removal Solution",
    description: "Professional and safe tattoo removal solution. Remove tattoos naturally with SaesaL treatment.",
    url: 'https://saesal.hqmx.net',
    siteName: 'SaesaL',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SaesaL Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SaesaL - Professional Tattoo Removal Solution",
    description: "Professional and safe tattoo removal solution. Remove tattoos naturally with SaesaL treatment.",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Google Search Console 인증 코드
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${questrial.variable}`}>
        {children}
      </body>
    </html>
  );
}
