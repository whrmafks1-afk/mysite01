"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

/** 상단 메뉴. 메뉴 항목은 site.config.ts 의 nav 에서 바꿉니다. 모바일에서는 햄버거 버튼으로 열림. */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label={siteConfig.name}>
          <Logo />
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden items-center gap-12 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base font-semibold text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.navButton.href}
            className="inline-flex h-12 items-center gap-1.5 rounded-xl bg-foreground px-6 text-base font-semibold text-background transition-opacity hover:opacity-90"
          >
            {siteConfig.navButton.label}
            <ArrowUpRight className="size-4" />
          </a>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* 모바일 메뉴 펼침 */}
      <nav className={cn("border-t border-border/60 md:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col py-2">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-medium text-foreground hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.navButton.href}
            onClick={() => setOpen(false)}
            className="py-3 text-base font-semibold text-primary"
          >
            {siteConfig.navButton.label}
          </a>
        </Container>
      </nav>
    </header>
  );
}
