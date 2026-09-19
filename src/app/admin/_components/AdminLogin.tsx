"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, User, ArrowLeft } from "lucide-react";
import { useAdminAuth } from "../_lib/adminAuth";

export default function AdminLogin() {
  const { login, bootstrap } = useAdminAuth();
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/bootstrap");
        const json = await res.json();
        setNeedsSetup(json.success && json.data.exists === false);
      } catch {
        setNeedsSetup(false);
      } finally {
        setCheckingSetup(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (needsSetup && passwordInput !== confirmPasswordInput) {
      setFormError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (needsSetup) {
        await bootstrap(nameInput, emailInput, passwordInput);
      } else {
        await login(emailInput, passwordInput);
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSetup) {
    return <div className="min-h-screen bg-void" />;
  }

  return (
    <div className="gradient-mesh flex min-h-screen items-center justify-center bg-void p-4 text-primary">
      <div className="relative w-full max-w-md rounded-2xl border border-subtle bg-surface/60 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-accent-secondary/30 bg-accent-secondary/10 text-accent-secondary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-primary">
            NYC<span className="text-accent-primary"> Digital</span> Agency
          </h1>
          <p className="mt-1 font-mono text-xs text-secondary">
            {needsSetup ? "Create the first administrator account" : "Sign in to manage content"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {needsSetup && (
            <div>
              <label className="mb-1 block text-xs font-semibold text-secondary">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full rounded-xl border border-strong bg-surface py-2.5 pl-9 pr-4 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold text-secondary">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full rounded-xl border border-strong bg-surface py-2.5 pl-9 pr-4 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-secondary">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl border border-strong bg-surface py-2.5 pl-9 pr-4 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
                required
                minLength={needsSetup ? 6 : undefined}
              />
            </div>
          </div>

          {needsSetup && (
            <div>
              <label className="mb-1 block text-xs font-semibold text-secondary">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
                <input
                  type="password"
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  className="w-full rounded-xl border border-strong bg-surface py-2.5 pl-9 pr-4 text-sm text-primary placeholder:text-muted focus:border-accent-primary focus:outline-none"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          {formError && (
            <div className="rounded-lg border border-accent-warm/40 bg-accent-warm/10 p-3 text-center font-mono text-xs text-accent-warm">
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent-primary py-3 text-sm font-medium text-void transition-colors hover:bg-accent-primary/90 disabled:opacity-50"
          >
            {loading ? "Please wait..." : needsSetup ? "Create Admin Account" : "Sign In to Admin Dashboard"}
          </button>
        </form>

        <div className="mt-6 border-t border-subtle pt-4 text-center">
          <Link href="/" className="flex items-center justify-center gap-1 text-xs text-secondary transition-colors hover:text-accent-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to NYC Digital Agency Website
          </Link>
        </div>
      </div>
    </div>
  );
}