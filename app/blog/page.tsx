import type { Metadata } from "next";
import { BlogGrid } from "@/components/blog/blog-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import dbConnect from "@/lib/db";
import { appendPhotoUrls } from "@/lib/storage/photos";
import { serializeDoc } from "@/lib/utils/serialize";
import { breadcrumbSchema } from "@/lib/seo/schema";
import Blog from "@/lib/models/blog";

const BLOG_LIMIT = 9;

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | NYC Web Development, SEO & AI Automation Insights",
  description:
    "Notes on building, marketing, and automating — full-stack engineering, NYC SEO/GEO, and AI automation insights from the Vertex & Co. team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog | Vertex & Co.",
    description:
      "Full-stack engineering, NYC SEO/GEO, and AI automation insights from the Vertex & Co. team.",
    type: "website",
  },
};

async function getInitialBlogs() {
  await dbConnect();
  const [blogs, total] = await Promise.all([
    Blog.find().sort({ createdAt: -1 }).limit(BLOG_LIMIT).lean(),
    Blog.countDocuments(),
  ]);
  const withUrls = await appendPhotoUrls(blogs, ["photo"]);
  return { blogs: serializeDoc(withUrls), total };
}

export default async function BlogListPage() {
  const { blogs, total } = await getInitialBlogs();

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="gradient-mesh px-6 pt-20 pb-16 md:px-16 md:pt-28">
        <Reveal className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <Badge className="w-fit" tone="primary">
            Blog
          </Badge>
          <h1 className="max-w-3xl text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.02] font-medium tracking-tight text-primary">
            Insights on building, marketing & automating.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            Full-stack engineering, NYC SEO/GEO, and AI automation — written
            down so we (and you) can reference it later.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-24 md:px-16 mt-10">
        <BlogGrid
          initialBlogs={blogs}
          initialTotal={total}
          limit={BLOG_LIMIT}
        />
      </section>
    </main>
  );
}
