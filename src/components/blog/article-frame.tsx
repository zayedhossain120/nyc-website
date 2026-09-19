"use client";

import { useRef, type ReactNode } from "react";
import { ReadingProgress } from "@/components/sections/blog/reading-progress";

export function ArticleFrame({ children }: { children: ReactNode }) {
  const targetRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <ReadingProgress target={targetRef} />
      <article ref={targetRef} className="flex flex-1 flex-col">
        {children}
      </article>
    </>
  );
}