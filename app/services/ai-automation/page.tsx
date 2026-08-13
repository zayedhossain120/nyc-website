import type { Metadata } from "next";
import { PillarPage } from "@/components/sections/services/pillar-page";

export const metadata: Metadata = {
  title: "AI Automation Agency in New York City | Custom AI Agents",
  description:
    "Custom AI chatbots, automated lead & CRM workflows, and RAG/LLM integrations from Vertex & Co. — the NYC agency that builds AI automation your team actually uses.",
  alternates: { canonical: "/services/ai-automation" },
};

export default function AiAutomationPage() {
  return <PillarPage pillarId="ai-automation" />;
}
