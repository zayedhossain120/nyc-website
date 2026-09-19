export type CaseStudyCategory = "web-apps" | "e-commerce" | "ai-automation" | "marketing-campaigns";

export interface CaseStudyImage {
  src: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  category: CaseStudyCategory;
  metric: string;
  images: CaseStudyImage[];
  summary: string;
  challenge: string;
  approach: string;
  solution: string;
  results: string[];
  techStack: string[];
}

export const CATEGORY_LABELS: Record<CaseStudyCategory, string> = {
  "web-apps": "Web Apps",
  "e-commerce": "E-Commerce",
  "ai-automation": "AI Automation",
  "marketing-campaigns": "Marketing Campaigns",
};

export const CATEGORY_TONE: Record<CaseStudyCategory, "primary" | "secondary" | "warm"> = {
  "web-apps": "secondary",
  "e-commerce": "warm",
  "ai-automation": "primary",
  "marketing-campaigns": "warm",
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "furniture-ecommerce-platform",
    client: "Furniture E-Commerce Platform",
    industry: "Retail & E-Commerce",
    category: "e-commerce",
    metric: "Full-Funnel E-Commerce UI/UX",
    images: [{ src: "/work/furniture-ecommerce.webp", width: 2400, height: 2850 }],
    summary:
      "A modern furniture retailer needed a storefront that felt as considered as the products it sells — from browsing to checkout.",
    challenge:
      "The brand's catalog of handcrafted furniture deserved a shopping experience that matched its quality, but the existing presence didn't reflect that positioning.",
    approach:
      "We designed a dark, editorial-feeling storefront that leads with lifestyle photography and lets the product speak, then layered in the commerce mechanics — filtering, cart, and checkout — without breaking that feel.",
    solution:
      "A complete design system covering the homepage, collection browsing, product cards, testimonials, and FAQ, built to extend cleanly as the catalog grows.",
    results: [
      "Full homepage-to-checkout UI/UX design",
      "Reusable product card & collection filter system",
      "Testimonial and FAQ modules for on-page trust-building",
      "Mobile-responsive layouts across the full funnel",
    ],
    techStack: ["Figma", "Design System", "UI/UX Design"],
  },
  {
    slug: "healthcare-ecommerce-platform",
    client: "Healthcare E-Commerce Platform",
    industry: "Healthcare & Pharmacy",
    category: "e-commerce",
    metric: "Pharmacy & Medical Supply UI/UX",
    images: [{ src: "/work/healthcare-ecommerce.webp", width: 2160, height: 2538 }],
    summary: "An online pharmacy needed a storefront that feels trustworthy first, and easy to shop second.",
    challenge:
      "Medical and pharmacy e-commerce has to balance clinical credibility with the fast, low-friction browsing people expect from any online store.",
    approach:
      "We built the design around clear categorization by health concern rather than just product type, prominent doctor and prescription trust signals, and a product grid that stays scannable even with dozens of SKUs on screen.",
    solution:
      "A full storefront design — hero, categorized product discovery, doctor directory, device and equipment listings, and an FAQ-driven support section.",
    results: [
      "Health-concern-based product discovery UI",
      "Doctor directory & appointment booking module",
      "Prescription upload flow design",
      "Scannable product grid tested at 12+ items per row",
    ],
    techStack: ["Figma", "Design System", "UI/UX Design"],
  },
  {
    slug: "ecommerce-saas-platform",
    client: "E-Commerce SaaS Platform",
    industry: "SaaS / E-Commerce Tooling",
    category: "web-apps",
    metric: "SaaS Product Marketing Site",
    images: [{ src: "/work/ecommerce-saas.webp", width: 2400, height: 2850 }],
    summary:
      "An e-commerce SaaS platform needed a marketing site that could sell a genuinely technical product to non-technical store owners.",
    challenge:
      "The product bundles inventory, fraud detection, and delivery integrations — powerful, but easy to make feel overwhelming to a first-time visitor.",
    approach:
      "We broke the feature set into scannable, icon-led cards, used real product screenshots instead of abstract illustrations wherever possible, and kept the page structured around one clear action: start a store.",
    solution:
      "A full marketing site design — hero, live-feeling stat bar, feature grid, social proof, and a pricing section built for plan comparison at a glance.",
    results: [
      "9-section marketing site design, hero to footer",
      "Feature grid covering 8 core product capabilities",
      "3-tier pricing comparison layout",
      "Testimonial carousel & FAQ system",
    ],
    techStack: ["Figma", "Design System", "UI/UX Design"],
  },
  {
    slug: "smart-home-property-platform",
    client: "Smart Home & Property Management Platform",
    industry: "PropTech / IoT",
    category: "web-apps",
    metric: "Dual-Dashboard Product Design",
    images: [
      { src: "/work/smart-home-property-1.webp", width: 2400, height: 1536 },
      { src: "/work/smart-home-property-2.webp", width: 1440, height: 922 },
    ],
    summary:
      "A property-tech platform needed two distinct dashboards — one for controlling a smart home, one for managing property listings — that still felt like a single product.",
    challenge:
      "Smart home control and property/tenant management are different jobs entirely, but the client needed both under one brand without the product feeling stitched together.",
    approach:
      "We established one shared design language — the same cards, charts, and iconography — and applied it to two different information architectures, so switching contexts feels consistent rather than jarring.",
    solution:
      "A dark, data-dense smart home control dashboard covering energy, lighting, and climate, alongside a light property management view for listings, tenant search, and a global portfolio map.",
    results: [
      "Two full dashboard designs sharing one component system",
      "Live device control UI for lighting, climate, and energy",
      "Global property portfolio map view",
      "Tenant search & leasing funnel design",
    ],
    techStack: ["Figma", "Design System", "Dashboard Design"],
  },
  {
    slug: "fleet-management-dashboard",
    client: "Fleet Management Dashboard",
    industry: "Logistics & Transportation",
    category: "web-apps",
    metric: "Real-Time Fleet Ops Dashboard",
    images: [{ src: "/work/fleet-management.webp", width: 2400, height: 1536 }],
    summary:
      "A logistics operator needed a single dashboard to track dozens of vehicles, routes, and costs at once — without it turning into a wall of numbers.",
    challenge:
      "Fleet dashboards live or die on information density — too little and dispatchers can't act, too much and nothing stands out.",
    approach:
      "We anchored the layout around one hero vehicle view, then layered live tracking, route mapping, and cost analytics into distinct zones so a dispatcher's eye has a clear path through the screen.",
    solution:
      "A dark, high-contrast operations dashboard covering live vehicle tracking, route maps, cost-per-mile trends, and fuel efficiency, designed to stay legible on a wall-mounted ops display.",
    results: [
      "Live tracking UI for 30+ simultaneous vehicles",
      "Route map visualization with waypoint tracking",
      "Cost-per-mile & fuel efficiency trend charts",
      "Designed for legibility on wall-mounted displays",
    ],
    techStack: ["Figma", "Design System", "Dashboard Design"],
  },
  {
    slug: "security-operations-dashboard",
    client: "Security Operations Dashboard",
    industry: "Cybersecurity / SaaS",
    category: "web-apps",
    metric: "XDR Security Ops Dashboard",
    images: [{ src: "/work/security-operations.webp", width: 1440, height: 940 }],
    summary:
      "A cybersecurity platform needed to visualize threat data from a dozen connected tools in a single view a security analyst could scan in seconds.",
    challenge:
      "Security operations centers work across many integrated tools at once — cloud providers, endpoint agents, identity platforms — and the dashboard needed to unify them without hiding which system an alert came from.",
    approach:
      "We designed a radial threat-map as the dashboard's centerpiece, with connected-tool logos placed around it, so an analyst can see both overall risk posture and its source at a glance.",
    solution:
      "A full security operations dashboard — live incident feed, asset inventory, alert severity breakdown, and automated playbook status, unified around one radial threat visualization.",
    results: [
      "Radial threat-map visualization design",
      "Live incident feed with severity tagging",
      "Multi-integration asset inventory view",
      "Automated playbook status tracking UI",
    ],
    techStack: ["Figma", "Design System", "Dashboard Design"],
  },
  {
    slug: "learning-management-system",
    client: "Learning Management System",
    industry: "EdTech / SaaS",
    category: "web-apps",
    metric: "All-in-One LMS Product Design",
    images: [{ src: "/work/lms-platform.webp", width: 2400, height: 2850 }],
    summary:
      "An LMS platform needed a marketing site and dashboard preview that could speak to both school administrators and individual educators.",
    challenge:
      "LMS buyers range from solo tutors to full institutions — the design needed pricing and messaging flexible enough to serve both without feeling generic to either.",
    approach:
      "We led with a real admin dashboard preview rather than abstract graphics, so prospective buyers could see the actual product, then built pricing around clear per-tier feature deltas.",
    solution:
      "A full marketing site — dashboard preview hero, feature grid, tiered pricing, testimonials, and an integrated blog — plus the admissions and attendance dashboard UI itself.",
    results: [
      "Live-feeling admin dashboard preview in the hero",
      "3-tier pricing with per-plan feature breakdown",
      "Attendance & results-tracking dashboard UI",
      "Integrated blog & resource center design",
    ],
    techStack: ["Figma", "Design System", "UI/UX Design"],
  },
  {
    slug: "ai-content-generation-app",
    client: "AI Content Generation App",
    industry: "AI / Creative Tools",
    category: "ai-automation",
    metric: "Mobile AI Generation App",
    images: [{ src: "/work/ai-content-app.webp", width: 2160, height: 2565 }],
    summary:
      "A generative AI app needed a mobile interface that made text-to-video, image, and 3D generation feel as simple as sending a message.",
    challenge:
      "Generative AI tools can overwhelm users with options — models, aspect ratios, durations — before they've generated anything at all.",
    approach:
      "We collapsed the entry point to a single prompt field with a small set of format toggles, and moved advanced controls like duration and aspect ratio into a secondary row so first-time users aren't blocked by configuration.",
    solution:
      "A full mobile app design — a prompt-first generation screen, a content discovery browser, and a dedicated video editor with timeline, effects, and export controls.",
    results: [
      "Prompt-first generation flow across 3 content types",
      "Full video editor UI with timeline & effects",
      "Content discovery feed with category filtering",
      "4K export flow design",
    ],
    techStack: ["Figma", "Mobile App Design", "UI/UX Design"],
  },
];

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
