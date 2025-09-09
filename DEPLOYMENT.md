# SæsaL Deployment Guide

## 배포 직전 체크리스트 ✅

### 1. 환경변수 설정
배포 플랫폼(Vercel, Netlify 등)에서 다음 환경변수들을 설정하세요:

```bash
# Supabase 설정 (필수)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# 이메일 설정 (상담 폼 작동을 위해 필수)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
TO_EMAIL=consultation_recipient_email

# 프로덕션 환경
NODE_ENV=production
```

### 2. Supabase 데이터베이스 테이블 생성
```sql
CREATE TABLE consultations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Gmail SMTP 설정
1. Gmail 계정에서 2단계 인증 활성화
2. 앱 비밀번호 생성
3. 생성된 앱 비밀번호를 EMAIL_PASS에 설정

### 4. 빌드 확인
```bash
npm run build
```

## 배포 플랫폼별 설정

### Vercel 배포
1. GitHub 저장소에 코드 푸시
2. Vercel에서 프로젝트 import
3. Environment Variables에서 환경변수 설정
4. Deploy 버튼 클릭

### Netlify 배포
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Node version: 18 이상
4. Environment variables 설정

## 성능 최적화

### 이미 적용된 최적화
- ✅ Next.js 15 + Turbopack
- ✅ 이미지 최적화 (WebP/AVIF 지원)
- ✅ 코드 분할 및 번들 최적화
- ✅ 폰트 최적화 (Pretendard 한글, Montserrat 영문)
- ✅ 동적 import를 통한 lazy loading
- ✅ 압축 설정 활성화

### 번들 크기 최적화
- First Load JS: 136 kB (양호한 수준)
- 주요 페이지: 184 kB total
- 정적 생성된 페이지들

## 도메인 및 DNS 설정

### 커스텀 도메인 연결 시
1. 배포 플랫폼에서 도메인 추가
2. DNS 설정에서 CNAME 레코드 추가
3. SSL 인증서 자동 설정 확인

## 모니터링 및 유지보수

### 정기 점검 항목
- [ ] 상담 폼 작동 확인
- [ ] 이미지 로딩 속도
- [ ] 모바일 반응형 확인
- [ ] 9개 언어 번역 작동
- [ ] Core Web Vitals 성능 지표

### 로그 모니터링
- Supabase 대시보드에서 데이터베이스 상태 확인
- 이메일 전송 성공률 모니터링
- Next.js 런타임 에러 추적

## 문제 해결

### 상담 폼이 작동하지 않는 경우
1. 환경변수 설정 확인
2. Gmail SMTP 설정 확인
3. Supabase 연결 상태 확인

### 이미지가 로드되지 않는 경우
1. public 폴더 경로 확인
2. Next.js Image 최적화 설정 확인

## 보안 고려사항

### 이미 적용된 보안 조치
- ✅ 환경변수를 통한 민감 정보 관리
- ✅ CSP 헤더 설정 (이미지 최적화용)
- ✅ API route 에러 처리
- ✅ 사용자 입력 검증

---

**배포 준비 완료 ✅**  
모든 최적화와 보안 설정이 완료되었습니다. 위 가이드를 따라 환경변수만 설정하면 즉시 배포 가능합니다.