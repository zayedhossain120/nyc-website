import { z } from "zod";

export const SERVICE_OPTIONS = [
  { value: "software-development", label: "Software Development" },
  { value: "ai-automation", label: "AI Automation" },
  { value: "marketing-growth", label: "Marketing & Growth" },
  { value: "not-sure", label: "Not Sure Yet" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().min(1, "Enter your work email").email("Enter a valid email address"),
  company: z.string().trim().min(2, "Enter your company name"),
  service: z.enum(SERVICE_OPTIONS.map((option) => option.value) as [string, ...string[]]),
  budget: z.enum(BUDGET_OPTIONS.map((option) => option.value) as [string, ...string[]]),
  details: z.string().trim().min(20, "Give us at least a sentence or two about the project"),
  company_website: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
