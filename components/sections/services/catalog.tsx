import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { SERVICES, SERVICE_PILLARS } from "@/lib/data/services";

export function ServiceCatalog() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-6 py-24 md:px-16">
      {SERVICE_PILLARS.map((pillar) => (
        <div key={pillar.id} className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={pillar.title} title={pillar.description} />
            <Link
              href={pillar.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
            >
              Explore {pillar.title} →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((service) => service.pillar === pillar.id).map((service) => (
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
        </div>
      ))}
    </div>
  );
}
