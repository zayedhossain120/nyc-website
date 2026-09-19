import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { TESTIMONIALS } from "@/data/placeholder-content";

export function Testimonials() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
      <SectionHeading eyebrow="Client Results" title="What it's like to work with us." />
      <Reveal>
        <TestimonialCarousel testimonials={TESTIMONIALS} className="max-w-2xl" />
      </Reveal>
    </section>
  );
}
