import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CASE_STUDIES, CATEGORY_LABELS, getCaseStudyBySlug } from "@/lib/data/case-studies";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.client} Case Study | ${study.metric}`,
    description: `${study.summary} ${study.metric} — see how Vertex & Co. delivered it.`,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { type: "article" },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const currentIndex = CASE_STUDIES.findIndex((item) => item.slug === slug);
  const next = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          articleSchema({
            headline: `${study.client} Case Study`,
            description: study.summary,
            path: `/work/${study.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: study.client, path: `/work/${study.slug}` },
          ]),
        ]}
      />
      <section className={cn("bg-linear-to-br px-6 pt-20 pb-16 md:px-16 md:pt-28", study.gradient)}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <Link href="/work" className="text-sm text-secondary hover:text-primary">
            ← All Work
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="neutral">{study.industry}</Badge>
            <Badge tone="primary">{CATEGORY_LABELS[study.category]}</Badge>
          </div>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            {study.client}
          </h1>
          <p className="max-w-2xl text-lg text-secondary">{study.summary}</p>
          <span className="w-fit rounded-full border border-accent-primary/40 bg-void/60 px-4 py-1.5 font-mono text-sm text-accent-primary backdrop-blur-sm">
            {study.metric}
          </span>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-24 md:px-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-[0.15em] text-accent-secondary uppercase">
              Challenge
            </h2>
            <p className="text-secondary">{study.challenge}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-[0.15em] text-accent-primary uppercase">
              Approach
            </h2>
            <p className="text-secondary">{study.approach}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-[0.15em] text-accent-warm uppercase">
              Solution
            </h2>
            <p className="text-secondary">{study.solution}</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-medium text-primary">Results</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((result) => (
              <div key={result} className="rounded-2xl border border-subtle bg-surface p-5">
                <p className="text-sm text-primary">{result}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium text-primary">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <Badge key={tech} tone="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="flex flex-col gap-4">
          <p className="text-xl leading-relaxed text-primary sm:text-2xl">
            &ldquo;{study.testimonial.quote}&rdquo;
          </p>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-primary">{study.testimonial.name}</span>
            <span className="text-sm text-muted">{study.testimonial.title}</span>
          </div>
        </Card>

        <Button href="/contact" variant="primary" className="w-fit">
          Start a Project Like This
        </Button>
      </section>

      <section className="border-t border-subtle">
        <Link
          href={`/work/${next.slug}`}
          className="group mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-16 md:px-16"
        >
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            Next Case Study
          </span>
          <span className="flex items-center gap-3 text-3xl font-medium tracking-tight text-primary">
            {next.client}
            <span className="transition-transform duration-200 group-hover:translate-x-2">→</span>
          </span>
        </Link>
      </section>
    </main>
  );
}
