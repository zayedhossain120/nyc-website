"use client";

import { useRef } from "react";
import { BlockRenderer } from "@/components/sections/blog/block-renderer";
import { ReadingProgress } from "@/components/sections/blog/reading-progress";
import type { BlogPost } from "@/lib/data/blog-posts";
import { slugify } from "@/lib/utils";

export function PostBody({ post }: { post: BlogPost }) {
  const articleRef = useRef<HTMLDivElement>(null);
  const headings = post.content.filter((block) => block.type === "heading");

  return (
    <>
      <ReadingProgress target={articleRef} />
      <div ref={articleRef} className="grid gap-12 lg:grid-cols-[220px_1fr]">
        {headings.length > 0 && (
          <div className="hidden lg:block">
            <div className="sticky top-32 flex flex-col gap-3">
              <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
                On This Page
              </span>
              {headings.map((heading) => (
                <a
                  key={heading.text}
                  href={`#${slugify(heading.text)}`}
                  className="text-sm text-secondary transition-colors hover:text-primary"
                >
                  {heading.text}
                </a>
              ))}
            </div>
          </div>
        )}
        <BlockRenderer blocks={post.content} />
      </div>
    </>
  );
}
