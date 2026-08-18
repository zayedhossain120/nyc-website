import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, CATEGORY_LABELS, CATEGORY_TONE, getCaseStudyBySlug } from "@/lib/data/case-studies";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.client} | ${study.metric}`,
    description: `${study.summary} A Vertex & Co. design case study.`,
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
            headline: study.client,
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
      <section className="gradient-mesh px-6 pt-20 pb-12 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <Link href="/work" className="text-sm text-secondary hover:text-primary">
            ← All Work
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="neutral">{study.industry}</Badge>
            <Badge tone={CATEGORY_TONE[study.category]}>{CATEGORY_LABELS[study.category]}</Badge>
          </div>
          <h1 className="max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-primary">
            {study.client}
          </h1>
          <p className="max-w-2xl text-lg text-secondary">{study.summary}</p>
          <span className="w-fit rounded-full border border-accent-primary/40 bg-void/60 px-4 py-1.5 font-mono text-sm text-accent-primary backdrop-blur-sm">
            {study.metric}
          </span>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 md:px-16">
        <div
          className={
            study.images.length > 1
              ? "grid gap-4 sm:grid-cols-2"
              : "grid gap-4"
          }
        >
          {study.images.map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-2xl border border-subtle bg-surface"
            >
              <Image
                src={image.src}
                alt={study.client}
                width={image.width}
                height={image.height}
                sizes={study.images.length > 1 ? "(min-width: 640px) 50vw, 100vw" : "100vw"}
                className="h-auto w-full"
              />
            </div>
          ))}
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
          <h2 className="text-2xl font-medium text-primary">What Shipped</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.results.map((result) => (
              <div key={result} className="rounded-2xl border border-subtle bg-surface p-5">
                <p className="text-sm text-primary">{result}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-medium text-primary">Tools & Discipline</h2>
          <div className="flex flex-wrap gap-2">
            {study.techStack.map((tech) => (
              <Badge key={tech} tone="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

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
