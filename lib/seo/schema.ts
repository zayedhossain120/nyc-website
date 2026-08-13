import { BUSINESS } from "@/lib/seo/business";
import { SITE_URL } from "@/lib/site-config";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Sitewide business identity. Rendered once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    foundingDate: BUSINESS.founded,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      areaServed: "US",
      availableLanguage: "English",
    },
  };
}

/** Sitewide site identity, distinct from the business/organization. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BUSINESS.name,
    url: SITE_URL,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: BUSINESS.areaServed.map((areaName) => ({
      "@type": "AdministrativeArea",
      name: areaName,
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export interface HowToStepInput {
  name: string;
  text: string;
}

export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: HowToStepInput[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  };
}

export function blogPostingSchema({
  headline,
  description,
  path,
  authorName,
  datePublished,
}: {
  headline: string;
  description: string;
  path: string;
  authorName: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url: `${SITE_URL}${path}`,
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };
}

export function articleSchema({
  headline,
  description,
  path,
}: {
  headline: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${path}`,
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };
}

export interface OfferInput {
  name: string;
  description: string;
  price: number;
  priceUnit?: string;
}

export function offerCatalogSchema({
  name,
  description,
  path,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  offers: OfferInput[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: BUSINESS.areaServed.map((areaName) => ({
      "@type": "AdministrativeArea",
      name: areaName,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Engagement Tiers",
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        price: offer.price,
        priceCurrency: "USD",
        ...(offer.priceUnit ? { priceSpecification: { "@type": "UnitPriceSpecification", price: offer.price, priceCurrency: "USD", unitText: offer.priceUnit } } : {}),
      })),
    },
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    about: { "@id": ORGANIZATION_ID },
  };
}

export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    about: { "@id": ORGANIZATION_ID },
  };
}
