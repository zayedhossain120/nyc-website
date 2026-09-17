import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { FinalCta } from "@/components/sections/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICE_PILLARS } from "@/lib/data/services";
import type { ServiceDetail } from "@/lib/data/pennom-services";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/seo/schema";
import { SITE_NAME } from "@/lib/site-config";

export function getServiceDetailMetadata(service: ServiceDetail, path: string): Metadata {
  return {
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
    },
  };
}

export function ServiceDetailTemplate({
  service,
  path,
  related,
}: {
  service: ServiceDetail;
  path: string;
  related: ServiceDetail[];
}) {
  const pillar = SERVICE_PILLARS.find((entry) => entry.id === service.pillarId);
  const Icon = service.icon;
  const unitLabel = service.pricing.unit === "per month" ? "month" : "project";

  const schemas: object[] = [
    serviceSchema({
      name: service.title,
      description: service.seo.description,
      path,
      serviceType: service.badge,
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      ...(pillar ? [{ name: pillar.title, path: pillar.href }] : []),
      { name: service.title, path },
    ]),
  ];

  if (service.faqs && service.faqs.length > 0) {
    schemas.push(faqPageSchema(service.faqs));
  }

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={schemas} />

      {/* Hero */}
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <Reveal className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Link href="/services" className="text-sm text-secondary transition-colors hover:text-primary">
            ← All Services
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {pillar && (
              <Link href={pillar.href}>
                <Badge tone={pillar.tone}>{pillar.title}</Badge>
              </Link>
            )}
            <Badge tone="neutral">
              <Icon className="size-3.5" aria-hidden />
              {service.badge}
            </Badge>
          </div>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            {service.title}
          </h1>
          <p className="max-w-2xl text-lg text-secondary">{service.brief}</p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Get a Fixed-Price Quote
            </Button>
            <Button href="/pricing" variant="ghost">
              See Pricing
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Hero image */}
      <section className="border-t border-subtle">
        <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-16">
          <Reveal className="overflow-hidden rounded-2xl border border-subtle bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-subtle bg-surface-2 px-4 py-3">
              <span className="size-2.5 rounded-full bg-accent-warm/70" />
              <span className="size-2.5 rounded-full bg-accent-primary/70" />
              <span className="size-2.5 rounded-full bg-accent-secondary/70" />
              <span className="ml-2 font-mono text-xs text-muted">{service.slug}.app</span>
            </div>
            <Image
              src={service.image}
              alt={`${service.title} preview`}
              width={1200}
              height={900}
              priority
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Overview" title="What this service is." />
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-secondary">{service.overview}</p>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Highlights" title="Why it moves the needle." />
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-xl border border-subtle bg-surface/60 p-4 text-sm text-secondary"
              >
                <Check className="mt-0.5 size-4 flex-shrink-0 text-accent-primary" aria-hidden />
                {highlight}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Inline body image */}
      {service.inlineImage && (
        <section className="border-t border-subtle">
          <div className="mx-auto w-full max-w-7xl px-6 py-24 md:px-16">
            <Reveal className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-subtle bg-surface shadow-xl shadow-black/30">
              <Image
                src={service.inlineImage}
                alt={`${service.title} detail view`}
                width={1200}
                height={900}
                className="h-auto w-full"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Specs */}
      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Scope" title="What's included." />
          <Reveal className="flex flex-col gap-3">
            {service.specs.map((spec) => (
              <div
                key={spec}
                className="flex items-start gap-3 rounded-xl border border-subtle bg-surface-2 p-5 text-secondary"
              >
                <span className="mt-2 size-1.5 flex-shrink-0 rounded-full bg-accent-primary" aria-hidden />
                <span className="text-sm leading-relaxed">{spec}</span>
              </div>
            ))}
            {service.metric && (
              <Badge className="mt-2 w-fit" tone={pillar?.tone}>
                {service.metric}
              </Badge>
            )}
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Pricing" title="Transparent pricing." />
          <Reveal>
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-subtle bg-surface/60 p-6 sm:flex-row sm:items-center md:p-8">
              <div>
                <span className="font-mono text-xs tracking-wider text-muted uppercase">Starting At</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-4xl font-medium text-primary">{service.pricing.amount}</span>
                  <span className="font-mono text-sm text-muted">/{unitLabel}</span>
                </div>
                {service.pricing.note && (
                  <p className="mt-2 text-sm text-muted">{service.pricing.note}</p>
                )}
              </div>
              <Button href="/contact" variant="primary" className="w-fit whitespace-nowrap">
                Get a Quote
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Service Areas */}
      {service.serviceAreas && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
            <SectionHeading
              eyebrow="Coverage"
              title={service.serviceAreas.title}
              subtitle={service.serviceAreas.description}
              align="center"
            />
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.serviceAreas.regions.map((region) => (
                <Card key={region.city} className="flex flex-col gap-2">
                  <h3 className="text-base font-medium text-primary">{region.city}</h3>
                  <p className="text-sm text-secondary">{region.desc}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {region.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-subtle bg-void px-2 py-0.5 font-mono text-[11px] text-muted"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Success Stories */}
      {service.successStories && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-24 md:px-16">
            <SectionHeading
              eyebrow={service.successStories.eyebrow}
              title={service.successStories.title}
              subtitle={service.successStories.description}
              align="center"
            />
            <div className="flex flex-col gap-10">
              {service.successStories.stories.map((story) => {
                if (story.type === "full") {
                  return (
                    <Reveal
                      key={story.title}
                      className="grid items-center gap-8 rounded-3xl border border-subtle bg-surface/60 p-6 md:grid-cols-2 md:p-10"
                    >
                      <div className="relative overflow-hidden rounded-xl border border-subtle bg-surface-2 shadow-xl">
                        {story.image && (
                          <Image
                            src={story.image}
                            alt={story.imageAlt ?? story.title}
                            width={800}
                            height={450}
                            className="h-auto w-full object-cover"
                          />
                        )}
                        {story.metric && (
                          <span className="absolute top-3 right-3 rounded-md bg-success px-2 py-1 text-xs font-semibold text-void">
                            {story.metric}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-4">
                        {story.badge && (
                          <Badge tone={pillar?.tone ?? "neutral"}>{story.badge}</Badge>
                        )}
                        <h3 className="text-2xl font-medium tracking-tight text-primary">{story.title}</h3>
                        <p className="text-sm leading-relaxed text-secondary">{story.body}</p>
                        {story.points && (
                          <ul className="flex flex-col gap-2 text-sm text-muted">
                            {story.points.map((point) => (
                              <li key={point} className="flex gap-2">
                                <Check className="mt-0.5 size-4 flex-shrink-0 text-success" aria-hidden />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </Reveal>
                  );
                }
                const StoryIcon = story.icon;
                return (
                  <Reveal key={story.title} className="h-full">
                    <div className="flex h-full flex-col gap-4 rounded-2xl border border-subtle bg-surface/60 p-6">
                      <div className="flex items-center gap-3">
                        {StoryIcon && <StoryIcon className={`size-8 ${story.iconClass ?? "text-accent-secondary"}`} aria-hidden />}
                        <h3 className="text-xl font-medium tracking-tight text-primary">{story.title}</h3>
                      </div>
                      <p className="flex-grow text-sm leading-relaxed text-secondary">{story.body}</p>
                      {story.image && (
                        <div className="relative overflow-hidden rounded-xl border border-subtle bg-surface-2 shadow-xl">
                          <Image
                            src={story.image}
                            alt={story.imageAlt ?? story.title}
                            width={600}
                            height={300}
                            className="h-auto w-full object-cover"
                          />
                          {story.metric && (
                            <span
                              className={`absolute top-2 right-2 rounded-md px-2 py-1 text-xs font-semibold text-void ${
                                story.metricClass ?? "bg-accent-secondary"
                              }`}
                            >
                              {story.metric}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-24 md:px-16">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently asked questions."
              subtitle={`Everything you need to know about our ${service.title.toLowerCase().replace(/\s+/g, " ").replace(/^./, (char) => char.toUpperCase())} services.`}
              align="center"
            />
            <Reveal>
              <Accordion items={service.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {/* Why partner */}
      {service.whyPartner && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-24 text-center md:px-16">
            <Reveal className="flex flex-col items-center gap-6 rounded-3xl border border-subtle bg-surface/60 px-6 py-14 md:px-16">
              <SectionHeading eyebrow="The Edge" title={service.whyPartner.title} align="center" />
              <p className="max-w-3xl text-sm leading-relaxed text-secondary">{service.whyPartner.body}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {service.whyPartner.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-subtle bg-void px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
            <SectionHeading eyebrow="Keep Exploring" title="Related services." />
            <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => {
                const RelatedIcon = entry.icon;
                const relatedPillar = SERVICE_PILLARS.find((item) => item.id === entry.pillarId);
                return (
                  <Link
                    key={entry.slug}
                    href={`/services/${entry.pillarId}/${entry.slug}`}
                    className="group flex items-start gap-3 rounded-xl border border-subtle bg-surface/60 p-4 transition-colors duration-300 hover:border-accent-secondary/60"
                  >
                    <div className="flex flex-shrink-0 items-center gap-2 rounded-lg border border-subtle bg-surface-2 p-2 text-accent-primary">
                      <RelatedIcon className="size-4" aria-hidden />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-primary">{entry.title}</span>
                      {relatedPillar && (
                        <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                          {relatedPillar.title}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </Reveal>
          </div>
        </section>
      )}

      <FinalCta />
    </main>
  );
}