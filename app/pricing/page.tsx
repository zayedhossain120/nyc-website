import type { Metadata } from "next";
import { Estimator } from "@/components/sections/pricing/estimator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ADD_ONS, PRICING_TIERS } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fixed-price engagement tiers from Vertex & Co. — no hourly billing, full IP ownership, transparent add-on pricing.",
};

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge tone="primary">Pricing</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            Fixed prices. No hourly billing, ever.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            Every engagement is quoted as a fixed number before day one. Pick a starting point
            below, or use the estimator to scope something custom.
          </p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn("flex flex-col gap-5", tier.featured && "border-accent-primary/60")}
            >
              {tier.featured && (
                <span className="w-fit rounded-full bg-accent-primary/10 px-3 py-1 font-mono text-xs text-accent-primary">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-lg font-medium text-primary">{tier.name}</h3>
                <p className="mt-1 text-sm text-secondary">{tier.description}</p>
              </div>
              <div>
                <p className="font-mono text-3xl text-primary">{tier.price}</p>
                <p className="text-xs text-muted">{tier.cadence}</p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-secondary">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-accent-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant={tier.featured ? "primary" : "outline"} className="mt-auto">
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-24 md:px-16">
          <SectionHeading eyebrow="Add-Ons" title="Extend any tier." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ADD_ONS.map((addOn) => (
              <div
                key={addOn.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-subtle bg-surface px-5 py-4"
              >
                <span className="text-sm text-primary">{addOn.label}</span>
                <span className="font-mono text-sm text-accent-primary">
                  +${addOn.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-subtle">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
          <SectionHeading
            eyebrow="Estimator"
            title="Get a rough number in 30 seconds."
            subtitle="Not a quote — a starting point. Every project still gets a firm fixed price after a discovery call."
          />
          <Estimator />
        </div>
      </section>

      <section className="gradient-mesh border-t border-subtle">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:px-16">
          <Badge tone="secondary">Enterprise</Badge>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-medium tracking-tight text-primary">
            Need a dedicated SLA or SOC 2 readiness?
          </h2>
          <p className="max-w-xl text-lg text-secondary">
            For enterprise buyers, we scope custom engagements with dedicated infrastructure,
            uptime SLAs, and compliance workstreams built into the timeline.
          </p>
          <Button href="/contact" variant="primary">
            Talk to Us About Enterprise
          </Button>
        </div>
      </section>
    </main>
  );
}
