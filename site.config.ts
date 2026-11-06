/* ==========================================================================
   ★ 사이트 내용 설정 파일
   --------------------------------------------------------------------------
   사이트에 보이는 글자(이름, 소개, 메뉴, 연락처 등)는 대부분 여기에 있습니다.
   따옴표 " " 안의 글자만 바꾸고 저장하면 화면에 바로 반영됩니다.
   (따옴표, 쉼표, 중괄호 { } 는 지우지 않도록 조심!)
   ========================================================================== */

import type { Item } from "@/lib/types";

export const siteConfig = {
  /* 브라우저 탭 제목과 검색 결과에 보이는 정보 */
  name: "금란지교",
  englishName: "GEUMRANJIGYO",
  title: "금란지교 — AI로 더 나은 일상을",
  description: "금란지교는 AI 기술로 일의 가능성을 넓히는 더 똑똑한 연결을 만듭니다.",

  /* 상단 메뉴 (href 의 #이름 은 아래 섹션의 id 와 같아야 해당 위치로 이동) */
  nav: [
    { label: "회사소개", href: "#about" },
    { label: "서비스", href: "#features" },
    { label: "프로젝트", href: "#projects" },
  ],

  /* 상단 메뉴 제일 오른쪽 버튼 (관리자 페이지는 맨 아래 푸터의 작은 점 • 으로 들어갑니다) */
  navButton: { label: "함께 시작하기", href: "#contact" },

  /* 맨 위 인트로 장면 (어두운 배경 + 천천히 도는 입체 글자 + 지구와 링) */
  intro: {
    topLabel: "The art of connection",
    subtitle: "A bond that shines forever",
    word: "금란지교", // 천천히 360도 회전하는 큰 글자
    controls: {
      label: "Explore the moment",
      pause: "회전 일시정지",
      resume: "다시 회전",
      reset: "처음 방향으로",
    },
    title: "세계를 잇는 인연, 금란지교",
    description: "둥근 다리 위에 지구와 소중한 인연을 담았습니다.",
    footLeft: "Geumranjigyo · 3D Experience",
    footRight: "Created for precious connections",
  },

  /* 첫 화면(히어로)
     - title 의 마지막 줄은 보라색으로 보입니다. (\n 이 줄바꿈)
     - 이 글자들은 관리자 페이지(/admin)에서 바꾼 값이 있으면 그 값이 우선입니다. */
  hero: {
    eyebrow: "AI for better work",
    title: "일의 가능성을 넓히는\n더 똑똑한 연결",
    description:
      "반복되는 업무는 가볍게, 새로운 아이디어는 더 크게.\n금란지교가 AI 기술로 더 나은 일상을 함께 만듭니다.",
    primaryCta: { label: "서비스 알아보기", href: "#features" },
    secondaryCta: { label: "회사 소개", href: "#about" },
    /* 오른쪽 보라 구슬 위에 떠 있는 작은 카드 2개 */
    floatingCards: [
      { caption: "생각을 현실로", label: "AI Development" },
      { caption: "업무의 새로운 흐름", label: "Smart Automation" },
    ],
  },

  /* 서비스 섹션의 제목 — 카드 목록 자체는 관리자 페이지(/admin)에서 관리 */
  features: {
    eyebrow: "Our Services",
    title: "더 중요한 일에\n집중할 수 있도록",
    description: "업무의 작은 불편에서 시작해 비즈니스에 꼭 맞는 AI와 자동화 솔루션을 제안합니다.",
  },

  /* 회사소개 섹션 (어두운 배경) */
  about: {
    eyebrow: "About Geumranjigyo",
    title: "좋은 기술은\n좋은 관계에서 시작됩니다.",
    paragraphs: [
      "금란지교는 사람과 기술의 조화로운 연결을 생각합니다.",
      "복잡한 기술을 이해하기 쉬운 해결책으로 바꾸고,",
      "함께 성장하는 든든한 파트너가 되고자 합니다.",
    ],
    values: [
      { title: "사람을 먼저 생각합니다", description: "기술을 사용하는 사람의 경험에서 출발합니다." },
      { title: "문제의 본질에 집중합니다", description: "꼭 필요한 변화를 함께 찾습니다." },
      { title: "함께 성장합니다", description: "지속 가능한 일의 방식을 만들어갑니다." },
    ],
  },

  /* 프로젝트 섹션 */
  projects: {
    eyebrow: "Projects",
    title: "이런 변화를\n함께 그려봅니다.",
    description:
      "AI와 자동화가 일하는 방식을 어떻게 바꿀 수 있을까요?\n금란지교가 제안하는 활용 예시를 만나보세요.",
    items: [
      {
        tag: "AI Assistant · 예시",
        title: "사내 지식 AI 비서",
        description: "흩어진 문서와 자료를 묻고 답하는 대화형 비서로 연결합니다.",
      },
      {
        tag: "Automation · 예시",
        title: "반복 업무 자동화",
        description: "매일 손으로 하던 정리와 보고를 자동으로 처리합니다.",
      },
      {
        tag: "AI Service · 예시",
        title: "고객 맞춤 AI 서비스",
        description: "고객의 질문과 요청에 빠르게 응답하는 서비스를 만듭니다.",
      },
    ],
  },

  /* 마무리 안내(CTA) 섹션 */
  contact: {
    eyebrow: "Let's create together",
    title: "더 나은 내일을 위한 첫걸음",
    description: "AI로 바꾸고 싶은 업무가 있다면, 금란지교와 함께 상상해 보세요.",
    button: { label: "서비스 다시 보기", href: "#features" },
  },

  /* 맨 아래(푸터) */
  footer: {
    copyright: "© GEUMRANJIGYO",
    backToTop: "맨 위로",
  },

  /* 관리자 페이지에서 관리할 섹션 목록.
     key  = 데이터베이스에 저장되는 이름(영문 소문자),
     label = 관리자 화면에 보이는 이름.
     예) 포트폴리오라면 { key: "works", label: "작업물" } 을 추가 */
  adminSections: [{ key: "features", label: "서비스" }],
};

/* Supabase를 아직 연결하지 않았을 때 대신 보여줄 예시 카드(서비스 섹션).
   Supabase를 연결하면 이 내용 대신 관리자 페이지에서 등록한 카드가 보입니다. */
export const sampleItems: Item[] = [
  {
    id: "sample-1",
    section: "features",
    title: "맞춤형 AI 개발",
    description: "비즈니스의 목표와 환경을 살펴보고, 필요한 문제를 해결하는 AI 서비스를 설계합니다.",
    image_url: null,
    link_url: null,
    sort_order: 1,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-2",
    section: "features",
    title: "업무 프로세스 자동화",
    description: "반복적인 작업과 흩어진 업무 흐름을 연결해 더 간결하고 효율적인 일상을 만듭니다.",
    image_url: null,
    link_url: null,
    sort_order: 2,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-3",
    section: "features",
    title: "AI 도입 컨설팅",
    description: "어디서부터 시작할지 함께 고민하고, 우리에게 맞는 AI 활용 방향을 찾아갑니다.",
    image_url: null,
    link_url: null,
    sort_order: 3,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];
