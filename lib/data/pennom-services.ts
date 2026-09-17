import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Cpu,
  Database,
  FileText,
  Gauge,
  Globe,
  LayoutGrid,
  MapPin,
  MessageSquareCode,
  PenTool,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import type { ServicePillar } from "@/lib/data/services";

export type ServiceDetailPillar = ServicePillar;

export interface PricingInfo {
  amount: string;
  unit: "one-time project" | "per month";
  note?: string;
}

export interface SeoInfo {
  title: string;
  description: string;
  keywords: string[];
}

export interface ServiceAreaRegion {
  city: string;
  desc: string;
  keywords: string[];
}

export interface ServiceAreaSection {
  title: string;
  description: string;
  regions: ServiceAreaRegion[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface WhyPartnerSection {
  title: string;
  body: string;
  tags: string[];
}

export interface SuccessStory {
  type: "full" | "card";
  image?: string;
  imageAlt?: string;
  badge?: string;
  metric?: string;
  title: string;
  body: string;
  points?: string[];
  icon?: LucideIcon;
  iconClass?: string;
  metricClass?: string;
}

export interface SuccessStoriesSection {
  eyebrow: string;
  title: string;
  description: string;
  stories: SuccessStory[];
}

export interface ServiceDetail {
  slug: string;
  pillarId: ServiceDetailPillar;
  icon: LucideIcon;
  title: string;
  badge: string;
  brief: string;
  overview: string;
  highlights: string[];
  specs: string[];
  metric?: string;
  image: string;
  inlineImage?: string;
  color?: string;
  pricing: PricingInfo;
  seo: SeoInfo;
  related?: string[];
  serviceAreas?: ServiceAreaSection;
  faqs?: FaqItem[];
  whyPartner?: WhyPartnerSection;
  successStories?: SuccessStoriesSection;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  // ---------- Software Development ----------
  {
    slug: "nextjs-apps",
    pillarId: "software-development",
    icon: Globe,
    title: "Enterprise Next.js Web Applications",
    badge: "Full-Stack Engineering",
    brief:
      "Custom React 19 & Next.js App Router applications engineered for extreme speed, SEO dominance, and infinite scale.",
    overview:
      "We build production-grade Next.js applications for New York businesses that need more than a template site — server-rendered architecture, edge caching, and a NestJS/Prisma backend that stays fast as your traffic and data grow.",
    highlights: ["Server-Side Rendering (SSR)", "Edge Middleware Routing", "Zero-Bundle Hydration"],
    specs: [
      "React Server Components (RSC) architecture for minimal client-side JavaScript",
      "Edge caching and Incremental Static Regeneration (ISR)",
      "TypeScript strict mode integration with zero-runtime type safety",
      "Sub-second page transitions and automated prefetching",
    ],
    color: "cyan",
    image: "/work/upwise-lms-platform.webp",
    pricing: { amount: "$9,500", unit: "one-time project", note: "Scope-dependent, scales with feature count" },
    seo: {
      title: "Enterprise Next.js Web Application Development | Vertex & Co. NYC",
      description:
        "Custom Next.js & React 19 web applications built for speed, SEO, and scale by Vertex & Co. — serving Manhattan, Brooklyn, Queens and clients nationwide.",
      keywords: [
        "Next.js development New York",
        "React 19 web application agency",
        "Enterprise Next.js developer NYC",
        "Manhattan Next.js agency",
      ],
    },
  },
  {
    slug: "landing-pages",
    pillarId: "software-development",
    icon: Sparkles,
    title: "High-Converting Landing Pages",
    badge: "Conversion Optimization",
    brief:
      "Pixel-perfect, high-impact landing pages built to wow investors and convert visitors into active subscribers.",
    overview:
      "Every landing page we ship is designed around one goal — conversion. We pair pixel-perfect Figma-to-code craft with sub-second load times and built-in analytics so you can see exactly what's working.",
    highlights: ["A/B Testing Architecture", "Micro-Animations & Motion", "300%+ Conversion Lift"],
    specs: [
      "Figma-to-code pixel perfection down to the exact rem/em grid",
      "Sub-300ms First Contentful Paint (FCP) anywhere on the globe",
      "Custom interactive product demos, pricing calculators, and lead capture forms",
      "Full analytics integration (PostHog, Google Analytics 4, Mixpanel)",
    ],
    color: "purple",
    image: "/service/fleeto-drone-delivery.webp",
    inlineImage: "/service/fleeto-drone-delivery-alt.webp",
    pricing: { amount: "$3,200", unit: "one-time project", note: "2-week turnaround on most builds" },
    seo: {
      title: "High-Converting Landing Page Design & Development | Vertex & Co.",
      description:
        "Bespoke, high-conversion landing pages built with Next.js and Tailwind CSS by Vertex & Co., New York City's growth-focused development team.",
      keywords: [
        "landing page design New York",
        "high converting landing pages",
        "Next.js landing page agency",
        "conversion rate optimization NYC",
      ],
    },
  },
  {
    slug: "design-systems",
    pillarId: "software-development",
    icon: LayoutGrid,
    title: "Custom Design Systems & Component Specs",
    badge: "UI/UX & Frontend",
    brief:
      "Reusable, accessible, and themeable React component libraries that maintain brand consistency across all touchpoints.",
    overview:
      "We design and build tokenized component libraries — typography, color, spacing, and elevation all documented and reusable — so your product stays visually consistent as your team and codebase grow.",
    highlights: ["Tailwind CSS v4 Engine", "Accessible WAI-ARIA", "Figma Token Sync"],
    specs: [
      "Tokenized color schemes, typography scales, and glassmorphism elevation layers",
      "Full dark/light mode switching with smooth color transitions",
      "Documented, reusable component libraries with automated visual regression testing",
      "Complete accessibility compliance (WCAG 2.1 AA level)",
    ],
    color: "emerald",
    image: "/service/elite-commerce-feature-showcase.webp",
    pricing: { amount: "$4,200", unit: "one-time project", note: "Includes full component documentation" },
    seo: {
      title: "Custom Design Systems & Component Libraries | Vertex & Co. NYC",
      description:
        "Accessible, themeable React & Tailwind design systems built by Vertex & Co. to keep your New York brand consistent across every product surface.",
      keywords: [
        "design system development",
        "React component library agency",
        "Tailwind CSS design system NYC",
        "UI UX design New York",
      ],
    },
  },
  {
    slug: "ui-ux-design",
    pillarId: "software-development",
    icon: PenTool,
    title: "UI/UX Design & Prototyping",
    badge: "UI/UX & Product Design",
    brief:
      "User-centered wireframes, interactive prototypes, and pixel-perfect visual design that turn complex products into intuitive experiences.",
    overview:
      "Before a single line of code is written, we map the user journey, wireframe every key flow, and design high-fidelity, interactive Figma prototypes — so what we build is validated with real usability feedback, not guesswork.",
    highlights: ["User Research & Journey Mapping", "Interactive Figma Prototypes", "Usability Testing & Iteration"],
    specs: [
      "User research, personas, and journey mapping to ground every design decision",
      "Low-fidelity wireframes through high-fidelity, pixel-perfect Figma mockups",
      "Interactive click-through prototypes for stakeholder review and usability testing",
      "Developer-ready handoff with design tokens, specs, and redlines",
    ],
    color: "blue",
    image: "/work/kids-modern-school.webp",
    pricing: { amount: "$2,800", unit: "one-time project", note: "Figma prototype + usability testing round" },
    seo: {
      title: "UI/UX Design & Prototyping Services | Vertex & Co. NYC",
      description:
        "User research, wireframing, and interactive Figma prototyping from Vertex & Co. — UI/UX design services for New York businesses that convert.",
      keywords: [
        "UI UX design agency New York",
        "Figma prototyping services",
        "product design agency NYC",
        "user research and wireframing",
      ],
    },
  },
  {
    slug: "speed-tuning",
    pillarId: "software-development",
    icon: Gauge,
    title: "Core Web Vitals & Speed Optimization",
    badge: "Performance Audit",
    brief:
      "We transform sluggish websites into 100/100 Lighthouse speed demons with sub-second page loads.",
    overview:
      "Slow sites lose customers and rankings. We run a full waterfall audit of your existing site, then tune images, scripts, fonts, and DOM size until Core Web Vitals are in the green.",
    highlights: ["Guaranteed 90+ Score", "Image & Script Tuning", "LCP / CLS Elimination"],
    specs: [
      "Comprehensive waterfall analysis and third-party script deferral",
      "Automatic next-gen image conversion (AVIF, WebP, responsive srcset)",
      "Critical CSS inline extraction and font display swapping",
      "DOM size reduction and main-thread execution optimization",
    ],
    color: "amber",
    image: "/work/carzone-car-marketplace.webp",
    pricing: { amount: "$1,900", unit: "one-time project", note: "Full audit plus implementation" },
    seo: {
      title: "Core Web Vitals & Website Speed Optimization | Vertex & Co.",
      description:
        "Guaranteed 90+ Lighthouse score speed optimization for New York businesses — Vertex & Co. fixes LCP, CLS, and slow load times.",
      keywords: [
        "Core Web Vitals optimization",
        "website speed optimization New York",
        "Lighthouse score improvement",
        "page speed agency NYC",
      ],
    },
  },
  {
    slug: "cms-cloud",
    pillarId: "software-development",
    icon: Database,
    title: "Database, API & Cloud Integrations",
    badge: "Backend Architecture",
    brief:
      "Robust backend data architecture paired with type-safe GraphQL/REST APIs and containerized cloud deployments.",
    overview:
      "From schema design to CI/CD, we build the backend that powers your product — PostgreSQL or MongoDB with Prisma ORM, secure API routes, and Dockerized pipelines with instant rollback.",
    highlights: ["PostgreSQL & MongoDB", "GraphQL & REST APIs", "Docker & CI/CD Pipelines"],
    specs: [
      "Relational (PostgreSQL) and NoSQL (MongoDB) schema modeling with Prisma ORM",
      "Structured content models with a live editorial preview environment",
      "Serverless-ready API routes with rate limiting and JWT authentication",
      "Dockerized deployment pipelines with GitHub CI/CD and instant rollback capability",
    ],
    color: "rose",
    image: "/service/medil-pharmacy-platform.webp",
    pricing: { amount: "$6,500", unit: "one-time project", note: "Includes schema design and CI/CD setup" },
    seo: {
      title: "Database, API & Cloud Integration Services | Vertex & Co. NYC",
      description:
        "NestJS, Prisma, PostgreSQL & MongoDB backend architecture and cloud integrations built by Vertex & Co. for New York businesses.",
      keywords: [
        "NestJS backend development",
        "Prisma ORM developer New York",
        "API development agency NYC",
        "cloud integration services",
      ],
    },
  },
  // ---------- AI Automation ----------
  {
    slug: "ai-chatbots",
    pillarId: "ai-automation",
    icon: MessageSquareCode,
    title: "Custom AI Chatbots & Support Agents",
    badge: "Conversational AI",
    brief:
      "Trained on your business knowledge base, product docs, and customer FAQs for instant 24/7 resolution.",
    overview:
      "We build custom chatbots powered by GPT-4o and Claude, trained on your own documentation and support history, so customers get accurate answers around the clock instead of waiting in a queue.",
    highlights: [
      "OpenAI GPT-4o & Claude 3.5 Integration",
      "Multi-Language Conversational AI",
      "Instant Ticket Escalation",
    ],
    specs: [
      "OpenAI GPT-4o & Claude 3.5 Integration",
      "Multi-Language Conversational AI",
      "Instant Ticket Escalation",
    ],
    color: "cyan",
    image: "/service/ceon-ai-car-assistant.webp",
    inlineImage: "/service/ceon-ai-car-assistant-alt.webp",
    pricing: { amount: "$4,500", unit: "one-time project", note: "Optional monthly retainer for ongoing tuning" },
    seo: {
      title: "Custom AI Chatbot Development | Vertex & Co. New York",
      description:
        "Custom GPT-4o & Claude-powered chatbots trained on your business knowledge base, built by Vertex & Co. for 24/7 customer support.",
      keywords: [
        "AI chatbot development New York",
        "custom GPT chatbot agency",
        "AI customer support agent",
        "conversational AI development NYC",
      ],
    },
  },
  {
    slug: "crm-automation",
    pillarId: "ai-automation",
    icon: Workflow,
    title: "Automated Lead & CRM Workflows",
    badge: "Marketing Automation",
    brief:
      "Connect your landing pages, ads, and CRM with intelligent automated follow-ups.",
    overview:
      "We connect your landing pages, ad platforms, and CRM (HubSpot, GoHighLevel, Salesforce) with automated lead scoring, enrichment, and SMS/email follow-up sequences so no lead goes cold.",
    highlights: [
      "Instant Lead Scoring & Enrichment",
      "Automated SMS & Email Sequences",
      "Make.com & Zapier AI Webhooks",
    ],
    specs: [
      "Instant Lead Scoring & Enrichment",
      "Automated SMS & Email Sequences",
      "Make.com & Zapier AI Webhooks",
    ],
    color: "purple",
    image: "/work/renter-real-estate.webp",
    pricing: { amount: "$3,800", unit: "one-time project", note: "Per connected CRM/ad platform" },
    seo: {
      title: "CRM & Lead Automation Workflows | Vertex & Co. NYC",
      description:
        "Automated lead scoring, CRM integrations, and follow-up workflows built by Vertex & Co. to help New York businesses convert more leads.",
      keywords: [
        "CRM automation agency New York",
        "lead automation workflows",
        "HubSpot GoHighLevel integration",
        "marketing automation NYC",
      ],
    },
  },
  {
    slug: "llm-integration",
    pillarId: "ai-automation",
    icon: Cpu,
    title: "Custom LLM & API Integration",
    badge: "AI Integration",
    brief:
      "Embed cutting-edge AI capabilities directly into your Next.js web application or mobile app.",
    overview:
      "We integrate retrieval-augmented generation, vector databases, and fine-tuned models directly into your product — turning your existing app into an AI-powered one without a rebuild.",
    highlights: [
      "RAG (Retrieval-Augmented Generation)",
      "Vector Database (Pinecone)",
      "Fine-Tuned Specialized AI Models",
    ],
    specs: [
      "RAG (Retrieval-Augmented Generation)",
      "Vector Database (Pinecone)",
      "Fine-Tuned Specialized AI Models",
    ],
    color: "emerald",
    image: "/service/homebase-property-management.webp",
    pricing: { amount: "$6,800", unit: "one-time project", note: "Scope-dependent on model & data volume" },
    seo: {
      title: "Custom LLM & AI API Integration Services | Vertex & Co.",
      description:
        "RAG, vector database, and fine-tuned LLM integrations built into your Next.js or mobile app by Vertex & Co., New York City's AI development team.",
      keywords: [
        "LLM integration agency New York",
        "RAG development services",
        "custom AI API integration",
        "vector database development NYC",
      ],
    },
  },
  {
    slug: "process-automation",
    pillarId: "ai-automation",
    icon: Zap,
    title: "Internal Business Process Automation",
    badge: "Business Process Automation",
    brief:
      "Automate repetitive administrative tasks, invoice processing, content generation, and data extraction.",
    overview:
      "We identify the manual, repetitive work draining your team's time — document parsing, report generation, data entry — and replace it with AI-driven automation that runs in the background.",
    highlights: [
      "PDF & Document Parsing AI",
      "Automated Report Generation",
      "90%+ Reduction in Manual Operations",
    ],
    specs: [
      "PDF & Document Parsing AI",
      "Automated Report Generation",
      "90%+ Reduction in Manual Operations",
    ],
    color: "amber",
    image: "/work/elite-commerce-marketplace.webp",
    pricing: { amount: "$3,200", unit: "one-time project", note: "Per automated workflow" },
    seo: {
      title: "Business Process Automation with AI | Vertex & Co. NYC",
      description:
        "AI-driven document parsing, report generation, and workflow automation built by Vertex & Co. to cut manual operations for New York businesses.",
      keywords: [
        "business process automation New York",
        "AI document parsing agency",
        "workflow automation NYC",
        "operations automation agency",
      ],
    },
  },
  // ---------- Marketing & Growth ----------
  {
    slug: "local-seo-pa",
    pillarId: "marketing-seo",
    icon: MapPin,
    title: "Local SEO & Google Business Profile",
    badge: "Local NYC Focus",
    brief:
      "We optimize your local business listing, build geo-targeted New York citations, and drive high-intent local calls and visits.",
    overview:
      "Dominating the Google Maps 3-pack in Manhattan, Brooklyn, and Queens takes more than a listing claim. We manage your Google Business Profile, citation consistency, review velocity, and geo-targeted landing pages together.",
    highlights: [
      "Top 3 Local Map Pack Rankings",
      "Hyper-Local Keyword Targeting",
      "Increased High-Intent Foot Traffic",
      "Review Velocity & Reputation Management",
    ],
    specs: [
      "Google Business Profile (GMB) Complete Optimization",
      "New York Local Citation & NAP Consistency Audit",
      "Geotargeted NYC Landing Pages (Manhattan, Brooklyn, Queens)",
      "Local Schema Markup & Ongoing Review Monitoring",
    ],
    metric: "+380% Local Map Views & Calls",
    color: "emerald",
    image: "/work/jacob-jones-legal.webp",
    pricing: { amount: "$900", unit: "per month", note: "3-month minimum engagement" },
    related: ["aeo-geo", "google-ads", "technical-seo"],
    serviceAreas: {
      title: "Targeted New York City Local SEO Services",
      description:
        "We provide dedicated, hyper-local search engine optimization across all major NYC neighborhoods and boroughs to help you dominate your local market.",
      regions: [
        { city: "Manhattan", desc: "Search engine optimization Manhattan", keywords: ["SEO company Manhattan NY", "Local SEO NYC"] },
        { city: "Brooklyn", desc: "Search engine optimization Brooklyn NY", keywords: ["SEO Brooklyn", "Search engine optimization NY"] },
        { city: "Queens", desc: "Search engine optimization Queens NY", keywords: ["SEO Queens", "Local SEO NYC"] },
        { city: "The Bronx", desc: "Search engine optimization Bronx NY", keywords: ["Local SEO Bronx"] },
        { city: "Staten Island", desc: "Search engine optimization Staten Island", keywords: ["SEO Staten Island"] },
        { city: "Hudson Valley", desc: "SEO Hudson Valley NY", keywords: ["SEO services Hudson Valley", "Local SEO NY"] },
      ],
    },
    successStories: {
      eyebrow: "Proven Results",
      title: "Our Creative Local SEO Successes",
      description:
        "See how our New York SEO expert team transforms local visibility into real-world revenue.",
      stories: [
        {
          type: "full",
          image: "/service/local-seo-pa/google-business-profile-success.png",
          imageAlt: "Google Business Profile SEO Success",
          badge: "Google Business Profile Optimization",
          metric: "+12k Interactions",
          title: "Dominate the NYC Local Pack",
          body: "By optimizing the Google Business Profile, we helped this client achieve over 12,800 customer interactions. Our local SEO consulting New York strategies ensure your business ranks in the top 3 map pack results, driving foot traffic and high-intent calls directly to your store.",
          points: [
            "Complete profile optimization & verification",
            "Review generation & management",
            "Local keyword targeting for NYC neighborhoods",
          ],
        },
        {
          type: "card",
          icon: TrendingUp,
          iconClass: "text-accent-secondary",
          metric: "+5.4K Clicks",
          metricClass: "bg-accent-secondary",
          title: "Organic Traffic Growth",
          image: "/service/local-seo-pa/Organic-Traffic-Growth.png",
          imageAlt: "Organic Traffic Growth Chart NY",
          body: "Google Search Console and Analytics growth for an NYC client demonstrated our search engine optimization New York capabilities.",
        },
        {
          type: "card",
          icon: MapPin,
          iconClass: "text-accent-warm",
          metric: "129 Total Leads",
          metricClass: "bg-accent-warm",
          title: "Lead Generation Surge",
          image: "/service/local-seo-pa/Lead-Generation-Surge.png",
          imageAlt: "Lead Generation Surge NY",
          body: "How our New York local SEO services converted traffic into paying customers.",
        },
      ],
    },
    faqs: [
      {
        question: "Who is the leading Local SEO provider in New York City?",
        answer:
          "Vertex & Co. is a New York City-based Local SEO provider specializing in helping businesses dominate local search across the five boroughs — from Manhattan and Brooklyn to Queens and Staten Island. We combine Google Business Profile optimization, citation building, review generation, and multi-location strategies to help NYC businesses show up in the Google Maps '3-pack' and drive more calls, clicks, and foot traffic.",
      },
      {
        question: "What is Local SEO and why does my New York business need it?",
        answer:
          "Local SEO focuses on optimizing your online presence to attract more business from relevant local searches. For NYC businesses, it means appearing in the Google Maps '3-pack' when customers in your specific borough or neighborhood search for your services.",
      },
      {
        question: "How long does it take to see results from Local SEO?",
        answer:
          "Typically, noticeable improvements in local rankings and traffic take between 3 to 6 months. This timeline depends on your current digital footprint, the competitiveness of your industry in your specific NYC area, and the consistency of optimization efforts.",
      },
      {
        question: "Do I need a physical storefront to benefit from Local SEO?",
        answer:
          "No! Service-area businesses (like plumbers, electricians, or consultants) who travel to customers in New York can also dominate local search by correctly setting up their Google Business Profile to target specific service areas rather than a single physical address.",
      },
      {
        question: "How important are customer reviews for local rankings?",
        answer:
          "Customer reviews are a major ranking factor for the Google Local Pack. We help you implement automated review generation strategies to consistently build 5-star reviews, signaling trust and authority to both Google and potential customers.",
      },
      {
        question: "What are local citations and why do they matter?",
        answer:
          "Citations are online mentions of your business's Name, Address, and Phone number (NAP). Consistent citations across directories (like Yelp, YellowPages, and local NYC business networks) validate your business's legitimacy to search engines, boosting your local ranking.",
      },
      {
        question: "Can you help us rank in multiple neighborhoods across New York?",
        answer:
          "Yes. We create highly optimized, geo-targeted landing pages for each area you serve (e.g., one for Manhattan, one for Brooklyn) and build a multi-location SEO strategy to capture traffic across different New York City regions.",
      },
      {
        question: "Is my Google Business Profile (GMB) really that important?",
        answer:
          "Absolutely. Your Google Business Profile is the cornerstone of Local SEO. An optimized profile with updated photos, accurate hours, Q&As, and regular posts is often the first thing customers see and the primary driver of high-intent phone calls or direction requests.",
      },
      {
        question: "How do you track the success of your Local SEO campaigns?",
        answer:
          "We provide transparent, monthly reporting that tracks concrete metrics: phone calls generated from Google Maps, website clicks, direction requests, and keyword ranking improvements specific to your targeted New York areas.",
      },
    ],
    whyPartner: {
      title: "Why Partner With Our New York City SEO Agency?",
      body: "When searching for an SEO company New York businesses trust, you need a team that understands the local nuances from Manhattan to Brooklyn, and Queens to Staten Island. We don't just provide generic search engine optimization NY; we deliver tailor-made SEO services in New York designed to outrank your specific local competitors. As a premier New York City SEO company, our data-driven approach ensures your investment turns into measurable growth.",
      tags: [
        "Search Engine Marketing NYC",
        "Local SEO Services NYC",
        "New York SEO Expert",
        "Search Engine Optimization New York",
      ],
    },
    seo: {
      title: "Local SEO & Google Business Profile Management | New York City",
      description:
        "Dominate the Google Maps 3-pack across Manhattan, Brooklyn & Queens with Vertex & Co.'s New York City local SEO services.",
      keywords: [
        "local SEO New York",
        "Google Business Profile management NYC",
        "Manhattan local SEO agency",
        "Brooklyn Google Maps ranking",
      ],
    },
  },
  {
    slug: "aeo-geo",
    pillarId: "marketing-seo",
    icon: Bot,
    title: "AEO (Answer Engine) & GEO (Generative Engine) Optimization",
    badge: "Future-Proof AI Search",
    brief:
      "We structure your site's knowledge graph and Q&A schemas so AI engines like ChatGPT, Gemini, and Perplexity cite your business first.",
    overview:
      "Search is evolving into AI answers. We build the semantic entity data, structured Q&A content, and JSON-LD schemas that get your business directly cited in ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews.",
    highlights: [
      "Semantic Entity & Knowledge Graph Architecture",
      "JSON-LD Microdata & Micro-Format Schemas",
      "LLM Direct Citation Content Structuring",
      "Perplexity & ChatGPT Search Indexing Audit",
    ],
    specs: [
      "Semantic Entity & Knowledge Graph Architecture",
      "JSON-LD Microdata & Micro-Format Schemas",
      "LLM Direct Citation Content Structuring",
      "Perplexity & ChatGPT Search Indexing Audit",
    ],
    metric: "94% AI Answer Citation Rate",
    color: "purple",
    image: "/work/africa-tours-travel.webp",
    pricing: { amount: "$1,200", unit: "per month", note: "Includes quarterly schema & citation audits" },
    seo: {
      title: "AEO & GEO: AI Search Optimization for ChatGPT & Gemini | Vertex & Co.",
      description:
        "Get cited by ChatGPT, Perplexity, Gemini & Google AI Overviews with Vertex & Co.'s Answer Engine and Generative Engine Optimization services.",
      keywords: [
        "AEO Answer Engine Optimization",
        "GEO Generative Engine Optimization",
        "AI search optimization agency",
        "ChatGPT SEO New York",
      ],
    },
  },
  {
    slug: "google-ads",
    pillarId: "marketing-seo",
    icon: Search,
    title: "Google Ads & PPC Performance Campaigns",
    badge: "Instant ROI",
    brief:
      "High-converting Search, Shopping, Display & YouTube ad campaigns that stop wasting budget on irrelevant clicks.",
    overview:
      "We build negative keyword lists, high-converting ad copy, and dedicated Next.js landing pages tuned for maximum Quality Score — so every dollar of ad spend works harder. We don't just chase clicks; we track actual revenue, phone calls, and qualified leads.",
    highlights: [
      "Instant High-Intent Lead Generation",
      "Maximized Return on Ad Spend (ROAS)",
      "Lower Cost-Per-Acquisition (CPA)",
      "Top of Page 1 Visibility in 24 Hours",
    ],
    specs: [
      "Deep Keyword Research & Negative Keyword Filtering",
      "Ad Copy A/B Testing & Dynamic Insertion",
      "Advanced Conversion Tracking (GA4, GTM & Server CAPI)",
      "Dedicated High-Converting Landing Page Design",
    ],
    metric: "3.8x Average Return on Ad Spend (ROAS)",
    color: "cyan",
    image: "/work/carzone-car-marketplace.webp",
    pricing: { amount: "$1,500", unit: "per month", note: "Management fee — ad spend billed separately" },
    related: ["local-seo-pa", "technical-seo", "facebook-ads"],
    serviceAreas: {
      title: "Targeted New York Google Ads Services",
      description:
        "We provide laser-focused, data-driven PPC campaigns across all major NYC areas to maximize your ROAS and dominate paid search.",
      regions: [
        { city: "Manhattan", desc: "PPC Management Manhattan", keywords: ["Google Ads agency Manhattan", "PPC NYC"] },
        { city: "Brooklyn", desc: "Google Ads Brooklyn NY", keywords: ["Brooklyn PPC company", "Ads management Brooklyn"] },
        { city: "Queens", desc: "Paid Search Queens", keywords: ["Google Ads Queens", "PPC NY"] },
        { city: "The Bronx", desc: "PPC Agency Bronx NY", keywords: ["Bronx Ads expert"] },
        { city: "Staten Island", desc: "PPC services Staten Island", keywords: ["Staten Island Google Ads"] },
        { city: "Long Island", desc: "Google Ads Long Island NY", keywords: ["PPC services Long Island", "Paid Search NY"] },
      ],
    },
    successStories: {
      eyebrow: "Proven ROAS",
      title: "Our Google Ads Success Stories",
      description:
        "See how our New York PPC experts scale paid search campaigns into highly profitable revenue channels.",
      stories: [
        {
          type: "full",
          image: "/service/google-campaign/google-ads-success-stories.webp",
          imageAlt: "Google Ads ROAS Success",
          badge: "Search Campaign Scaling",
          metric: "+450% ROAS",
          title: "Dominating Paid Search & Lowering CPA",
          body: "By restructuring ad groups, aggressively filtering negative keywords, and launching dedicated landing pages, we helped this client achieve a massive Return on Ad Spend. Our PPC management New York strategies ensure you only pay for highly qualified clicks.",
          points: [
            "Negative keyword elimination",
            "Advanced GA4 & CAPI Conversion Tracking",
            "Continuous ad copy A/B testing",
          ],
        },
      ],
    },
    faqs: [
      {
        question: "How soon can I see results from a Google Ads campaign?",
        answer:
          "Unlike SEO, which takes months to build momentum, Google Ads can generate high-intent traffic and leads within 24 to 48 hours of launch. It's the fastest way for your New York business to appear at the very top of search results.",
      },
      {
        question: "What is a good Return on Ad Spend (ROAS)?",
        answer:
          "A healthy ROAS depends on your profit margins, but we typically aim for a minimum of 300% to 400% (3x - 4x) for our service-based and e-commerce clients. Our goal is to ensure every dollar you put into Google Ads generates profitable revenue.",
      },
      {
        question: "Why should I hire an agency instead of running Google Ads myself?",
        answer:
          "Google Ads is incredibly complex. Without proper negative keyword lists, precise match types, and advanced conversion tracking, it's easy to waste thousands of dollars on irrelevant clicks. We protect your budget and maximize your Quality Score to lower your cost-per-click.",
      },
      {
        question: "Do you manage Google Shopping and YouTube Ads?",
        answer:
          "Yes! Alongside standard Search campaigns, we build highly profitable Google Shopping feeds for e-commerce brands and create engaging YouTube TrueView video campaigns to capture attention across the entire Google network.",
      },
      {
        question: "How does a dedicated landing page improve my Google Ads?",
        answer:
          "Sending ad traffic to a generic homepage kills conversions. We build custom, lightning-fast Next.js landing pages that exactly match the intent of your ad. This increases your Google Quality Score, which lowers your ad costs and skyrockets your conversion rate.",
      },
      {
        question: "Can you target specific areas in New York City?",
        answer:
          "Absolutely. We use granular geo-targeting to focus your ad spend only on specific zip codes, radii, or neighborhoods like Manhattan, Brooklyn, or Queens. We can even exclude areas where you don't want to show up.",
      },
      {
        question: "Do you track phone calls and form submissions?",
        answer:
          "Yes. We implement robust tracking using Google Tag Manager and GA4. We track every phone call, form fill, and purchase, tying it back to the exact keyword that generated the lead so we know exactly what is driving ROI.",
      },
      {
        question: "What is included in your monthly management fee?",
        answer:
          "Our management includes continuous bid optimization, A/B testing ad copy, adding negative keywords, monitoring search terms, scaling profitable campaigns, and providing you with a transparent monthly performance report.",
      },
    ],
    whyPartner: {
      title: "Why Partner With Our New York Google Ads Agency?",
      body: "When searching for a Google Ads agency New York businesses trust, you need a team that focuses on ROAS, not just impressions. We deliver tailor-made PPC management in New York designed to eliminate wasted spend, track every conversion, and outbid your local competitors across the five boroughs profitably. As a premier New York PPC company, our data-driven approach ensures your ad spend turns into measurable, scalable revenue.",
      tags: [
        "Google Ads NY",
        "PPC Management Services NYC",
        "New York Paid Search Expert",
        "PPC Agency New York",
      ],
    },
    seo: {
      title: "Google Ads & PPC Management Agency | Vertex & Co. NYC",
      description:
        "Data-driven Google Ads, Shopping & YouTube PPC campaigns managed by Vertex & Co. to drive qualified leads across New York City with high ROAS.",
      keywords: [
        "Google Ads agency New York",
        "PPC management NYC",
        "Google Ads management Manhattan",
        "pay per click advertising agency",
      ],
    },
  },
  {
    slug: "facebook-ads",
    pillarId: "marketing-seo",
    icon: Target,
    title: "Facebook Ads & Meta Advertising",
    badge: "Scale Sales",
    brief:
      "Instagram, Facebook Feed & retargeting funnels with iOS-proof Conversions API tracking.",
    overview:
      "We reach your ideal customers with high-converting video ads, dynamic product carousels, lookalike audience targeting, and Meta Conversions API tracking that survives iOS privacy changes.",
    highlights: [
      "Audience Segmentation & Lookalike Modeling",
      "High-Performing Ad Creative & Video Editing",
      "Meta Conversions API (CAPI) Setup",
      "Retargeting Funnels & Customer LTV Retargeting",
    ],
    specs: [
      "Audience Segmentation & Lookalike Modeling",
      "High-Performing Ad Creative & Video Editing",
      "Meta Conversions API (CAPI) Setup",
      "Retargeting Funnels & Customer LTV Retargeting",
    ],
    metric: "+290% Qualified Leads Generated",
    color: "blue",
    image: "/work/nola-furniture-ecommerce.webp",
    pricing: { amount: "$1,400", unit: "per month", note: "Management fee — ad spend billed separately" },
    seo: {
      title: "Facebook & Instagram Ads Management | Vertex & Co. NYC",
      description:
        "High-converting Facebook & Instagram ad campaigns with Meta Conversions API tracking, managed by Vertex & Co. for New York brands.",
      keywords: [
        "Facebook ads agency New York",
        "Meta advertising management NYC",
        "Instagram ads agency",
        "Facebook Conversions API setup",
      ],
    },
  },
  {
    slug: "technical-seo",
    pillarId: "marketing-seo",
    icon: TrendingUp,
    title: "Full Organic & Technical SEO",
    badge: "Long-Term Growth",
    brief:
      "100/100 Core Web Vitals, on-page SEO, and high-authority backlink acquisition to climb to #1 on Google.",
    overview:
      "We audit site architecture, eliminate crawl errors, optimize on-page headers, and execute white-hat link acquisition — the full technical and organic SEO stack, not just a keyword report.",
    highlights: [
      "Top-Ranking Organic Visibility",
      "100/100 Core Web Vitals Performance",
      "Increased Domain Authority & Trust",
      "Error-Free Crawl & Indexing Architecture",
    ],
    specs: [
      "Comprehensive Technical SEO Site Audit & Fixes",
      "NYC-Focused Keyword Mapping & Search Intent Alignment",
      "On-Page Headings, Meta Tags & Schema Optimization",
      "White-Hat Link Building & Digital PR Campaigns",
    ],
    metric: "#1 Ranking for Primary Keywords",
    color: "amber",
    image: "/work/sprolt-education-institute.webp",
    pricing: { amount: "$1,100", unit: "per month", note: "3-month minimum engagement" },
    related: ["aeo-geo", "google-ads", "content-smm"],
    serviceAreas: {
      title: "Targeted New York SEO Services",
      description:
        "We provide dedicated, data-driven organic and technical SEO across all major NYC areas to help you dominate search results.",
      regions: [
        { city: "Manhattan", desc: "Organic SEO Manhattan", keywords: ["SEO agency Manhattan", "technical SEO NY"] },
        { city: "Brooklyn", desc: "Technical SEO Brooklyn", keywords: ["Brooklyn SEO company", "SEO services Brooklyn"] },
        { city: "Queens", desc: "Search engine optimization Queens", keywords: ["Organic SEO Queens", "SEO NY"] },
        { city: "The Bronx", desc: "Organic SEO Bronx", keywords: ["Bronx SEO expert"] },
        { city: "Staten Island", desc: "SEO services Staten Island", keywords: ["Staten Island SEO company"] },
        { city: "Long Island", desc: "Technical SEO Long Island NY", keywords: ["SEO services Long Island", "Organic SEO NY"] },
      ],
    },
    faqs: [
      {
        question: "What is the difference between Technical SEO and Local SEO?",
        answer:
          "While Local SEO focuses on map packs and local intent for your NYC business, Technical SEO focuses on how well search engines can crawl, index, and understand your entire website's architecture. Both work together, but Technical SEO ensures your site's foundation is flawless.",
      },
      {
        question: "Why are Core Web Vitals important for my New York business?",
        answer:
          "Google uses Core Web Vitals (speed, interactivity, and visual stability) as a direct ranking factor. If your site is slow to load for users in Manhattan or Brooklyn, Google will penalize your rankings. We optimize your code and assets to achieve 90+ Lighthouse scores.",
      },
      {
        question: "How long does a technical SEO audit take?",
        answer:
          "A comprehensive technical audit typically takes 1 to 2 weeks, depending on the size of your website. We identify crawl errors, toxic backlinks, broken redirects, and architecture flaws that are holding your New York organic rankings back.",
      },
      {
        question: "Do you offer white-hat link building?",
        answer:
          "Yes. Authority link building is a core part of our organic SEO strategy. We acquire high-quality, relevant backlinks through digital PR, guest posting, and targeted outreach to boost your domain authority without risking Google penalties.",
      },
      {
        question: "Can Technical SEO help recover from a Google core update penalty?",
        answer:
          "Absolutely. If your site dropped in rankings after a Google algorithm update, it's often due to thin content, toxic backlinks, or poor user experience. Our technical SEO services diagnose the exact cause and implement a step-by-step recovery plan.",
      },
      {
        question: "What is crawl budget and why does it matter?",
        answer:
          "Crawl budget is the number of pages Google bot crawls on your site within a given timeframe. If you have thousands of low-value or duplicate pages, Google might miss your important money pages. We optimize your architecture to maximize your crawl budget efficiently.",
      },
      {
        question: "Will you optimize our site's Schema markup?",
        answer:
          "Yes! We implement advanced JSON-LD structured data (like FAQPage, LocalBusiness, Article, and Service schemas) so search engines can better understand your content and reward you with rich snippets in the search results.",
      },
      {
        question: "How do we track the ROI of Organic SEO?",
        answer:
          "We integrate Google Analytics 4 and Google Search Console to track exact organic traffic growth, keyword ranking improvements, and conversion events (like form fills and phone calls) so you can see the direct revenue impact of our SEO work.",
      },
    ],
    whyPartner: {
      title: "Why Partner With Our New York SEO Agency?",
      body: "When searching for an SEO company New York businesses trust, you need a team that focuses on technical excellence, not just basic keyword stuffing. We deliver tailor-made organic SEO services in New York designed to resolve deep technical issues, build high-authority links, and outrank your local competitors across the five boroughs. As a premier New York SEO company, our data-driven approach ensures your investment turns into sustainable, long-term growth.",
      tags: [
        "Technical SEO NY",
        "Organic SEO Services NYC",
        "New York SEO Expert",
        "SEO Agency New York",
      ],
    },
    seo: {
      title: "Technical & Organic SEO Services | Vertex & Co. New York",
      description:
        "Full technical SEO audits, on-page optimization, and white-hat link building from Vertex & Co. to grow your New York business's organic rankings.",
      keywords: [
        "technical SEO agency New York",
        "organic SEO services NYC",
        "SEO audit Manhattan",
        "link building agency",
      ],
    },
  },
  {
    slug: "content-smm",
    pillarId: "marketing-seo",
    icon: FileText,
    title: "Content Writing & Social Media Marketing (SMM)",
    badge: "Brand Authority",
    brief:
      "High-converting copywriting, SEO blogs, and social media content across LinkedIn, X, Instagram & Facebook.",
    overview:
      "We engage your audience with persuasive copywriting, SEO-driven pillar articles, and a consistent social content calendar — building brand authority that compounds over time.",
    highlights: [
      "SEO-Optimized Pillar Articles & Thought Leadership",
      "High-Converting Landing Page Copywriting",
      "Social Media Content Calendar & Graphic Design",
      "Community Engagement & Brand Building",
    ],
    specs: [
      "SEO-Optimized Pillar Articles & Thought Leadership",
      "High-Converting Landing Page Copywriting",
      "Social Media Content Calendar & Graphic Design",
      "Community Engagement & Brand Building",
    ],
    metric: "+420% Organic Social Engagement",
    color: "rose",
    image: "/work/skill-online-learning.webp",
    pricing: { amount: "$1,000", unit: "per month", note: "Includes 4 pillar articles + social calendar" },
    seo: {
      title: "Content Writing & Social Media Marketing | Vertex & Co. NYC",
      description:
        "SEO content writing and social media marketing services from Vertex & Co. to build brand authority for New York businesses.",
      keywords: [
        "content marketing agency New York",
        "social media marketing NYC",
        "SEO copywriting services",
        "content writing agency Manhattan",
      ],
    },
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}

export function getRelatedServiceDetails(
  service: ServiceDetail,
  limit = 3,
): ServiceDetail[] {
  if (service.related) {
    return service.related
      .map((slug) => getServiceDetail(slug))
      .filter((entry): entry is ServiceDetail => Boolean(entry))
      .slice(0, limit);
  }
  return SERVICE_DETAILS.filter(
    (entry) => entry.pillarId === service.pillarId && entry.slug !== service.slug,
  ).slice(0, limit);
}