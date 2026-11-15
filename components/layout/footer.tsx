import Link from "next/link";
import { ArrowUp } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";

/** 맨 아래 영역. "맨 위로" 옆의 작은 점(•)이 관리자 페이지로 가는 숨은 버튼입니다. */
export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/70 py-14">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Logo className="text-foreground" />
            <p className="mt-5 text-sm font-semibold text-foreground">
              {siteConfig.footer.brandLine}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {siteConfig.footer.disclosure}
            </p>
          </div>

          {/* 채널 바로가기 */}
          <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3">
            {siteConfig.channels.items.map((channel) => (
              <a
                key={channel.href}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {channel.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p className="uppercase tracking-[0.15em]">{siteConfig.footer.copyright}</p>
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
        </div>
      </Container>
    </footer>
  );
}
