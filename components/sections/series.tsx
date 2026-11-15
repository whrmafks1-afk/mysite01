import { ArrowUpRight, Check } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 카드 위 번호 칸의 색 (카드 순서대로 돌아가며 사용). 색은 app/globals.css 의 --tint-* 에서 바꿉니다. */
const TINTS = [
  "bg-tint-1 text-tint-1-foreground",
  "bg-tint-2 text-tint-2-foreground",
  "bg-tint-3 text-tint-3-foreground",
];

/** 인기 실무 꿀템 시리즈. 카드를 누르면 그 꿀템을 정리한 블로그 글로 이동합니다. */
export function Series() {
  const { series } = siteConfig;

  return (
    <section id="series" className="scroll-mt-20 bg-secondary py-24 sm:py-32">
      <Container>
        <SectionHeader
          layout="split"
          eyebrow={series.eyebrow}
          title={series.title}
          description={series.description}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {series.items.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-3xl border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                    {item.tag}
                  </p>
                  <h3 className="mt-3 text-balance text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
                <span
                  className={`inline-flex size-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${
                    TINTS[i % TINTS.length]
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-6 space-y-2.5">
                {item.items.map((name) => (
                  <li key={name} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-primary">
                블로그에서 사용기·최저가 보기
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}

          {/* 마지막 칸: 블로그 전체 글 보기 안내 */}
          <a
            href={siteConfig.links.blog}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col justify-between rounded-3xl bg-foreground p-7 text-background transition-transform hover:-translate-y-1 sm:p-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-highlight">
                All Posts
              </p>
              <h3 className="mt-3 text-balance text-xl font-bold leading-snug tracking-tight sm:text-2xl">
                꿀템 시리즈
                <br />
                전체 글 보기
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-background/70">
                지금까지 정리한 실무 꿀템 글을 블로그에서 한 번에 볼 수 있습니다.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-background">
              네이버 블로그 열기
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </div>

        <p className="mt-10 rounded-2xl border border-border bg-card px-6 py-5 text-sm leading-relaxed text-muted-foreground">
          {series.note}
        </p>
      </Container>
    </section>
  );
}
