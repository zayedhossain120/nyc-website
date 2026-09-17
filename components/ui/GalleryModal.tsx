"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Loader2, Images } from "lucide-react";
import { useAdminAuth } from "@/app/admin/_lib/adminAuth";

interface GalleryItem {
  _id: string;
  photoUrl?: string;
  projectName?: string;
  tags?: string[];
}

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GalleryModal({ open, onClose }: GalleryModalProps) {
  const { authFetch } = useAdminAuth();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- modal open flags
    setLoading(true);
    setError("");

    (async () => {
      try {
        const res = await authFetch("/api/gallery?page=1&limit=500");
        const json = await res.json();
        if (!res.ok || !json.success)
          throw new Error(json.error || "Failed to load gallery");
        if (!cancelled) setItems(json.data || []);
      } catch (err) {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : "Failed to load gallery",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, authFetch]);

  const handleCopy = async (url: string, id: string) => {
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl border border-subtle bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-subtle px-5 py-4">
          <span className="flex items-center gap-2 font-mono text-xs text-accent-secondary">
            <Images className="h-4 w-4" /> Gallery
          </span>
          <button
            onClick={onClose}
            className="text-xs font-bold text-secondary transition-colors hover:text-primary"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-muted">
              <Loader2 className="h-6 w-6 animate-spin" />
              Loading gallery...
            </div>
          ) : error ? (
            <div className="rounded-lg border border-accent-warm/40 bg-accent-warm/10 p-4 font-mono text-xs text-accent-warm">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted">
              No gallery images yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-xl border border-subtle bg-surface-2"
                >
                  <div className="relative aspect-square">
                    {item.photoUrl && (
                      <Image
                        src={item.photoUrl}
                        alt={item.projectName || "Gallery image"}
                        fill
                        sizes="(min-width: 768px) 25vw, 50vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.photoUrl) handleCopy(item.photoUrl, item._id);
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
                  {item.projectName && (
                    <div className="truncate border-t border-subtle bg-surface/90 px-2 py-1.5 font-mono text-[10px] text-secondary">
                      {item.projectName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}