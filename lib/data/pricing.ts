export interface PricingTier {
  name: string;
  description: string;
  price: string;
  cadence: string;
  featured: boolean;
  features: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Launch Sprint",
    description: "High-Impact Landing Page",
    price: "$3,900",
    cadence: "Starting price · 2-week delivery",
    featured: false,
    features: [
      "Next.js 16 + Tailwind v4 build",
      "Core Web Vitals guarantee (90+)",
      "Figma design system",
      "Micro-animations & motion",
      "30-day support window",
    ],
  },
  {
    name: "Growth Engine",
    description: "Full Web App + Automation Starter",
    price: "$13,500",
    cadence: "Starting price · 4–5 week delivery",
    featured: true,
    features: [
      "Full React Server Components architecture",
      "Database + authentication",
      "Payments integration",
      "Admin dashboard",
      "1 AI chatbot integration",
      "60-day warranty",
    ],
  },
  {
    name: "Scale Partner",
    description: "Dedicated Team Retainer",
    price: "$8,500/mo",
    cadence: "Starting price · ongoing retainer",
    featured: false,
    features: [
      "Dedicated senior engineer + designer + growth lead pod",
      "Weekly syncs",
      "Unlimited queued requests",
      "24/7 monitoring",
      "No long-term contract",
    ],
  },
];

export interface AddOn {
  id: string;
  label: string;
  price: number;
}

export const ADD_ONS: AddOn[] = [
  { id: "design-system", label: "Figma Design System", price: 1200 },
  { id: "cwv-guarantee", label: "Core Web Vitals Guarantee", price: 800 },
  { id: "cms", label: "CMS Backend (Sanity/Contentful)", price: 1500 },
  { id: "billing", label: "Subscriptions & Billing (Stripe)", price: 2000 },
  { id: "chatbot", label: "AI Chatbot Add-On", price: 2500 },
  { id: "i18n", label: "Multi-Language (i18n)", price: 1800 },
];

export interface ArchitectureOption {
  id: string;
  label: string;
  description: string;
  basePrice: number;
}

export const ARCHITECTURE_OPTIONS: ArchitectureOption[] = [
  { id: "landing", label: "Landing Page", description: "Single high-converting page", basePrice: 3900 },
  { id: "web-app", label: "Web App", description: "Multi-page app with a backend", basePrice: 13500 },
  { id: "saas", label: "SaaS Platform", description: "Multi-tenant with billing & auth", basePrice: 24000 },
];
