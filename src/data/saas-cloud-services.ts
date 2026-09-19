import { Cloud, Layers, Palette } from "lucide-react";
import type { BaseServiceDetail } from "@/data/service-details";
import type { ServiceLocalContent } from "@/data/service-local-content";

/**
 * SaaS, SaaS design and cloud application services.
 *
 * Each service targets one search-intent cluster so the pages do not compete
 * with each other:
 *   saas-development             -> SaaS development / product development / consulting
 *   saas-web-design              -> SaaS website, web, UX and brand design
 *   cloud-application-development -> cloud application / software development
 *
 * Informational keywords (what is B2B SaaS, valuation metrics, payments,
 * subscriptions, enterprise applications, field service software) are answered
 * in `extraSections` and FAQs, where the searcher's intent is actually met.
 *
 * NOTE: the starting prices below are placeholders consistent with
 * data/pricing.ts. Confirm them before launch.
 */

export const SAAS_CLOUD_DETAILS: BaseServiceDetail[] = [
  {
    slug: "saas-development",
    pillarId: "software-development",
    icon: Layers,
    title: "SaaS Development",
    badge: "SaaS Product Engineering",
    brief:
      "From idea to multi-tenant platform: product strategy, design, engineering, billing and cloud infrastructure from one senior New York team.",
    overview:
      "We build custom SaaS products for founders, startups and established companies that want to sell software by subscription. That covers the whole path: validating the idea, designing the product, engineering a multi-tenant application with authentication, roles and billing, and running it on cloud infrastructure that scales as your customer count grows.",
    highlights: [
      "Multi-tenant architecture built for growth",
      "Subscription billing and payments from day one",
      "Senior-only team, fixed-price milestones",
      "You own all source code and IP",
    ],
    specs: [
      "Product discovery, roadmap and MVP scoping",
      "Multi-tenant architecture with roles, permissions and audit logs",
      "Authentication, SSO options and secure API design",
      "Subscription billing, invoicing and usage metering (Stripe)",
      "Admin dashboards, analytics and customer onboarding flows",
      "Cloud deployment, CI/CD, monitoring and backups",
    ],
    metric: "MVP to multi-tenant platform, one team",
    color: "cyan",
    image: "/work/ecommerce-saas.webp",
    pricing: {
      amount: "$24,000",
      unit: "one-time project",
      note: "Typical MVP to multi-tenant platform, scope-dependent",
    },
    related: ["saas-web-design", "cloud-application-development", "cms-cloud"],
    extraSections: [
      {
        eyebrow: "Process",
        title: "Our SaaS product development process.",
        body:
          "A predictable process is the difference between a launch and an expensive experiment. Every SaaS build follows the same four phases, and you approve the scope and price before each one starts.",
        points: [
          "Discover: user interviews, competitor review, a prioritised roadmap and a written MVP scope",
          "Design: user flows, interactive Figma prototypes and a design system, tested with real users",
          "Build: multi-tenant architecture, core features, billing and integrations in weekly demos",
          "Launch and grow: production deployment, monitoring, analytics and a plan for the next release",
        ],
      },
      {
        eyebrow: "B2B SaaS",
        title: "What is B2B SaaS, and what does it mean for your build?",
        body:
          "B2B SaaS (business-to-business software as a service) is software that companies buy on subscription, hosted by the vendor and accessed through the browser. Compared with consumer products, B2B SaaS usually needs team accounts, role-based access, single sign-on, audit trails and integrations with the tools a customer already runs. Those requirements shape the architecture from the first sprint. AI B2B SaaS adds a model layer on top: features such as search, drafting, classification or forecasting powered by language models, grounded in the customer's own data.",
        points: [
          "Team workspaces, roles and permissions",
          "Integrations and public APIs",
          "Security and compliance readiness for enterprise buyers",
          "AI features grounded in each customer's data, with clear data boundaries",
        ],
      },
      {
        eyebrow: "Payments",
        title: "Payments, subscriptions and how SaaS companies make money.",
        body:
          "Most SaaS revenue is recurring, so billing is part of the product, not an afterthought. We integrate Stripe Billing or your preferred processor to handle plans, free trials, upgrades, proration, invoices, failed-payment retries and receipts. For US SaaS companies we also plan for sales tax, ACH and card payments, refunds and revenue reporting from the start.",
        points: [
          "Flat, per-seat, tiered and usage-based pricing models",
          "Free trials, coupons and annual-plan discounts",
          "Automatic retries and dunning emails for failed payments",
          "Customer self-service portal for plans, cards and invoices",
          "Sales tax handling and revenue reporting hooks",
        ],
      },
      {
        eyebrow: "Enterprise",
        title: "Enterprise application development, without the usual pain.",
        body:
          "An enterprise-level application is software built for large organisations: many users, several departments, strict security and integration with existing systems. The common challenges are integrating with legacy systems, meeting security and compliance requirements, managing data at scale, keeping performance steady under load and getting many stakeholders to adopt the tool. We plan for these in the architecture and the rollout, not after launch.",
        points: [
          "Legacy and third-party system integration",
          "Role-based access, encryption and audit logging",
          "Performance and scalability testing before release",
          "Change management and phased rollouts to reduce adoption risk",
        ],
      },
      {
        eyebrow: "Field Service",
        title: "Field service management software, built to fit.",
        body:
          "Field service businesses such as HVAC, electrical, cleaning and installation companies run on scheduling, dispatch, quoting and invoicing. For a small business with standard needs, an off-the-shelf field service management tool is usually the right first step, and several offer free trials or entry plans. When your workflow does not fit those tools, or you want to sell field service software to an industry of your own, we build custom mobile field service management software.",
        points: [
          "Job scheduling, dispatch and technician routing",
          "Mobile app for technicians with photos, checklists and signatures",
          "Quotes, invoices and payments in one flow",
          "Customer notifications and service history",
        ],
      },
    ],
  },

  {
    slug: "saas-web-design",
    pillarId: "software-development",
    icon: Palette,
    title: "SaaS Website & UX Design",
    badge: "SaaS Design & Brand",
    brief:
      "Brand identity, marketing websites and product UX for SaaS companies, designed to explain a complex product fast and turn visitors into trials and demos.",
    overview:
      "We are a design and development team for SaaS companies. We create the brand identity, design and build the marketing website and landing pages, and design the product interface so the story you tell on the website matches the experience inside the app. Everything is built on a shared design system, so it stays consistent as you ship.",
    highlights: [
      "Positioning and messaging for B2B buyers",
      "Fast, SEO-ready Next.js marketing sites",
      "Product UX and design systems in one team",
      "Brand identity that scales across every surface",
    ],
    specs: [
      "Brand identity: logo, colour, typography and voice guidelines",
      "SaaS website design and development on Next.js",
      "Pricing, feature and comparison pages built to convert",
      "High-converting landing pages with A/B testing",
      "Product UX and UI design with interactive Figma prototypes",
      "Design system and component library for design-to-code consistency",
    ],
    metric: "Brand, website and product UX from one team",
    color: "purple",
    image: "/work/ai-content-app.webp",
    pricing: {
      amount: "$6,800",
      unit: "one-time project",
      note: "Marketing site and landing pages; brand identity and product UX scoped separately",
    },
    related: ["saas-development", "ui-ux-design", "landing-pages"],
    extraSections: [
      {
        eyebrow: "B2B SaaS Design",
        title: "What makes B2B SaaS web design different.",
        body:
          "B2B buyers compare several tools, involve more than one decision-maker and need proof before they book a demo. Good B2B SaaS web design answers three questions quickly: what does it do, who is it for, and why should I trust it. We structure pages around that, with clear product visuals, integration and security information, pricing that is easy to read and calls to action that match how your buyers actually buy.",
        points: [
          "Homepage that explains the product in one screen",
          "Use-case, industry and integration pages for search traffic",
          "Trust signals: security, customers, reviews and case studies",
          "Demo, trial and contact flows tested on mobile",
        ],
      },
      {
        eyebrow: "Brand Identity",
        title: "Brand identity design services for SaaS companies.",
        body:
          "A strong identity makes a young product look established. Our brand identity design services cover naming support, logo, colour, typography, iconography, illustration style and a brand guide, along with the design tokens your developers use, so the brand shows up the same way in the website, the app, decks and emails. The aim is cool design with a purpose: memorable, distinctive and easy to maintain.",
        points: [
          "Logo and visual identity system",
          "Brand guidelines and voice",
          "Design tokens synced from Figma to code",
          "Pitch deck and social templates",
        ],
      },
      {
        eyebrow: "Templates",
        title: "SaaS landing page templates and website templates: when they work, and when they do not.",
        body:
          "A SaaS website template or landing page template is a fast, low-cost way to test an idea. It works for a first experiment or a very early product. It stops working when you need a distinct brand, strong performance and SEO, custom pricing logic or integrations with your product. We build custom pages, and can start from your existing template if you prefer to migrate step by step.",
        points: [
          "Templates: quick to launch, limited differentiation",
          "Custom design: unique brand, better performance, full control",
          "Migration path from an existing template site",
        ],
      },
    ],
  },

  {
    slug: "cloud-application-development",
    pillarId: "software-development",
    icon: Cloud,
    title: "Cloud Application Development",
    badge: "Cloud Software Engineering",
    brief:
      "Cloud-native web and mobile applications, APIs and infrastructure built for reliability, security and growth, designed and delivered by a senior New York team.",
    overview:
      "We are a cloud development company that designs, builds and runs cloud-based applications. That includes cloud-native web applications, back-end services and APIs, data pipelines, and the infrastructure and deployment automation behind them. We choose the right managed services on AWS, Google Cloud, Azure or Vercel for your workload, so you pay for what you use and can scale when you need to.",
    highlights: [
      "Cloud-native architecture on AWS, Google Cloud, Azure or Vercel",
      "Infrastructure as code and automated CI/CD",
      "Security, monitoring and backups built in",
      "Cost-aware design to keep cloud bills predictable",
    ],
    specs: [
      "Cloud-based web application development with React, Next.js and NestJS",
      "API, microservice and serverless design",
      "Database design and migration (PostgreSQL, MongoDB)",
      "Docker, Kubernetes or serverless deployment",
      "Infrastructure as code, CI/CD and observability",
      "Security review, backups and disaster-recovery planning",
    ],
    metric: "Cloud-native, monitored and cost-aware",
    color: "blue",
    image: "/work/fleet-management.webp",
    pricing: {
      amount: "$8,500",
      unit: "one-time project",
      note: "Scope-dependent on workload, integrations and compliance needs",
    },
    related: ["saas-development", "cms-cloud", "llm-integration"],
    extraSections: [
      {
        eyebrow: "Approach",
        title: "Cloud software development that is built for the cloud.",
        body:
          "Moving an application to the cloud is not the same as building for it. Cloud software development uses managed databases, queues, storage and serverless functions, so the application scales, recovers from failure and is cheaper to run. We recommend a cloud-native design for new products, and a phased migration for existing systems so you do not take on a risky big-bang rewrite.",
        points: [
          "New builds: cloud-native from the first commit",
          "Existing systems: assess, rehost or refactor in stages",
          "Cost controls, budgets and alerts from day one",
          "Clear documentation and runbooks for your team",
        ],
      },
    ],
  },
];

export const SAAS_CLOUD_LOCAL_CONTENT: Record<string, ServiceLocalContent> = {
  "saas-development": {
    h1: "SaaS Development Company in New York City",
    seoTitle: "SaaS Development Company NYC | NYC Digital Agency",
    seoDescription:
      "Custom SaaS development for New York startups and enterprises: product strategy, design, multi-tenant builds, billing and cloud. Fixed price from $24,000.",
    keywords: [
      "SaaS development company",
      "SaaS product development",
      "custom SaaS development",
      "custom SaaS development services",
      "SaaS software development company",
      "SaaS app development company",
      "SaaS development agency",
      "SaaS development companies",
      "SaaS development consulting",
      "SaaS application development solutions",
      "SaaS web application development services",
      "SaaS product development services",
      "SaaS product development process",
      "SaaS based product development company",
      "SaaS development service",
      "SaaS expert",
      "AI B2B SaaS",
      "field service management software",
    ],
    nyc: {
      title: "A SaaS development partner in the same city as your customers",
      body:
        "New York is one of the largest markets for B2B software: fintech, real estate, healthcare, media and professional services all buy SaaS here, and often expect security reviews, integrations and in-person conversations before they sign. As a New York SaaS development company, we can sit down with your team at 45 Broad Street or on video, build to the compliance expectations of local buyers, and stay accountable for the outcome after launch.",
      points: [
        "Built to pass the security questionnaires New York enterprise buyers send",
        "Designed with the New York SHIELD Act, and NYDFS 23 NYCRR 500 for financial clients, in mind",
        "In-person discovery workshops and launch reviews in Lower Manhattan",
      ],
    },
    faqs: [
      {
        question: "How much does custom SaaS development cost in New York?",
        answer:
          "Custom SaaS development with us starts at $24,000 on a fixed price for an MVP that includes authentication, a multi-tenant data model, billing and an admin dashboard. Complex products with many integrations, AI features or compliance needs cost more, and we quote them in writing after discovery.",
      },
      {
        question: "What is the SaaS product development process?",
        answer:
          "We work in four phases: discover (research, roadmap and MVP scope), design (flows and clickable prototypes tested with users), build (weekly demos of working software) and launch and grow (deployment, monitoring and the next release plan). You approve scope and price before each phase.",
      },
      {
        question: "How long does it take to build a SaaS product?",
        answer:
          "A focused MVP usually takes three to five months from kickoff to launch, depending on the number of features and integrations. Cutting the first release to the smallest useful product is the best way to launch sooner.",
      },
      {
        question: "What is B2B SaaS, and what does B2B SaaS mean?",
        answer:
          "B2B SaaS means business-to-business software as a service: software that companies pay for by subscription, hosted by the vendor and used through a browser. Examples include CRM, accounting, project management and analytics tools. It differs from consumer software in its need for team accounts, permissions, security and integrations.",
      },
      {
        question: "What are some B2C SaaS examples?",
        answer:
          "B2C SaaS is subscription software sold directly to individuals. Well-known examples include Spotify and Netflix for entertainment, Dropbox and Google One for storage, Duolingo for learning, Canva for design and Headspace for wellbeing. B2C products tend to have lower prices, larger volumes and more focus on onboarding and retention.",
      },
      {
        question: "How can SaaS companies make money from payments?",
        answer:
          "Most SaaS revenue comes from recurring subscriptions: per-seat, tiered or usage-based plans billed monthly or annually. Extra revenue comes from add-ons, higher tiers, overage charges and annual prepay discounts. Some products also earn payment-related revenue, for example platforms that take a fee on transactions their customers process.",
      },
      {
        question: "What payment processing features do US SaaS companies need?",
        answer:
          "At minimum: card and ACH payments, recurring billing, free trials, proration on plan changes, automatic retries for failed payments, invoices and receipts, refunds, sales tax handling and a customer portal to update payment details. We typically build these on Stripe Billing.",
      },
      {
        question: "How do I manage SaaS subscriptions?",
        answer:
          "If you sell a SaaS product, a billing platform such as Stripe Billing manages plans, renewals, upgrades and failed payments, and your product checks each customer's plan to control access. If you buy SaaS tools, a subscription management or spend tracking tool keeps renewals, seats and owners in one list so you can cancel what you do not use.",
      },
      {
        question: "What are the challenges of enterprise application development?",
        answer:
          "The main challenges are integrating with legacy systems, meeting security and compliance requirements, handling large data volumes, keeping performance steady as usage grows, aligning many stakeholders and getting employees to adopt the tool. We address each in the architecture and rollout plan before build begins.",
      },
      {
        question: "What is an enterprise-level application?",
        answer:
          "An enterprise-level application is software built for a large organisation: it supports many users and departments, connects to existing systems, enforces strict security and access controls, and must stay reliable at scale. ERP, large CRMs and internal operations platforms are typical examples.",
      },
      {
        question: "What criteria classify an AI SaaS product?",
        answer:
          "A practical way to classify an AI SaaS product is by five criteria: how central AI is (AI-native or AI-enabled feature), the task it performs (generation, classification, prediction, automation), the buyer (B2B or B2C), the scope (horizontal or industry-specific) and the risk level of its decisions. High-impact uses, such as hiring or lending, carry extra regulatory obligations, including New York City Local Law 144 for automated employment tools.",
      },
      {
        question: "How is a SaaS company valued? Does a revenue multiple with 1,500 users mean anything?",
        answer:
          "SaaS companies are usually valued on recurring revenue, not user count. Users matter only through revenue: 1,500 users paying $50 a month is $900,000 in annual recurring revenue. The multiple applied depends on growth rate, net revenue retention, gross margin, churn and market conditions, and it changes over time, so use current benchmarks and professional valuation advice. This is general information, not financial advice.",
      },
      {
        question: "Should I build custom software or use a SaaS template or off-the-shelf tool?",
        answer:
          "Use an existing tool or template if it covers your needs and you are testing an idea. Build custom when the workflow is your competitive advantage, when you plan to sell the software, or when off-the-shelf tools force costly workarounds. We will tell you honestly which one fits.",
      },
      {
        question: "Can you build field service management software for small businesses?",
        answer:
          "Yes. If an existing field service management tool fits, we recommend starting there, and some have free trials or entry-level plans. If you need custom scheduling, dispatch or a mobile app for technicians, or want to sell field service software of your own, we design and build it, including mobile field service apps.",
      },
    ],
  },

  "saas-web-design": {
    h1: "SaaS Website Design Agency in New York City",
    seoTitle: "SaaS Website Design Agency NYC | NYC Digital Agency",
    seoDescription:
      "A SaaS web design agency for New York companies: brand identity, B2B SaaS websites, landing pages and product UX that convert. Projects from $6,800.",
    keywords: [
      "SaaS website design agency",
      "SaaS web design agency",
      "SaaS web design company",
      "SaaS web design services",
      "SaaS web design agencies",
      "SaaS website design firm",
      "SaaS website design company",
      "SaaS website design services",
      "SaaS website design",
      "SaaS website development",
      "B2B SaaS web design",
      "B2B SaaS design",
      "B2B web design for SaaS companies",
      "SaaS design agency",
      "SaaS design services",
      "SaaS UX design agency",
      "best UX design companies for SaaS products",
      "brand identity design services",
      "SaaS landing page template",
      "SaaS website templates",
    ],
    nyc: {
      title: "Design for New York's competitive SaaS market",
      body:
        "SaaS buyers in New York compare vendors quickly and judge credibility in seconds. Your website and product need to look established, load fast on mobile and explain the value clearly. As a New York SaaS web design agency, we work with founders and marketing teams face to face when that helps, and we design with real conversion data instead of taste alone.",
      points: [
        "Websites that explain complex products in plain language",
        "Landing pages built to pair with Google and LinkedIn campaigns",
        "Accessible design (WCAG 2.2 AA) as standard",
      ],
    },
    faqs: [
      {
        question: "What does a SaaS web design agency do?",
        answer:
          "A SaaS web design agency designs and builds the website that sells your software: positioning and messaging, the homepage, product, pricing and comparison pages, landing pages and the sign-up or demo flow. We also design the product interface so the website and app feel like one brand.",
      },
      {
        question: "How much does SaaS website design cost?",
        answer:
          "Our SaaS marketing site and landing page projects start at $6,800 on a fixed price. Brand identity and product UX design are scoped separately, and larger sites with many pages, integrations or a custom CMS cost more.",
      },
      {
        question: "What is different about B2B SaaS web design?",
        answer:
          "B2B buyers are cautious, compare several vendors and often involve a team. B2B SaaS web design has to earn trust quickly with clear product visuals, security and integration information, customer proof, and simple paths to a demo or trial.",
      },
      {
        question: "Do you offer brand identity design services?",
        answer:
          "Yes. We design SaaS brand identities including logo, colour, typography, illustration style, brand guidelines and the design tokens developers use, so your brand is consistent across the website, product and marketing.",
      },
      {
        question: "Should I use a SaaS landing page template or a custom design?",
        answer:
          "A template is fine for testing an early idea quickly. A custom design is better once you need a distinct brand, better performance and SEO, or custom pricing and integrations. We can migrate a template site to a custom build in stages.",
      },
      {
        question: "How do I choose the best UX design company for a SaaS product?",
        answer:
          "Look for SaaS case studies, a research and testing process, experience with dashboards and complex workflows, and the ability to hand over a design system your developers can use. Ask to speak with previous SaaS clients, and check that designers and developers work together.",
      },
      {
        question: "Can you design and build the website?",
        answer:
          "Yes. We design in Figma and build on Next.js, which gives fast pages and strong SEO, so you avoid the handoff gap between separate design and development vendors.",
      },
    ],
  },

  "cloud-application-development": {
    h1: "Cloud Application Development Services in New York City",
    seoTitle: "Cloud Application Development Services NYC | NYC Digital",
    seoDescription:
      "Cloud application, cloud software and cloud-based web development services for New York businesses on AWS, Google Cloud, Azure and Vercel. From $8,500.",
    keywords: [
      "cloud application development",
      "cloud application development services",
      "cloud application development service",
      "cloud applications development services",
      "cloud app development services",
      "cloud software development",
      "cloud software development services",
      "cloud development company",
      "cloud development services",
      "cloud based web development services",
    ],
    nyc: {
      title: "Cloud development for New York businesses that cannot afford downtime",
      body:
        "New York companies run finance, healthcare, media and commerce systems that customers rely on around the clock. We design cloud applications for reliability, security and predictable cost, and we are close enough to meet in person at 45 Broad Street when an architecture decision needs the whole team in the room.",
      points: [
        "Architecture and security reviews before build starts",
        "Monitoring, alerting and backups included",
        "Cost budgets and alerts so cloud bills stay predictable",
      ],
    },
    faqs: [
      {
        question: "What is cloud application development?",
        answer:
          "Cloud application development is designing and building software that runs on cloud infrastructure such as AWS, Google Cloud or Azure, using managed services for databases, storage and scaling. The result is an application that can grow with demand and be updated without downtime.",
      },
      {
        question: "What do cloud application development services include?",
        answer:
          "Typically architecture design, web and API development, database design, containers or serverless deployment, CI/CD automation, security, monitoring and documentation. We can deliver all of it or work alongside your in-house team.",
      },
      {
        question: "How much do cloud app development services cost?",
        answer:
          "Our cloud application projects start at $8,500 on a fixed price. Cost depends on the workload, the number of integrations and services, and security or compliance requirements. We quote in writing after a discovery call.",
      },
      {
        question: "What are cloud-based web development services?",
        answer:
          "They are web applications and websites built to run on cloud platforms rather than a single server, so they can handle traffic spikes, deploy automatically and recover from failures. Next.js on Vercel or AWS is a common example.",
      },
      {
        question: "Which cloud provider should we use?",
        answer:
          "It depends on your team, workload and existing tools. AWS offers the broadest services, Google Cloud is strong for data and AI, Azure fits Microsoft-centric companies, and Vercel is excellent for Next.js front ends. We recommend based on your needs, not a preference.",
      },
      {
        question: "Can you migrate our existing application to the cloud?",
        answer:
          "Yes. We assess the current system, then rehost, refactor or rebuild in stages so the business keeps running throughout. We avoid big-bang rewrites unless they are clearly the cheaper option.",
      },
      {
        question: "How do you choose a cloud development company?",
        answer:
          "Look for proven cloud architecture experience, security practices, clear pricing, code and infrastructure ownership that stays with you, and references from clients with similar workloads. Ask how they control cost and handle incidents.",
      },
    ],
  },
};
