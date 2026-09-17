"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "../../_lib/adminAuth";

export default function ChangePasswordPanel({ userId }: { userId: string }) {
  const { authFetch } = useAdminAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const res = await authFetch(`/api/admin/users/${userId}/password`, {
        method: "PUT",
        body: JSON.stringify({ newPassword }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Failed to update password");
      setSuccess("Password updated successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-strong bg-surface px-3 py-2 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-subtle bg-surface/60 p-5">
      <h2 className="text-sm font-medium text-primary">Change Password</h2>

      {error && (
        <div className="rounded-lg border border-accent-warm/40 bg-accent-warm/10 p-3 font-mono text-xs text-accent-warm">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-accent-primary/40 bg-accent-primary/10 p-3 font-mono text-xs text-accent-primary">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-semibold text-secondary">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className={inputClasses}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-secondary">Confirm New Password</label>
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

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full border border-accent-secondary/40 bg-accent-secondary/10 px-5 py-2 text-xs font-medium text-accent-secondary transition-colors hover:bg-accent-secondary/20 disabled:opacity-50"
        >
          {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Update Password
        </button>
      </div>
    </form>
  );
}