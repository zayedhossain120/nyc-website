/**
 * PLACEHOLDER CONTENT — every name, company, quote and number in this file is
 * fictional dummy data. Replace it with real, verifiable data before launch.
 *
 * Why it matters: fake endorsements and unverifiable stats hurt trust and can
 * create legal exposure (FTC rules on testimonials). Google also weighs real,
 * attributable reviews heavily for local rankings.
 *
 * Replace in this order of impact:
 *   1. TESTIMONIALS  — real client quotes (with permission), real names/titles
 *   2. TEAM          — real people; add bios only if factual
 *   3. COMPANY_STATS — only numbers you can back up
 *   4. INDUSTRIES    — only industries you have actually shipped for
 */

export interface PlaceholderTestimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  metric: string;
  /** Where the client is based, used for local-relevance copy. */
  location: string;
}

export const TESTIMONIALS: PlaceholderTestimonial[] = [
  {
    quote:
      "We were stuck with a slow, template-built site. NYC Digital Agency rebuilt it on Next.js and our Core Web Vitals went from failing to green across the board in a single sprint.",
    name: "Dana Whitfield",
    title: "VP of Engineering",
    company: "Harborview Health",
    metric: "Core Web Vitals: all green",
    location: "Midtown, Manhattan",
  },
  {
    quote:
      "Our front desk was buried in manual intake. Their AI automation took a 3-hour process down to about 12 minutes per case, and the team actually uses it.",
    name: "Marcus Ionescu",
    title: "Managing Partner",
    company: "Ionescu & Reyes Law",
    metric: "18 hrs/week saved",
    location: "Financial District, Manhattan",
  },
  {
    quote:
      "We finally have one New York team accountable for both the build and the growth numbers. Same-day replies, and they're a subway ride away when we want to whiteboard.",
    name: "Priya Anand",
    title: "Founder",
    company: "Kettletown Supply Co.",
    metric: "2.4x conversion rate",
    location: "Williamsburg, Brooklyn",
  },
  {
    quote:
      "They built our listings platform and our SEO foundation together. We now show up for the neighborhood searches our agents used to pay for.",
    name: "Tomás Herrera",
    title: "Director of Operations",
    company: "Astoria Row Realty",
    metric: "+61% organic leads",
    location: "Astoria, Queens",
  },
  {
    quote:
      "Fixed price, clear milestones, and no surprises. Our compliance review passed first time because they built with NYDFS requirements in mind from day one.",
    name: "Rachel Goldberg",
    title: "Chief Product Officer",
    company: "Battery Point Capital",
    metric: "Passed compliance review first time",
    location: "Lower Manhattan",
  },
];

export interface TeamMember {
  name: string;
  title: string;
  /** Path under /public. Photos are cropped to a square in the UI, face kept near the top. */
  photo: string;
  bio?: string;
  specialty?: string;
}

/**
 * Real team. Order is display order (leadership first). Add `bio` and
 * `specialty` only with facts you can stand behind: they are shown on the About
 * page when present.
 */
export const TEAM: TeamMember[] = [
  {
    name: "Tanvir Siddique",
    title: "Founder & CEO",
    photo: "/team/tanvir.png",
  },
  {
    name: "Zayed Hossain",
    title: "Founder & BDE",
    photo: "/team/zayed.png",
  },
  {
    name: "Jaker Hossain",
    title: "Founder & COO",
    photo: "/team/Jaker Hossain.png",
  },
];

export const COMPANY_STATS = {
  yearsInNyc: 6,
  projectsShipped: 140,
  clientRetentionPercent: 92,
  teamSize: 18,
} as const;

export const INDUSTRIES = [
  "FinTech",
  "Real Estate",
  "Healthcare",
  "Legal",
  "Hospitality",
  "Fashion & Retail",
  "Media",
  "Startups",
] as const;
