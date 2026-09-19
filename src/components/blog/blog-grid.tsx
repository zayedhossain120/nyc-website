"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { BlogCard, type BlogCardData } from "./blog-card";

interface BlogGridProps {
  initialBlogs: BlogCardData[];
  initialTotal: number;
  limit: number;
}

export function BlogGrid({ initialBlogs, initialTotal, limit }: BlogGridProps) {
  const [blogs, setBlogs] = useState<BlogCardData[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialBlogs.length < initialTotal);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = Math.floor(blogs.length / limit) + 1;
      const res = await fetch(`/api/blogs?page=${nextPage}&limit=${limit}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setBlogs((prev) => [...prev, ...json.data]);
        const total = json.meta?.total ?? initialTotal;
        setHasMore(blogs.length + json.data.length < total);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  if (!blogs.length) {
    return (
      <div className="rounded-2xl border border-subtle bg-surface p-16 text-center text-sm text-muted">
        No blog posts yet. Check back soon.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-strong bg-surface px-6 py-3 text-sm font-medium text-primary transition-colors duration-200 hover:border-accent-primary/60 hover:text-accent-primary disabled:pointer-events-none disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            <span>{loading ? "Loading..." : "Load More Posts"}</span>
          </button>
        </div>
      )}
    </div>
  );
}