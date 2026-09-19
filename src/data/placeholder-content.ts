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
 *   2. TEAM          — real leadership; photos are already in /public/team
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

export interface PlaceholderLeader {
  name: string;
  title: string;
  bio: string;
  specialty: string;
}

export const TEAM: PlaceholderLeader[] = [
  {
    name: "Elena Marchetti",
    title: "Chief Executive Officer",
    bio: "Former engineering lead at a NYC fintech. Started the agency after watching too many firms bill hours instead of outcomes.",
    specialty: "Client Strategy & Fixed-Price Delivery",
  },
  {
    name: "James Okafor",
    title: "Chief Operating Officer",
    bio: "Runs the operational backbone: proposals, staffing, and the fixed-price guarantee that makes every deadline real.",
    specialty: "Operations & Delivery",
  },
  {
    name: "Ravi Deshmukh",
    title: "Chief Technology Officer",
    bio: "Fifteen years shipping production systems, from ad-tech at scale to healthcare compliance. Sets the technical bar for every engagement.",
    specialty: "Architecture & AI Systems",
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
