import type { Metadata } from "next";
import { PillarPage } from "@/components/sections/services/pillar-page";

export const metadata: Metadata = {
  title: "SaaS & Software Development Company NYC",
  description:
    "SaaS development, cloud application development, custom web apps, SaaS web design and UX from NYC Digital Agency, a senior-only software development company in New York City.",
  alternates: { canonical: "/services/software-development" },
};

export default function SoftwareDevelopmentPage() {
  return <PillarPage pillarId="software-development" />;
}
