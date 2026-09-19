import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const SAAS_OFFERINGS = [
  {
    title: "SaaS Development",
    description:
      "Custom SaaS product development from MVP to multi-tenant platform: architecture, subscription billing and cloud infrastructure from one senior team.",
    points: ["SaaS product development process", "Custom SaaS development services", "AI B2B SaaS features"],
    href: "/services/software-development/saas-development",
  },
  {
    title: "SaaS Website & UX Design",
    description:
      "A SaaS web design agency for brand identity, B2B SaaS websites, landing pages and product UX that turns visitors into trials and demos.",
    points: ["B2B SaaS web design", "Brand identity design services", "SaaS UX design"],
    href: "/services/software-development/saas-web-design",
  },
  {
    title: "Cloud Application Development",
    description:
      "Cloud application development services for New York businesses: cloud-based web apps, APIs and infrastructure on AWS, Google Cloud, Azure or Vercel.",
    points: ["Cloud software development", "Cloud app development services", "CI/CD and monitoring"],
    href: "/services/software-development/cloud-application-development",
  },
];

export function SaasSpotlight() {
  return (
    <section className="border-t border-subtle">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading
          eyebrow="SaaS & Cloud"
          title="A SaaS development company in New York City."
          subtitle="We are a SaaS development agency and SaaS web design company in one team. We design, build and launch SaaS products and the websites that sell them, and run them on cloud infrastructure that scales."
        />
        <Reveal className="grid gap-6 md:grid-cols-3">
          {SAAS_OFFERINGS.map((offering) => (
            <Link key={offering.title} href={offering.href} className="flex">
              <Card className="flex w-full flex-col gap-4 transition-colors duration-300 hover:border-accent-secondary/60">
                <h3 className="text-lg font-medium text-primary">{offering.title}</h3>
                <p className="text-sm text-secondary">{offering.description}</p>
                <ul className="flex flex-col gap-1.5 font-mono text-xs text-muted">
                  {offering.points.map((point) => (
                    <li key={point}>— {point}</li>
                  ))}
                </ul>
                <span className="mt-auto text-sm font-medium text-primary">Learn more →</span>
              </Card>
            </Link>
          ))}
        </Reveal>
        <p className="max-w-3xl text-sm leading-relaxed text-muted">
          Whether you are a founder planning a first SaaS product, a B2B company that needs a
          better SaaS website, or an enterprise team modernising an application, we deliver
          fixed-price SaaS product development, cloud software development and design from our
          office at 45 Broad Street, Manhattan.
        </p>
      </div>
    </section>
  );
}
