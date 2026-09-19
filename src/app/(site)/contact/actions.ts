"use server";

import dbConnect from "@/lib/dbConnect";
import { BUDGET_OPTIONS, contactFormSchema, SERVICE_OPTIONS, TIMELINE_OPTIONS } from "@/lib/schemas/contact";
import Inquiry from "@/models/Inquiry";

export interface ContactActionState {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
}

const SUCCESS_MESSAGE = "Thanks — we'll be in touch within one business day.";

function labelFor(options: readonly { value: string; label: string }[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    service: formData.get("service"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    details: formData.get("details"),
    company_website: formData.get("company_website") ?? "",
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return {
      success: false,
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // Honeypot: bots that fill every field get a silent "success" with no side effects.
  if (parsed.data.company_website) {
    return { success: true, message: SUCCESS_MESSAGE };
  }

  try {
    await dbConnect();
    await Inquiry.create({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      serviceInterest: labelFor(SERVICE_OPTIONS, parsed.data.service),
      budget: labelFor(BUDGET_OPTIONS, parsed.data.budget),
      timeline: labelFor(TIMELINE_OPTIONS, parsed.data.timeline),
      message: parsed.data.details,
    });
  } catch (error) {
    console.error("Failed to save contact form submission:", error);
    return {
      success: false,
      message: "We couldn't send your message just now. Please try again, or email us directly.",
    };
  }

  return { success: true, message: SUCCESS_MESSAGE };
}
