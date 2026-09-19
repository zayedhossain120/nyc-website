"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, Trash2, Loader2, ImagePlus, Copy, Check } from "lucide-react";
import { useAdminAuth } from "../_lib/adminAuth";
import { uploadPhotoToServer } from "../_lib/uploadPhoto";
import { cn } from "@/lib/utils";

interface GalleryItem {
  _id: string;
  photo: string;
  photoUrl?: string;
  tags: string[];
  projectName?: string;
}

export default function GalleryPage() {
  const { authFetch } = useAdminAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    };
  }, []);

  const [projectName, setProjectName] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/gallery");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (err) {
      console.error("Failed to load gallery", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Choose at least one image to upload.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const tagList = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = files.map((file) => ({
        photo: file.name,
        tags: tagList,
        projectName,
      }));

      const res = await authFetch("/api/gallery", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success)
        throw new Error(json.error || "Failed to create gallery items");

      const uploadUrlsList: Record<string, string>[] = json.uploadUrls;
      await Promise.all(
        files.map((file, i) => {
          const uploadUrl = uploadUrlsList[i]?.photo;
          return uploadUrl
            ? uploadPhotoToServer(uploadUrl, file)
            : Promise.resolve(true);
        }),
      );

      setFiles([]);
      setProjectName("");
      setTags("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selected.size === 0) return;
    if (!window.confirm(`Delete ${selected.size} selected image(s)?`)) return;
    try {
      const res = await authFetch("/api/gallery", {
        method: "DELETE",
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      const json = await res.json();
      if (json.success) {
        setItems((prev) => prev.filter((item) => !selected.has(item._id)));
        setSelected(new Set());
      }
    } catch (err) {
      console.error("Failed to delete gallery items", err);
    }
  };

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = setTimeout(() => setCopiedId(null), 2000);
  };

  const inputClasses =
    "w-full rounded-xl border border-strong bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none";

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">Assets</span>
          <h1 className="mt-1 text-xl font-medium tracking-tight text-primary">Gallery</h1>
        </div>
        {selected.size > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="flex items-center gap-2 rounded-full border border-accent-warm/40 bg-accent-warm/10 px-4 py-2 text-xs font-medium text-accent-warm transition-colors hover:bg-accent-warm/20"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete {selected.size} Selected
          </button>
        )}
      </div>

      <div className="mb-6 space-y-4 rounded-2xl border border-subtle bg-surface/60 p-5">
        <h2 className="text-sm font-medium text-primary">Upload Images</h2>

        {error && (
          <div className="rounded-lg border border-accent-warm/40 bg-accent-warm/10 p-3 font-mono text-xs text-accent-warm">
            {error}
          </div>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-strong p-6 text-xs text-muted transition-colors hover:border-accent-secondary"
        >
          <UploadCloud className="h-6 w-6" />
          {files.length > 0
            ? `${files.length} file(s) selected`
            : "Click to choose one or more images"}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((f, i) => (
              <div
                key={i}
                className="relative h-16 w-16 overflow-hidden rounded-lg border border-subtle"
              >
                <Image
                  src={URL.createObjectURL(f)}
                  alt={f.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-secondary">
              Project Name
            </label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-secondary">
              Tags (comma separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2 text-xs font-medium text-void transition-colors hover:bg-accent-primary/90 disabled:opacity-50"
          >
            {uploading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Upload
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-muted">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-subtle bg-surface/60 p-12 text-center text-sm text-muted">
          <ImagePlus className="h-6 w-6" />
          No gallery images yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => {
            const isSelected = selected.has(item._id);
            return (
              <div
                key={item._id}
                onClick={() => toggleSelect(item._id)}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-2xl border transition-colors",
                  isSelected
                    ? "border-accent-secondary ring-2 ring-accent-secondary/40"
                    : "border-subtle hover:border-accent-secondary/60"
                )}
              >
                <div className="relative aspect-square bg-surface-2">
                  {item.photoUrl && (
                    <Image
                      src={item.photoUrl}
                      alt={item.projectName || "Gallery image"}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex items-end bg-linear-to-t from-void/80 via-void/0 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="text-[11px] text-primary">
                    {item.projectName && (
                      <div className="font-medium">{item.projectName}</div>
                    )}
                    {item.tags?.length > 0 && (
                      <div className="font-mono text-secondary">
                        {item.tags.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={cn(
                    "absolute top-2 left-2 flex h-5 w-5 items-center justify-center rounded-md border text-[10px] font-bold",
                    isSelected
                      ? "border-accent-secondary bg-accent-secondary text-void"
                      : "border-strong bg-surface/80 text-transparent"
                  )}
                >
                  ✓
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.photoUrl) handleCopyUrl(item.photoUrl, item._id);
                  }}
                  disabled={!item.photoUrl}
                  title="Copy URL"
                  className="absolute top-2 right-2 flex items-center gap-1 rounded-lg border border-strong bg-surface/80 px-2.5 py-1.5 text-[11px] font-semibold text-accent-secondary backdrop-blur-md transition-colors hover:bg-accent-primary hover:text-void disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {copiedId === item._id ? (
                    <>
                      <Check className="h-3 w-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy URL
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}