// Mirrors the PDF CV (~/Desktop/CV/cv.html). Update both together.

export interface Job {
  title: string;
  company: string;
  url?: string;
  period: string;
  details: string;
  bullets: string[];
  stack?: string;
}

export const CV = {
  name: "Kostiantyn Demchenko",
  role: "Front-End Developer · Vue 3 · Next.js · TypeScript",
  location: "Remote · Turkey (UTC+3), Kyiv working hours",

  summary:
    "Front-End Developer with 4+ years of commercial experience building product web applications with Vue 3, Next.js and TypeScript. Currently the front-end owner across several products at once, from UI architecture and design systems to CI/CD and production infrastructure. Led the front end on client projects with 1–2 developers. Comfortable beyond the browser: Node.js and NestJS services, Docker, Nginx, Cloudflare. AI-assisted development is part of my daily workflow: I keep exploring new tools and tuning setups that make delivery faster and take routine work off the team.",

  skills: [
    { group: "Core", items: "Vue 3 (Composition API), Next.js (App Router), React, TypeScript, JavaScript" },
    { group: "State & data", items: "Pinia, Zustand, Redux, Apollo Client, REST, GraphQL, WebSockets (Centrifugo), Axios" },
    { group: "UI", items: "Tailwind CSS, SCSS, design systems and design tokens, theming, HeroUI, Material UI, Framer Motion, responsive and cross-browser layout" },
    { group: "Also worked with", items: "Angular 21 (standalone components, signals, SSR), Nx monorepo" },
    { group: "Back end", items: "Node.js, NestJS, Express, Prisma, PostgreSQL, MySQL" },
    { group: "Infra & tooling", items: "Vite, Webpack, Docker, Nginx, Cloudflare (DNS, R2), AWS S3, GitHub Actions CI/CD, Vercel, Linux (Ubuntu), Let's Encrypt, Git" },
    { group: "Web", items: "SEO (SSR, prerendering, Google Search Console), i18n, PWA, web performance optimization" },
    { group: "Graphics & real-time", items: "three.js (WebGL), Canvas 2D, Web Animations API, Web Audio API, WebRTC (P2P, TURN)" },
    { group: "AI", items: "AI agents and LLM APIs in product logic; Claude Code with MCP servers and custom skills; spec-driven development, AI-assisted code review and audits; always testing new tools and setups" },
    { group: "Process & tools", items: "code review, estimates, technical specs and docs, Figma, Jira, Asana, Google Analytics, Photoshop, Illustrator" },
  ],

  experience: [
    {
      title: "Primary Front-End Developer",
      company: "Product & outsourcing company (NDA)",
      period: "Oct 2025 – Present",
      details: "Full-time · Remote",
      bullets: [
        "Own the front end across several products running in parallel: an internal CRM (Vue 3), a recruiting platform (Next.js), a white-label fintech platform and marketing sites (Angular 21). Directed 1–2 developers who joined for delivery phases: task breakdown, code review and technical decisions.",
        "Built the internal CRM from scratch to production: ~25 pages, custom UI component library, data tables with inline editing and advanced filtering, Pinia state architecture, role/permission matrix and real-time updates over WebSockets (Centrifugo).",
        "Designed a token-based theming system: a full dark theme (109 design tokens × 2 themes), WCAG AA contrast audit, flash-free theme switching and a guide for adding new themes.",
        "Took over the recruiting platform mid-development: moved the whole UI onto a design system, designed and shipped the desktop layout from spec to code, replaced 22 MB of SVG-wrapped images with WebP.",
        "Fintech platform (Nx monorepo, Angular 21, SSR): built the marketing site and docs, integrated the auth flow, redesigning the client app from Angular Material to the in-house UI kit.",
        "Reworked the company website for a rebrand as the sole developer: SEO from scratch, prerendering of 21 pages, 3 languages, lead forms into Google Sheets, font payload cut from 2.1 MB to 395 KB (−81%).",
        "Set up production infrastructure for several sites from scratch: VPS, Nginx, Cloudflare, Let's Encrypt, systemd services, server hardening. Own CI/CD, Vite build optimization, environment configs and proxy/CORS setup.",
        "AI in products and delivery: LLM APIs and AI agents in product logic, Claude Code with MCP and custom skills.",
        "Code review (including backend PRs), estimates broken down by user flow, technical specs and documentation, project handovers and onboarding of new team members.",
      ],
      stack: "Vue 3, Pinia, Next.js, React, Angular 21, TypeScript, Tailwind CSS, SCSS, Vite, WebSockets, NestJS, Docker, Nginx, Cloudflare, GitHub Actions",
    },
    {
      title: "Primary Front-End Developer",
      company: "Sunland",
      url: "https://sunland.estate/",
      period: "Oct 2024 – Sep 2025",
      details: "Contract · Part-time",
      bullets: [
        "Led the front end of a real-estate platform for property search and discovery: a Next.js PWA installable on web, iOS and Android. Directed 1–2 developers throughout the project.",
        "Built interactive Google Maps with marker clustering and performance monitoring, GraphQL-powered property filtering and multi-language support via next-intl. State with Zustand and Apollo Client, auth via NextAuth, offline support through PWA.",
        "SEO for property listing pages: 24,000+ pages indexed in Google Search Console.",
      ],
      stack: "Next.js 15, TypeScript, GraphQL, Apollo Client, Zustand, NextAuth, HeroUI, Tailwind CSS, PWA",
    },
    {
      title: "Front-End Developer",
      company: "All4Band",
      url: "https://all4band.com/",
      period: "Apr 2025 – Sep 2025",
      details: "Contract · Part-time",
      bullets: [
        "Main website for a design agency working with bands and music projects.",
        "Built a contact system with file uploads, reCAPTCHA and Zod validation, plus content delivery from a headless CMS so non-technical staff can publish without a developer.",
      ],
      stack: "Next.js 15 (App Router), TypeScript, GraphQL, Apollo Client, HeroUI, Tailwind CSS, Framer Motion, Zustand",
    },
    {
      title: "Front-End Developer",
      company: "AdversterX",
      period: "Aug 2024 – Jul 2025",
      details: "Full-time",
      bullets: [
        "Delivered client websites on the company stack, from implementation through QA to production deploy.",
        "Worked in a fixed team workflow: requirements with the team lead, peer and QA review, revisions, deployment. Consistently met release deadlines across a rotating project queue.",
      ],
      stack: "JavaScript, SCSS, HTML, Git",
    },
    {
      title: "Full-Stack Developer",
      company: "Rooh",
      url: "https://rooh.com.ua/",
      period: "Jun 2024 – Aug 2024",
      details: "Contract",
      bullets: [
        "Full rewrite of a scooter rental website, keeping the existing functionality and adding a feedback form, multi-language support and traffic analytics.",
        "Chose and implemented the stack, worked with the designer on the new UI, improved SEO and moved the site to the live domain with zero downtime. The site is still in production.",
      ],
      stack: "Next.js, TypeScript, SCSS, Nodemailer, Swiper.js",
    },
    {
      title: "Full-Stack Developer",
      company: "Tap Skins",
      period: "Sep 2023 – Feb 2024",
      details: "Contract",
      bullets: [
        "Telegram Web App game for CS:GO skin farming and trading; built both the backend and the frontend.",
        "Backend on Node.js/Express with MySQL/MariaDB: real-time WebSocket gameplay, caching, Telegram auth, stamina system, referrals, daily bonuses and a skin marketplace. Mobile-first frontend for the Telegram WebApp environment. Containerized with Docker, automated deployment.",
      ],
      stack: "Node.js, TypeScript, Express, MySQL/MariaDB, WebSockets, Next.js, Material UI, Docker, Telegram Bot API",
    },
    {
      title: "Front-End Developer",
      company: "BonnyFlowers",
      period: "Feb 2023 – Aug 2023",
      details: "Contract",
      bullets: [
        "Responsive interfaces across devices and browsers: semantic markup, CSS animations and transitions, interactive JavaScript features, REST API integration. Team workflow with Git and Jira, with a focus on performance.",
      ],
      stack: "HTML, CSS, JavaScript, jQuery, Bootstrap, REST API, Git, Jira",
    },
    {
      title: "Web Developer",
      company: "Freelance",
      period: "May 2022 – Aug 2022",
      details: "",
      bullets: [
        "Small commercial projects with a partner: ad banner markup and integration, two landing pages.",
      ],
    },
  ] satisfies Job[],

  education: [
    {
      title: "Master's degree, Computer Science",
      place: "Kharkiv National University of Radio Electronics",
      period: "2024 – 2025",
    },
    {
      title: "Bachelor's degree, Computer Science",
      place: "Kharkiv National University of Radio Electronics",
      period: "2020 – 2024",
    },
    {
      title: "Front-end Pro course",
      place: "Hillel IT School",
      period: "2022 – 2023",
      link: { href: "https://certificate.ithillel.ua/view/77686741", label: "certificate" },
    },
  ],

  languages: [
    { name: "Ukrainian", level: "native" },
    { name: "Russian", level: "native" },
    { name: "English", level: "B2 (Upper-Intermediate)" },
  ],
};
