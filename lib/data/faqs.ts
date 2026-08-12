export interface FaqCategory {
  category: string;
  items: { question: string; answer: string }[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    category: "NYC & Support",
    items: [
      {
        question: "Do you work with companies outside NYC?",
        answer:
          "Yes. We're headquartered in New York and prioritize local SEO for NYC-based clients, but roughly half our engagements are national or fully remote.",
      },
      {
        question: "What are your response times and support hours?",
        answer:
          "Project inquiries get a response within one business day. Active clients get direct Slack or email access to their engineering pod, with same-day responses during business hours (9am–6pm ET) and 24/7 monitoring on Scale Partner retainers.",
      },
    ],
  },
  {
    category: "Web & Mobile Dev",
    items: [
      {
        question: "What's included in the Fixed-Price Guarantee?",
        answer:
          "Every proposal locks in a final number before day one, based on a scoped set of deliverables. Change requests outside that scope are quoted separately — no surprise hourly invoices.",
      },
      {
        question: "Do you build mobile apps, or just web?",
        answer:
          "Both. Our mobile work is React Native/Expo, sharing a design system and often a backend with the web app, so you're not maintaining two disconnected codebases.",
      },
      {
        question: "What happens if a project needs to change scope mid-build?",
        answer:
          "We pause, re-scope, and quote the delta before continuing — you approve any change before it affects the price or the timeline.",
      },
    ],
  },
  {
    category: "AEO & GEO",
    items: [
      {
        question: "What is AEO/GEO and why does it matter now?",
        answer:
          "Answer Engine Optimization and Generative Engine Optimization structure your content so tools like ChatGPT, Perplexity, and Google AI Overviews cite your business directly in their answers — not just in a list of blue links.",
      },
      {
        question: "How do you measure AI citation success?",
        answer:
          "We track citation rate across a fixed prompt set relevant to your business, run monthly against major answer engines, alongside the referral traffic those citations generate.",
      },
    ],
  },
  {
    category: "Marketing & SEO",
    items: [
      {
        question: "How is Vertex different from a traditional SEO or ads agency?",
        answer:
          "Traditional agencies hand you a report and leave the implementation to your dev team. We are the dev team — so a technical SEO fix or a landing page redesign ships the same week it's recommended.",
      },
      {
        question: "How long until I see ROI from paid ads?",
        answer:
          "Most accounts hit statistically meaningful signal within 2–3 weeks of launch, with the first full optimization cycle complete by week 6. We report ROAS weekly from day one, not just at the end of the month.",
      },
    ],
  },
  {
    category: "AI Automation",
    items: [
      {
        question: "What kinds of processes can actually be automated?",
        answer:
          "Anything with a repeatable input and decision pattern: lead qualification, document parsing, customer support triage, report generation, and cross-system data entry are the most common wins.",
      },
      {
        question: "How is AI automation ROI measured?",
        answer:
          "We baseline the current manual process (hours/week, error rate, cost) before touching anything, then measure the same metrics post-launch. Every automation proposal includes a projected payback period.",
      },
    ],
  },
  {
    category: "Legal / IP",
    items: [
      {
        question: "Who owns the code and IP after launch?",
        answer:
          "You do, entirely. Source code, design files, and any custom AI models or automations transfer to you at final payment. We don't retain licensing rights.",
      },
      {
        question: "Do you sign NDAs?",
        answer:
          "Yes, standard practice before any discovery call that involves your product, data, or business specifics. See our Security page for our broader data-handling posture.",
      },
      {
        question: "What's your warranty/support policy after launch?",
        answer:
          "Every fixed-price engagement includes a warranty window (30–60 days depending on tier) covering bug fixes at no charge. Ongoing feature work is scoped separately or covered under a Scale Partner retainer.",
      },
    ],
  },
];
