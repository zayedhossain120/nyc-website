"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, UserRound } from "lucide-react";
import { useAdminAuth } from "../_lib/adminAuth";

interface Administrator {
  _id: string;
  name: string;
  email: string;
  profilePhotoUrl?: string;
  createdAt: string;
}

export default function AdministratorsPage() {
  const { authFetch, adminId } = useAdminAuth();
  const [admins, setAdmins] = useState<Administrator[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/api/admin/users");
      const json = await res.json();
      if (json.success) setAdmins(json.data);
    } catch (err) {
      console.error("Failed to load administrators", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    fetchAdmins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this administrator's access?")) return;
    setError("");
    try {
      const res = await authFetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setAdmins((prev) => prev.filter((a) => a._id !== id));
      } else {
        setError(json.error || "Failed to delete administrator");
      }
    } catch (err) {
      console.error("Failed to delete administrator", err);
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">Access</span>
          <h1 className="mt-1 text-xl font-medium tracking-tight text-primary">Administrators</h1>
        </div>
        <Link
          href="/admin/administrators/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2.5 text-sm font-medium text-void transition-colors hover:bg-accent-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> New Administrator
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-accent-warm/40 bg-accent-warm/10 p-3 font-mono text-xs text-accent-warm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-sm text-muted">Loading...</div>
      ) : admins.length === 0 ? (
        <div className="rounded-2xl border border-subtle bg-surface/60 p-12 text-center text-sm text-muted">
          No administrators yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {admins.map((admin) => {
            const isSelf = admin._id === adminId;
            return (
              <div
                key={admin._id}
                className="flex items-center gap-4 rounded-2xl border border-subtle bg-surface/60 p-5 transition-[border-color] duration-300 hover:border-accent-secondary/60"
              >
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-subtle bg-surface-2">
                  {admin.profilePhotoUrl ? (
                    <Image src={admin.profilePhotoUrl} alt={admin.name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <UserRound className="h-6 w-6 text-muted" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-medium text-primary">{admin.name}</h3>
                    {isSelf && (
                      <span className="rounded border border-accent-secondary/40 bg-accent-secondary/10 px-1.5 py-0.5 font-mono text-[10px] text-accent-secondary">
                        You
                      </span>
                    )}
                  </div>
                  <div className="truncate font-mono text-[11px] text-muted">{admin.email}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/administrators/${admin._id}`}
                    className="rounded-lg border border-subtle bg-surface p-1.5 text-accent-secondary transition-colors hover:bg-surface-2"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  {!isSelf && (
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="rounded-lg border border-subtle bg-surface p-1.5 text-accent-warm transition-colors hover:bg-accent-warm/10"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}