import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Launch Sprint",
    description: "High-Impact Landing Page",
    price: "$3,900",
    cadence: "Starting price · 2-week delivery",
    featured: false,
  },
  {
    name: "Growth Engine",
    description: "Full Web App + Automation Starter",
    price: "$13,500",
    cadence: "Starting price · 4–5 week delivery",
    featured: true,
  },
  {
    name: "Scale Partner",
    description: "Dedicated Team Retainer",
    price: "$8,500/mo",
    cadence: "Starting price · ongoing retainer",
    featured: false,
  },
];

export function PricingTeaser() {
  return (
    <section className="border-t border-subtle">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading eyebrow="Investment" title="Fixed prices. No hourly billing, ever." />
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn(tier.featured && "border-accent-primary/60")}
            >
              {tier.featured && (
                <span className="mb-3 inline-block rounded-full bg-accent-primary/10 px-3 py-1 font-mono text-xs text-accent-primary">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-medium text-primary">{tier.name}</h3>
              <p className="mt-1 text-sm text-secondary">{tier.description}</p>
              <p className="mt-6 font-mono text-3xl text-primary">{tier.price}</p>
              <p className="text-xs text-muted">{tier.cadence}</p>
            </Card>
          ))}
        </div>
        <Button href="/pricing" variant="ghost" className="w-fit">
          See Full Pricing & Add-Ons →
        </Button>
      </div>
    </section>
  );
}
