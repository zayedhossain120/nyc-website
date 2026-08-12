export interface ProcessStep {
  range: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    range: "Days 1–3",
    title: "Discovery & System Architecture",
    description:
      "We map every workflow that touches the project — yours and your users' — before a single line of code gets written.",
    deliverables: [
      "Stakeholder & workflow interviews",
      "Technical architecture document",
      "Locked fixed-price scope & timeline",
    ],
  },
  {
    range: "Days 4–8",
    title: "High-Fidelity UI/UX Design",
    description:
      "Every screen gets designed against your actual content and data, not lorem ipsum, so engineering can start on day nine with zero ambiguity.",
    deliverables: [
      "Figma design system & tokens",
      "Full-page high-fidelity mockups",
      "Interactive prototype for stakeholder sign-off",
    ],
  },
  {
    range: "Days 9–18",
    title: "Full-Stack Engineering & Automation Build",
    description:
      "The build phase. Frontend, backend, and any AI/automation pieces are developed in parallel against the locked architecture.",
    deliverables: [
      "Frontend + backend implementation",
      "AI/automation integrations wired end-to-end",
      "Staging environment for live review",
    ],
  },
  {
    range: "Days 19–21",
    title: "QA, Speed Tuning, Global Launch",
    description:
      "We don't call it done until it's fast, tested across real devices, and live — with a warranty window that starts the moment we ship.",
    deliverables: [
      "Cross-browser & device QA pass",
      "Core Web Vitals tuning to 90+",
      "Production launch & 30-day warranty window begins",
    ],
  },
];
