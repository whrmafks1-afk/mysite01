import { cn } from "@/lib/utils";

/** 섹션 위쪽의 작은 영문 라벨 + 제목 + 설명. 모든 섹션이 같은 모양을 쓰도록 한 곳에 모아 둠.
    - layout="split" : 제목은 왼쪽, 설명은 오른쪽 (넓은 화면에서)
    - dark           : 어두운 배경 위에 놓일 때 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  layout = "stack",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  layout?: "stack" | "split";
  dark?: boolean;
}) {
  const desc = description ? (
    <p
      className={cn(
        "whitespace-pre-line text-base leading-relaxed sm:text-lg",
        dark ? "text-background/70" : "text-muted-foreground",
        layout === "split" ? "max-w-md md:pb-2" : "mt-5"
      )}
    >
      {description}
    </p>
  ) : null;

  const heading = (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.15em]",
            dark ? "text-highlight" : "text-primary"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-4 whitespace-pre-line text-3xl font-bold leading-tight tracking-tighter sm:text-5xl",
          dark ? "text-background" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {layout === "stack" ? desc : null}
    </div>
  );

  if (layout === "split") {
    return (
      <div
        className={cn(
          "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
          className
        )}
      >
        {heading}
        {desc}
      </div>
    );
  }

  return <div className={className}>{heading}</div>;
}
