/* ==========================================================================
   ★ 사이트 내용 설정 파일
   --------------------------------------------------------------------------
   사이트에 보이는 글자(이름, 소개, 메뉴, 연락처 등)는 대부분 여기에 있습니다.
   따옴표 " " 안의 글자만 바꾸고 저장하면 화면에 바로 반영됩니다.
   (따옴표, 쉼표, 중괄호 { } 는 지우지 않도록 조심!)
   ========================================================================== */

import type { Item } from "@/lib/types";

/* 금란지교 공식 채널 주소 — 여러 곳에서 같이 쓰기 위해 한 번만 적어 둡니다. */
export const BLOG_URL = "https://blog.naver.com/geumran01";
export const SMARTSTORE_URL = "https://smartstore.naver.com/whrmafks01";

export type ChannelKey = "blog" | "youtube" | "instagram" | "threads" | "tiktok" | "smartstore";

export type Channel = {
  key: ChannelKey;
  name: string;
  handle: string;
  description: string;
  href: string;
  /** true 면 링크 목록에서 맨 앞에 '메인' 배지로 강조합니다. (블로그) */
  featured?: boolean;
};

export type SeriesItem = {
  tag: string;
  title: string;
  items: string[];
  href: string;
};

export const siteConfig = {
  /* 브라우저 탭 제목과 검색 결과에 보이는 정보 */
  name: "금란지교",
  englishName: "GEUMRANJIGYO",
  title: "금란지교 — 공식 스토어 & 실무 꿀템 링크 허브",
  description:
    "직접 써 보고 고른 실무 꿀템 TOP 3와 최저가 링크, 금란지교의 모든 공식 채널을 한곳에 모았습니다.",

  /* 공식 채널 주소 (버튼·링크가 모두 이 값을 씁니다) */
  links: {
    blog: BLOG_URL,
    youtube: "https://www.youtube.com/@geumarn1108",
    instagram: "https://www.instagram.com/geumran1108",
    threads: "https://www.threads.com/@geumran1108",
    tiktok: "https://www.tiktok.com/@geumran92",
    smartstore: SMARTSTORE_URL,
  },

  /* 상단 메뉴 (href 의 #이름 은 아래 섹션의 id 와 같아야 해당 위치로 이동) */
  nav: [
    { label: "꿀템 시리즈", href: "#series" },
    { label: "공식 채널", href: "#channels" },
    { label: "소개", href: "#about" },
  ],

  /* 상단 메뉴 제일 오른쪽 버튼 (관리자 페이지는 맨 아래 푸터의 작은 점 • 으로 들어갑니다) */
  navButton: { label: "네이버 블로그", href: BLOG_URL },

  /* 맨 위 인트로 장면 (어두운 배경 + 천천히 도는 입체 글자 + 지구와 링) */
  intro: {
    topLabel: "Geumranjigyo Official Hub",
    subtitle: "온라인 스토어 · 실무 꿀템 아카이브",
    word: "금란지교", // 천천히 360도 회전하는 큰 글자
    controls: {
      label: "장면 조작",
      pause: "회전 일시정지",
      resume: "다시 회전",
      reset: "처음 방향으로",
    },
    title: "직접 써 보고 남는 꿀템만 모았습니다",
    description: "실무 꿀템 TOP 3와 최저가 링크를 네이버 블로그에 정리해 두었습니다.",
    /* 인트로 장면에서 바로 블로그로 넘어가는 첫 버튼 */
    cta: {
      primary: { label: "추천 꿀템 · 최저가 모아보기", href: BLOG_URL },
      secondary: { label: "공식 채널 한눈에 보기", href: "#channels" },
    },
    footLeft: "Geumranjigyo · 3D Experience",
    footRight: "Created for precious connections",
  },

  /* 첫 화면(히어로)
     - title 의 마지막 줄은 보라색으로 보입니다. (\n 이 줄바꿈)
     - 이 글자들은 관리자 페이지(/admin)에서 바꾼 값이 있으면 그 값이 우선입니다.
     - 버튼 주소(href)는 위 links 값을 그대로 씁니다. */
  hero: {
    eyebrow: "Naver Blog · 꿀템 최저가 아카이브",
    title: "추천 꿀템과 최저가,\n한 번에 모아보기",
    description:
      "1인 셀러가 실제로 써 본 실무 꿀템 TOP 3.\n사용기·시연 영상·최저가 링크까지 블로그 한 곳에 모았습니다.",
    primaryCta: { label: "추천 꿀템 · 최저가 모아보기", href: BLOG_URL },
    secondaryCta: { label: "스마트스토어 둘러보기", href: SMARTSTORE_URL },
    /* 오른쪽 보라 구슬 위에 떠 있는 작은 카드 2개 */
    floatingCards: [
      { caption: "실무 꿀템 TOP 3", label: "Blog Archive" },
      { caption: "최저가 링크", label: "Shopping Connect" },
    ],
    /* 히어로 아래에 작게 놓이는 다른 채널 바로가기 (블로그는 위 큰 버튼이 담당) */
    quickLinksLabel: "다른 채널 바로가기",
  },

  /* 예전 '서비스' 섹션의 글자 — 지금은 app/page.tsx 에서 빼 두었습니다.
     (components/sections/features.tsx 를 다시 넣을 때 쓰는 자리입니다.) */
  features: {
    eyebrow: "Series",
    title: "실무 꿀템\n시리즈",
    description: "블로그에 정리한 꿀템 글을 한눈에 모았습니다.",
  },

  /* 예전 '프로젝트' 섹션의 글자 — 지금은 app/page.tsx 에서 빼 두었습니다.
     (components/sections/projects.tsx 를 다시 넣을 때 쓰는 자리입니다.) */
  projects: {
    eyebrow: "Guides",
    title: "이런 글을\n정리합니다.",
    description: "직접 써 본 물건의 사용기와 최저가 링크를 글로 남깁니다.",
    items: [
      {
        tag: "사용기 · 예시",
        title: "10초 시연 영상",
        description: "제품의 실제 작동 장면을 짧은 영상으로 보여 드립니다.",
      },
      {
        tag: "구매 안내 · 예시",
        title: "최저가 링크",
        description: "같은 물건을 가장 합리적인 가격에 살 수 있는 곳을 안내합니다.",
      },
      {
        tag: "아카이브 · 예시",
        title: "꿀템 시리즈",
        description: "용도별로 꿀템 TOP 3를 묶어 블로그에 정리합니다.",
      },
    ],
  },

  /* 인기 실무 꿀템 시리즈 — 카드를 누르면 해당 블로그 글로 바로 이동합니다. */
  series: {
    eyebrow: "Popular Series",
    title: "인기 실무 꿀템 시리즈",
    description:
      "사진과 10초 시연 영상으로 확인한 꿀템 TOP 3.\n카드를 누르면 블로그 글에서 사용기와 최저가 링크를 볼 수 있습니다.",
    note:
      "각 글에는 실제 사용 장면과 최저가 링크, 그리고 네이버 쇼핑 커넥트 대가성 문구가 함께 들어 있습니다.",
    items: [
      {
        tag: "작업실 정리",
        title: "작업실 10분 정리 꿀템 TOP 3",
        items: ["무선 미니 핸디 청소기", "이동식 3단 수납 트롤리", "타워형 멀티탭"],
        href: "https://blog.naver.com/geumran01/224477574818",
      },
      {
        tag: "데스크 세팅",
        title: "데스크 꿀템 TOP 3",
        items: ["노트북 거치대", "버티컬 마우스", "모니터 스크린바"],
        href: "https://blog.naver.com/geumran01/224476547759",
      },
      {
        tag: "상품 촬영 · 숏폼",
        title: "상품 촬영·숏폼 꿀템 TOP 3",
        items: ["회전 턴테이블", "LED 포토박스", "무선 핀마이크"],
        href: "https://blog.naver.com/geumran01/224475261394",
      },
      {
        tag: "택배 포장 · 발송",
        title: "택배 포장·발송 꿀템 TOP 3",
        items: ["테이프 디스펜서", "미니 열접착기", "폴딩카트"],
        href: "https://blog.naver.com/geumran01/224473901379",
      },
      {
        tag: "실무 필수템",
        title: "실무 필수템 TOP 3",
        items: ["라벨프린터", "세라믹 택배칼", "전자저울"],
        href: "https://blog.naver.com/geumran01/224472568728",
      },
    ] satisfies SeriesItem[],
  },

  /* 공식 채널 목록 (블로그가 맨 앞 · 메인) */
  channels: {
    eyebrow: "Official Channels",
    title: "금란지교 공식 채널",
    description:
      "새 꿀템과 최저가 소식은 네이버 블로그에 가장 먼저 올라갑니다.\n영상과 짧은 꿀팁은 아래 채널에서 이어집니다.",
    items: [
      {
        key: "blog",
        name: "네이버 블로그",
        handle: "blog.naver.com/geumran01",
        description: "추천 꿀템 TOP 3 · 사용기 · 최저가 링크",
        href: BLOG_URL,
        featured: true,
      },
      {
        key: "youtube",
        name: "유튜브 쇼츠",
        handle: "@geumarn1108",
        description: "10초 실사용 시연 영상",
        href: "https://www.youtube.com/@geumarn1108",
      },
      {
        key: "instagram",
        name: "인스타그램",
        handle: "@geumran1108",
        description: "릴스로 보는 꿀템 사용 장면",
        href: "https://www.instagram.com/geumran1108",
      },
      {
        key: "threads",
        name: "스레드",
        handle: "@geumran1108",
        description: "짧은 꿀팁과 새 글 소식",
        href: "https://www.threads.com/@geumran1108",
      },
      {
        key: "tiktok",
        name: "틱톡",
        handle: "@geumran92",
        description: "숏폼 꿀템 리뷰",
        href: "https://www.tiktok.com/@geumran92",
      },
      {
        key: "smartstore",
        name: "네이버 스마트스토어",
        handle: "smartstore.naver.com/whrmafks01",
        description: "금란지교 공식 스토어",
        href: SMARTSTORE_URL,
      },
    ] satisfies Channel[],
  },

  /* 회사소개 섹션 (어두운 배경) */
  about: {
    eyebrow: "About Geumranjigyo",
    title: "생활을 가볍게 하는\n물건을 고릅니다.",
    paragraphs: [
      "금란지교는 온라인 스토어를 운영하며 직접 써 보고 남는 물건만 소개합니다.",
      "제품의 실제 모습과 사용 장면을 사진·영상으로 담고,",
      "가격이 오가는 물건은 가장 합리적인 구매처를 함께 안내합니다.",
    ],
    values: [
      { title: "실제 모습 그대로", description: "제품의 진짜 모습과 사용 장면을 사진과 영상으로 보여 드립니다." },
      { title: "가격을 비교합니다", description: "같은 물건이라면 가장 합리적인 구매처를 찾아 링크로 안내합니다." },
      { title: "대가성을 밝힙니다", description: "제휴 링크가 들어간 글에는 항상 수수료 안내 문구를 함께 적습니다." },
    ],
  },

  /* 마무리 안내(CTA) 섹션 */
  contact: {
    eyebrow: "Start here",
    title: "꿀템 이야기는\n블로그에서 이어집니다",
    description: "새 글과 최저가 소식은 네이버 블로그에 가장 먼저 올라갑니다.",
    button: { label: "네이버 블로그 열기", href: BLOG_URL },
  },

  /* 맨 아래(푸터) */
  footer: {
    brandLine: "금란지교 · 온라인 스토어 & 실무 꿀템 아카이브",
    disclosure:
      "이 사이트에 걸린 상품 링크는 네이버 쇼핑 커넥트 활동의 일환으로, 링크를 통해 구매가 이루어질 경우 일정액의 수수료를 지급받을 수 있습니다.",
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
