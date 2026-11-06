import { ArrowUpRight, Asterisk, Sparkle } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 카드 위쪽 색 칸의 배경색·아이콘 (카드 순서대로 돌아가며 사용).
   색은 app/globals.css 의 --tint-1 ~ --tint-3 에서 바꿉니다. */
const STYLES = [
  { Icon: Asterisk, className: "bg-tint-1 text-tint-1-foreground" },
  { Icon: ArrowUpRight, className: "bg-tint-2 text-tint-2-foreground" },
  { Icon: Sparkle, className: "bg-tint-3 text-tint-3-foreground" },
];

/** 프로젝트 섹션. 글자는 site.config.ts 의 projects 에서 바꿉니다. */
export function Projects() {
  const { projects } = siteConfig;

  return (
    <section id="projects" className="scroll-mt-20 bg-secondary py-24 sm:py-32">
      <Container>
        <SectionHeader
          layout="split"
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.description}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((item, i) => {
            const { Icon, className } = STYLES[i % STYLES.length];
            return (
              <article key={item.title} className="overflow-hidden rounded-3xl border bg-card">
                <div className={`flex aspect-[7/5] items-center justify-center ${className}`}>
                  <Icon className="size-16" strokeWidth={1.25} />
                </div>
                <div className="p-8 sm:p-10">
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                    {item.tag}
                  </p>
                  <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
