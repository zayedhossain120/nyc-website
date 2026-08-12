"use client";

import { useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ADD_ONS, ARCHITECTURE_OPTIONS } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export function Estimator() {
  const [architecture, setArchitecture] = useState(ARCHITECTURE_OPTIONS[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [rush, setRush] = useState(false);

  const total = useMemo(() => {
    const base = ARCHITECTURE_OPTIONS.find((option) => option.id === architecture)?.basePrice ?? 0;
    const addOnTotal = ADD_ONS.filter((addOn) => selectedAddOns.includes(addOn.id)).reduce(
      (sum, addOn) => sum + addOn.price,
      0,
    );
    const subtotal = base + addOnTotal;
    return Math.round(rush ? subtotal * 1.2 : subtotal);
  }, [architecture, selectedAddOns, rush]);

  function toggleAddOn(id: string) {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <Card className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            1. Architecture
          </span>
          <div className="grid gap-3 sm:grid-cols-3">
            {ARCHITECTURE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setArchitecture(option.id)}
                className={cn(
                  "flex flex-col gap-1 rounded-xl border px-4 py-3 text-left transition-colors duration-200",
                  architecture === option.id
                    ? "border-accent-primary bg-accent-primary/10"
                    : "border-subtle hover:border-strong",
                )}
              >
                <span className="text-sm font-medium text-primary">{option.label}</span>
                <span className="text-xs text-muted">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            2. Add-Ons
          </span>
          <div className="grid gap-2 sm:grid-cols-2">
            {ADD_ONS.map((addOn) => (
              <label
                key={addOn.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors duration-200",
                  selectedAddOns.includes(addOn.id)
                    ? "border-accent-secondary bg-accent-secondary/10"
                    : "border-subtle hover:border-strong",
                )}
              >
                <span className="flex items-center gap-2 text-sm text-primary">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn.id)}
                    onChange={() => toggleAddOn(addOn.id)}
                    className="accent-accent-secondary"
                  />
                  {addOn.label}
                </span>
                <span className="font-mono text-xs text-muted">+${addOn.price.toLocaleString()}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            3. Timeline
          </span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setRush(false)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                !rush ? "border-accent-primary text-accent-primary" : "border-subtle text-secondary",
              )}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setRush(true)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                rush ? "border-accent-primary text-accent-primary" : "border-subtle text-secondary",
              )}
            >
              Rush (+20%)
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-subtle bg-surface-2 p-6">
        <div>
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            Estimated Investment
          </span>
          <AnimatedNumber
            value={total}
            prefix="$"
            className="block font-mono text-4xl font-medium text-primary"
          />
          <p className="mt-2 text-sm text-secondary">
            A rough starting range — every engagement gets a firm fixed-price quote after
            discovery.
          </p>
        </div>
        <Button href="/contact" variant="primary" className="w-full">
          Get This Scoped
        </Button>
      </div>
    </Card>
  );
}
