import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { cn } from "@/lib/utils";

const FEATURED_SLUGS = ["solstice-health", "kettletown-supply-co", "meridian-freight"];
const FEATURED_STUDIES = FEATURED_SLUGS.map((slug) =>
  CASE_STUDIES.find((study) => study.slug === slug)!,
);

export function FeaturedWork() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Featured Work" title="Results, not just deliverables." />
        <Button href="/work" variant="outline">
          View All Work
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {FEATURED_STUDIES.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-subtle transition-colors duration-300 hover:border-accent-secondary/60"
          >
            <div
              className={cn(
                "flex h-48 items-end bg-linear-to-br p-5",
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
                {study.techStack.slice(0, 3).map((tag) => (
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
