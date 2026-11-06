import { MoveHorizontal } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";

/* 맨 위 인트로 장면.
   - 글자는 site.config.ts 의 intro 에서 바꿉니다. (큰 회전 글자 = intro.word)
   - 색은 app/globals.css 의 --rainbow-*, --gold*, --globe* 에서 바꿉니다.
   - 회전 속도: 아래 SPIN_SECONDS (숫자가 클수록 천천히) */
const SPIN_SECONDS = 22;
/* 글자 두께감(입체)을 만드는 뒤쪽 겹 수 */
const DEPTH_LAYERS = 12;

const RAINBOW =
  "linear-gradient(100deg, var(--rainbow-1), var(--rainbow-2) 22%, var(--rainbow-3) 42%, var(--rainbow-4) 60%, var(--rainbow-5) 78%, var(--rainbow-6))";

/* 밤하늘 별 (작은 점) */
const STARS = Array.from({ length: 40 }, (_, i) => {
  const x = (i * 37) % 100;
  const y = (i * 53 + 11) % 100;
  return `radial-gradient(1.5px 1.5px at ${x}% ${y}%, color-mix(in oklab, var(--background) ${40 + (i % 4) * 15}%, transparent), transparent)`;
}).join(", ");

/* 지구 위 대륙 모양 (단순한 덩어리). 두 번 이어 붙여서 옆으로 흘러가게 함 */
function Land() {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-1/2 shrink-0" preserveAspectRatio="none">
      <g fill="var(--globe-land)">
        <path d="M18 18c10-8 30-6 36 4s-2 18-10 22-6 14-14 16-12-8-14-18 -6-18 2-24z" />
        <path d="M44 58c8-2 16 4 16 14s-6 22-12 24-8-10-8-18 -2-18 4-20z" />
        <path d="M92 14c14-6 34-4 42 4s0 14-8 14-10 8-20 6-18-6-18-12 -2-10 4-12z" />
        <path d="M104 40c10-2 18 6 18 18s-8 24-14 24-10-14-10-24 0-16 6-18z" />
        <path d="M150 20c16-4 36 2 40 12s-10 14-20 16-16 10-24 6-6-14-4-22 2-10 8-12z" />
        <path d="M168 66c8-2 16 2 16 8s-8 10-14 8-8-14-2-16z" />
      </g>
    </svg>
  );
}

export function Intro() {
  const { intro } = siteConfig;

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-foreground text-background"
      style={{ backgroundImage: STARS }}
    >
      {/* 은은한 보라 빛 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--primary) 28%, transparent), transparent)",
        }}
      />

      <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col py-8 sm:py-10">
        <p className="self-end text-xs uppercase tracking-[0.25em] text-background/70 sm:text-sm">
          {intro.topLabel}
        </p>

        {/* 가운데 장면 */}
        <div className="relative mx-auto mt-4 flex w-full max-w-4xl flex-1 flex-col items-center">
          <p className="relative z-0 text-xs uppercase tracking-[0.35em] text-background/60 sm:text-sm">
            {intro.subtitle}
          </p>

          {/* 천천히 360도 도는 입체 글자 */}
          <div className="relative z-30 mt-2 [perspective:1200px]">
            <div
              className="relative motion-reduce:!animate-none"
              style={{
                transformStyle: "preserve-3d",
                animation: `intro-spin ${SPIN_SECONDS}s linear infinite`,
              }}
            >
              {Array.from({ length: DEPTH_LAYERS }, (_, i) => {
                const isBack = i === DEPTH_LAYERS - 1; // 맨 뒷면도 무지개색 (뒤에서 볼 때)
                return (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={`absolute inset-0 select-none whitespace-nowrap text-[17vw] font-black leading-none tracking-tighter sm:text-[8.5rem] ${isBack ? "bg-clip-text text-transparent" : ""}`}
                    style={{
                      transform: `translateZ(${-(i + 1) * 2}px)`,
                      ...(isBack
                        ? { backgroundImage: RAINBOW }
                        : { color: `color-mix(in oklab, var(--primary), var(--foreground) ${35 + i * 3}%)` }),
                    }}
                  >
                    {intro.word}
                  </span>
                );
              })}
              <span
                className="relative block whitespace-nowrap bg-clip-text text-[17vw] font-black leading-none tracking-tighter text-transparent sm:text-[8.5rem]"
                style={{ backgroundImage: RAINBOW }}
              >
                {intro.word}
              </span>
            </div>
          </div>

          {/* 지구 + 금색 링 */}
          <div aria-hidden="true" className="relative mt-6 flex w-full max-w-3xl flex-1 items-center sm:mt-10">
            <div className="relative mx-auto aspect-[2/1] w-full">
              {/* 둥근 다리 뒤쪽 (지구 뒤): 뒤 기둥 + 다리 뒤 절반 */}
              <div className="absolute inset-0 z-0">
                {BACK_PILLARS.map((p) => (
                  <Pillar key={p.x} {...p} />
                ))}
                <Deck half="back" />
              </div>

              {/* 지구 */}
              <div
                className="absolute left-1/2 top-1/2 z-10 aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--globe), var(--background) 25%), var(--globe) 45%, var(--globe-deep))",
                  boxShadow:
                    "0 0 60px color-mix(in oklab, var(--globe) 45%, transparent), inset -18px -18px 40px color-mix(in oklab, var(--foreground) 45%, transparent)",
                }}
              >
                <div
                  className="flex h-full w-[200%] opacity-90 motion-reduce:!animate-none"
                  style={{ animation: "globe-drift 30s linear infinite" }}
                >
                  <Land />
                  <Land />
                </div>
                {/* 둥근 입체감 그림자 */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, transparent 40%, color-mix(in oklab, var(--foreground) 55%, transparent))",
                  }}
                />
              </div>

              {/* 둥근 다리 앞쪽 (지구 앞): 앞 기둥 + 다리 앞 절반 + 왼쪽 아래로 이어지는 진입로 */}
              <div className="absolute inset-0 z-20">
                {FRONT_PILLARS.map((p) => (
                  <Pillar key={p.x} {...p} />
                ))}
                <Ramp />
                <Deck half="front" />
              </div>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-sm text-background/70">
            <MoveHorizontal className="size-4" />
            {intro.hint}
          </p>
        </div>

        {/* 아래 글자 */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{intro.title}</h2>
          <p className="mt-3 text-base text-background/70 sm:text-lg">{intro.description}</p>
          <div className="mt-8 flex flex-col justify-between gap-2 text-xs uppercase tracking-[0.2em] text-background/50 sm:flex-row">
            <span>{intro.footLeft}</span>
            <span>{intro.footRight}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────── 둥근 다리 (지교 = 서로를 잇는 다리) ─────────
   다리 바닥은 지구를 감싸는 납작한 타원이고, 아래에서 회색 기둥들이 받칩니다.
   기둥 위치: x = 가로 위치(%), y = 다리와 닿는 높이(%), h = 기둥 길이(%) */
const DECK_WIDTH = "clamp(14px, 3.4vw, 28px)"; // 다리 길 폭
const RAIL = "clamp(2px, 0.4vw, 4px)"; // 양쪽 금색 난간 굵기
const SIDE = "clamp(4px, 0.9vw, 9px)"; // 다리 옆면(두께)

const BACK_PILLARS = [
  { x: 14, y: 36, h: 16 },
  { x: 86, y: 36, h: 16 },
];
const FRONT_PILLARS = [
  { x: 7, y: 60, h: 30 },
  { x: 30, y: 71, h: 34 },
  { x: 70, y: 71, h: 34 },
  { x: 93, y: 60, h: 30 },
];

/** 다리 바닥 (half="back" 은 위쪽 절반만, "front" 는 아래쪽 절반만 보여 줌 → 지구를 감싸는 느낌) */
function Deck({ half }: { half: "back" | "front" }) {
  const clip = half === "back" ? "[clip-path:inset(0_0_50%_0)]" : "[clip-path:inset(50%_0_-20%_0)]";
  const ellipse = "absolute inset-x-0 top-1/2 h-[46%] -translate-y-1/2 rounded-[50%]";
  return (
    <div className={`absolute inset-0 ${clip}`}>
      {/* 옆면(두께): 같은 타원을 조금 아래에 진한 금색으로 */}
      <div
        className={ellipse}
        style={{
          border: `${DECK_WIDTH} solid var(--gold-deep)`,
          marginTop: SIDE,
          boxShadow: "0 14px 30px color-mix(in oklab, var(--foreground) 70%, transparent)",
        }}
      />
      {/* 윗면(길) + 양쪽 금색 난간 */}
      <div
        className={ellipse}
        style={{
          border: `${DECK_WIDTH} solid var(--gold-light)`,
          boxShadow: `0 0 0 ${RAIL} var(--gold), inset 0 0 0 ${RAIL} var(--gold)`,
        }}
      />
      {/* 길 가운데 점선 */}
      <div
        className="absolute top-1/2 h-[46%] -translate-y-1/2 rounded-[50%] border-dashed opacity-60"
        style={{
          left: `calc(${DECK_WIDTH} / 2)`,
          right: `calc(${DECK_WIDTH} / 2)`,
          height: `calc(46% - ${DECK_WIDTH})`,
          borderWidth: "1px",
          borderColor: "var(--gold)",
        }}
      />
    </div>
  );
}

/** 다리를 받치는 회색 기둥 */
function Pillar({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <div
      className="absolute w-[2.6%] -translate-x-1/2 rounded-b-sm"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        height: `${h}%`,
        background: "linear-gradient(90deg, var(--pillar-dark), var(--pillar) 45%, var(--pillar-dark))",
        maskImage: "linear-gradient(to bottom, black 70%, transparent)",
      }}
    />
  );
}

/** 다리에서 왼쪽 아래로 뻗어 나가는 진입로 (세상과 이어지는 길) */
function Ramp() {
  return (
    <div
      className="absolute right-[86%] top-[62%] w-[60%] origin-right -rotate-[26deg]"
      style={{
        height: DECK_WIDTH,
        background: "var(--gold-light)",
        boxShadow: `0 ${SIDE} 0 var(--gold-deep), 0 -${RAIL} 0 var(--gold), 0 calc(${SIDE} + ${RAIL}) 0 var(--gold)`,
        maskImage: "linear-gradient(to left, black 60%, transparent)",
      }}
    />
  );
}
