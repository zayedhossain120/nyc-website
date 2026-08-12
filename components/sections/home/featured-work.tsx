import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const CASE_STUDIES = [
  {
    slug: "solstice-health",
    client: "Solstice Health",
    industry: "Healthcare",
    metric: "+340% patient retention",
    tags: ["Next.js", "NestJS", "Patient Portal"],
    gradient: "from-accent-secondary/25 via-surface to-surface",
  },
  {
    slug: "kettletown-supply-co",
    client: "Kettletown Supply Co.",
    industry: "E-Commerce",
    metric: "2.4x checkout conversion",
    tags: ["Next.js", "AI Recommendations", "Stripe"],
    gradient: "from-accent-primary/20 via-surface to-surface",
  },
  {
    slug: "meridian-freight",
    client: "Meridian Freight",
    industry: "Logistics SaaS",
    metric: "18 hrs/week saved via automation",
    tags: ["AI Automation", "Dispatch Workflow", "RAG"],
    gradient: "from-accent-warm/20 via-surface to-surface",
  },
];

export function FeaturedWork() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Featured Work" title="Results, not just deliverables." />
        <Button href="/work" variant="outline">
          View All Work
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {CASE_STUDIES.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-subtle transition-colors duration-300 hover:border-accent-secondary/60"
          >
            <div
              className={cn(
                "flex h-48 items-end bg-gradient-to-br p-5",
                study.gradient,
              )}
            >
              <span className="rounded-full border border-accent-primary/40 bg-void/60 px-3 py-1 font-mono text-xs text-accent-primary backdrop-blur-sm">
                {study.metric}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 bg-surface p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-primary">{study.client}</h3>
                <Badge tone="neutral">{study.industry}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs text-muted">
                {study.tags.map((tag) => (
                  <span key={tag}>#{tag.replace(/\s+/g, "")}</span>
                ))}
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View Case Study →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
