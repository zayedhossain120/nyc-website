import type { Metadata } from "next";
import { PillarPage } from "@/components/sections/services/pillar-page";

export const metadata: Metadata = {
  title: "NYC Local SEO, AEO/GEO & Paid Ads Agency",
  description:
    "Local SEO across Manhattan, Brooklyn, Queens, the Bronx, and Staten Island, plus AEO/GEO, Google & Meta Ads, and content/social management from NYC Digital Agency",
  alternates: { canonical: "/services/marketing-seo" },
};

export default function MarketingSeoPage() {
  return <PillarPage pillarId="marketing-seo" />;
}
