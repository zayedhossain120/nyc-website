export type ServicePillar = "software-development" | "ai-automation" | "marketing-seo";

export interface ServicePillarInfo {
  id: ServicePillar;
  tone: "secondary" | "primary" | "warm";
  title: string;
  description: string;
  href: string;
}

export interface Service {
  pillar: ServicePillar;
  slug: string;
  title: string;
  description: string;
  includes: string[];
  stat: string;
}

export const SERVICE_PILLARS: ServicePillarInfo[] = [
  {
    id: "software-development",
    tone: "secondary",
    title: "Software Development",
    description: "Next.js/React web apps, NestJS/Node backends, mobile, and design systems.",
    href: "/services/software-development",
  },
  {
    id: "ai-automation",
    tone: "primary",
    title: "AI Automation",
    description: "Custom AI agents, chatbots, workflow/CRM automation, and LLM/RAG integrations.",
    href: "/services/ai-automation",
  },
  {
    id: "marketing-seo",
    tone: "warm",
    title: "Marketing & Growth",
    description: "Local SEO, AEO/GEO, Google Ads, Meta Ads, and content/social.",
    href: "/services/marketing-seo",
  },
];

export const SERVICES: Service[] = [
  {
    pillar: "software-development",
    slug: "nextjs-apps",
    title: "Enterprise Next.js Web Applications",
    description: "Server-rendered, edge-ready applications built for scale from day one.",
    includes: ["SSR & edge middleware", "React Server Components", "CI/CD to Vercel or your cloud"],
    stat: "100/100 Lighthouse target",
  },
  {
    pillar: "software-development",
    slug: "landing-pages",
    title: "High-Converting Landing Pages",
    description: "Pages engineered to convert, with A/B testing built into the architecture.",
    includes: ["A/B testing architecture", "Micro-animations & motion", "Copy tested against real funnels"],
    stat: "Avg. 2.1x conversion lift",
  },
  {
    pillar: "software-development",
    slug: "design-systems",
    title: "Custom Design Systems & Component Libraries",
    description: "A token-based system your team can actually maintain.",
    includes: ["Tailwind v4 token pipeline", "Figma-to-code token sync", "WAI-ARIA accessible by default"],
    stat: "Ships in 1–2 weeks",
  },
  {
    pillar: "software-development",
    slug: "speed-tuning",
    title: "Core Web Vitals & Performance Audits",
    description: "A guaranteed floor on Lighthouse, not a best-effort pass.",
    includes: ["Full CWV & bundle audit", "Guaranteed 90+ score", "Before/after performance report"],
    stat: "90+ score guaranteed",
  },
  {
    pillar: "software-development",
    slug: "cms-cloud",
    title: "Database, API & Cloud Architecture",
    description: "Infrastructure that doesn't fall over at your next funding round.",
    includes: ["PostgreSQL / MongoDB schema design", "GraphQL or REST API layer", "Docker & CI/CD pipelines"],
    stat: "Built for 10x scale",
  },
  {
    pillar: "software-development",
    slug: "ui-ux-design",
    title: "UI/UX Design & Prototyping",
    description: "User-centered wireframes, interactive prototypes, and pixel-perfect visual design that turn complex products into intuitive experiences.",
    includes: ["User Research & Journey Mapping", "Interactive Figma Prototypes", "Usability Testing & Iteration"],
    stat: "Figma prototype + usability testing",
  },
  {
    pillar: "ai-automation",
    slug: "ai-chatbots",
    title: "Custom AI Chatbots & Support Agents",
    description: "Trained on your knowledge base, not a generic prompt.",
    includes: ["Trained on internal docs/KB", "Escalation to human handoff", "24/7 resolution for tier-1 tickets"],
    stat: "Resolves tier-1 tickets 24/7",
  },
  {
    pillar: "ai-automation",
    slug: "crm-automation",
    title: "Automated Lead & CRM Workflows",
    description: "Leads routed, scored, and followed up on without a human touching a spreadsheet.",
    includes: ["HubSpot / Salesforce / GoHighLevel", "Lead scoring & routing logic", "Automated follow-up sequences"],
    stat: "Zero manual lead entry",
  },
  {
    pillar: "ai-automation",
    slug: "llm-integration",
    title: "Custom LLM & API Integration",
    description: "RAG pipelines and fine-tuned models wired into your actual product.",
    includes: ["RAG over your proprietary data", "Vector DB (Pinecone) setup", "Fine-tuned model evaluation"],
    stat: "Grounded in your own data",
  },
  {
    pillar: "ai-automation",
    slug: "process-automation",
    title: "Internal Process Automation",
    description: "The manual ops work your team dreads, automated end to end.",
    includes: ["Document parsing & extraction", "Automated report generation", "Cross-system workflow orchestration"],
    stat: "Hours saved, measured weekly",
  },
  {
    pillar: "marketing-seo",
    slug: "local-seo-pa",
    title: "Local SEO & Google Business Profile",
    description: "Rank where your buyers actually search — block by block.",
    includes: ["GBP optimization & management", "NYC borough-level local SEO", "Review & citation management"],
    stat: "Built for 5-borough visibility",
  },
  {
    pillar: "marketing-seo",
    slug: "aeo-geo",
    title: "AEO & GEO (Answer Engine Optimization)",
    description: "Structured so ChatGPT, Perplexity, and AI Overviews cite you.",
    includes: ["Answer-first content structuring", "Schema.org markup", "AI citation tracking"],
    stat: "94% avg. AI citation rate",
  },
  {
    pillar: "marketing-seo",
    slug: "google-ads",
    title: "Google Ads & PPC",
    description: "Search, Shopping, Display, and YouTube — run against real ROAS targets.",
    includes: ["Search & Shopping campaigns", "Display & YouTube retargeting", "Weekly ROAS reporting"],
    stat: "3.8x avg. ROAS",
  },
  {
    pillar: "marketing-seo",
    slug: "facebook-ads",
    title: "Meta & Instagram Ads",
    description: "Funnels built on CAPI data, not guesswork.",
    includes: ["Conversions API (CAPI) setup", "Lookalike & retargeting audiences", "Creative testing at scale"],
    stat: "CAPI-verified attribution",
  },
  {
    pillar: "marketing-seo",
    slug: "technical-seo",
    title: "Full Technical & Organic SEO",
    description: "Crawl audits, on-page fixes, and a backlink strategy that isn't spam.",
    includes: ["Technical crawl audits", "On-page optimization", "Editorial backlink outreach"],
    stat: "Organic-first growth",
  },
  {
    pillar: "marketing-seo",
    slug: "content-smm",
    title: "Content Marketing & Social Media Management",
    description: "SEO-driven blogs and a social calendar your team doesn't have to think about.",
    includes: ["SEO blog content calendar", "Social media management", "Brand-voice copywriting"],
    stat: "Consistent weekly cadence",
  },
];
