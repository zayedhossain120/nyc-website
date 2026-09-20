"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  /** id for the trigger button; lets an external label point at it. */
  id?: string;
  options: readonly DropdownOption[];
  /** Selected option value ("" when nothing is selected). */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  className?: string;
  "aria-labelledby"?: string;
}

export function CustomDropdown({
  id,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  invalid = false,
  className,
  "aria-labelledby": labelledBy,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((option) => option.value === value);

  // Close when clicking outside.
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen]);

  // Keep the keyboard-focused option visible inside the scrollable list.
  useEffect(() => {
    if (!isOpen || focusedIndex < 0) return;
    listRef.current?.children[focusedIndex]?.scrollIntoView({ block: "nearest" });
  }, [isOpen, focusedIndex]);

  function open() {
    setFocusedIndex(Math.max(0, options.findIndex((option) => option.value === value)));
    setIsOpen(true);
  }

  function select(option: DropdownOption) {
    onChange(option.value);
    setIsOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) open();
        else setFocusedIndex((index) => (index + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) open();
        else setFocusedIndex((index) => (index - 1 + options.length) % options.length);
        break;
      case "Home":
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        if (isOpen && focusedIndex >= 0) {
          event.preventDefault();
          select(options[focusedIndex]);
        }
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={id ? `${id}-listbox` : undefined}
        aria-labelledby={labelledBy}
        aria-invalid={invalid || undefined}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={onKeyDown}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl border bg-surface px-4 py-3 text-left transition-colors duration-200 focus:outline-none",
          isOpen
            ? "border-accent-primary"
            : invalid
              ? "border-accent-warm"
              : "border-strong hover:border-accent-primary/60 focus-visible:border-accent-primary",
        )}
      >
        <span className={cn("line-clamp-1", selected ? "text-primary" : "text-muted")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          aria-hidden
          className={cn(
            "size-4 shrink-0 text-muted transition-transform duration-300",
            isOpen && "rotate-180 text-accent-primary",
          )}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={id ? `${id}-listbox` : undefined}
          role="listbox"
          className="absolute right-0 left-0 z-30 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-subtle bg-surface-2 py-1.5 shadow-2xl shadow-black/50"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(option)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm transition-colors",
                  index === focusedIndex ? "bg-surface text-primary" : "text-secondary",
                  isSelected && "text-accent-primary",
                )}
              >
                {option.label}
                {isSelected && <Check aria-hidden className="size-4 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
