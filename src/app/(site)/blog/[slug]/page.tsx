import type { Metadata } from "next";
import { cache } from "react";
import { Eye, Calendar, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/blog-content";
import { ArticleFrame } from "@/components/blog/article-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import dbConnect from "@/lib/dbConnect";
import { appendPhotoUrls } from "@/lib/objectStorage/objectStorage.service";
import { serializeDoc } from "@/lib/serialize";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo/schema";
import Blog from "@/models/Blog";
import { SITE_URL } from "@/lib/site-config";

interface BlogDetail {
  _id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  tags: string[];
  photoUrl?: string;
  altText: string;
  author?: string;
  views: number;
  createdAt: string;
}

const getBlogBySlug = cache(
  async (slug: string): Promise<BlogDetail | null> => {
    await dbConnect();
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true },
    ).lean();

    if (!blog) return null;

    const withUrl = await appendPhotoUrls(blog, ["photo"]);
    return serializeDoc(withUrl);
  },
);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  const url = `${SITE_URL}/blog/${blog.slug}`;

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      url,
      type: "article",
      images: blog.photoUrl ? [{ url: blog.photoUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: blog.photoUrl ? [blog.photoUrl] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  return (
    <ArticleFrame>
      <JsonLd
        data={[
          blogPostingSchema({
            headline: blog.title,
            description: blog.metaDescription,
            path: `/blog/${blog.slug}`,
            authorName: blog.author || "NYC Digital Agency",
            datePublished: blog.createdAt,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: blog.title, path: `/blog/${blog.slug}` },
          ]),
        ]}
      />

      <section className="gradient-mesh px-6 pt-20 pb-12 md:px-16 md:pt-28">
        <article className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted transition-colors duration-200 hover:text-accent-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>

          {blog.tags?.[0] && <Badge tone="secondary">{blog.tags[0]}</Badge>}

          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-medium tracking-tight text-primary">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-subtle pb-8 font-mono text-xs text-muted">
            {blog.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> {blog.author}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(blog.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" /> {blog.views} views
            </span>
          </div>
        </article>
      </section>

      {blog.photoUrl && (
        <section className="mx-auto mt-10 w-full max-w-7xl px-6 md:px-16">
          <div className="overflow-hidden rounded-2xl border border-subtle bg-surface">
            <Image
              src={blog.photoUrl}
              alt={blog.altText || blog.title}
              width={1280}
              height={720}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </section>
      )}

      <section className="mx-auto flex w-full max-w-7xl flex-col px-6 py-14 md:px-16">
        <BlogContent content={blog.content} />

        {blog.tags?.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-subtle pt-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-strong bg-surface px-3 py-1 font-mono text-xs text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-subtle">
        <Link
          href="/blog"
          className="group mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-16 md:px-16"
        >
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            More Insights
          </span>
          <span className="flex items-center gap-3 text-3xl font-medium tracking-tight text-primary">
            Browse the Blog
            <span className="transition-transform duration-200 group-hover:translate-x-2">
              →
            </span>
          </span>
        </Link>
      </section>
    </ArticleFrame>
  );
}
