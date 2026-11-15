import { ArrowRight, ArrowUpRight, Asterisk, Sparkle } from "lucide-react";

import { siteConfig } from "@/site.config";
import { getHeroText } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/* 첫 화면(히어로).
   - 글자는 관리자 페이지(/admin)에서 바꿀 수 있고, 바꾸지 않은 글자는 site.config.ts 의 hero 를 씁니다.
   - 큰 제목의 마지막 줄은 보라색(primary)으로 보입니다.
   - 첫 번째 버튼은 언제나 네이버 블로그(추천 꿀템·최저가)로 갑니다. 주소는 site.config.ts 의 links.blog.
   - 오른쪽 구슬 위 작은 카드 글자는 site.config.ts 의 hero.floatingCards 에서 바꿉니다. */
export async function Hero() {
  const hero = await getHeroText();
  const { floatingCards, quickLinksLabel } = siteConfig.hero;
  const { links } = siteConfig;

  const lines = hero.title.split("\n");
  const head = lines.length > 1 ? lines.slice(0, -1).join("\n") : hero.title;
  const accent = lines.length > 1 ? lines[lines.length - 1] : null;

  /* 히어로 아래에 작게 놓는 다른 채널들 (블로그는 위 큰 버튼이 담당) */
  const quickLinks = [
    { label: "유튜브 쇼츠", href: links.youtube },
    { label: "인스타그램", href: links.instagram },
    { label: "스레드", href: links.threads },
    { label: "틱톡", href: links.tiktok },
    { label: "스마트스토어", href: links.smartstore },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-secondary to-background"
    >
      <Container className="grid min-h-[calc(100svh-5rem)] items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
        {/* 왼쪽: 글자 */}
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-primary/15 bg-accent px-5 py-2.5 text-sm font-semibold tracking-wide text-primary">
            <span className="size-2 rounded-full bg-primary" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-8 whitespace-pre-line text-4xl font-bold leading-[1.2] tracking-tighter sm:text-6xl">
            {head}
            {accent ? <span className="block text-primary">{accent}</span> : null}
          </h1>
          <p className="mt-8 max-w-xl whitespace-pre-line text-lg leading-loose text-muted-foreground sm:text-xl">
            {hero.description}
          </p>

          {/* 1순위 버튼: 네이버 블로그 (추천 꿀템 · 최저가) */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-16 rounded-xl px-8 text-lg shadow-lg shadow-primary/20">
              <a href={siteConfig.hero.primaryCta.href} target="_blank" rel="noreferrer">
                {siteConfig.hero.primaryCta.label}
                <ArrowRight className="size-5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 rounded-xl px-8 text-base"
            >
              <a href={siteConfig.hero.secondaryCta.href} target="_blank" rel="noreferrer">
                {siteConfig.hero.secondaryCta.label}
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            네이버 블로그에서 제품 사용기와 최저가 링크를 바로 확인할 수 있습니다.
          </p>

          {/* 다른 채널 바로가기 */}
          <div className="mt-8 border-t border-border/70 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {quickLinksLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-foreground/75 transition-colors hover:text-primary"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 보라 구슬 + 궤도 장식 */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
          <div
            className="absolute inset-[12%] rounded-full shadow-2xl shadow-primary/30"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, var(--accent) 0%, color-mix(in oklab, var(--primary) 70%, var(--accent)) 30%, var(--primary) 62%, color-mix(in oklab, var(--primary), var(--foreground) 35%) 100%)",
            }}
          />
          <div className="absolute inset-x-[-6%] top-[30%] h-[40%] -rotate-12 rounded-[50%] border border-primary/35" />
          <div className="absolute inset-x-[2%] top-[22%] h-[56%] rotate-[24deg] rounded-[50%] border border-primary/25" />
          <Asterisk className="absolute right-[6%] top-[2%] size-10 text-primary/60" strokeWidth={1.25} />

          {floatingCards[0] ? (
            <div className="absolute left-[10%] top-[44%] rounded-2xl bg-background/90 px-5 py-4 shadow-xl shadow-primary/10 backdrop-blur sm:px-7 sm:py-5">
              <p className="text-xs text-muted-foreground sm:text-sm">{floatingCards[0].caption}</p>
              <p className="mt-1.5 flex items-center gap-2 text-sm font-bold sm:text-lg">
                <Sparkle className="size-4 fill-current" />
                {floatingCards[0].label}
              </p>
            </div>
          ) : null}
          {floatingCards[1] ? (
            <div className="absolute bottom-[4%] right-0 rounded-2xl bg-background/90 px-5 py-4 shadow-xl shadow-primary/10 backdrop-blur sm:px-7 sm:py-5">
              <p className="text-xs text-muted-foreground sm:text-sm">{floatingCards[1].caption}</p>
              <p className="mt-1.5 flex items-center gap-2 text-sm font-bold sm:text-lg">
                <Sparkle className="size-4 fill-current text-primary" />
                {floatingCards[1].label}
              </p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
