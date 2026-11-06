import { ArrowRight, Asterisk, Sparkle } from "lucide-react";

import { siteConfig } from "@/site.config";
import { getHeroText } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/* 첫 화면(히어로).
   - 글자는 관리자 페이지(/admin)에서 바꿀 수 있고, 바꾸지 않은 글자는 site.config.ts 의 hero 를 씁니다.
   - 큰 제목의 마지막 줄은 보라색(primary)으로 보입니다.
   - 오른쪽 구슬 위 작은 카드 글자는 site.config.ts 의 hero.floatingCards 에서 바꿉니다. */
export async function Hero() {
  const hero = await getHeroText();
  const cards = siteConfig.hero.floatingCards;

  const lines = hero.title.split("\n");
  const head = lines.length > 1 ? lines.slice(0, -1).join("\n") : hero.title;
  const accent = lines.length > 1 ? lines[lines.length - 1] : null;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-secondary to-background"
    >
      <Container className="grid min-h-[calc(100svh-5rem)] items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
        {/* 왼쪽: 글자 */}
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-primary/15 bg-accent px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary">
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
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-14 rounded-xl px-8">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 rounded-xl px-8">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
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

          {cards[0] ? (
            <div className="absolute left-[18%] top-[48%] rounded-2xl bg-background/90 px-5 py-4 shadow-xl shadow-primary/10 backdrop-blur sm:px-7 sm:py-5">
              <p className="text-xs text-muted-foreground sm:text-sm">{cards[0].caption}</p>
              <p className="mt-1.5 flex items-center gap-2 text-sm font-bold sm:text-lg">
                <Sparkle className="size-4 fill-current" />
                {cards[0].label}
              </p>
            </div>
          ) : null}
          {cards[1] ? (
            <div className="absolute bottom-[4%] right-0 rounded-2xl bg-background/90 px-5 py-4 shadow-xl shadow-primary/10 backdrop-blur sm:px-7 sm:py-5">
              <p className="text-xs text-muted-foreground sm:text-sm">{cards[1].caption}</p>
              <p className="mt-1.5 flex items-center gap-2 text-sm font-bold sm:text-lg">
                <Sparkle className="size-4 fill-current text-primary" />
                {cards[1].label}
              </p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
