import { Redirect } from "wouter";
import { useAuth } from "@/auth";

export function ProtectedRoute({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#F7F6F1] text-[12px] font-bold uppercase tracking-[0.16em] text-[#6E9B82]">Checking your session…</div>;
  if (!user) return <Redirect to="/login" />;
  if (admin && user.role !== "admin") return <Redirect to="/workspace" />;
  return <>{children}</>;
}
