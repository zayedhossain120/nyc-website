import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Insights | Engineering, AI Automation & AEO/GEO Blog",
  description:
    "Engineering deep-dives, AEO/GEO tactics, and AI automation field reports from the Vertex & Co. team in New York City.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/blog" }])} />
      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge tone="secondary">Insights</Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            Notes from the engineers and strategists doing the work.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            Engineering deep-dives, AEO/GEO tactics, and AI automation field reports — no
            recycled listicles.
          </p>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-24 md:grid-cols-2 md:px-16">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-4 rounded-2xl border border-subtle bg-surface p-6 transition-colors duration-300 hover:border-accent-secondary/60"
          >
            <div className="flex items-center gap-3">
              <Badge tone="secondary">{post.category}</Badge>
              <span className="font-mono text-xs text-muted">{post.readingTime}</span>
            </div>
            <h2 className="text-xl font-medium text-primary">{post.title}</h2>
            <p className="text-sm text-secondary">{post.excerpt}</p>
            <div className="mt-auto flex items-center justify-between pt-4">
              <span className="text-sm text-muted">
                {post.author.name} · {post.author.title}
              </span>
              <span className="text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
