import { sampleItems, siteConfig } from "@/site.config";
import { getPublicClient } from "@/lib/supabase";
import type { Item } from "@/lib/types";

/**
 * 특정 섹션의 카드 목록을 가져옵니다.
 * - Supabase가 연결 안 됐으면: site.config.ts 의 예시 카드를 보여줌
 * - 연결됐으면: 데이터베이스에서 '보이기'로 설정된 카드만 순서대로 가져옴
 */
export async function getItems(section: string): Promise<Item[]> {
  const supabase = getPublicClient();
  const samples = sampleItems.filter((item) => item.section === section);
  if (!supabase) return samples;

  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("section", section)
    .eq("is_visible", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getItems] Supabase 읽기 실패:", error.message);
    return samples;
  }
  return (data ?? []) as Item[];
}

/** 첫 화면(히어로)에서 관리자 페이지로 바꿀 수 있는 글자 칸 */
export const HERO_TEXT_FIELDS = [
  { key: "hero.eyebrow", label: "제목 위 작은 글자" },
  { key: "hero.title", label: "큰 제목 (줄바꿈 가능)" },
  { key: "hero.description", label: "설명" },
  { key: "hero.primaryCta", label: "첫 번째 버튼 글자" },
  { key: "hero.secondaryCta", label: "두 번째 버튼 글자" },
] as const;

export type HeroText = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

/**
 * 첫 화면(히어로) 글자를 가져옵니다.
 * - 관리자 페이지에서 바꾼 글자가 있으면 그 글자를,
 * - 없거나 Supabase가 연결 안 됐으면 site.config.ts 의 글자를 씁니다.
 */
export async function getHeroText(): Promise<HeroText> {
  const { hero } = siteConfig;
  const fallback: HeroText = {
    eyebrow: hero.eyebrow,
    title: hero.title,
    description: hero.description,
    primaryCta: { ...hero.primaryCta },
    secondaryCta: { ...hero.secondaryCta },
  };

  const supabase = getPublicClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("site_texts")
    .select("key, value")
    .like("key", "hero.%");

  if (error) {
    console.error("[getHeroText] Supabase 읽기 실패:", error.message);
    return fallback;
  }

  const saved = new Map((data ?? []).map((row) => [row.key as string, row.value as string]));
  return {
    eyebrow: saved.get("hero.eyebrow") ?? fallback.eyebrow,
    title: saved.get("hero.title") ?? fallback.title,
    description: saved.get("hero.description") ?? fallback.description,
    primaryCta: { ...fallback.primaryCta, label: saved.get("hero.primaryCta") ?? fallback.primaryCta.label },
    secondaryCta: {
      ...fallback.secondaryCta,
      label: saved.get("hero.secondaryCta") ?? fallback.secondaryCta.label,
    },
  };
}
