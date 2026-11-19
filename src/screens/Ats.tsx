import { useMemo, useState } from 'react';
import {
  Search, LayoutGrid, Table2, FileText, Phone, CalendarDays, X, Star,
  StarHalf, Wallet, ChevronRight, Columns3,
} from 'lucide-react';
import { CANDIDATES } from '../data/mock';
import {
  STAGES, inr, ratingTone, stageTone, type Candidate, type Stage,
} from '../data/types';
import { EmptyHint } from '../components/ui';

export function Ats({
  onOpenCandidate,
  onOpenEval,
}: {
  onOpenCandidate: (c: Candidate) => void;
  onOpenEval: (c: Candidate) => void;
}) {
  const [view, setView] = useState<'board' | 'table'>('board');
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('All');
  const [rating, setRating] = useState(0);
  const [cands, setCands] = useState<Candidate[]>(CANDIDATES);

  const filtered = useMemo(
    () =>
      cands.filter(
        (c) =>
          (q === '' || c.name.toLowerCase().includes(q.toLowerCase()) || c.position.toLowerCase().includes(q.toLowerCase())) &&
          (dept === 'All' || c.dept === dept) &&
          (rating === 0 || (c.rating ?? 0) >= rating),
      ),
    [cands, q, dept, rating],
  );

  const moveStage = (id: string, stage: Stage) => {
    setCands((p) => p.map((c) => (c.id === id ? { ...c, stage } : c)));
  };

  const deptOptions = ['All', 'Collections', 'Customer Support', 'vKYC', 'Tele-Sales', 'Miscellaneous'];

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="animate-fade-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-600">Recruitment & Walk-Ins</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy-900 md:text-3xl">Candidate Pipeline</h1>
          <p className="mt-1 text-sm text-slate-500">Every walk-in, digitally tracked — no more paper resumes.</p>
        </div>
        <div className="flex animate-fade-up items-center gap-1 rounded-xl border border-line bg-white p-1 shadow-card" style={{ animationDelay: '60ms' }}>
          {([['board', LayoutGrid, 'Pipeline'], ['table', Table2, 'Table']] as const).map(([v, Icon, label]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                view === v ? 'bg-navy-900 text-white shadow-card' : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 animate-fade-up md:flex-row md:items-center" style={{ animationDelay: '100ms' }}>
        <div className="relative flex-1 md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or position…"
            className="input-base pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {deptOptions.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                dept === d ? 'bg-navy-900 text-white shadow-card' : 'border border-line bg-white text-slate-500 hover:text-navy-900'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 rounded-xl border border-line bg-white px-3 py-2 shadow-card">
          {[1, 2, 3, 4, 5].map((n) =>
            rating >= n - 0.5 && rating >= n ? (
              <Star key={n} onClick={() => setRating(0)} className="h-4 w-4 cursor-pointer fill-gold-500 text-gold-500" />
            ) : (
              <Star key={n} onClick={() => setRating(n)} className="h-4 w-4 cursor-pointer text-slate-300 transition-colors hover:text-gold-400" />
            ),
          )}
          {rating > 0 && <span className="ml-1 text-[11px] font-semibold text-navy-900">{rating}+</span>}
        </div>
      </div>

      {view === 'board' ? (
        <div className="grid animate-fade-up grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {STAGES.map(({ id, label }) => {
            const list = filtered.filter((c) => c.stage === id);
            return (
              <div key={id} className="flex flex-col rounded-2xl border border-line bg-canvas/70 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</span>
                  <span className="num rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-navy-900 ring-1 ring-line">
                    {list.length}
                  </span>
                </div>
                <div className="flex-1 space-y-2.5">
                  {list.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onOpenCandidate(c)}
                      className="w-full rounded-xl border border-line bg-white p-3.5 text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/50 hover:shadow-lift"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-gold-400">
                          {c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </span>
                        <FileText className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-gold-500" />
                      </div>
                      <p className="mt-2.5 truncate text-sm font-bold text-navy-900">{c.name}</p>
                      <p className="truncate text-[11px] text-slate-500">{c.position}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className={`badge ${stageTone[c.stage]} !text-[10px]`}>{c.rating ? `${c.rating}★` : 'New'}</span>
                        <span className="num text-[10px] font-semibold text-slate-400">{c.date}</span>
                      </div>
                      {id !== 'selected' && id !== 'rejected' && (
                        <div className="mt-2.5 flex gap-1 border-t border-line pt-2">
                          {STAGES.filter((s) => s.id !== id && s.id !== 'rejected').slice(0, 2).map((s) => (
                            <button
                              key={s.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveStage(c.id, s.id);
                              }}
                              className="rounded-md bg-canvas px-1.5 py-1 text-[9px] font-bold text-slate-500 transition-colors hover:bg-gold-500/15 hover:text-gold-700"
                            >
                              → {s.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </button>
                  ))}
                  {list.length === 0 && <EmptyHint>No candidates</EmptyHint>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card animate-fade-up overflow-hidden" style={{ animationDelay: '140ms' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="border-b border-line bg-canvas/80">
                <tr>
                  {['Candidate', 'Position', 'Department', 'Experience', 'Expected', 'Rating', 'Stage', ''].map((h) => (
                    <th key={h} className="th-cell">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {filtered.map((c) => (
                  <tr key={c.id} onClick={() => onOpenCandidate(c)} className="cursor-pointer transition-colors hover:bg-gold-500/[0.04]">
                    <td className="td-cell">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-gold-400">
                          {c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-navy-900">{c.name}</p>
                          <p className="num text-[11px] text-slate-500">{c.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="td-cell text-xs">{c.position}</td>
                    <td className="td-cell text-xs">{c.dept}</td>
                    <td className="td-cell text-xs">{c.experience}</td>
                    <td className="td-cell num text-xs font-bold">{inr(c.expectedSalary)}</td>
                    <td className="td-cell">
                      <span className={`badge ${ratingTone(c.rating)}`}>{c.rating ? `${c.rating} / 5` : 'Pending'}</span>
                    </td>
                    <td className="td-cell">
                      <span className={`badge ${stageTone[c.stage]}`}>{STAGES.find((s) => s.id === c.stage)?.label}</span>
                    </td>
                    <td className="td-cell">
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <EmptyHint>No candidates match the current filters</EmptyHint>}
        </div>
      )}

      {/* Mobile card list when in table view on small screens is handled by horizontal scroll; board is primary mobile view */}
      <p className="flex items-center gap-2 text-[11px] text-slate-400 md:hidden">
        <Columns3 className="h-3.5 w-3.5" /> Tip: the pipeline board is best on mobile.
      </p>
    </div>
  );
}

export function CandidateDrawer({
  candidate,
  onClose,
  onOpenEval,
}: {
  candidate: Candidate;
  onClose: () => void;
  onOpenEval: (c: Candidate) => void;
}) {
  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <div className="absolute inset-0 animate-fade-in bg-navy-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-4xl animate-slide-in-right flex-col bg-canvas shadow-drawer md:my-4 md:rounded-2xl md:border md:border-line">
        {/* Drawer header */}
        <div className="flex items-center gap-4 border-b border-line bg-navy-900 px-5 py-4 md:rounded-t-2xl">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-sm font-bold text-navy-900">
            {candidate.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-semibold text-white">{candidate.name}</p>
            <p className="truncate text-xs text-slate-400">{candidate.position} · {candidate.dept}</p>
          </div>
          <span className={`badge ${stageTone[candidate.stage]} hidden sm:inline-flex`}>
            {STAGES.find((s) => s.id === candidate.stage)?.label}
          </span>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid flex-1 grid-cols-1 overflow-hidden md:grid-cols-2">
          {/* Left: resume viewer */}
          <div className="hidden flex-col border-r border-line bg-slate-100/70 md:flex">
            <div className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-navy-800">
                <FileText className="h-4 w-4 text-gold-600" /> {candidate.resumeFile}
              </div>
              <span className="num text-[11px] text-slate-400">{candidate.resumePages} pages · 210 KB</span>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-6">
              <div className="rounded-xl bg-white p-5 shadow-card ring-1 ring-line">
                <div className="flex items-center gap-4 border-b border-line pb-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 text-lg font-bold text-gold-400">
                    {candidate.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-navy-900">{candidate.name}</p>
                    <p className="text-xs text-slate-500">{candidate.position} — Applicant</p>
                    <p className="num text-[11px] text-slate-400">{candidate.phone}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-4 text-xs">
                  {[
                    ['Professional Summary', ['Candidate profile captured at the walk-in desk. Strengths, tenure history and notice-period status recorded during screening.']],
                    ['Experience', [candidate.experience, 'Handled front-line responsibilities with documented performance reviews.']],
                    ['Education & Skills', ['Graduate — relevant domain certification.', 'Core skills aligned to the applied role at Vaibhav Vyapaar.']],
                  ].map(([h, lines]) => (
                    <div key={h as string}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gold-700">{h as string}</p>
                      <div className="mt-1.5 space-y-1.5">
                        {(lines as string[]).map((l) => (
                          <div key={l} className="h-2 rounded-full bg-slate-100" style={{ width: `${45 + (l.length % 5) * 10}%` }} />
                        ))}
                        <p className="pt-0.5 text-[11px] leading-relaxed text-slate-600">{(lines as string[])[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 border-t border-dashed border-line pt-3 text-center text-[10px] italic text-slate-400">
                  Secured digital copy — Vaibhav Vyapaar HR Vault
                </p>
              </div>
            </div>
          </div>

          {/* Right: metadata */}
          <div className="flex flex-col gap-5 overflow-y-auto p-5 md:p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact</p>
              <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[
                  { icon: Phone, label: 'Phone', value: candidate.phone },
                  { icon: CalendarDays, label: 'Walk-in Date', value: candidate.date },
                  { icon: Wallet, label: 'Expected Salary', value: inr(candidate.expectedSalary) },
                  { icon: FileText, label: 'Reference', value: candidate.referrer },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl border border-line bg-white p-3 shadow-card">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                      <Icon className="h-3 w-3" /> {label}
                    </p>
                    <p className="num mt-1 truncate text-xs font-bold text-navy-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Experience</p>
              <p className="mt-1.5 rounded-xl border border-line bg-white p-3 text-xs leading-relaxed text-navy-800 shadow-card">
                {candidate.experience}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Languages</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {candidate.languages.map((l) => (
                  <span key={l} className="badge bg-navy-900/5 text-navy-800">{l}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Interview Rating</p>
              <div className="mt-1.5 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) =>
                  candidate.rating && n <= candidate.rating ? (
                    <Star key={n} className="h-5 w-5 fill-gold-500 text-gold-500" />
                  ) : candidate.rating && n === Math.ceil(candidate.rating) && candidate.rating % 1 !== 0 ? (
                    <StarHalf key={n} className="h-5 w-5 fill-gold-500 text-gold-500" />
                  ) : (
                    <Star key={n} className="h-5 w-5 text-slate-300" />
                  ),
                )}
                <span className="num text-xs font-bold text-navy-900">{candidate.rating ? `${candidate.rating} / 5` : '—'}</span>
              </div>
            </div>

            <div className="mt-auto space-y-2.5 border-t border-line pt-5">
              <button onClick={() => onOpenEval(candidate)} className="btn-gold w-full justify-center">
                <FileText className="h-4 w-4" /> Open Digital Evaluation Sheet
              </button>
              <button onClick={onClose} className="btn-ghost w-full justify-center">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
