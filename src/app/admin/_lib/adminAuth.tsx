"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const TOKEN_KEY = "nyc_admin_token";
const ADMIN_ID_KEY = "nyc_admin_id";
const NAME_KEY = "nyc_admin_name";
const EMAIL_KEY = "nyc_admin_email";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
}

interface AdminAuthContextValue {
  token: string | null;
  adminId: string | null;
  name: string | null;
  email: string | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<void>;
  bootstrap: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  authFetch: (input: string, init?: RequestInit) => Promise<Response>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function persistSession(token: string, user: AdminUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_ID_KEY, user._id);
  localStorage.setItem(NAME_KEY, user.name);
  localStorage.setItem(EMAIL_KEY, user.email);
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore persisted session
    setToken(localStorage.getItem(TOKEN_KEY));
    setAdminId(localStorage.getItem(ADMIN_ID_KEY));
    setName(localStorage.getItem(NAME_KEY));
    setEmail(localStorage.getItem(EMAIL_KEY));
    setReady(true);
  }, []);

  const applySession = useCallback((tokenValue: string, user: AdminUser) => {
    persistSession(tokenValue, user);
    setToken(tokenValue);
    setAdminId(user._id);
    setName(user.name);
    setEmail(user.email);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Login failed");
      }
      applySession(json.data.token, json.data.user);
    },
    [applySession]
  );

  const bootstrap = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await fetch("/api/admin/bootstrap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Setup failed");
      }
      applySession(json.data.token, json.data.user);
    },
    [applySession]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_ID_KEY);
    localStorage.removeItem(NAME_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setToken(null);
    setAdminId(null);
    setName(null);
    setEmail(null);
  }, []);

  const authFetch = useCallback(
    async (input: string, init: RequestInit = {}) => {
      const currentToken = localStorage.getItem(TOKEN_KEY);
      const headers = new Headers(init.headers);
      if (currentToken) headers.set("Authorization", `Bearer ${currentToken}`);
      if (init.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
      const res = await fetch(input, { ...init, headers });
      if (res.status === 401 || res.status === 403) {
        logout();
      }
      return res;
    },
    [logout]
  );

  return (
    <AdminAuthContext.Provider
      value={{ token, adminId, name, email, ready, login, bootstrap, logout, authFetch }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}