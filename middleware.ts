import { NextRequest, NextResponse } from 'next/server';

// 지원하는 언어 목록
export const locales = ['en', 'ko', 'ja', 'zh', 'zh-tw', 'th', 'vi', 'es', 'sv', 'de'];
export const defaultLocale = 'en';

// 언어 코드를 URL 경로로 매핑
const localeMap: Record<string, string> = {
  'en': 'en',     // 영어
  'ko': 'kr',     // 한국어 -> /kr
  'ja': 'jp',     // 일본어 -> /jp
  'zh': 'cn',     // 중국어 간체 -> /cn
  'zh-tw': 'tw',  // 중국어 번체 -> /tw
  'th': 'th',     // 태국어 -> /th
  'vi': 'vn',     // 베트남어 -> /vn
  'es': 'es',     // 스페인어 -> /es
  'sv': 'se',     // 스웨덴어 -> /se
  'de': 'de',     // 독일어 -> /de
};

// URL 경로를 언어 코드로 역매핑
const pathToLocale: Record<string, string> = Object.fromEntries(
  Object.entries(localeMap).map(([locale, path]) => [path, locale])
);

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && pathToLocale[firstSegment]) {
    return pathToLocale[firstSegment];
  }

  return null;
}

function detectLocaleFromHeaders(request: NextRequest): string {
  // Accept-Language 헤더에서 언어 감지
  const acceptLanguage = request.headers.get('accept-language') || '';

  // 브라우저에서 선호하는 언어들을 파싱
  const preferredLanguages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())
    .filter(Boolean);

  // 지원하는 언어 중에서 매칭되는 첫 번째 언어 찾기
  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) {
      return lang;
    }

    // 언어-지역 코드에서 언어만 추출 (예: en-US -> en)
    const langOnly = lang.split('-')[0];
    if (locales.includes(langOnly)) {
      return langOnly;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트, 정적 파일들은 제외
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_static/') ||
    pathname.includes('.') || // 파일 확장자가 있는 경우
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // 현재 경로에서 언어 추출
  const localeFromPath = getLocaleFromPath(pathname);

  if (localeFromPath) {
    // 이미 언어 경로가 포함된 경우, 해당 언어로 내부 리라이팅
    const pathWithoutLocale = pathname.replace(`/${localeMap[localeFromPath]}`, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = `/${localeFromPath}${pathWithoutLocale}`;
    return NextResponse.rewrite(url);
  }

  // 루트 경로 또는 언어 경로가 없는 경우만 리다이렉트
  if (pathname === '/' || (!pathname.startsWith('/en') && !pathname.startsWith('/ko') && !pathname.startsWith('/ja'))) {
    const detectedLocale = detectLocaleFromHeaders(request);
    const redirectPath = localeMap[detectedLocale];

    const url = request.nextUrl.clone();
    url.pathname = `/${redirectPath}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url, 307); // 307 임시 리다이렉트로 변경
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 모든 경로를 매칭하되 제외할 것들을 명시
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};