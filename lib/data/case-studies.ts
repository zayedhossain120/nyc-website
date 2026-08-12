export type CaseStudyCategory = "web-apps" | "e-commerce" | "ai-automation" | "marketing-campaigns";

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  category: CaseStudyCategory;
  metric: string;
  gradient: string;
  summary: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string[];
  techStack: string[];
  testimonial: { quote: string; name: string; title: string };
}

export const CATEGORY_LABELS: Record<CaseStudyCategory, string> = {
  "web-apps": "Web Apps",
  "e-commerce": "E-Commerce",
  "ai-automation": "AI Automation",
  "marketing-campaigns": "Marketing Campaigns",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "solstice-health",
    client: "Solstice Health",
    industry: "Healthcare",
    category: "web-apps",
    metric: "+340% patient retention",
    gradient: "from-accent-secondary/25 via-surface to-surface",
    summary:
      "A legacy patient portal was bleeding logins. We rebuilt it on Next.js and NestJS with same-day appointment booking.",
    challenge:
      "Solstice Health's decade-old patient portal ran on a PHP monolith with a 6.2s average load time. Patients were abandoning appointment bookings before the page finished rendering, and clinical staff had no real-time visibility into intake status.",
    approach:
      "We ran a two-week discovery sprint mapping every patient and staff workflow, then re-architected the portal as a Next.js 16 app with a NestJS API layer, keeping HIPAA-compliant data handling intact through a phased cutover.",
    solution:
      "Server-rendered booking flows, a NestJS-backed appointment engine with real-time availability, and a staff dashboard built on the same design system — shipped in three two-week increments so Solstice never had downtime.",
    results: [
      "+340% patient retention over two quarters",
      "100/100 Lighthouse performance score",
      "6.2s → 0.9s average load time",
      "Zero HIPAA compliance incidents post-launch",
    ],
    techStack: ["Next.js 16", "NestJS", "PostgreSQL", "Prisma", "Tailwind v4"],
    testimonial: {
      quote:
        "Vertex didn't just build our app, they rebuilt how we ship. Core Web Vitals went from 42 to 100 in one sprint.",
      name: "Dana Whitfield",
      title: "VP Engineering, Solstice Health",
    },
  },
  {
    slug: "kettletown-supply-co",
    client: "Kettletown Supply Co.",
    industry: "E-Commerce",
    category: "e-commerce",
    metric: "2.4x checkout conversion",
    gradient: "from-accent-primary/20 via-surface to-surface",
    summary:
      "A DTC outdoor gear brand needed a faster checkout and smarter product recommendations — not another Shopify theme.",
    challenge:
      "Kettletown's Shopify storefront was capped at a 40% mobile checkout completion rate, and their generic \"related products\" widget wasn't moving inventory.",
    approach:
      "We migrated the storefront to a headless Next.js build on top of their existing Shopify backend, then trained a lightweight recommendation model on 18 months of order history.",
    solution:
      "A custom checkout flow with saved payment methods via Stripe, an AI recommendation engine surfaced at three points in the funnel, and an admin view for merchandising to override AI picks manually.",
    results: [
      "2.4x checkout conversion",
      "+31% average order value",
      "1.1s time-to-interactive on mobile",
      "AI recommendations drove 22% of Q1 revenue",
    ],
    techStack: ["Next.js 16", "Stripe", "AI Recommendations", "Shopify Storefront API"],
    testimonial: {
      quote: "We finally have one team accountable for both the build and the growth numbers.",
      name: "Priya Anand",
      title: "Founder, Kettletown Supply Co.",
    },
  },
  {
    slug: "meridian-freight",
    client: "Meridian Freight",
    industry: "Logistics SaaS",
    category: "ai-automation",
    metric: "18 hrs/week saved via automation",
    gradient: "from-accent-warm/20 via-surface to-surface",
    summary:
      "Dispatchers were manually re-keying freight requests from email into their TMS. We built an agent that reads, qualifies, and routes them instead.",
    challenge:
      "Meridian's dispatch team processed roughly 200 inbound freight requests a week by hand — reading emails, checking capacity, and re-entering data into their TMS. Response time to shippers averaged 3 hours.",
    approach:
      "We built a RAG-backed intake agent that parses inbound emails and PDFs, cross-references live carrier capacity, and drafts a routing recommendation for dispatcher sign-off, rather than removing the human from the loop entirely.",
    solution:
      "A NestJS automation service wired into their existing TMS via API, a vector-indexed knowledge base of carrier contracts for the agent to reason over, and a Slack approval flow so dispatchers stay in control.",
    results: [
      "18 hrs/week saved across the dispatch team",
      "3 hrs → 12 min average response time",
      "94% of AI-drafted routes approved without edits",
      "Zero added headcount despite 30% volume growth",
    ],
    techStack: ["NestJS", "Pinecone", "RAG", "OpenAI API", "Slack API"],
    testimonial: {
      quote:
        "Their AI automation team cut our manual intake process from 3 hours to 12 minutes per order.",
      name: "Marcus Ionescu",
      title: "COO, Meridian Freight",
    },
  },
  {
    slug: "ironline-legal",
    client: "Ironline Legal",
    industry: "Legal",
    category: "marketing-campaigns",
    metric: "3.2x organic traffic in 90 days",
    gradient: "from-accent-secondary/20 via-surface to-surface",
    summary:
      "A personal injury firm was invisible in AI search. We rebuilt their content strategy around AEO, not just keywords.",
    challenge:
      "Ironline Legal ranked on page one for their core keywords but got zero citations when prospects asked ChatGPT or Perplexity for injury lawyer recommendations — a growing share of their intake funnel.",
    approach:
      "We audited their site against AEO/GEO structuring principles, rebuilt cornerstone pages as direct, citable answers, and layered in a local SEO push across all five boroughs.",
    solution:
      "Schema-marked FAQ and service pages written to be quoted verbatim by AI answer engines, a Google Business Profile overhaul, and a monthly content cadence targeting borough-specific search intent.",
    results: [
      "3.2x organic traffic in 90 days",
      "Cited in Perplexity and ChatGPT answers for 6 core practice areas",
      "+156% Google Business Profile calls",
      "41% lower cost-per-lead vs. their prior Google Ads-only funnel",
    ],
    techStack: ["Technical SEO", "AEO/GEO", "Google Business Profile", "Schema.org"],
    testimonial: {
      quote:
        "We started showing up in ChatGPT answers before our competitors even knew that was something to optimize for.",
      name: "Rachel Kim",
      title: "Managing Partner, Ironline Legal",
    },
  },
  {
    slug: "northbound-realty",
    client: "Northbound Realty",
    industry: "Proptech",
    category: "web-apps",
    metric: "-62% page load time",
    gradient: "from-accent-primary/20 via-surface to-surface",
    summary:
      "A property listings platform was losing leads to a 9-second mobile load time. We rebuilt it on the App Router.",
    challenge:
      "Northbound's listings site was built on an older React SPA that shipped 4MB of JS on first load — a 9-second mobile load in real-world conditions, well past the point most visitors had already left.",
    approach:
      "We rebuilt the platform on Next.js 16's App Router with server-rendered listing pages and streaming search results, keeping their existing MLS data feed intact.",
    solution:
      "Server Components for listing detail pages, an edge-cached search index for instant filtering, and image optimization tuned for the high-resolution property photography their brokers rely on.",
    results: [
      "-62% page load time (9.1s → 3.4s on 4G)",
      "100/100 Lighthouse performance",
      "+47% listing page engagement",
      "+19% qualified lead form completions",
    ],
    techStack: ["Next.js 16", "React Server Components", "Vercel Edge", "MLS Integration"],
    testimonial: {
      quote: "Our brokers stopped complaining about the website and started sending us leads instead of excuses.",
      name: "Tomas Reyes",
      title: "VP of Marketing, Northbound Realty",
    },
  },
  {
    slug: "vantage-fitness",
    client: "Vantage Fitness",
    industry: "Hospitality",
    category: "e-commerce",
    metric: "+58% membership signups",
    gradient: "from-accent-warm/20 via-surface to-surface",
    summary:
      "A boutique gym chain needed online membership signups that didn't feel like filling out a mortgage application.",
    challenge:
      "Vantage Fitness ran memberships through a clunky third-party portal that took an average of 11 form steps to complete — most prospects dropped off before finishing.",
    approach:
      "We designed and built a three-step membership flow directly on their site, with plan comparison, instant pricing, and Stripe-based recurring billing baked in.",
    solution:
      "A Next.js membership funnel with real-time class-schedule previews, tiered plan cards, and automated welcome-sequence emails triggered on signup.",
    results: [
      "+58% membership signup completion",
      "11 steps → 3 steps in the signup flow",
      "-34% support tickets about billing",
      "$180K in incremental annual recurring revenue",
    ],
    techStack: ["Next.js 16", "Stripe Billing", "Tailwind v4", "Resend"],
    testimonial: {
      quote:
        "We used to lose people at step seven of the old signup form. Now most people are done before they'd have finished reading it.",
      name: "Alicia Ferreira",
      title: "Owner, Vantage Fitness",
    },
  },
];

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
