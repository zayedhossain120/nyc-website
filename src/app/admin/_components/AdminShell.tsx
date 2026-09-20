"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Images, ShieldCheck, LogOut, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "../_lib/adminAuth";

const NAV_ITEMS = [
  { href: "/admin", label: "Inquiries", icon: LayoutDashboard, exact: true },
  { href: "/admin/blogs", label: "Blogs", icon: Newspaper, exact: false },
  { href: "/admin/gallery", label: "Gallery", icon: Images, exact: false },
  { href: "/admin/administrators", label: "Administrators", icon: ShieldCheck, exact: false },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { name, email, logout } = useAdminAuth();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-void text-primary selection:bg-accent-secondary/30 selection:text-white">
      <header className="border-b border-subtle bg-surface-2/80 py-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-subtle bg-surface p-2 text-secondary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <span className="flex items-center gap-2 text-lg font-medium tracking-tight text-primary">
                <Link href="/admin" aria-label="Admin dashboard" className="flex items-center">
                  <Logo className="h-7" />
                </Link>
                <span className="font-mono rounded border border-accent-secondary/40 bg-accent-secondary/10 px-2 py-0.5 text-xs text-accent-secondary">
                  ADMIN
                </span>
              </span>
              <div className="font-mono text-[11px] text-secondary">
                {name} {email && <span className="text-muted">· {email}</span>}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-lg border border-subtle bg-surface px-3 py-1.5 text-xs font-semibold text-accent-warm transition-colors hover:bg-accent-warm/10"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:px-8">
        <nav className="flex h-fit flex-col gap-1 rounded-2xl border border-subtle bg-surface/60 p-2 md:w-52 md:flex-col md:shrink-0">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "border-accent-secondary/40 bg-accent-secondary/10 text-accent-secondary"
                    : "border-transparent text-secondary hover:bg-surface-2 hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}