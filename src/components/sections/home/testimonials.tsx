import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TESTIMONIALS, type PlaceholderTestimonial } from "@/data/placeholder-content";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function ProjectImage({
  testimonial,
  className,
  sizes,
}: {
  testimonial: PlaceholderTestimonial;
  className?: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-subtle bg-surface-2 ${className ?? ""}`}>
      <Image
        src={testimonial.image}
        alt={`${testimonial.company}: ${testimonial.project}`}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
      <span className="absolute top-3 left-3 rounded-full border border-accent-primary/40 bg-void/70 px-3 py-1 font-mono text-[11px] text-accent-primary backdrop-blur-sm">
        {testimonial.metric}
      </span>
    </div>
  );
}

function Person({ testimonial }: { testimonial: PlaceholderTestimonial }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-2 font-mono text-sm text-secondary"
      >
        {initials(testimonial.name)}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-primary">{testimonial.name}</span>
        <span className="text-sm text-muted">
          {testimonial.title}, {testimonial.company}
        </span>
        <span className="font-mono text-[11px] text-muted">{testimonial.location}</span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section className="border-t border-subtle">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading eyebrow="Client Results" title="What it's like to work with us." />

        <Reveal>
          <figure className="grid gap-8 rounded-3xl border border-subtle bg-surface/60 p-6 md:grid-cols-2 md:p-10">
            <ProjectImage
              testimonial={featured}
              className="aspect-[4/3] md:aspect-auto md:min-h-80"
              sizes="(min-width: 768px) 45vw, 100vw"
            />
            <div className="flex flex-col justify-center gap-8">
              <blockquote className="text-xl leading-relaxed text-primary sm:text-2xl">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption>
                <Person testimonial={featured} />
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <Reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col gap-5 rounded-2xl border border-subtle bg-surface/60 p-5 transition-colors duration-300 hover:border-accent-secondary/60"
            >
              <ProjectImage
                testimonial={testimonial}
                className="aspect-[16/10]"
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
              />
              <blockquote className="flex-1 text-sm leading-relaxed text-secondary">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption>
                <Person testimonial={testimonial} />
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
