import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TEAM } from "@/data/placeholder-content";

export function LeadershipTeaser() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
      <SectionHeading eyebrow="Leadership" title="Senior operators, not account managers." />
      <Reveal className="grid gap-8 sm:grid-cols-3">
        {TEAM.map((leader) => (
          <Link key={leader.name} href="/about" className="group flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-subtle bg-surface-2 transition-colors duration-300 group-hover:border-accent-secondary/60">
              <Image
                src={leader.photo}
                alt={`${leader.name}, NYC Digital Agency`}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h3 className="text-base font-medium text-primary">{leader.name}</h3>
              <p className="text-sm text-muted">{leader.title}</p>
            </div>
          </Link>
        ))}
      </Reveal>
      <Button href="/about" variant="ghost" className="w-fit">
        Meet the Full Team →
      </Button>
    </section>
  );
}
