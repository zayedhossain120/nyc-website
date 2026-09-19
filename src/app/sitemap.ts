import type { MetadataRoute } from "next";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { CASE_STUDIES } from "@/data/case-studies";
import { SERVICE_DETAILS } from "@/data/service-details";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // lastModified is only set where we have a real date (blog posts). A timestamp of
  // "now" on every URL changes on each request, and search engines learn to ignore it.
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = CASE_STUDIES.map((study) => ({
    url: `${SITE_URL}/work/${study.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_DETAILS.map((service) => ({
    url: `${SITE_URL}/services/${service.pillarId}/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    await dbConnect();
    const blogs = await Blog.find({}, "slug updatedAt createdAt")
      .sort({ createdAt: -1 })
      .lean();
    blogEntries = blogs.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.createdAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {
    blogEntries = [];
  }

  return [...staticEntries, ...serviceEntries, ...caseStudyEntries, ...blogEntries];
}
