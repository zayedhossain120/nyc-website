/**
 * Single source of truth for NAP (Name, Address, Phone) and other business
 * identity facts used across metadata and JSON-LD. Keeping this consistent
 * everywhere is itself a local-SEO signal — mismatched NAP data across a
 * site (or between the site and Google Business Profile) actively hurts
 * local ranking.
 */
export const BUSINESS = {
  name: "NYC Digital Agency",
  legalName: "NYC Digital Agency",
  tagline: "Software Development, AI Automation & Growth in New York City",
  description:
    "NYC Digital Agency is a New York City agency delivering production-grade software development, custom AI automation, and marketing & growth services under one accountable team.",
  telephone: "+1-518-606-3521",
  telephoneDisplay: "(518) 606-3521",
  email: "hello@nycdigital.agency",
  streetAddress: "45 Broad Street, Floor 12",
  addressLocality: "New York",
  addressRegion: "NY",
  postalCode: "10004",
  addressCountry: "US",
  // Approximate coordinates for the Financial District, Manhattan.
  latitude: 40.7075,
  longitude: -74.0113,
  priceRange: "$$$",
  areaServed: [
    "New York City",
    "Manhattan",
    "Brooklyn",
    "Queens",
    "The Bronx",
    "Staten Island",
    "United States",
  ],
  founded: "2020",
} as const;

export const SERVICE_KEYWORDS = [
  "SaaS development company NYC",
  "SaaS website design agency",
  "cloud application development services",
  "custom SaaS development",
  "software development agency NYC",
  "AI automation agency New York",
  "NYC web development company",
  "Next.js development agency NYC",
  "local SEO New York City",
  "AEO GEO agency",
  "NestJS development NYC",
  "AI agents and chatbots NYC",
] as const;
