import { useMemo, useState } from 'react';
import {
  UserPlus, MessagesSquare, PenLine, Rocket, TrendingUp, ArrowRight,
  FileCheck2, ShieldCheck, BadgeCheck, CheckCircle2,
} from 'lucide-react';
import { Sparkline, toast } from '../components/ui';
import { CANDIDATES, INITIAL_EVALUATIONS, SPARKS } from '../data/mock';
import { DEPARTMENTS, type Evaluation } from '../data/types';
import type { ScreenId } from '../components/Shell';

const DEPT_COLORS: Record<string, string> = {
  Collections: 'bg-navy-900',
  'Customer Support': 'bg-gold-500',
  vKYC: 'bg-emerald-500',
  'Tele-Sales': 'bg-sky-500',
  Miscellaneous: 'bg-slate-400',
};

export function Dashboard({ onNavigate }: { onNavigate: (s: ScreenId) => void }) {
  const [evals] = useState<Evaluation>(INITIAL_EVALUATIONS);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const kpis = useMemo(() => {
    const today = CANDIDATES.filter((c) => c.date === '19-Nov-26').length;
    const interviewed = CANDIDATES.filter((c) => ['interviewing', 'hr-review', 'selected'].includes(c.stage)).length;
    const pending = Object.values(evals).filter((e) => e.signOff.hr === 'pending' || e.signOff.management === 'pending').length + 1;
    const onboarding = 5;
    return [
      { label: "Today's Walk-ins", value: today, spark: SPARKS.walkins, icon: UserPlus, delta: '+12.4%' },
      { label: 'Interviews Conducted', value: interviewed, spark: SPARKS.interviews, icon: MessagesSquare, delta: '+5.1%' },
      { label: 'Pending Sign-offs', value: pending, spark: SPARKS.signoffs, icon: PenLine, delta: '-8.3%' },
      { label: 'Active Onboarding', value: onboarding, spark: SPARKS.onboarding, icon: Rocket, delta: '+2.0%' },
    ];
  }, [evals]);

  const funnel = useMemo(() => {
    const stages = ['Walk-in', 'Interviewed', 'Selected', 'Joined'];
    const values = [117, 82, 26, 19];
    const max = values[0];
    return stages.map((s, i) => ({ stage: s, value: values[i], pct: (values[i] / max) * 100 }));
  }, []);

  const deptSplit = useMemo(() => {
    const counts: Record<string, number> = { Collections: 38, 'Customer Support': 26, vKYC: 18, 'Tele-Sales': 31, Miscellaneous: 12 };
    const total = DEPARTMENTS.reduce((a, d) => a + counts[d], 0);
    return DEPARTMENTS.map((d) => ({ dept: d, count: counts[d], pct: Math.round((counts[d] / total) * 100) }));
  }, []);

  const queue = Object.entries(evals).filter(([id]) => !done[id]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
      {/* Page heading */}
      <div className="animate-fade-up">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-600">Executive HR Dashboard</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-navy-900 md:text-4xl">
          Good morning, Meenakshi
        </h1>
        <div className="title-rule" />
        <p className="mt-3 text-sm text-slate-500">Wednesday, 19 November 2026 · Bengaluru HQ</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(({ label, value, spark, icon: Icon, delta }, i) => (
          <div
            key={label}
            className="card card-hover animate-fade-up relative overflow-hidden p-5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 opacity-80" />
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 text-gold-400 shadow-card">
                <Icon className="h-5 w-5" />
              </div>
              <Sparkline points={spark} className="h-8 w-24" />
            </div>
            <p className="num mt-4 text-3xl font-bold tracking-tight text-navy-900">{value}</p>
            <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
              <TrendingUp className="h-3 w-3" /> {delta} vs last week
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="card animate-fade-up p-6 lg:col-span-3" style={{ animationDelay: '120ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-navy-900">Live Hiring Funnel</h2>
              <p className="mt-0.5 text-xs text-slate-500">November 2026 · conversion across the pipeline</p>
            </div>
            <span className="badge bg-gold-500/10 text-gold-700">Live</span>
          </div>
          <div className="mt-6 space-y-4">
            {funnel.map((f, i) => (
              <div key={f.stage} className="group">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-navy-800">{f.stage}</span>
                  <span className="num font-bold text-navy-900">{f.value}</span>
                </div>
                <div className="h-9 w-full overflow-hidden rounded-xl bg-canvas ring-1 ring-line">
                  <div
                    className={`flex h-full items-center justify-end rounded-xl pr-3 transition-all duration-1000 ease-out ${
                      i === 0 ? 'bg-navy-900' : i === 1 ? 'bg-navy-800' : i === 2 ? 'bg-gold-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                    }`}
                    style={{ width: `${f.pct}%` }}
                  >
                    {i === 0 && <span className="text-[10px] font-bold text-gold-400">{Math.round(f.pct)}%</span>}
                    {i !== 0 && <span className="text-[10px] font-bold text-white/90">{Math.round(f.pct)}%</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card animate-fade-up p-6 lg:col-span-2" style={{ animationDelay: '180ms' }}>
          <h2 className="text-base font-bold text-navy-900">Headcount by Department</h2>
          <p className="mt-0.5 text-xs text-slate-500">125 active employees across 5 departments</p>
          <div className="mt-6 space-y-4">
            {deptSplit.map((d) => (
              <div key={d.dept} className="group flex items-center gap-3">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${DEPT_COLORS[d.dept]}`} />
                <span className="w-32 shrink-0 truncate text-xs font-semibold text-navy-800">{d.dept}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-canvas ring-1 ring-line">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${DEPT_COLORS[d.dept]}`}
                    style={{ width: `${d.pct}%` }}
                  />
                </div>
                <span className="num w-8 text-right text-xs font-bold text-navy-900">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action required */}
      <div className="card animate-fade-up p-6" style={{ animationDelay: '240ms' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-navy-900">Action Required</h2>
            <p className="mt-0.5 text-xs text-slate-500">Pending interview feedback sign-offs awaiting review</p>
          </div>
          <button onClick={() => onNavigate('eval')} className="btn-ghost text-xs">
            Open evaluations <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {queue.map(([id, e], i) => {
            const cand = CANDIDATES.find((c) => c.id === id);
            const pendingSteps =
              (e.signOff.interviewer === 'pending' ? 1 : 0) + (e.signOff.hr === 'pending' ? 1 : 0) + (e.signOff.management === 'pending' ? 1 : 0);
            return (
              <div
                key={id}
                className="group rounded-2xl border border-line bg-canvas/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-lift"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="badge bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                    <PenLine className="h-3 w-3" /> {pendingSteps} sign-off{pendingSteps === 1 ? '' : 's'} left
                  </span>
                  <span className="num text-[11px] font-semibold text-slate-400">{cand?.date}</span>
                </div>
                <p className="mt-3 text-sm font-bold text-navy-900">{cand?.name}</p>
                <p className="text-xs text-slate-500">{cand?.position} · {cand?.dept}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <FileCheck2 className="h-3.5 w-3.5 text-gold-600" />
                  <span className="truncate">{cand?.resumeFile}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setDone((p) => ({ ...p, [id]: true }));
                      toast(`Feedback sheet for ${cand?.name} approved`);
                    }}
                    className="flex-1 rounded-xl bg-navy-900 px-3 py-2 text-xs font-semibold text-white transition-all hover:bg-navy-800 hover:shadow-lift"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve sheet
                    </span>
                  </button>
                  <button
                    onClick={() => onNavigate('eval')}
                    className="rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-navy-800 transition-all hover:shadow-card"
                  >
                    Review
                  </button>
                </div>
              </div>
            );
          })}
          {queue.length === 0 && (
            <div className="col-span-full flex flex-col items-center gap-2 py-10 text-center">
              <BadgeCheck className="h-10 w-10 text-emerald-500" />
              <p className="text-sm font-semibold text-navy-900">All caught up</p>
              <p className="text-xs text-slate-500">Every pending feedback sheet has been approved.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick compliance strip */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: 'Policy Compliance', value: '98.2%', note: 'Documents collected on time' },
          { icon: FileCheck2, title: 'Offer Letters Released', value: '14', note: 'This month, across departments' },
          { icon: BadgeCheck, title: 'Background Verification', value: '11 / 14', note: 'Completed for November joiners' },
        ].map(({ icon: Icon, title, value, note }, i) => (
          <div key={title} className="card card-hover animate-fade-up flex items-center gap-4 p-5" style={{ animationDelay: `${300 + i * 60}ms` }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/10 text-gold-600">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="num text-xl font-bold text-navy-900">{value}</p>
              <p className="text-xs font-semibold text-navy-800">{title}</p>
              <p className="text-[11px] text-slate-500">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
