"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImagePlus, Loader2, Images } from "lucide-react";
import { useAdminAuth } from "../../_lib/adminAuth";
import { slugify, uploadPhotoToServer } from "../../_lib/uploadPhoto";
import DescriptionEditor from "@/components/ui/DescriptionEditor";
import GalleryModal from "@/components/ui/GalleryModal";

interface BlogFormValues {
  _id?: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  photo: string;
  photoUrl?: string;
  tags: string;
  content: string;
  author: string;
  featured: boolean;
  altText: string;
}

const EMPTY_VALUES: BlogFormValues = {
  slug: "",
  title: "",
  metaTitle: "",
  metaDescription: "",
  photo: "",
  tags: "",
  content: "",
  author: "",
  featured: false,
  altText: "",
};

export default function BlogForm({ initial }: { initial?: Partial<BlogFormValues> }) {
  const router = useRouter();
  const { authFetch } = useAdminAuth();
  const isEdit = Boolean(initial?._id);

  const [values, setValues] = useState<BlogFormValues>({ ...EMPTY_VALUES, ...initial });
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initial?.photoUrl || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!slugTouched) set("slug", slugify(title));
  };

  const handleFileChange = (selected: File | null) => {
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isEdit && !file) {
      setError("Please choose a photo for the blog.");
      return;
    }

    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        slug: values.slug,
        title: values.title,
        metaTitle: values.metaTitle,
        metaDescription: values.metaDescription,
        tags: values.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        content: values.content,
        author: values.author,
        featured: values.featured,
        altText: values.altText,
        photo: file ? file.name : values.photo,
      };

      const res = await authFetch(isEdit ? `/api/blogs/${values._id}` : "/api/blogs", {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to save blog");
      }

      const uploadUrl = json.uploadUrls?.photo;
      if (uploadUrl && file) {
        const ok = await uploadPhotoToServer(uploadUrl, file);
        if (!ok) throw new Error("Blog saved, but the photo upload failed. Try re-uploading.");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-strong bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none";

  const labelClasses = "mb-1 block text-xs font-semibold text-secondary";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-accent-warm/40 bg-accent-warm/10 p-3 font-mono text-xs text-accent-warm">
          {error}
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-subtle bg-surface/60 p-5">
        <div>
          <label className={labelClasses}>Photo</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-strong bg-surface-2 transition-colors hover:border-accent-secondary"
          >
            {preview ? (
              <Image src={preview} alt="Preview" fill unoptimized sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-xs text-muted">
                <ImagePlus className="h-6 w-6" />
                Click to choose an image
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
        </div>

        <div>
          <label className={labelClasses}>Alt Text</label>
          <input
            value={values.altText}
            onChange={(e) => set("altText", e.target.value)}
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-subtle bg-surface/60 p-5">
        <div>
          <label className={labelClasses}>Title</label>
          <input
            value={values.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className={labelClasses}>Slug</label>
          <input
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              set("slug", slugify(e.target.value));
            }}
            required
            className={`${inputClasses} font-mono`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>Author</label>
            <input
              value={values.author}
              onChange={(e) => set("author", e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Tags (comma separated)</label>
            <input
              value={values.tags}
              onChange={(e) => set("tags", e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-secondary">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="accent-accent-primary"
          />
          Featured
        </label>
      </div>

      <div className="space-y-4 rounded-2xl border border-subtle bg-surface/60 p-5">
        <div>
          <label className={labelClasses}>Meta Title</label>
          <input
            value={values.metaTitle}
            onChange={(e) => set("metaTitle", e.target.value)}
            required
            className={inputClasses}
          />
        </div>
        <div>
          <label className={labelClasses}>Meta Description</label>
          <textarea
            value={values.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
            required
            rows={2}
            className={inputClasses}
          />
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className={labelClasses}>Blog Content</label>
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-accent-secondary transition-colors hover:bg-surface-2"
            >
              <Images className="h-3.5 w-3.5" /> Gallery
            </button>
          </div>
          <DescriptionEditor
            content={values.content}
            setContent={(value) => set("content", value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="rounded-full border border-strong bg-surface px-4 py-2 text-xs font-semibold text-secondary transition-colors hover:text-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2 text-xs font-medium text-void transition-colors hover:bg-accent-primary/90 disabled:opacity-50"
        >
          {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {isEdit ? "Save Changes" : "Publish Blog"}
        </button>
      </div>

      <GalleryModal open={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </form>
  );
}