"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "./_lib/adminAuth";
import AdminShell from "./_components/AdminShell";

const LOGIN_PATH = "/admin/login";
const HOME_PATH = "/admin";

function BlankScreen() {
  return <div className="min-h-screen bg-void" />;
}

function AdminGate({ children }: { children: React.ReactNode }) {
  const { token, ready } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === LOGIN_PATH;

  useEffect(() => {
    if (!ready) return;
    if (!token && !isLoginRoute) router.replace(LOGIN_PATH);
    if (token && isLoginRoute) router.replace(HOME_PATH);
  }, [ready, token, isLoginRoute, router]);

  if (!ready) return <BlankScreen />;

  // Login page renders on its own, without the admin shell.
  if (isLoginRoute) return token ? <BlankScreen /> : <>{children}</>;

  // Signed out on a protected page: the effect above is redirecting to the login page.
  if (!token) return <BlankScreen />;

  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGate>{children}</AdminGate>
    </AdminAuthProvider>
  );
}
