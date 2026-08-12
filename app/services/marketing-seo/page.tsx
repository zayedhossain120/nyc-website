import type { Metadata } from "next";
import { PillarPage } from "@/components/sections/services/pillar-page";

export const metadata: Metadata = {
  title: "Marketing & Growth",
  description:
    "Local SEO, AEO/GEO, Google & Meta Ads, and content/social management from Vertex & Co.",
};

export default function MarketingSeoPage() {
  return <PillarPage pillarId="marketing-seo" />;
}
