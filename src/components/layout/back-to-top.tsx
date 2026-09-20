"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { cn } from "@/lib/utils";

/** Show the button once the visitor has scrolled roughly one screen down. */
const SHOW_AFTER_PX = 600;

export function BackToTop() {
  const { lenis } = useSmoothScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    if (lenis) {
      // Lenis owns the scroll position, so go through it to keep the easing smooth.
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-50 flex size-12 items-center justify-center rounded-full border border-strong bg-surface/80 text-primary shadow-lg shadow-black/40 backdrop-blur-md md:right-8 md:bottom-8",
        "transition-[opacity,border-color,background-color,color,box-shadow] duration-300",
        "hover:border-accent-primary hover:bg-accent-primary hover:text-void hover:shadow-[0_0_24px_-4px_var(--accent-primary)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
