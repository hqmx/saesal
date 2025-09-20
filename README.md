This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


# 1. 프로젝트 디렉토리로 이동
  cd saesal

  # 2. 최신 변경사항 가져오기
  git pull origin main

  # 3. 의존성 설치 (필요한 경우)
  npm install

  # 4. 프로덕션 빌드
  npm run build

  # 5. PM2로 애플리케이션 재시작 (또는 처음 시작)
  pm2 restart saesal
  # 또는 처음이라면
  pm2 start npm --name "saesal" -- start

  # 6. PM2 상태 확인
  pm2 status

  # 7. 로그 확인 (문제가 있다면)
  pm2 logs saesal

-프론트앤드변경시.
git pull origin main
  npm run build
  pm2 restart saesal


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
