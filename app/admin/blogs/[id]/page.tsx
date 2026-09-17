"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogForm from "../_components/BlogForm";
import { useAdminAuth } from "../../_lib/adminAuth";

interface BlogRecord {
  _id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  photo: string;
  photoUrl?: string;
  tags: string[];
  content: string;
  author?: string;
  featured?: boolean;
  altText: string;
}

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const { authFetch } = useAdminAuth();
  const [blog, setBlog] = useState<BlogRecord | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch(`/api/blogs/${id}`);
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Failed to load blog");
        setBlog(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return <div className="text-sm text-accent-warm">{error}</div>;
  }

  if (!blog) {
    return <div className="text-sm text-muted">Loading...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-xl font-medium tracking-tight text-primary">Edit Blog Post</h1>
      <BlogForm
        initial={{
          _id: blog._id,
          slug: blog.slug,
          title: blog.title,
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription,
          photo: blog.photo,
          photoUrl: blog.photoUrl,
          tags: blog.tags?.join(", ") || "",
          content: blog.content,
          author: blog.author || "",
          featured: blog.featured || false,
          altText: blog.altText,
        }}
      />
    </div>
  );
}