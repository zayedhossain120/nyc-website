"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserRound, Loader2 } from "lucide-react";
import { useAdminAuth } from "../../_lib/adminAuth";
import { uploadPhotoToServer } from "../../_lib/uploadPhoto";

interface AdministratorFormValues {
  _id?: string;
  name: string;
  email: string;
  profilePhoto: string;
  profilePhotoUrl?: string;
}

export default function AdministratorForm({ initial }: { initial?: Partial<AdministratorFormValues> }) {
  const router = useRouter();
  const { authFetch } = useAdminAuth();
  const isEdit = Boolean(initial?._id);

  const [name, setName] = useState(initial?.name || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initial?.profilePhotoUrl || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selected: File | null) => {
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isEdit) {
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setSaving(true);
    try {
      const payload: Record<string, unknown> = isEdit
        ? { name, profilePhoto: file ? file.name : initial?.profilePhoto }
        : { name, email, password, profilePhoto: file ? file.name : undefined };

      const res = await authFetch(isEdit ? `/api/admin/users/${initial?._id}` : "/api/admin/users", {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to save administrator");
      }

      const uploadUrl = json.uploadUrls?.profilePhoto;
      if (uploadUrl && file) {
        const ok = await uploadPhotoToServer(uploadUrl, file);
        if (!ok) throw new Error("Administrator saved, but the photo upload failed.");
      }

      router.push("/admin/administrators");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-strong bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-accent-warm/40 bg-accent-warm/10 p-3 font-mono text-xs text-accent-warm">
          {error}
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-subtle bg-surface/60 p-5">
        <div>
          <label className="mb-1 block text-xs font-semibold text-secondary">Profile Photo</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed border-strong bg-surface-2 transition-colors hover:border-accent-secondary"
          >
            {preview ? (
              <Image src={preview} alt="Preview" fill unoptimized sizes="96px" className="object-cover" />
            ) : (
              <UserRound className="h-8 w-8 text-muted" />
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
          <label className="mb-1 block text-xs font-semibold text-secondary">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-secondary">
            Email {isEdit && <span className="text-muted">(cannot be changed)</span>}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isEdit}
            className={inputClasses}
          />
        </div>

        {!isEdit && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-secondary">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-secondary">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className={inputClasses}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/administrators")}
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
          {isEdit ? "Save Changes" : "Create Administrator"}
        </button>
      </div>
    </form>
  );
}