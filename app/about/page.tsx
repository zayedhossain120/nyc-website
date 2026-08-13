import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCounter } from "@/components/ui/stat-counter";
import { aboutPageSchema, breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "About Us | NYC Engineering-First Digital Agency",
  description:
    "Vertex & Co. is New York's engineering-first digital agency — senior-only, full IP ownership, no outsourcing. Meet the team behind the work.",
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

const LEADERS = [
  {
    name: "Elena Marchetti",
    title: "Chief Executive Officer",
    bio: "Former engineering lead at a Series C fintech, Elena founded Vertex after watching too many agencies bill hours instead of outcomes.",
    specialty: "Client Strategy & Fixed-Price Delivery",
  },
  {
    name: "James Okafor",
    title: "Chief Operating Officer",
    bio: "Runs the operational backbone — proposals, staffing, and the fixed-price guarantee that makes every deadline real.",
    specialty: "Operations & Delivery",
  },
  {
    name: "Ravi Deshmukh",
    title: "Chief Technology Officer",
    bio: "Fifteen years shipping production systems, from ad-tech at scale to healthcare compliance. Sets the technical bar for every engagement.",
    specialty: "Architecture & AI Systems",
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={[aboutPageSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])]} />
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge tone="secondary">About</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            Built in New York, for companies that move at New York speed.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            Vertex & Co. started as three engineers tired of watching clients get junior talent
            at senior rates. We built the agency we wished existed: senior-only, fixed-price,
            and accountable for the number that actually matters — your growth.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-24 md:px-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter value={6} suffix=" yrs" label="Operating in NYC" />
          <StatCounter value={140} suffix="+" label="Projects Shipped" />
          <StatCounter value={92} suffix="%" label="Client Retention Rate" />
          <StatCounter value={18} label="Senior Engineers & Strategists" />
        </div>
      </section>

      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Values" title="What we actually optimize for." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value) => (
              <Card key={value.title} className="flex flex-col gap-2">
                <h3 className="text-base font-medium text-primary">{value.title}</h3>
                <p className="text-sm text-secondary">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-mesh border-t border-subtle">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:px-16">
          <p className="text-2xl leading-relaxed text-primary sm:text-3xl">
            &ldquo;We&apos;re headquartered in the Financial District because our clients are
            three subway stops away, not because it looks good on a letterhead.&rdquo;
          </p>
          <span className="text-sm text-muted">— The Vertex Team</span>
        </div>
      </section>

      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Leadership" title="Senior operators, not account managers." />
          <div className="grid gap-8 sm:grid-cols-3">
            {LEADERS.map((leader) => (
              <div key={leader.name} className="flex flex-col gap-4">
                <div className="flex aspect-square items-center justify-center rounded-2xl border border-subtle bg-surface-2 font-mono text-2xl text-secondary">
                  {leader.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <h3 className="text-base font-medium text-primary">{leader.name}</h3>
                    <p className="text-sm text-muted">{leader.title}</p>
                  </div>
                  <p className="text-sm text-secondary">{leader.bio}</p>
                  <Badge tone="neutral" className="w-fit">
                    {leader.specialty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  );
}
