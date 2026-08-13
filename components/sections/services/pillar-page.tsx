import Link from "next/link";
import { FinalCta } from "@/components/sections/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CASE_STUDIES, type CaseStudyCategory } from "@/lib/data/case-studies";
import { SERVICES, SERVICE_PILLARS, type ServicePillar } from "@/lib/data/services";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils";

const PILLAR_CASE_STUDY_CATEGORY: Record<ServicePillar, CaseStudyCategory> = {
  "software-development": "web-apps",
  "ai-automation": "ai-automation",
  "marketing-seo": "marketing-campaigns",
};

const PILLAR_SERVICE_TYPE: Record<ServicePillar, string> = {
  "software-development": "Software Development",
  "ai-automation": "AI Automation & Workflow Integration",
  "marketing-seo": "Digital Marketing & SEO",
};

export function PillarPage({ pillarId }: { pillarId: ServicePillar }) {
  const pillar = SERVICE_PILLARS.find((item) => item.id === pillarId)!;
  const services = SERVICES.filter((service) => service.pillar === pillarId);
  const caseStudies = CASE_STUDIES.filter(
    (study) => study.category === PILLAR_CASE_STUDY_CATEGORY[pillarId],
  ).slice(0, 3);

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          serviceSchema({
            name: pillar.title,
            description: pillar.description,
            path: pillar.href,
            serviceType: PILLAR_SERVICE_TYPE[pillarId],
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: pillar.title, path: pillar.href },
          ]),
        ]}
      />
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Link href="/services" className="text-sm text-secondary hover:text-primary">
            ← All Services
          </Link>
          <Badge tone={pillar.tone}>{pillar.title}</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            {pillar.description}
          </h1>
          <Button href="/contact" variant="primary" className="w-fit">
            Get a Fixed-Price Quote
          </Button>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading eyebrow="What's Included" title="Capability breakdown." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex flex-col gap-4">
              <h3 className="text-lg font-medium text-primary">{service.title}</h3>
              <p className="text-sm text-secondary">{service.description}</p>
              <ul className="flex flex-col gap-1.5 text-sm text-muted">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent-primary">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Badge tone={pillar.tone} className="mt-auto w-fit">
                {service.stat}
              </Badge>
            </Card>
          ))}
        </div>
      </section>

      {caseStudies.length > 0 && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
            <SectionHeading eyebrow="Relevant Work" title={`${pillar.title} in action.`} />
            <div className="grid gap-6 md:grid-cols-3">
              {caseStudies.map((study) => (
                <Link
                  key={study.slug}
                  href={`/work/${study.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-subtle transition-colors duration-300 hover:border-accent-secondary/60"
                >
                  <div className={cn("flex h-40 items-end bg-linear-to-br p-5", study.gradient)}>
                    <span className="rounded-full border border-accent-primary/40 bg-void/60 px-3 py-1 font-mono text-xs text-accent-primary backdrop-blur-sm">
                      {study.metric}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 bg-surface p-5">
                    <h3 className="text-base font-medium text-primary">{study.client}</h3>
                    <p className="text-sm text-secondary">{study.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </main>
  );
}
