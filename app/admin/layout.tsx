"use client";

import { AdminAuthProvider, useAdminAuth } from "./_lib/adminAuth";
import AdminLogin from "./_components/AdminLogin";
import AdminShell from "./_components/AdminShell";

function AdminGate({ children }: { children: React.ReactNode }) {
  const { token, ready } = useAdminAuth();

  if (!ready) {
    return <div className="min-h-screen bg-void" />;
  }

  if (!token) {
    return <AdminLogin />;
  }

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGate>{children}</AdminGate>
    </AdminAuthProvider>
  );
}