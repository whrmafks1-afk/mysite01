import {
  ArrowUpRight,
  AtSign,
  BookOpenText,
  Camera,
  Music2,
  Play,
  ShoppingBag,
} from "lucide-react";

import { siteConfig, type ChannelKey } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/* 채널마다 다른 아이콘. site.config.ts 의 channels.items[].key 값과 짝을 이룹니다. */
const ICONS: Record<ChannelKey, typeof BookOpenText> = {
  blog: BookOpenText,
  youtube: Play,
  instagram: Camera,
  threads: AtSign,
  tiktok: Music2,
  smartstore: ShoppingBag,
};

/** 공식 채널 목록. 카드를 누르면 그 채널로 바로 이동합니다. (블로그가 메인) */
export function Channels() {
  const { channels } = siteConfig;

  return (
    <section id="channels" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <SectionHeader
          layout="split"
          eyebrow={channels.eyebrow}
          title={channels.title}
          description={channels.description}
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.items.map((channel) => {
            const Icon = ICONS[channel.key];
            const featured = channel.featured;

            return (
              <a
                key={channel.href}
                href={channel.href}
                target="_blank"
                rel="noreferrer"
                className={`group flex items-start gap-4 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 sm:p-6 ${
                  featured ? "border-primary/30 ring-1 ring-primary/10" : "hover:border-primary/20"
                }`}
              >
                <span
                  className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${
                    featured ? "bg-primary text-primary-foreground" : "bg-accent text-primary"
                  }`}
                >
                  <Icon className="size-6" strokeWidth={1.75} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-bold tracking-tight">{channel.name}</span>
                    {featured ? (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        메인
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {channel.handle}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                    {channel.description}
                  </span>
                </span>

                <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
