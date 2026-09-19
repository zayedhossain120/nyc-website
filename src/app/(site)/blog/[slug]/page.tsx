import type { Metadata } from "next";
import { cache } from "react";
import { Eye, Calendar, User, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard, type BlogCardData } from "@/components/blog/blog-card";
import { BlogContent } from "@/components/blog/blog-content";
import { ArticleFrame } from "@/components/blog/article-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import { appendPhotoUrls } from "@/lib/objectStorage/objectStorage.service";
import { serializeDoc } from "@/lib/serialize";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo/schema";
import Blog from "@/models/Blog";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

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
  updatedAt?: string;
}

const RELATED_LIMIT = 3;

/** Links from every article to the pages we most want to rank. */
const SERVICE_LINKS = [
  { label: "SaaS Development", href: "/services/software-development/saas-development" },
  { label: "SaaS Website Design", href: "/services/software-development/saas-web-design" },
  { label: "Cloud Application Development", href: "/services/software-development/cloud-application-development" },
  { label: "Local SEO in NYC", href: "/services/marketing-seo/local-seo-nyc" },
];

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

/** Same-tag posts first, topped up with the newest posts, never the current one. */
const getRelatedBlogs = cache(
  async (slug: string, tags: string[]): Promise<BlogCardData[]> => {
    await dbConnect();

    const byTag =
      tags.length > 0
        ? await Blog.find({ slug: { $ne: slug }, tags: { $in: tags } })
            .sort({ createdAt: -1 })
            .limit(RELATED_LIMIT)
            .lean()
        : [];

    let posts = byTag;
    if (posts.length < RELATED_LIMIT) {
      const exclude = [slug, ...posts.map((post) => post.slug)];
      const latest = await Blog.find({ slug: { $nin: exclude } })
        .sort({ createdAt: -1 })
        .limit(RELATED_LIMIT - posts.length)
        .lean();
      posts = [...posts, ...latest];
    }

    const withUrls = await appendPhotoUrls(posts, ["photo"]);
    return serializeDoc(withUrls);
  },
);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Collapse newlines and repeated spaces that admins paste into meta fields. */
function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function countWords(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Post Not Found", robots: { index: false, follow: false } };
  }

  const url = `${SITE_URL}/blog/${blog.slug}`;
  const metaTitle = cleanText(blog.metaTitle || blog.title);
  const description = cleanText(blog.metaDescription);
  // The root template appends the brand; skip it when the title already carries it.
  const title = metaTitle.includes(SITE_NAME) ? { absolute: metaTitle } : metaTitle;
  // Fall back to the site-wide share image when a post has no photo.
  const imageUrl = blog.photoUrl ?? `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    keywords: blog.tags?.length ? blog.tags : undefined,
    authors: blog.author ? [{ name: blog.author }] : undefined,
    alternates: { canonical: `/blog/${blog.slug}` },
    openGraph: {
      title: metaTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt ?? blog.createdAt,
      authors: blog.author ? [blog.author] : undefined,
      tags: blog.tags?.length ? blog.tags : undefined,
      images: [{ url: imageUrl, alt: blog.altText || blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [imageUrl],
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

  const related = await getRelatedBlogs(blog.slug, blog.tags ?? []);
  const wasUpdated =
    blog.updatedAt !== undefined &&
    new Date(blog.updatedAt).getTime() - new Date(blog.createdAt).getTime() > DAY_MS;

  return (
    <ArticleFrame>
      <JsonLd
        data={[
          blogPostingSchema({
            headline: blog.title,
            description: cleanText(blog.metaDescription),
            path: `/blog/${blog.slug}`,
            authorName: blog.author || undefined,
            datePublished: blog.createdAt,
            dateModified: blog.updatedAt,
            image: blog.photoUrl,
            keywords: blog.tags,
            wordCount: countWords(blog.content),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: blog.title, path: `/blog/${blog.slug}` },
          ]),
        ]}
      />

      <section className="gradient-mesh px-6 pt-20 pb-12 md:px-16 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
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
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
            </span>
            {wasUpdated && blog.updatedAt && (
              <span>
                Updated <time dateTime={blog.updatedAt}>{formatDate(blog.updatedAt)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" /> {blog.views} views
            </span>
          </div>
        </div>
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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-16 md:px-16">
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            Work with NYC Digital Agency
          </span>
          <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-primary">
            Need help putting this into practice?
          </h2>
          <p className="max-w-2xl text-secondary">
            We are a New York software development company. Talk to a senior team about your
            project and get a fixed-price scope within one business day.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/contact" variant="primary">
              Book Your Strategy Call
            </Button>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-strong px-4 py-2 text-sm text-secondary transition-colors hover:border-accent-secondary/60 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-subtle">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-16 md:px-16">
            <h2 className="text-3xl font-medium tracking-tight text-primary">Related articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((post) => (
                <BlogCard key={post._id} blog={post} />
              ))}
            </div>
            <Link href="/blog" className="w-fit text-sm font-medium text-primary">
              Browse all articles →
            </Link>
          </div>
        </section>
      )}
    </ArticleFrame>
  );
}
