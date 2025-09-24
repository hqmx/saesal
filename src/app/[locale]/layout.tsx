import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";

// 지원하는 언어 목록
export const locales = ['en', 'ko', 'ja', 'zh', 'zh-tw', 'th', 'vi', 'es', 'sv', 'de'];

// 언어별 메타데이터
const localeMetadata: Record<string, {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}> = {
  en: {
    title: "SæsaL - Revolutionary Tattoo Removal Treatment | Safe & Natural",
    description: "SæsaL offers revolutionary tattoo removal in just 4 sessions. 100% natural, safe, and works on all colors. No burn scars, no pain. Alternative to laser treatment.",
    keywords: "tattoo removal, saesal, natural tattoo removal, laser alternative, tattoo removal treatment, safe tattoo removal, tattoo ink removal",
    ogTitle: "SæsaL - Revolutionary Tattoo Removal Treatment",
    ogDescription: "Revolutionary tattoo removal in just 4 sessions. 100% natural, safe, and works on all colors."
  },
  ko: {
    title: "새살 - 혁신적인 타투 제거 치료 | 안전하고 자연스러운",
    description: "새살은 단 4회 세션으로 혁신적인 타투 제거를 제공합니다. 100% 자연스럽고 안전하며 모든 색상에 효과적. 화상 흉터나 고통 없음. 레이저 치료의 대안.",
    keywords: "타투 제거, 새살, 자연스러운 타투 제거, 레이저 대안, 타투 제거 치료, 안전한 타투 제거, 타투 잉크 제거",
    ogTitle: "새살 - 혁신적인 타투 제거 치료",
    ogDescription: "단 4회 세션으로 혁신적인 타투 제거. 100% 자연스럽고 안전하며 모든 색상에 효과적."
  },
  ja: {
    title: "SæsaL - 革新的なタトゥー除去治療 | 安全で自然",
    description: "SæsaLはわずか4セッションで革新的なタトゥー除去を提供。100%自然で安全、すべての色に効果的。火傷の傷跡や痛みなし。レーザー治療の代替。",
    keywords: "タトゥー除去, saesal, 自然なタトゥー除去, レーザー代替, タトゥー除去治療, 安全なタトゥー除去, タトゥーインク除去",
    ogTitle: "SæsaL - 革新的なタトゥー除去治療",
    ogDescription: "わずか4セッションで革新的なタトゥー除去。100%自然で安全、すべての色に効果的。"
  },
  zh: {
    title: "SæsaL - 革命性纹身去除治疗 | 安全自然",
    description: "SæsaL仅需4次疗程即可提供革命性纹身去除。100%天然安全，对所有颜色有效。无烧伤疤痕，无痛苦。激光治疗的替代方案。",
    keywords: "纹身去除, saesal, 天然纹身去除, 激光替代, 纹身去除治疗, 安全纹身去除, 纹身墨水去除",
    ogTitle: "SæsaL - 革命性纹身去除治疗",
    ogDescription: "仅需4次疗程即可革命性纹身去除。100%天然安全，对所有颜色有效。"
  },
  'zh-tw': {
    title: "SæsaL - 革命性刺青去除治療 | 安全自然",
    description: "SæsaL僅需4次療程即可提供革命性刺青去除。100%天然安全，對所有顏色有效。無燒傷疤痕，無痛苦。雷射治療的替代方案。",
    keywords: "刺青去除, saesal, 天然刺青去除, 雷射替代, 刺青去除治療, 安全刺青去除, 刺青墨水去除",
    ogTitle: "SæsaL - 革命性刺青去除治療",
    ogDescription: "僅需4次療程即可革命性刺青去除。100%天然安全，對所有顏色有效。"
  },
  th: {
    title: "SæsaL - การรักษาเลเซอร์ลบรอยสักแบบปฏิวัติ | ปลอดภัยและธรรมชาติ",
    description: "SæsaL นำเสนอการลบรอยสักแบบปฏิวัติในเพียง 4 เซสชัน 100% ธรรมชาติ ปลอดภัย และได้ผลกับทุกสี ไม่มีแผลเป็น ไม่เจ็บ ทางเลือกแทนการรักษาด้วยเลเซอร์",
    keywords: "ลบรอยสัก, saesal, ลบรอยสักธรรมชาติ, ทางเลือกแทนเลเซอร์, การรักษาลบรอยสัก, ลบรอยสักปลอดภัย, ลบหมึกรอยสัก",
    ogTitle: "SæsaL - การรักษาเลเซอร์ลบรอยสักแบบปฏิวัติ",
    ogDescription: "การลบรอยสักแบบปฏิวัติในเพียง 4 เซสชัน 100% ธรรมชาติ ปลอดภัย และได้ผลกับทุกสี"
  },
  vi: {
    title: "SæsaL - Phương Pháp Xóa Xăm Cách Mạng | An Toàn & Tự Nhiên",
    description: "SæsaL cung cấp phương pháp xóa xăm cách mạng chỉ trong 4 phiên. 100% tự nhiên, an toàn, hiệu quả với mọi màu sắc. Không sẹo bỏng, không đau. Thay thế cho điều trị laser.",
    keywords: "xóa xăm, saesal, xóa xăm tự nhiên, thay thế laser, điều trị xóa xăm, xóa xăm an toàn, loại bỏ mực xăm",
    ogTitle: "SæsaL - Phương Pháp Xóa Xăm Cách Mạng",
    ogDescription: "Phương pháp xóa xăm cách mạng chỉ trong 4 phiên. 100% tự nhiên, an toàn, hiệu quả với mọi màu sắc."
  },
  es: {
    title: "SæsaL - Tratamiento Revolucionario para Eliminar Tatuajes | Seguro y Natural",
    description: "SæsaL ofrece eliminación revolucionaria de tatuajes en solo 4 sesiones. 100% natural, seguro y funciona en todos los colores. Sin cicatrices de quemaduras, sin dolor. Alternativa al tratamiento láser.",
    keywords: "eliminación de tatuajes, saesal, eliminación natural de tatuajes, alternativa láser, tratamiento eliminación tatuajes, eliminación segura tatuajes, eliminación tinta tatuajes",
    ogTitle: "SæsaL - Tratamiento Revolucionario para Eliminar Tatuajes",
    ogDescription: "Eliminación revolucionaria de tatuajes en solo 4 sesiones. 100% natural, seguro y funciona en todos los colores."
  },
  sv: {
    title: "SæsaL - Revolutionerande Tatueringsborttagning | Säker & Naturlig",
    description: "SæsaL erbjuder revolutionerande tatueringsborttagning på bara 4 sessioner. 100% naturlig, säker och fungerar på alla färger. Inga brännskador, ingen smärta. Alternativ till laserbehandling.",
    keywords: "tatueringsborttagning, saesal, naturlig tatueringsborttagning, laseralternativ, tatueringsborttagningsbehandling, säker tatueringsborttagning, tatueringsbläck borttagning",
    ogTitle: "SæsaL - Revolutionerande Tatueringsborttagning",
    ogDescription: "Revolutionerande tatueringsborttagning på bara 4 sessioner. 100% naturlig, säker och fungerar på alla färger."
  },
  de: {
    title: "SæsaL - Revolutionäre Tattoo-Entfernung | Sicher & Natürlich",
    description: "SæsaL bietet revolutionäre Tattoo-Entfernung in nur 4 Sitzungen. 100% natürlich, sicher und wirkt bei allen Farben. Keine Verbrennungsnarben, keine Schmerzen. Alternative zur Laserbehandlung.",
    keywords: "tattoo entfernung, saesal, natürliche tattoo entfernung, laser alternative, tattoo entfernung behandlung, sichere tattoo entfernung, tattoo tinte entfernung",
    ogTitle: "SæsaL - Revolutionäre Tattoo-Entfernung",
    ogDescription: "Revolutionäre Tattoo-Entfernung in nur 4 Sitzungen. 100% natürlich, sicher und wirkt bei allen Farben."
  }
};

// 언어별 hreflang 매핑
const hreflangMap: Record<string, string> = {
  'en': 'en',
  'ko': 'ko',
  'ja': 'ja',
  'zh': 'zh-CN',
  'zh-tw': 'zh-TW',
  'th': 'th',
  'vi': 'vi',
  'es': 'es',
  'sv': 'sv',
  'de': 'de'
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale || 'en';
  const metadata = localeMetadata[locale] || localeMetadata.en;

  // 다른 언어 버전의 alternate URLs 생성
  const languages: Record<string, string> = {};
  locales.forEach(loc => {
    const pathMap: Record<string, string> = {
      'en': 'en',
      'ko': 'kr',
      'ja': 'jp',
      'zh': 'cn',
      'zh-tw': 'tw',
      'th': 'th',
      'vi': 'vn',
      'es': 'es',
      'sv': 'se',
      'de': 'de'
    };

    languages[hreflangMap[loc]] = `https://saesal.hqmx.net/${pathMap[loc]}`;
  });

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    authors: [{ name: "SæsaL" }],
    creator: "SæsaL",
    publisher: "SæsaL",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://saesal.hqmx.net'),
    alternates: {
      canonical: `https://saesal.hqmx.net/${locale === 'en' ? 'en' : (locale === 'ko' ? 'kr' : (locale === 'ja' ? 'jp' : locale))}`,
      languages,
    },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      url: `https://saesal.hqmx.net/${locale === 'en' ? 'en' : (locale === 'ko' ? 'kr' : (locale === 'ja' ? 'jp' : locale))}`,
      siteName: 'SæsaL',
      images: [
        {
          url: 'https://saesal.hqmx.net/solution.png',
          width: 1200,
          height: 630,
          alt: 'SæsaL - Revolutionary Tattoo Removal',
        }
      ],
      locale: hreflangMap[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: ['https://saesal.hqmx.net/solution.png'],
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
  };
}

export default function LocaleLayout({
  children,
  params,
}: Props) {
  return (
    <html lang={hreflangMap[params.locale] || 'en'}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "SæsaL",
              "description": localeMetadata[params.locale]?.description || localeMetadata.en.description,
              "url": `https://saesal.hqmx.net`,
              "logo": "https://saesal.hqmx.net/logo.png",
              "image": "https://saesal.hqmx.net/solution.png",
              "medicalSpecialty": "Dermatology",
              "serviceType": "Tattoo Removal",
              "areaServed": "Global",
              "availableLanguage": locales.map(loc => hreflangMap[loc]),
              "offers": {
                "@type": "Offer",
                "description": "Revolutionary 4-session tattoo removal treatment",
                "category": "Medical Treatment"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider initialLocale={params.locale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}