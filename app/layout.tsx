import type { Metadata } from "next";

import { siteConfig } from "@/site.config";
import "./globals.css";

/* 모든 페이지를 감싸는 가장 바깥 틀. 보통은 수정할 일이 거의 없습니다.
   다크 모드로 시작하고 싶으면 <html> 의 className 에 "dark" 를 추가하세요. */
export const metadata: Metadata = {
  metadataBase: new URL("https://mysite01-sepia.vercel.app"),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "금란지교",
    "실무 꿀템",
    "1인 셀러 꿀템",
    "추천 꿀템 TOP 3",
    "네이버 블로그",
    "최저가 링크",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
