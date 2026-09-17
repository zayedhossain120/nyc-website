import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface BlogCardData {
  _id: string;
  slug: string;
  title: string;
  tags: string[];
  photoUrl?: string;
  altText?: string;
  views: number;
  featured?: boolean;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogCard({ blog }: { blog: BlogCardData }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-subtle transition-colors duration-300 hover:border-accent-secondary/60"
    >
      <div className="relative h-52 w-full overflow-hidden bg-surface-2">
        {blog.photoUrl ? (
          <Image
            src={blog.photoUrl}
            alt={blog.altText || blog.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-accent-secondary/10 via-surface-2 to-void" />
        )}
        {blog.featured && (
          <span className="absolute top-3 left-3 rounded-full border border-accent-primary/40 bg-void/60 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent-primary uppercase backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 bg-surface p-5">
        {blog.tags?.[0] && (
          <span className="inline-flex w-fit items-center rounded-full border border-accent-secondary/40 bg-accent-secondary/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent-secondary uppercase">
            {blog.tags[0]}
          </span>
        )}
        <h3 className="text-base leading-snug font-medium text-primary transition-colors duration-200 group-hover:text-accent-secondary line-clamp-2">
          {blog.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-4 font-mono text-[11px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {formatDate(blog.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1 text-primary transition-transform duration-300 group-hover:translate-x-1">
            Read <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}