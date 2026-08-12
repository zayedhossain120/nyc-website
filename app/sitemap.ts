import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/data/blog-posts";
import { CASE_STUDIES } from "@/lib/data/case-studies";
import { SITE_URL } from "@/lib/site-config";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/software-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/ai-automation", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/marketing-seo", priority: 0.8, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/process", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.9, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/security", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/work/${study.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...caseStudyEntries, ...blogEntries];
}
