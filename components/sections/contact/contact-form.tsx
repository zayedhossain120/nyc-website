"use client";

import { motion } from "motion/react";
import { useActionState, useState, type ReactNode } from "react";
import { submitContactForm, type ContactActionState } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

const STEPS = ["Basics", "Project", "Details"];

const initialState: ContactActionState = { success: false, message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const [step, setStep] = useState(0);

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4 rounded-2xl border border-subtle bg-surface p-10 text-center"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
          className="flex size-14 items-center justify-center rounded-full bg-accent-primary/10 text-2xl text-accent-primary"
        >
          ✓
        </motion.span>
        <h3 className="text-xl font-medium text-primary">Message sent.</h3>
        <p className="text-secondary">{state.message}</p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex gap-2">
        {STEPS.map((label, index) => (
          <div key={label} className="flex-1">
            <div
              className={cn(
                "h-1 rounded-full transition-colors duration-300",
                index <= step ? "bg-accent-primary" : "bg-strong",
              )}
            />
            <span className="mt-2 block text-xs text-muted">{label}</span>
          </div>
        ))}
      </div>

      {/* Honeypot — hidden from real users, left for bots to fill */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px]"
        aria-hidden="true"
      />

      <div
        className={cn(
          "flex flex-col gap-5 transition-opacity duration-300",
          step !== 0 && "hidden",
        )}
      >
        <Field label="Full Name" name="name" error={state.fieldErrors?.name}>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-xl border border-strong bg-surface px-4 py-3 text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Work Email" name="email" error={state.fieldErrors?.email}>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-strong bg-surface px-4 py-3 text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
            placeholder="jane@company.com"
          />
        </Field>
        <Field label="Company" name="company" error={state.fieldErrors?.company}>
          <input
            type="text"
            name="company"
            required
            className="w-full rounded-xl border border-strong bg-surface px-4 py-3 text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
            placeholder="Acme Inc."
          />
        </Field>
      </div>

      <div className={cn("flex flex-col gap-5", step !== 1 && "hidden")}>
        <Field label="Service Interest" name="service" error={state.fieldErrors?.service}>
          <select
            name="service"
            required
            defaultValue=""
            className="w-full rounded-xl border border-strong bg-surface px-4 py-3 text-primary focus:border-accent-primary focus:outline-none"
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget Range" name="budget" error={state.fieldErrors?.budget}>
          <select
            name="budget"
            required
            defaultValue=""
            className="w-full rounded-xl border border-strong bg-surface px-4 py-3 text-primary focus:border-accent-primary focus:outline-none"
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className={cn("flex flex-col gap-5", step !== 2 && "hidden")}>
        <Field label="Project Details" name="details" error={state.fieldErrors?.details}>
          <textarea
            name="details"
            required
            rows={5}
            className="w-full resize-none rounded-xl border border-strong bg-surface px-4 py-3 text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
            placeholder="What are you building, and what does success look like?"
          />
        </Field>
        {state.message && !state.success && (
          <p className="text-sm text-accent-warm">{state.message}</p>
        )}
      </div>

      <div className="flex justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          magnetic={false}
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          className={cn(step === 0 && "invisible")}
        >
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            variant="primary"
            onClick={() => setStep((current) => Math.min(STEPS.length - 1, current + 1))}
          >
            Continue
          </Button>
        ) : (
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? "Sending…" : "Send Message"}
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-secondary">{label}</span>
      {children}
      {error && <span className="text-xs text-accent-warm">{error}</span>}
    </label>
  );
}
