# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SæsaL** is a Next.js 15 application for a tattoo removal service company. It's built as a landing page with multiple sections showcasing the SæsaL treatment method as an alternative to laser tattoo removal.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production with Turbopack  
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Tech Stack & Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS  
- **TypeScript**: Strict mode enabled
- **Build Tool**: Turbopack (Next.js native bundler)
- **Database**: Supabase (PostgreSQL)
- **Email Service**: Nodemailer with Gmail SMTP
- **Animations**: Framer Motion
- **Internationalization**: Custom i18n system with 9 languages

## Project Structure

```
src/
├── app/           # Next.js App Router pages
│   ├── api/       # API routes (consultation form handler)
│   └── demo3/     # Additional demo page
├── components/    # React components (sections + animations)
├── contexts/      # React Context providers (LanguageContext)
├── hooks/         # Custom React hooks  
├── data/          # Static data (countries, locations)
├── lib/           # Utility libraries (translations, supabase)
└── locales/       # Translation files (9 languages: en, ko, ja, zh, th, vi, es, sv, de)
```

## Key Architecture Patterns

### Configuration-Driven Components
The main page (`src/app/page.tsx`) uses a centralized configuration object (`siteConfig`) that defines:
- Theme colors and typography
- Layout specifications
- Content for all sections (hero, about, comparison, process, safety, contact)

This pattern allows for easy content management without touching component code.

### Component Organization
All sections are React components that receive the `siteConfig` as props:
- `HeroSection` - Main value proposition
- `AboutSection` - What is SæsaL explanation  
- `ComparisonSection` - Laser vs SæsaL treatment comparison
- `ProcessSection` - How the treatment works
- `SafetySection` - Safety assurances
- `ContactSection` - Application form for consultations

### Styling Approach
- Tailwind CSS classes for styling
- Dynamic styling via `siteConfig` theme object
- Responsive design with mobile-first approach
- Korean/English bilingual content

### Internationalization System
The project implements a custom i18n system through:
- **LanguageContext**: React context providing language state and translation function
- **Translation Files**: JSON files in `/src/locales/` for 9 languages (en, ko, ja, zh, th, vi, es, sv, de)
- **Language Detection**: Automatic browser language detection with localStorage persistence
- **Translation Function**: `t(key)` function with fallback to English

### Custom Hooks
- `useActiveSection` - Tracks which section is currently in view for navigation highlighting
- `useLanguage` - Provides translation functions and language state from LanguageContext

## Font Configuration

### Typography Settings
The project uses a multi-language font system configured through `siteConfig.theme.typography.fontFamily`:

- **Primary Font**: `'Montserrat', 'Pretendard', system-ui, sans-serif`
  - Montserrat: English content (영문 내용) - Default
  - Pretendard: Korean content (한글 내용) - Modern Korean typeface
  
- **Heading Font**: `'Montserrat', 'Pretendard', system-ui, sans-serif`
  - Montserrat: English headings (영문 제목)
  - Pretendard: Korean headings (한글 제목)

### Font Implementation
- **Korean Font**: Pretendard loaded via CDN in `globals.css`
  - All weights (100, 200, 300, 400, 500, 600, 700, 800, 900)
  - Source: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/web/static/woff/`
  - Modern Korean typeface with better readability

- **English Fonts**: Montserrat via Google Fonts
  - All English content (300, 400, 500, 600, 700, 800 weights)
  
### Font Fallback Chain
```css
/* All Text (Body & Headings) */
font-family: var(--font-montserrat), 'Pretendard', system-ui, sans-serif;

/* Font Selection Logic */  
- English text: Uses Montserrat (first in fallback chain)
- Korean text: Uses Pretendard (loaded via @font-face)
- Other text: Falls back to system fonts
```

## TypeScript Configuration
- Path aliases: `@/*` maps to `./src/*`
- Strict mode enabled
- Next.js plugin configured for optimal development experience

## API Routes & Database

### Consultation API (`/api/consultation`)
- **Purpose**: Handles contact form submissions with file uploads
- **Database**: Stores submissions in Supabase `consultations` table
- **Email**: Sends notifications via Nodemailer/Gmail with image attachments
- **File Handling**: Processes multiple tattoo image uploads via FormData

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
EMAIL_USER=your_gmail_address  
EMAIL_PASS=your_gmail_app_password
TO_EMAIL=consultation_recipient_email
```

## Important Notes
- Uses Turbopack for both development and production builds
- ESLint configured with Next.js recommended rules
- No testing framework currently configured
- Static assets stored in `/public` directory
- Form submissions require Supabase database setup with `consultations` table
- Email functionality requires Gmail SMTP configuration