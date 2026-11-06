import Image from "next/image";
import { ArrowUpRight, Command, Sparkle, Target } from "lucide-react";

import { siteConfig } from "@/site.config";
import { getItems } from "@/lib/data";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 카드 왼쪽 위 아이콘 (카드 순서대로 돌아가며 사용) */
const ICONS = [Sparkle, Command, Target];

/* 서비스 섹션.
   - 제목/설명: site.config.ts 의 features
   - 카드 목록: 관리자 페이지(/admin)에서 관리 (Supabase 연결 전에는 예시 카드가 보임) */
export async function Features() {
  const { features } = siteConfig;
  const items = await getItems("features");

  return (
    <section id="features" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeader
          layout="split"
          eyebrow={features.eyebrow}
          title={features.title}
          description={features.description}
        />

        {items.length === 0 ? (
          <p className="mt-16 text-muted-foreground">아직 등록된 항목이 없습니다.</p>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              const card = (
                <article className="group h-full rounded-3xl border bg-card p-8 transition-shadow hover:shadow-xl hover:shadow-primary/5 sm:p-10">
                  {item.image_url ? (
                    <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="mb-12 inline-flex size-16 items-center justify-center rounded-2xl bg-accent text-primary">
                      <Icon className="size-7" strokeWidth={1.5} />
                    </div>
                  )}
                  <h3 className="flex items-center justify-between gap-2 text-2xl font-bold tracking-tight">
                    {item.title}
                    {item.link_url ? (
                      <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    ) : null}
                  </h3>
                  {item.description ? (
                    <p className="mt-4 leading-loose text-muted-foreground">{item.description}</p>
                  ) : null}
                </article>
              );

              return item.link_url ? (
                <a key={item.id} href={item.link_url} target="_blank" rel="noreferrer">
                  {card}
                </a>
              ) : (
                <div key={item.id}>{card}</div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
