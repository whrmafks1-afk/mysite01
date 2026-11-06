import { Sparkle } from "lucide-react";

import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

/** 로고 (보라 네모 아이콘 + 사이트 이름). 상단 메뉴와 푸터에서 같이 씁니다. 이름은 site.config.ts 의 name. */
export function Logo({ className, small = false }: { className?: string; small?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-bold tracking-tight",
        small ? "text-lg" : "text-xl sm:text-2xl",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center bg-primary text-primary-foreground",
          small ? "size-9 rounded-lg" : "size-10 rounded-xl sm:size-12"
        )}
      >
        <Sparkle className={cn("fill-current", small ? "size-4" : "size-5")} />
      </span>
      {siteConfig.name}
    </span>
  );
}
