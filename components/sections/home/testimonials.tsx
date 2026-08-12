import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

const TESTIMONIALS = [
  {
    quote:
      "Vertex didn't just build our app, they rebuilt how we ship. Core Web Vitals went from 42 to 100 in one sprint.",
    name: "Dana Whitfield",
    title: "VP Engineering",
    company: "Solstice Health",
    metric: "100/100 Lighthouse",
  },
  {
    quote:
      "Their AI automation team cut our manual intake process from 3 hours to 12 minutes per order.",
    name: "Marcus Ionescu",
    title: "COO",
    company: "Meridian Freight",
    metric: "18 hrs/week saved",
  },
  {
    quote: "We finally have one team accountable for both the build and the growth numbers.",
    name: "Priya Anand",
    title: "Founder",
    company: "Kettletown Supply Co.",
    metric: "2.4x conversion",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
      <SectionHeading eyebrow="Client Results" title="What it's like to work with us." />
      <TestimonialCarousel testimonials={TESTIMONIALS} className="max-w-2xl" />
    </section>
  );
}
