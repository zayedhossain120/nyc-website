"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdministratorForm from "../_components/AdministratorForm";
import ChangePasswordPanel from "../_components/ChangePasswordPanel";
import { useAdminAuth } from "../../_lib/adminAuth";

interface AdministratorRecord {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
  profilePhotoUrl?: string;
}

export default function EditAdministratorPage() {
  const { id } = useParams<{ id: string }>();
  const { authFetch } = useAdminAuth();
  const [admin, setAdmin] = useState<AdministratorRecord | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await authFetch("/api/admin/users");
        const json = await res.json();
        if (!res.ok || !json.success) throw new Error(json.error || "Failed to load administrators");
        const found = (json.data as AdministratorRecord[]).find((a) => a._id === id);
        if (!found) throw new Error("Administrator not found");
        setAdmin(found);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load administrator");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    return <div className="text-sm text-accent-warm">{error}</div>;
  }

  if (!admin) {
    return <div className="text-sm text-muted">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium tracking-tight text-primary">Edit Administrator</h1>
      <AdministratorForm
        initial={{
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          profilePhoto: admin.profilePhoto,
          profilePhotoUrl: admin.profilePhotoUrl,
        }}
      />
      <ChangePasswordPanel userId={admin._id} />
    </div>
  );
}