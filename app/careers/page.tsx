import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Careers | Join Vertex & Co. in New York City",
  description: "Careers at Vertex & Co. — a senior-only, NYC engineering-first software development and AI automation agency.",
  alternates: { canonical: "/careers" },
};

const PERKS = [
  {
    title: "Senior-Only Bar",
    description: "You work alongside people who don't need their code reviewed line by line.",
  },
  {
    title: "Remote-Friendly, NYC-Rooted",
    description: "Our HQ is in the Financial District. Most of the team works from it some of the time, not all of it.",
  },
  {
    title: "Real Equity, Real Ownership",
    description: "Every full-time hire gets equity. We built this agency to be owned by the people building it.",
  },
  {
    title: "No Bench Time",
    description: "Fixed-price engagements mean no billable-hour theater. You ship, or you're between real projects — never padding a timesheet.",
  },
];

export default function CareersPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge tone="secondary">Careers</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            Work with engineers who ship.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            We're a small, senior-only team by design. No account managers between you and the
            client, no bloated approval chains between you and production.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading eyebrow="Why Vertex" title="What it's actually like here." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((perk) => (
            <Card key={perk.title} className="flex flex-col gap-3">
              <h3 className="text-base font-medium text-primary">{perk.title}</h3>
              <p className="text-sm text-secondary">{perk.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Open Roles" title="No open roles right now." />
          <p className="max-w-2xl text-secondary">
            We hire in bursts around client demand rather than keeping a bench. That means there's
            nothing posted at the moment — but we're always meeting exceptional engineers,
            designers, and growth leads for when the next seat opens.
          </p>
          <Button href="mailto:careers@vertexand.co" variant="primary" className="w-fit">
            Introduce Yourself
          </Button>
        </div>
      </section>
    </main>
  );
}
