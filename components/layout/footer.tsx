import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";

/** 맨 아래 영역. "맨 위로" 옆의 작은 점(•)이 관리자 페이지로 가는 숨은 버튼입니다. */
export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center justify-between gap-5 text-sm text-muted-foreground sm:flex-row">
        <Logo small className="text-foreground" />
        <p className="uppercase">{siteConfig.footer.copyright}</p>
        <div className="flex items-center gap-4">
          <a href="#top" className="inline-flex items-center gap-1 hover:text-foreground">
            {siteConfig.footer.backToTop}
            <ArrowUp className="size-4" />
          </a>
          {/* 숨은 관리자 버튼 */}
          <Link
            href="/admin"
            aria-label="관리자"
            className="opacity-30 transition-opacity hover:opacity-100"
          >
            •
          </Link>
        </div>
      </Container>
    </footer>
  );
}
