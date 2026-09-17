import type { Metadata } from "next";
import { PillarPage } from "@/components/sections/services/pillar-page";

export const metadata: Metadata = {
  title: "NYC Software Development Agency | Next.js & NestJS Experts",
  description:
    "Enterprise Next.js web apps, NestJS APIs, React Native mobile, and SaaS product engineering from Vertex & Co. — New York City's senior-only software development team.",
  alternates: { canonical: "/services/software-development" },
};

export default function SoftwareDevelopmentPage() {
  return <PillarPage pillarId="software-development" />;
}
