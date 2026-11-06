"use client";

import { useEffect, useRef, useState } from "react";
import { MoveHorizontal, Pause, Play, RotateCcw } from "lucide-react";

import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";

/* 맨 위 인트로 장면.
   - 글자는 site.config.ts 의 intro 에서 바꿉니다. (큰 회전 글자 = intro.word)
   - 색은 app/globals.css 의 --rainbow-*, --gold*, --globe* 에서 바꿉니다.
   - 회전 속도: 아래 SPIN_SECONDS (숫자가 클수록 천천히)
   - 마우스(손가락)로 좌우로 끌면 글자를 직접 돌릴 수 있습니다. 끄는 감도: DRAG_SPEED */
const SPIN_SECONDS = 22;
const DRAG_SPEED = 0.4;
const TILT = "rotateX(-8deg)"; // 글자를 살짝 내려다보는 각도
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

  /* 회전 상태: 각도는 화면을 다시 그리지 않고 직접 바꿔서 부드럽게 돌아가게 함 */
  const spinRef = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const pausedRef = useRef(false);
  const resetting = useRef(false);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    // 움직임 줄이기를 켜 둔 사용자는 멈춘 상태로 시작
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pausedRef.current = true;
      raf = requestAnimationFrame(() => setPaused(true));
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      if (resetting.current) {
        // 가장 가까운 정면(0도, 360도 …)으로 부드럽게 돌아가기
        const target = Math.round(angle.current / 360) * 360;
        angle.current += (target - angle.current) * 0.12;
        if (Math.abs(target - angle.current) < 0.2) {
          angle.current = 0;
          resetting.current = false;
        }
      } else if (!pausedRef.current && !drag.current) {
        angle.current += (360 / SPIN_SECONDS) * dt;
      }
      if (spinRef.current) {
        spinRef.current.style.transform = `${TILT} rotateY(${angle.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };
  const resetDirection = () => {
    resetting.current = true;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    resetting.current = false;
    drag.current = { x: e.clientX, start: angle.current };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    angle.current = drag.current.start + (e.clientX - drag.current.x) * DRAG_SPEED;
  };
  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

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

      {/* 뒤쪽 세계지도 + 점선 궤도 */}
      <WorldMap />
      <DottedOrbits />

      <Container className="relative flex min-h-[calc(100svh-5rem)] flex-col py-8 sm:py-10">
        <p className="self-end text-xs uppercase tracking-[0.25em] text-background/70 sm:text-sm">
          {intro.topLabel}
        </p>

        {/* 가운데 장면 */}
        <div className="relative mx-auto mt-4 flex w-full max-w-4xl flex-1 flex-col items-center">
          <p className="relative z-0 text-xs uppercase tracking-[0.35em] text-background/60 sm:text-sm">
            {intro.subtitle}
          </p>

          {/* 천천히 360도 도는 입체 글자 (좌우로 끌어서 직접 돌리기 가능) */}
          <div
            className={`relative z-30 mt-2 touch-pan-y select-none px-6 py-4 [perspective:1200px] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              ref={spinRef}
              className="relative"
              style={{ transformStyle: "preserve-3d", transform: `${TILT} rotateY(0deg)` }}
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

        {/* 아래 글자 + 회전 버튼 */}
        <div className="mt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{intro.title}</h2>
              <p className="mt-3 text-base text-background/70 sm:text-lg">{intro.description}</p>
            </div>
            <div className="md:text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-background/50">
                {intro.controls.label}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={togglePause}
                  aria-pressed={paused}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-background/25 px-5 text-sm font-semibold transition-colors hover:bg-background/10"
                >
                  {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
                  {paused ? intro.controls.resume : intro.controls.pause}
                </button>
                <button
                  type="button"
                  onClick={resetDirection}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-background/25 px-5 text-sm font-semibold transition-colors hover:bg-background/10"
                >
                  <RotateCcw className="size-4" />
                  {intro.controls.reset}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-2 text-xs uppercase tracking-[0.2em] text-background/50 sm:flex-row">
            <span>{intro.footLeft}</span>
            <span>{intro.footRight}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** 장면 뒤에 은은하게 깔리는 세계지도 (단순한 대륙 모양) */
function WorldMap() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 500"
      className="pointer-events-none absolute left-1/2 top-[14%] w-[min(1200px,160%)] -translate-x-1/2"
    >
      <g fill="var(--background)" fillOpacity={0.09} stroke="var(--background)" strokeOpacity={0.18} strokeWidth={1.5} strokeLinejoin="round">
        <path d="M80 90 L180 60 L290 70 L330 110 L300 150 L260 170 L240 220 L200 250 L170 230 L150 180 L100 160 Z" />
        <path d="M330 40 L380 35 L390 70 L350 85 Z" />
        <path d="M250 270 L310 260 L350 300 L330 360 L300 420 L280 460 L265 420 L255 350 Z" />
        <path d="M450 80 L520 70 L560 90 L540 130 L490 140 L460 120 Z" />
        <path d="M460 170 L540 160 L590 200 L600 260 L570 330 L530 380 L505 340 L490 270 L455 230 Z" />
        <path d="M560 70 L700 50 L850 70 L920 110 L880 160 L820 190 L760 230 L700 210 L650 180 L590 150 L560 110 Z" />
        <path d="M680 200 L720 210 L705 260 Z" />
        <path d="M780 250 L840 260 L830 280 L790 275 Z" />
        <path d="M800 330 L880 320 L910 360 L880 400 L820 395 L795 360 Z" />
      </g>
    </svg>
  );
}

/** 장면을 크게 둘러싸는 점선 궤도 */
function DottedOrbits() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute left-1/2 top-[10%] w-[min(1100px,150%)] -translate-x-1/2"
    >
      <ellipse cx="500" cy="330" rx="470" ry="250" fill="none" stroke="var(--background)" strokeOpacity={0.35} strokeWidth={8} strokeDasharray="2 26" />
      <ellipse cx="500" cy="330" rx="480" ry="150" fill="none" stroke="var(--background)" strokeOpacity={0.12} strokeWidth={1} />
      <line x1="40" y1="330" x2="960" y2="330" stroke="var(--background)" strokeOpacity={0.08} strokeWidth={1} />
    </svg>
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
