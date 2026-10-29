import { FormEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Logo } from "@/components/DealVaultShell";
import { useAuth } from "@/auth";

function AuthFrame({ children, title, intro }: { children: React.ReactNode; title: string; intro: string }) {
  return <div className="min-h-screen bg-[#F7F6F1] px-5 py-8 md:px-10"><div className="mx-auto max-w-[1120px]"><Logo/><div className="mx-auto grid max-w-[920px] gap-10 py-16 lg:grid-cols-[.85fr_1fr] lg:items-center lg:py-24"><div><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B2821] text-[#EAE5D9]"><LockKeyhole size={21}/></span><p className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6E9B82]">Private investor access</p><h1 className="mt-4 font-display text-[56px] leading-[.92] tracking-[-0.04em] text-[#1B2821]">{title}</h1><p className="mt-6 max-w-md text-[15px] leading-7 text-[#68756C]">{intro}</p></div><div className="rounded-3xl border border-[#DADDD5] bg-white p-6 shadow-[0_20px_60px_rgba(27,40,33,.06)] md:p-8">{children}</div></div></div></div>;
}

export function LoginPage() {
  const [, navigate] = useLocation(); const { login, user } = useAuth(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  if (user) { navigate(user.role === "admin" ? "/admin" : "/workspace"); return null; }
  const submit = async (event: FormEvent) => { event.preventDefault(); setBusy(true); setError(""); try { await login(email, password); navigate("/workspace"); } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in."); } finally { setBusy(false); } };
  return <AuthFrame title="Sign in to the room." intro="Access your saved projects, interest requests, and approved DealVault materials."><form onSubmit={submit} className="space-y-5"><Field label="Email" type="email" value={email} onChange={setEmail}/><Field label="Password" type="password" value={password} onChange={setPassword}/>{error && <p className="rounded-xl bg-[#FFF0ED] px-4 py-3 text-[12px] font-semibold text-[#A24C3E]">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B2821] px-4 py-3.5 text-[12px] font-bold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}<ArrowRight size={15}/></button><p className="text-center text-[12px] text-[#7C877F]">New to DealVault? <Link href="/register" className="font-bold text-[#527361]">Create an account</Link></p></form></AuthFrame>;
}

export function RegisterPage() {
  const [, navigate] = useLocation(); const { register, user } = useAuth(); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  if (user) { navigate(user.role === "admin" ? "/admin" : "/workspace"); return null; }
  const submit = async (event: FormEvent) => { event.preventDefault(); setBusy(true); setError(""); try { await register(name, email, password); navigate("/workspace"); } catch (e) { setError(e instanceof Error ? e.message : "Unable to create account."); } finally { setBusy(false); } };
  return <AuthFrame title="Make the next move." intro="Create a verified investor account to save opportunities and request the right level of access."><form onSubmit={submit} className="space-y-5"><Field label="Full name" value={name} onChange={setName}/><Field label="Email" type="email" value={email} onChange={setEmail}/><Field label="Password" type="password" value={password} onChange={setPassword}/>{error && <p className="rounded-xl bg-[#FFF0ED] px-4 py-3 text-[12px] font-semibold text-[#A24C3E]">{error}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B2821] px-4 py-3.5 text-[12px] font-bold text-white disabled:opacity-60">{busy ? "Creating account…" : "Create account"}<ArrowRight size={15}/></button><p className="text-center text-[12px] text-[#7C877F]">Already registered? <Link href="/login" className="font-bold text-[#527361]">Sign in</Link></p></form></AuthFrame>;
}

function Field({ label, type = "text", value, onChange }: { label: string; type?: string; value: string; onChange: (value: string) => void }) { return <label className="block"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#65736A]">{label}</span><input required type={type} value={value} onChange={e => onChange(e.target.value)} className="w-full rounded-xl border border-[#D9DED7] bg-[#FBFCF9] px-4 py-3 text-[13px] font-semibold text-[#111A14] outline-none transition focus:border-[#6E9B82] focus:ring-2 focus:ring-[#DCEBE0]" /></label>; }
