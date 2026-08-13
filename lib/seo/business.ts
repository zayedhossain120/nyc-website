/**
 * Single source of truth for NAP (Name, Address, Phone) and other business
 * identity facts used across metadata and JSON-LD. Keeping this consistent
 * everywhere is itself a local-SEO signal — mismatched NAP data across a
 * site (or between the site and Google Business Profile) actively hurts
 * local ranking.
 */
export const BUSINESS = {
  name: "Vertex & Co.",
  legalName: "Vertex & Co.",
  tagline: "NYC Software Development, AI Automation & Growth Agency",
  description:
    "Vertex & Co. is a New York City agency delivering production-grade software development, custom AI automation, and marketing & growth services under one accountable team.",
  telephone: "+1-212-555-0142",
  telephoneDisplay: "(212) 555-0142",
  email: "hello@vertexand.co",
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
  "software development agency NYC",
  "AI automation agency New York",
  "NYC web development company",
  "Next.js development agency NYC",
  "local SEO New York City",
  "AEO GEO agency",
  "NestJS development NYC",
  "AI agents and chatbots NYC",
] as const;
