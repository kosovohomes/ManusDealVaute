import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type SessionUser = { id: number; name: string | null; email: string | null; role: "user" | "admin"; emailVerified: number; createdAt: string };
type AuthContextValue = { user: SessionUser | null; loading: boolean; login: (email: string, password: string) => Promise<void>; register: (name: string, email: string, password: string) => Promise<void>; logout: () => Promise<void>; refresh: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

async function request(path: string, options?: RequestInit) {
  const response = await fetch(path, { ...options, credentials: "include", headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Request failed.");
  return payload;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = async () => { try { const payload = await request("/api/auth/me"); setUser(payload.user); } catch { setUser(null); } finally { setLoading(false); } };
  useEffect(() => { void refresh(); }, []);
  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    refresh,
    login: async (email, password) => { const payload = await request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }); setUser(payload.user); },
    register: async (name, email, password) => { const payload = await request("/api/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }); setUser(payload.user); },
    logout: async () => { await request("/api/auth/logout", { method: "POST" }); setUser(null); },
  }), [loading, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error("useAuth must be used inside AuthProvider"); return value; }
