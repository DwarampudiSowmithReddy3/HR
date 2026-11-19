import { useMemo, useState } from 'react';
import {
  FileText, PenLine, ShieldCheck, Landmark, Languages, BriefcaseBusiness,
  Wallet, CalendarDays, MessageSquareText, StickyNote, CheckCircle2, Clock,
  User, X, BadgeCheck, ArrowLeftRight,
} from 'lucide-react';
import { CANDIDATES, INITIAL_EVALUATIONS } from '../data/mock';
import { APPROVERS, LANGUAGES, inr } from '../data/types';
import type { Evaluation } from '../data/types';
import { Stars } from '../components/Stars';
import { toast } from '../components/ui';

const RATING_PILLS = [
  { v: 5, label: 'Exceptional', cls: 'bg-emerald-500 text-white shadow-lift' },
  { v: 4, label: 'Above Average', cls: 'bg-emerald-400 text-white' },
  { v: 3, label: 'Average', cls: 'bg-gold-500 text-navy-900' },
  { v: 2, label: 'Satisfactory', cls: 'bg-amber-400 text-navy-900' },
  { v: 1, label: 'Unsatisfactory', cls: 'bg-rose-500 text-white' },
];

const PARAMS = [
  { n: 1, icon: User, label: 'Reference', hint: 'Source / referral name' },
  { n: 2, icon: Languages, label: 'Languages Known', hint: 'Multi-select' },
  { n: 3, icon: BriefcaseBusiness, label: 'Experience', hint: 'Years & domain summary' },
  { n: 4, icon: FileText, label: 'Review of the Candidate', hint: 'Observations' },
  { n: 5, icon: ArrowLeftRight, label: 'Reason for Leaving Previous Company', hint: '' },
  { n: 6, icon: Wallet, label: 'Previous Salary', hint: '₹ per month' },
  { n: 7, icon: Wallet, label: 'Expected Salary', hint: '₹ per month' },
  { n: 8, icon: Wallet, label: 'Salary Approved', hint: 'Approved ₹ + approver' },
  { n: 9, icon: CalendarDays, label: 'Proposed Joining Date', hint: 'Date picker' },
  { n: 10, icon: MessageSquareText, label: 'Overall Feedback', hint: 'Detailed remarks' },
  { n: 11, icon: BadgeCheck, label: 'Overall Candidate Rating', hint: '1–5 summary' },
] as const;

export function EvalForm({
  candidateId,
  onBack,
}: {
  candidateId: string | null;
  onBack: () => void;
}) {
  const [evals, setEvals] = useState<Evaluation>(INITIAL_EVALUATIONS);
  const cand = useMemo(() => CANDIDATES.find((c) => c.id === candidateId) ?? null, [candidateId]);

  if (!cand) {
    return (
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="card animate-fade-up flex flex-col items-center gap-3 p-14 text-center">
          <PenLine className="h-10 w-10 text-slate-300" />
          <p className="font-display text-lg font-semibold text-navy-900">No candidate selected</p>
          <p className="max-w-sm text-sm text-slate-500">
            Open a candidate from the Recruitment pipeline or the dashboard queue to start their evaluation sheet.
          </p>
        </div>
      </div>
    );
  }

  const ev = evals[cand.id] ?? {
    interviewer: 'S. Karthik (HR Manager)',
    dateOfInterview: '2026-11-19',
    reference: cand.referrer,
    languages: cand.languages,
    experience: cand.experience,
    review: '',
    reasonLeaving: '',
    previousSalary: '',
    expectedSalary: String(cand.expectedSalary),
    approvedSalary: '',
    approvedBy: '',
    joiningDate: '',
    overallFeedback: '',
    rating: cand.rating,
    remarks: '',
    note: '',
    signOff: { interviewer: 'pending' as const, hr: 'pending' as const, management: 'pending' as const },
  };

  const patch = (p: Partial<typeof ev>) =>
    setEvals((prev) => ({ ...prev, [cand.id]: { ...ev, ...p } }));
  const patchSign = (p: Partial<typeof ev.signOff>) =>
    setEvals((prev) => ({
      ...prev,
      [cand.id]: { ...ev, signOff: { ...ev.signOff, ...p } },
    }));

  const toggleSign = (who: 'interviewer' | 'management') => {
    const cur = ev.signOff[who];
    if (who === 'interviewer') {
      patchSign(cur === 'signed' ? { interviewer: 'pending', interviewerAt: undefined } : { interviewer: 'signed', interviewerAt: '19-Nov-26 · 10:24 AM' });
      toast(cur === 'signed' ? 'Interviewer sign-off revoked' : 'Interviewer digitally signed');
    } else {
      patchSign({ management: cur === 'approved' ? 'pending' : 'approved' });
      toast(cur === 'approved' ? 'Management sign-off reverted' : 'Management (COO) sign-off recorded');
    }
  };

  const save = () => {
    if (!ev.approvedSalary || !ev.joiningDate) {
      toast('Enter the approved salary and joining date before saving');
      return;
    }
    patchSign({ hr: 'approved' });
    toast('Evaluation sheet saved · HR approval recorded');
  };

  const ratingPill = RATING_PILLS.find((r) => r.v === Math.round(ev.rating ?? 0));

  const ParamCard = ({
    n, icon: Icon, label, hint, children,
  }: {
    n: number; icon: typeof User; label: string; hint: string; children: React.ReactNode;
  }) => (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-lift sm:p-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="num flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-[11px] font-bold text-gold-400">
          {n}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-navy-900">{label}</p>
          {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
        </div>
        <Icon className="ml-auto h-4 w-4 shrink-0 text-slate-300" />
      </div>
      {children}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      {/* Document sheet */}
      <div className="card animate-fade-up overflow-hidden">
        {/* Form header */}
        <div className="relative overflow-hidden bg-navy-900 px-6 py-8 md:px-10">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold-500/10 blur-2xl" />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Vaibhav Vyapaar · Human Resources</p>
              <h1 className="mt-2 font-display text-xl font-semibold text-white md:text-2xl">
                Interview Feedback Form — Candidate Evaluation Sheet
              </h1>
              <p className="mt-1 text-xs text-slate-400">REF: VV-HR-EVAL · Confidential · For internal use only</p>
            </div>
            <span className="badge w-fit bg-gold-500/15 text-gold-300 ring-1 ring-gold-500/30">
              <FileText className="h-3 w-3" /> {cand.resumeFile}
            </span>
          </div>
        </div>

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-4 border-b border-line bg-canvas/60 px-6 py-5 md:grid-cols-4 md:px-10">
          {[
            ['Candidate Name', cand.name],
            ['Position Applied', cand.position],
            ['Interviewer', ev.interviewer.split(' (')[0]],
            ['Date of Interview', ev.dateOfInterview],
          ].map(([l, v]) => (
            <div key={l}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{l}</p>
              <p className="num mt-1 text-sm font-bold text-navy-900">{v}</p>
            </div>
          ))}
        </div>

        {/* Parameters */}
        <div className="space-y-4 px-6 py-6 md:px-10">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="h-px flex-1 bg-line" /> 11 EVALUATION PARAMETERS <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <ParamCard n={1} icon={User} label="Reference" hint="Source / referral name">
                <input
                  className="input-base"
                  value={ev.reference}
                  onChange={(e) => patch({ reference: e.target.value })}
                  placeholder="e.g. Employee referral — S. Iyer"
                />
              </ParamCard>
            </div>
            <div className="md:col-span-1">
              <ParamCard n={2} icon={Languages} label="Languages Known" hint="Select all that apply">
                <div className="flex flex-wrap gap-1.5">
                  {LANGUAGES.map((l) => {
                    const on = ev.languages.includes(l);
                    return (
                      <button
                        key={l}
                        onClick={() =>
                          patch({ languages: on ? ev.languages.filter((x) => x !== l) : [...ev.languages, l] })
                        }
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                          on
                            ? 'bg-navy-900 text-gold-400 shadow-card'
                            : 'border border-line bg-canvas text-slate-500 hover:border-gold-500/50 hover:text-navy-900'
                        }`}
                      >
                        {l}
                      </button>
                    );
                  })}
                </div>
              </ParamCard>
            </div>

            <div className="md:col-span-2">
              <ParamCard n={3} icon={BriefcaseBusiness} label="Experience" hint="Years & relevant domain summary">
                <textarea
                  rows={2}
                  className="input-base resize-none"
                  value={ev.experience}
                  onChange={(e) => patch({ experience: e.target.value })}
                  placeholder="e.g. 3 years in banking back-office…"
                />
              </ParamCard>
            </div>

            <div className="md:col-span-2">
              <ParamCard n={4} icon={FileText} label="Review of the Candidate" hint="Rich observation box">
                <textarea
                  rows={3}
                  className="input-base resize-none"
                  value={ev.review}
                  onChange={(e) => patch({ review: e.target.value })}
                  placeholder="Communication, roleplay performance, red flags, strengths…"
                />
              </ParamCard>
            </div>

            <div className="md:col-span-2">
              <ParamCard n={5} icon={ArrowLeftRight} label="Reason for Leaving Previous Company" hint="">
                <input
                  className="input-base"
                  value={ev.reasonLeaving}
                  onChange={(e) => patch({ reasonLeaving: e.target.value })}
                  placeholder="e.g. Contract ended; seeking permanent role"
                />
              </ParamCard>
            </div>

            <ParamCard n={6} icon={Wallet} label="Previous Salary" hint="₹ per month">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">₹</span>
                <input
                  inputMode="numeric"
                  className="input-base num pl-8"
                  value={ev.previousSalary}
                  onChange={(e) => patch({ previousSalary: e.target.value.replace(/[^\d]/g, '') })}
                  placeholder="27,800"
                />
              </div>
              {ev.previousSalary && (
                <p className="mt-1.5 text-right text-[11px] font-semibold text-emerald-600">{inr(Number(ev.previousSalary))}</p>
              )}
            </ParamCard>

            <ParamCard n={7} icon={Wallet} label="Expected Salary" hint="₹ per month">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">₹</span>
                <input
                  inputMode="numeric"
                  className="input-base num pl-8"
                  value={ev.expectedSalary}
                  onChange={(e) => patch({ expectedSalary: e.target.value.replace(/[^\d]/g, '') })}
                  placeholder="35,000"
                />
              </div>
              {ev.expectedSalary && (
                <p className="mt-1.5 text-right text-[11px] font-semibold text-gold-700">{inr(Number(ev.expectedSalary))}</p>
              )}
            </ParamCard>

            <div className="md:col-span-2">
              <ParamCard n={8} icon={Wallet} label="Salary Approved" hint="Approved amount & approving authority">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gold-700">₹</span>
                    <input
                      inputMode="numeric"
                      className="input-base num pl-8 font-bold"
                      value={ev.approvedSalary}
                      onChange={(e) => patch({ approvedSalary: e.target.value.replace(/[^\d]/g, '') })}
                      placeholder="Approved ₹"
                    />
                  </div>
                  <select
                    className="input-base"
                    value={ev.approvedBy}
                    onChange={(e) => patch({ approvedBy: e.target.value })}
                  >
                    <option value="">Select approver…</option>
                    {APPROVERS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </ParamCard>
            </div>

            <ParamCard n={9} icon={CalendarDays} label="Proposed Joining Date" hint="Interactive picker">
              <input
                type="date"
                className="input-base num"
                value={ev.joiningDate}
                onChange={(e) => patch({ joiningDate: e.target.value })}
              />
            </ParamCard>

            <ParamCard n={10} icon={MessageSquareText} label="Overall Feedback" hint="Detailed remarks">
              <textarea
                rows={3}
                className="input-base resize-none"
                value={ev.overallFeedback}
                onChange={(e) => patch({ overallFeedback: e.target.value })}
                placeholder="Hiring recommendation, band fit, verification notes…"
              />
            </ParamCard>

            <div className="md:col-span-2">
              <ParamCard n={11} icon={BadgeCheck} label="Overall Candidate Rating" hint="Auto-synced summary">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Stars value={ev.rating} onChange={(n) => patch({ rating: n })} />
                  <div className="flex flex-wrap gap-1.5">
                    {RATING_PILLS.map((r) => {
                      const on = Math.round(ev.rating ?? 0) === r.v;
                      return (
                        <button
                          key={r.v}
                          onClick={() => patch({ rating: r.v })}
                          className={`num rounded-full px-3 py-1.5 text-[11px] font-bold transition-all duration-200 ${
                            on ? r.cls : 'border border-line bg-canvas text-slate-500 hover:border-gold-500/50 hover:text-navy-900'
                          }`}
                        >
                          {r.v} — {r.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </ParamCard>
            </div>
          </div>

          {/* Remarks & notes */}
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-dashed border-line bg-canvas/50 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-800">
                <PenLine className="h-3.5 w-3.5 text-gold-600" /> Remarks
              </p>
              <textarea
                rows={3}
                className="input-base mt-2.5 resize-none border-line bg-white"
                value={ev.remarks}
                onChange={(e) => patch({ remarks: e.target.value })}
                placeholder="Operational remarks…"
              />
            </div>
            <div className="rounded-2xl border-2 border-dashed border-line bg-canvas/50 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-800">
                <StickyNote className="h-3.5 w-3.5 text-gold-600" /> Note (If Any)
              </p>
              <textarea
                rows={3}
                className="input-base mt-2.5 resize-none border-line bg-white"
                value={ev.note}
                onChange={(e) => patch({ note: e.target.value })}
                placeholder="Anything exceptional to flag…"
              />
            </div>
          </div>
        </div>

        {/* Sign-off footer */}
        <div className="border-t border-line bg-canvas/70 px-6 py-6 md:px-10">
          <div className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-400">
            <span className="h-px flex-1 bg-line" /> 3-STAGE DIGITAL SIGN-OFF <span className="h-px flex-1 bg-line" />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {/* Interviewer */}
            <button
              onClick={() => toggleSign('interviewer')}
              className={`group rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${
                ev.signOff.interviewer === 'signed'
                  ? 'border-emerald-300 bg-emerald-50/60'
                  : 'border-line bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <PenLine className={`h-5 w-5 ${ev.signOff.interviewer === 'signed' ? 'text-emerald-600' : 'text-slate-300'}`} />
                {ev.signOff.interviewer === 'signed' ? (
                  <span className="badge bg-emerald-100 text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Signed</span>
                ) : (
                  <span className="badge bg-slate-100 text-slate-500"><Clock className="h-3 w-3" /> Pending</span>
                )}
              </div>
              <p className="mt-2.5 text-sm font-bold text-navy-900">Interviewer Signature</p>
              <p className="num text-[11px] text-slate-500">
                {ev.signOff.interviewer === 'signed' ? ev.signOff.interviewerAt : 'Tap to sign & timestamp'}
              </p>
            </button>
            {/* HR */}
            <div
              className={`rounded-2xl border-2 p-4 transition-all duration-300 ${
                ev.signOff.hr === 'approved' ? 'border-emerald-300 bg-emerald-50/60' : 'border-line bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <ShieldCheck className={`h-5 w-5 ${ev.signOff.hr === 'approved' ? 'text-emerald-600' : 'text-slate-300'}`} />
                {ev.signOff.hr === 'approved' ? (
                  <span className="badge bg-emerald-100 text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Approved</span>
                ) : (
                  <span className="badge bg-amber-100 text-amber-700"><Clock className="h-3 w-3" /> Pending</span>
                )}
              </div>
              <p className="mt-2.5 text-sm font-bold text-navy-900">HR Department Approval</p>
              <p className="text-[11px] text-slate-500">Recorded when the sheet is saved</p>
            </div>
            {/* Management */}
            <button
              onClick={() => toggleSign('management')}
              className={`group rounded-2xl border-2 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift ${
                ev.signOff.management === 'approved' ? 'border-emerald-300 bg-emerald-50/60' : 'border-line bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <Landmark className={`h-5 w-5 ${ev.signOff.management === 'approved' ? 'text-emerald-600' : 'text-gold-600'}`} />
                {ev.signOff.management === 'approved' ? (
                  <span className="badge bg-emerald-100 text-emerald-700"><CheckCircle2 className="h-3 w-3" /> Approved</span>
                ) : (
                  <span className="badge bg-gold-500/15 text-gold-700"><Clock className="h-3 w-3" /> Awaiting COO</span>
                )}
              </div>
              <p className="mt-2.5 text-sm font-bold text-navy-900">Management Sign-Off</p>
              <p className="text-[11px] text-slate-500">Final COO / management approval</p>
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-slate-400">
              Sheet status:{' '}
              <span className={`font-bold ${ratingPill ? '' : ''}`}>
                {ev.signOff.management === 'approved'
                  ? 'Fully executed — filed to HR Vault'
                  : ev.signOff.hr === 'approved'
                    ? 'HR approved — awaiting management sign-off'
                    : 'In progress'}
              </span>
            </p>
            <div className="flex gap-2.5">
              <button onClick={onBack} className="btn-ghost">
                <X className="h-4 w-4" /> Close
              </button>
              <button onClick={save} className="btn-gold">
                <CheckCircle2 className="h-4 w-4" /> Save & Approve Sheet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
