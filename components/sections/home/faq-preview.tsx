import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

const FAQS = [
  {
    question: "Do you work with companies outside NYC?",
    answer:
      "Yes. We're headquartered in New York and prioritize local SEO for NYC-based clients, but roughly half our engagements are national or fully remote.",
  },
  {
    question: "What's included in the Fixed-Price Guarantee?",
    answer:
      "Every proposal locks in a final number before day one, based on a scoped set of deliverables. Change requests outside that scope are quoted separately — no surprise hourly invoices.",
  },
  {
    question: "What is AEO/GEO and why does it matter now?",
    answer:
      "Answer Engine Optimization and Generative Engine Optimization structure your content so tools like ChatGPT, Perplexity, and Google AI Overviews cite your business directly in their answers — not just in a list of blue links.",
  },
  {
    question: "Who owns the code and IP after launch?",
    answer:
      "You do, entirely. Source code, design files, and any custom AI models or automations transfer to you at final payment. We don't retain licensing rights.",
  },
  {
    question: "What happens if a project needs to change scope mid-build?",
    answer:
      "We pause, re-scope, and quote the delta before continuing — you approve any change before it affects the price or the timeline.",
  },
];

export function FaqPreview() {
  return (
    <section className="border-t border-subtle">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-24 md:px-16">
        <SectionHeading eyebrow="FAQ" title="Common questions, answered up front." />
        <Accordion items={FAQS} className="max-w-3xl" />
        <Button href="/faq" variant="ghost" className="w-fit">
          View All FAQs →
        </Button>
      </div>
    </section>
  );
}
