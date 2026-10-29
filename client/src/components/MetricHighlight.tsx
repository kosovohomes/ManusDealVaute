import { LockKeyhole, Sparkles } from "lucide-react";

export function MetricHighlight({ label, value, detail, accent = "#6E9B82", dark = false }: { label: string; value: string; detail?: string; accent?: string; dark?: boolean }) {
  return <div className={`group relative overflow-hidden rounded-2xl border p-5 transition hover:-translate-y-0.5 ${dark ? "border-white/10 bg-white/[0.08] text-white" : "border-[#D5DED5] bg-white text-[#111A14]"}`}>
    <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full border" style={{ borderColor: `${accent}55` }} />
    <div className="absolute -bottom-12 -left-8 h-24 w-24 rounded-full border" style={{ borderColor: `${accent}44` }} />
    <div className="relative z-10 flex items-start justify-between gap-3">
      <span className={`text-[10px] font-bold uppercase tracking-[0.17em] ${dark ? "text-[#C2D5C6]" : "text-[#59665D]"}`}>{label}</span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: `${accent}22`, color: accent }}><Sparkles size={13} /></span>
    </div>
    <p className={`relative z-10 mt-7 font-display text-[34px] font-semibold leading-none ${dark ? "text-white" : "text-[#111A14]"}`}>{value}</p>
    {detail && <p className={`relative z-10 mt-2 text-[11px] leading-4 ${dark ? "text-[#C2D5C6]" : "font-semibold text-[#526058]"}`}>{detail}</p>}
  </div>;
}

export function MetricRibbon({ project }: { project: { metric: string; metricLabel: string; ticket: string; ventureStage: string; geography: string; accent: string } }) {
  return <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <MetricHighlight label="Current signal" value={project.metric} detail={project.metricLabel} accent={project.accent} />
    <MetricHighlight label="Stage" value={project.ventureStage} detail="Venture maturity" accent="#6E9B82" />
    <MetricHighlight label="Target raise" value={project.ticket} detail="Current opportunity" accent="#B48B64" />
    <MetricHighlight label="Geography" value={project.geography.split(" · ")[0]} detail="Operating focus" accent="#5E7480" />
  </div>;
}

export function AccessNote() {
  return <div className="flex items-center gap-2 text-[11px] font-semibold text-[#111A14]"><LockKeyhole size={14} className="text-[#527361]" /> Public teaser · deeper materials require qualification</div>;
}
