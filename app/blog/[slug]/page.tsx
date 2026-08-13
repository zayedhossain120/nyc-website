import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/sections/blog/post-body";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/data/blog-posts";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((item) => item.slug !== slug).slice(0, 2);
  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={[
          blogPostingSchema({
            headline: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            authorName: post.author.name,
            datePublished: post.publishedAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <section className="px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <Link href="/blog" className="text-sm text-secondary hover:text-primary">
            ← All Insights
          </Link>
          <Badge tone="secondary">{post.category}</Badge>
          <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-medium tracking-tight text-primary">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span>{post.author.name}</span>
            <span>·</span>
            <span>{post.author.title}</span>
            <span>·</span>
            <span>{publishedDate}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24 md:px-16">
        <PostBody post={post} />
      </section>

      {related.length > 0 && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-24 md:px-16">
            <h2 className="text-xl font-medium text-primary">Related Insights</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-subtle bg-surface p-6 transition-colors duration-300 hover:border-accent-secondary/60"
                >
                  <Badge tone="secondary">{item.category}</Badge>
                  <h3 className="text-lg font-medium text-primary">{item.title}</h3>
                  <span className="text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
