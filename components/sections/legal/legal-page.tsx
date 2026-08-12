import { Badge } from "@/components/ui/badge";

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, updated, intro, sections }: LegalPageProps) {
  return (
    <main className="flex flex-1 flex-col">
      <section className="px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <Badge tone="neutral">{eyebrow}</Badge>
          <h1 className="text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.05] font-medium tracking-tight text-primary">
            {title}
          </h1>
          <p className="font-mono text-xs text-muted">Last updated: {updated}</p>
          <p className="text-lg text-secondary">{intro}</p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 pb-24 md:px-16">
        {sections.map((section) => (
          <div key={section.heading} className="flex flex-col gap-4 border-t border-subtle pt-8">
            <h2 className="text-xl font-medium text-primary">{section.heading}</h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className="text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
