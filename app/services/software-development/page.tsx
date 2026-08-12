import type { Metadata } from "next";
import { PillarPage } from "@/components/sections/services/pillar-page";

export const metadata: Metadata = {
  title: "Software Development",
  description:
    "Enterprise Next.js web apps, NestJS APIs, React Native mobile, and SaaS product engineering from Vertex & Co.",
};

export default function SoftwareDevelopmentPage() {
  return <PillarPage pillarId="software-development" />;
}
