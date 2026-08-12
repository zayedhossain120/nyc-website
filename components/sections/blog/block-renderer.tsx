import { TerminalWindow } from "@/components/ui/terminal-window";
import type { BlogBlock } from "@/lib/data/blog-posts";
import { slugify } from "@/lib/utils";

export function BlockRenderer({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="text-lg leading-relaxed text-secondary">
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2
                key={index}
                id={slugify(block.text)}
                className="mt-4 scroll-mt-28 text-2xl font-medium text-primary"
              >
                {block.text}
              </h2>
            );
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-secondary">
                    <span className="text-accent-primary">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "code":
            return (
              <TerminalWindow key={index} title={block.title}>
                {block.code}
              </TerminalWindow>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
