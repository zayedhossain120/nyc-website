import type { Metadata } from "next";
import { PillarPage } from "@/components/sections/services/pillar-page";

export const metadata: Metadata = {
  title: "AI Automation",
  description:
    "Custom AI chatbots, automated lead & CRM workflows, and RAG/LLM integrations from Vertex & Co.",
};

export default function AiAutomationPage() {
  return <PillarPage pillarId="ai-automation" />;
}
