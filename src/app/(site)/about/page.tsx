import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/sections/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCounter } from "@/components/ui/stat-counter";
import { COMPANY_STATS, TEAM } from "@/data/placeholder-content";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "About Us | NYC Engineering-First Digital Agency",
  description:
    "NYC Digital Agency is New York's engineering-first digital agency — senior-only, full IP ownership, no outsourcing. Meet the team behind the work.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { title: "Ship Fast, Ship Right", description: "Speed without a quality trade-off — or we don't ship it." },
  { title: "Radical Transparency", description: "You see the same project board, budget, and blockers we do." },
  { title: "No Outsourcing, Ever", description: "Every hour on your project is billed by the person who worked it." },
  { title: "Data Over Opinions", description: "Design and growth decisions get tested, not debated indefinitely." },
  { title: "Own the Outcome", description: "We measure success in your metrics, not our deliverable checklist." },
  { title: "Senior by Default", description: "No junior hand-offs. The person who scopes it is the person who builds it." },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={[aboutPageSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <Reveal className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge tone="secondary">About</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            Built in New York, for companies that move at New York speed.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            NYC Digital Agency started as three engineers tired of watching clients get junior talent
            at senior rates. We built the agency we wished existed: senior-only, fixed-price,
            and accountable for the number that actually matters — your growth.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-24 md:px-16">
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter value={COMPANY_STATS.yearsInNyc} suffix=" yrs" label="Operating in NYC" />
          <StatCounter value={COMPANY_STATS.projectsShipped} suffix="+" label="Projects Shipped" />
          <StatCounter value={COMPANY_STATS.clientRetentionPercent} suffix="%" label="Client Retention Rate" />
          <StatCounter value={COMPANY_STATS.teamSize} label="Senior Engineers & Strategists" />
        </Reveal>
      </section>

      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Values" title="What we actually optimize for." />
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title} className="flex flex-col gap-2">
                <h3 className="text-base font-medium text-primary">{value.title}</h3>
                <p className="text-sm text-secondary">{value.description}</p>
              </Card>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="gradient-mesh border-t border-subtle">
        <Reveal className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:px-16">
          <p className="text-2xl leading-relaxed text-primary sm:text-3xl">
            &ldquo;We&apos;re headquartered in the Financial District because our clients are
            three subway stops away, not because it looks good on a letterhead.&rdquo;
          </p>
          <span className="text-sm text-muted">— The NYC Digital Agency Team</span>
        </Reveal>
      </section>

      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Leadership" title="Senior operators, not account managers." />
          <Reveal className="grid gap-8 sm:grid-cols-3">
            {TEAM.map((leader) => (
              <div key={leader.name} className="flex flex-col gap-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-subtle bg-surface-2">
                  <Image
                    src={leader.photo}
                    alt={`${leader.name}, NYC Digital Agency`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <h3 className="text-base font-medium text-primary">{leader.name}</h3>
                    <p className="text-sm text-muted">{leader.title}</p>
                  </div>
                  {leader.bio && <p className="text-sm text-secondary">{leader.bio}</p>}
                  {leader.specialty && (
                    <Badge tone="neutral" className="w-fit">
                      {leader.specialty}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
