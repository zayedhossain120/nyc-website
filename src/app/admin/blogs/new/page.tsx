"use client";

import BlogForm from "../_components/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">Content</span>
      <h1 className="mb-6 mt-1 text-xl font-medium tracking-tight text-primary">New Blog Post</h1>
      <BlogForm />
    </div>
  );
}