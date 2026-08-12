import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const LEADERS = [
  { name: "Elena Marchetti", title: "Chief Executive Officer" },
  { name: "James Okafor", title: "Chief Operating Officer" },
  { name: "Ravi Deshmukh", title: "Chief Technology Officer" },
];

export function LeadershipTeaser() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
      <SectionHeading eyebrow="Leadership" title="Senior operators, not account managers." />
      <div className="grid gap-8 sm:grid-cols-3">
        {LEADERS.map((leader) => (
          <Link key={leader.name} href="/about" className="group flex flex-col gap-4">
            <div className="flex aspect-square items-center justify-center rounded-2xl border border-subtle bg-surface-2 font-mono text-2xl text-secondary transition-colors duration-300 group-hover:border-accent-secondary/60">
              {leader.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-base font-medium text-primary">{leader.name}</h3>
              <p className="text-sm text-muted">{leader.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <Button href="/about" variant="ghost" className="w-fit">
        Meet the Full Team →
      </Button>
    </section>
  );
}
