import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

const PILLARS = [
  {
    tone: "secondary" as const,
    title: "Software Development",
    description:
      "Enterprise Next.js apps, NestJS APIs, and mobile builds that ship production-ready, not prototype-ready.",
    tags: ["Next.js & React", "NestJS APIs", "React Native"],
    href: "/services/software-development",
  },
  {
    tone: "primary" as const,
    title: "AI Automation",
    description:
      "Custom agents and workflow automation that cut manual ops hours — not just add a chatbot widget.",
    tags: ["AI Agents & Chatbots", "CRM Automation", "RAG / LLM Integration"],
    href: "/services/ai-automation",
  },
  {
    tone: "warm" as const,
    title: "Marketing & Growth",
    description:
      "Local SEO, paid acquisition, and AEO/GEO so you show up in Google — and in ChatGPT.",
    tags: ["Local SEO & AEO/GEO", "Google & Meta Ads", "Content & SMM"],
    href: "/services/marketing-seo",
  },
];

export function Pillars() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
      <SectionHeading eyebrow="What We Do" title="Three pillars, one accountable team." />
      <div className="grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <Card key={pillar.title} className="flex flex-col gap-4">
            <Badge tone={pillar.tone}>{pillar.title}</Badge>
            <p className="text-secondary">{pillar.description}</p>
            <ul className="flex flex-col gap-1.5 font-mono text-xs text-muted">
              {pillar.tags.map((tag) => (
                <li key={tag}>— {tag}</li>
              ))}
            </ul>
            <Link
              href={pillar.href}
              className="group mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Explore
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
