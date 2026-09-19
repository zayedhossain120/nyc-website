"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Eye, Pencil, Trash2, Star } from "lucide-react";
import { useAdminAuth } from "../_lib/adminAuth";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  photoUrl?: string;
  tags: string[];
  views: number;
  featured?: boolean;
  createdAt: string;
}

export default function BlogsListPage() {
  const { authFetch } = useAdminAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchBlogs = async (searchTerm = "") => {
    setLoading(true);
    try {
      const res = await authFetch(`/api/blogs?search=${encodeURIComponent(searchTerm)}`);
      const json = await res.json();
      if (json.success) setBlogs(json.data);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this blog post? This cannot be undone.")) return;
    try {
      const res = await authFetch(`/api/blogs/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">Content</span>
          <h1 className="mt-1 text-xl font-medium tracking-tight text-primary">Blogs</h1>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-accent-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> New Blog
        </Link>
      </div>

      <div className="mb-6 rounded-2xl border border-subtle bg-surface/60 p-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchBlogs(search)}
            className="w-full rounded-xl border border-strong bg-surface px-4 py-2 pl-9 text-xs text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-muted">Loading...</div>
      ) : blogs.length === 0 ? (
        <div className="rounded-2xl border border-subtle bg-surface/60 p-12 text-center text-sm text-muted">
          No blog posts yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col overflow-hidden rounded-2xl border border-subtle bg-surface/60 backdrop-blur-sm transition-[border-color] duration-300 hover:border-accent-secondary/60"
            >
              <div className="relative h-36 bg-surface-2">
                {blog.photoUrl && (
                  <Image src={blog.photoUrl} alt={blog.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                )}
                {blog.featured && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 rounded border border-accent-warm/40 bg-accent-warm/10 px-2 py-0.5 font-mono text-[10px] text-accent-warm">
                    <Star className="h-3 w-3" /> Featured
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="line-clamp-2 text-sm font-medium text-primary">{blog.title}</h3>
                <div className="font-mono text-[11px] text-muted">/{blog.slug}</div>
                <div className="flex flex-wrap gap-1">
                  {blog.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-subtle bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-subtle/60 pt-2">
                  <span className="flex items-center gap-1 font-mono text-[11px] text-muted">
                    <Eye className="h-3 w-3" /> {blog.views}
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blogs/${blog._id}`}
                      className="rounded-lg border border-subtle bg-surface p-1.5 text-accent-secondary transition-colors hover:bg-surface-2"
                      title="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="rounded-lg border border-subtle bg-surface p-1.5 text-accent-warm transition-colors hover:bg-accent-warm/10"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}