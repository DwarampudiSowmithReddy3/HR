import { useMemo, useState } from 'react';
import {
  Contact, Search, Wallet, CalendarDays, CheckCircle2, Circle, Building2,
  UserCheck, LogOut, Phone,
} from 'lucide-react';
import { NEW_JOINERS, EXIT_CASES } from '../data/mock';
import { inr, type Dept, type NewJoiner } from '../data/types';
import { Progress, toast } from '../components/ui';

const EMPLOYEES: {
  id: string; name: string; role: string; dept: Dept; joined: string; salary: number; phone: string; status: 'Active' | 'Onboarding' | 'Exiting';
}[] = [
  { id: 'e1', name: 'R. Meenakshi', role: 'Head — Human Resources', dept: 'Miscellaneous', joined: '12-Mar-21', salary: 128000, phone: '+91 98800 11223', status: 'Active' },
  { id: 'e2', name: 'A. Vaibhav', role: 'Chief Operating Officer', dept: 'Miscellaneous', joined: '02-Jan-19', salary: 210000, phone: '+91 98800 10001', status: 'Active' },
  { id: 'e3', name: 'S. Karthik', role: 'HR Manager', dept: 'Miscellaneous', joined: '18-Jul-22', salary: 84000, phone: '+91 98800 44521', status: 'Active' },
  { id: 'e4', name: 'P. Deepak', role: 'Operations Director', dept: 'Collections', joined: '05-Feb-20', salary: 156000, phone: '+91 98800 63107', status: 'Active' },
  { id: 'e5', name: 'Farhan M.', role: 'Collections Team Lead', dept: 'Collections', joined: '11-Nov-23', salary: 52000, phone: '+91 98450 77120', status: 'Active' },
  { id: 'e6', name: 'Lakshmi S.', role: 'Customer Support Lead', dept: 'Customer Support', joined: '03-Apr-23', salary: 49000, phone: '+91 98450 90833', status: 'Active' },
  { id: 'e7', name: 'Nandini R.', role: 'vKYC Analyst II', dept: 'vKYC', joined: '27-Nov-24', salary: 36500, phone: '+91 90080 55412', status: 'Active' },
  { id: 'e8', name: 'Girish T.', role: 'Senior Tele-Sales Executive', dept: 'Tele-Sales', joined: '15-Aug-24', salary: 41000, phone: '+91 90080 90228', status: 'Active' },
  { id: 'e9', name: 'Aditi Ghosh', role: 'Support Associate', dept: 'Customer Support', joined: '26-Nov-26', salary: 29000, phone: '+91 90080 12119', status: 'Onboarding' },
  { id: 'e10', name: 'Rahul Verma', role: 'Tele-Sales Executive', dept: 'Tele-Sales', joined: '09-May-24', salary: 33000, phone: '+91 97401 33209', status: 'Exiting' },
];

export function Directory() {
  const [q, setQ] = useState('');
  const [joiners, setJoiners] = useState<NewJoiner[]>(NEW_JOINERS);
  const [activeTab, setActiveTab] = useState<'team' | 'onboarding'>('team');

  const filtered = useMemo(
    () => EMPLOYEES.filter((e) => q === '' || e.name.toLowerCase().includes(q.toLowerCase()) || e.role.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-8">
      <div className="animate-fade-up">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-600">Employee Lifecycle</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-navy-900 md:text-3xl">Directory & Onboarding</h1>
        <p className="mt-1 text-sm text-slate-500">125 people across five departments — every joiner tracked to day one.</p>
      </div>

      <div className="flex flex-col gap-3 animate-fade-up md:flex-row md:items-center" style={{ animationDelay: '60ms' }}>
        <div className="flex gap-1 rounded-xl border border-line bg-white p-1 shadow-card">
          {([['team', Contact, 'Employee Directory'], ['onboarding', UserCheck, 'Onboarding Tracker']] as const).map(([v, Icon, label]) => (
            <button
              key={v}
              onClick={() => setActiveTab(v)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === v ? 'bg-navy-900 text-white shadow-card' : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </button>
          ))}
        </div>
        {activeTab === 'team' && (
          <div className="relative flex-1 md:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people…" className="input-base pl-9" />
          </div>
        )}
      </div>

      {activeTab === 'team' ? (
        <div className="grid animate-fade-up grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" style={{ animationDelay: '100ms' }}>
          {filtered.map((e, i) => (
            <div key={e.id} className="card card-hover animate-fade-up p-5" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900 text-xs font-bold text-gold-400">
                  {e.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <span
                  className={`badge ${
                    e.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : e.status === 'Onboarding'
                        ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                        : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                  }`}
                >
                  {e.status}
                </span>
              </div>
              <p className="mt-3 text-sm font-bold text-navy-900">{e.name}</p>
              <p className="text-xs text-slate-500">{e.role}</p>
              <div className="mt-4 space-y-2 border-t border-line pt-3.5 text-[11px] text-slate-500">
                <p className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-slate-300" /> {e.dept}
                </p>
                <p className="num flex items-center gap-2">
                  <Wallet className="h-3.5 w-3.5 text-slate-300" /> {inr(e.salary)} / month
                </p>
                <p className="num flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-300" /> Joined {e.joined}
                </p>
                <p className="num flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-300" /> {e.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid animate-fade-up grid-cols-1 gap-4 md:grid-cols-2" style={{ animationDelay: '100ms' }}>
          {joiners.map((j) => {
            const overall = Math.round((j.kycDone + j.assetsDone + (j.deptAssigned ? 100 : 0)) / 3);
            return (
              <div key={j.id} className="card animate-fade-up p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-xs font-bold text-navy-900">
                      {j.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{j.name}</p>
                      <p className="text-[11px] text-slate-500">{j.role} · {j.dept}</p>
                    </div>
                  </div>
                  <span className="num badge bg-navy-900/5 text-navy-900">Joins {j.joiningDate}</span>
                </div>
                <p className="num mt-4 flex items-center justify-between text-[11px] font-bold text-navy-900">
                  <span>Onboarding progress</span>
                  <span>{overall}%</span>
                </p>
                <div className="mt-1.5">
                  <Progress value={overall} tone={overall === 100 ? 'emerald' : 'gold'} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-semibold">
                  {[
                    ['KYC Upload', j.kycDone, () => setJoiners((p) => p.map((x) => (x.id === j.id ? { ...x, kycDone: x.kycDone >= 100 ? 40 : 100 } : x)))],
                    ['IT Asset Handover', j.assetsDone, () => setJoiners((p) => p.map((x) => (x.id === j.id ? { ...x, assetsDone: x.assetsDone >= 100 ? 30 : 100 } : x)))],
                    ['Dept Assignment', j.deptAssigned ? 100 : 0, () => setJoiners((p) => p.map((x) => (x.id === j.id ? { ...x, deptAssigned: !x.deptAssigned } : x)))],
                  ].map(([label, val, fn]) => (
                    <button
                      key={label as string}
                      onClick={() => {
                        (fn as () => void)();
                        toast(`${label} updated for ${j.name}`);
                      }}
                      className={`rounded-xl border p-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card ${
                        (val as number) >= 100 ? 'border-emerald-200 bg-emerald-50/60' : 'border-line bg-canvas/60'
                      }`}
                    >
                      <p className="flex items-center gap-1 text-navy-800">
                        {(val as number) >= 100 ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Circle className="h-3 w-3 text-slate-300" />
                        )}
                        {label as string}
                      </p>
                      <p className="num mt-1 text-slate-500">{val as number}%</p>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Attendance() {
  const days = Array.from({ length: 19 }, (_, i) => i + 1);
  const marks = ['P', 'P', 'P', 'L', 'P', 'P', 'W', 'P', 'P', 'P', 'H', 'P', 'P', 'L', 'P', 'P', 'W', 'P', 'P'];
  const tone: Record<string, string> = {
    P: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    L: 'bg-amber-50 text-amber-700 ring-amber-200',
    W: 'bg-sky-50 text-sky-700 ring-sky-200',
    H: 'bg-slate-100 text-slate-500 ring-slate-200',
  };
  const name: Record<string, string> = { P: 'Present', L: 'Leave', W: 'Week-off', H: 'Holiday' };

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-8">
      <div className="animate-fade-up">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-600">Attendance & Leave</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-navy-900 md:text-3xl">November 2026 Attendance</h1>
        <p className="mt-1 text-sm text-slate-500">Live floor register — Collections & Support pods, Bengaluru HQ.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 animate-fade-up sm:grid-cols-4" style={{ animationDelay: '60ms' }}>
        {[
          ['Present', '112', 'bg-emerald-500/10 text-emerald-700'],
          ['On Leave', '9', 'bg-amber-500/10 text-amber-700'],
          ['Week-off', '4', 'bg-sky-500/10 text-sky-700'],
          ['Avg. Floor Attendance', '94.2%', 'bg-navy-900/5 text-navy-900'],
        ].map(([l, v, c]) => (
          <div key={l} className="card card-hover p-4">
            <p className={`num inline-flex rounded-lg px-2 py-0.5 text-lg font-bold ${c}`}>{v}</p>
            <p className="mt-1.5 text-[11px] font-semibold text-slate-500">{l}</p>
          </div>
        ))}
      </div>

      <div className="card animate-fade-up overflow-hidden" style={{ animationDelay: '100ms' }}>
        <div className="border-b border-line bg-canvas/60 px-5 py-3.5">
          <p className="text-xs font-bold text-navy-900">Floor register · 01–19 Nov 2026</p>
        </div>
        <div className="overflow-x-auto p-4">
          {['Farhan M. (Collections)', 'Lakshmi S. (Support)', 'Nandini R. (vKYC)', 'Girish T. (Tele-Sales)'].map((p, r) => (
            <div key={p} className="mb-3 flex items-center gap-2 last:mb-0">
              <span className="w-44 shrink-0 truncate text-xs font-bold text-navy-900 md:w-56">{p}</span>
              <div className="flex flex-1 gap-1.5 overflow-x-auto pb-1">
                {days.map((d) => (
                  <div key={d} className="shrink-0 text-center">
                    <span
                      title={`${name[marks[(r + d) % marks.length]]} · ${String(d).padStart(2, '0')}-Nov`}
                      className={`num flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ring-1 ${tone[marks[(r + d) % marks.length]]}`}
                    >
                      {marks[(r + d) % marks.length]}
                    </span>
                    <span className="num text-[8px] text-slate-400">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Assets() {
  const [cases, setCases] = useState(EXIT_CASES);
  const toggle = (id: string, key: 'itClearance' | 'financeSettlement' | 'managerHandover') => {
    setCases((p) => p.map((c) => (c.id === id ? { ...c, [key]: !c[key] } : c)));
    toast('Exit checklist updated');
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-8">
      <div className="animate-fade-up">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-600">Assets & Exit Clearance</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-navy-900 md:text-3xl">No-Dues Clearance Desk</h1>
        <p className="mt-1 text-sm text-slate-500">
          Every completed clearance automatically feeds the “LEFT” column in the onboarding & attrition report.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 animate-fade-up md:grid-cols-2 xl:grid-cols-3" style={{ animationDelay: '60ms' }}>
        {cases.map((c) => {
          const steps = [
            ['IT Clearance', c.itClearance, 'itClearance'] as const,
            ['Finance Settlement', c.financeSettlement, 'financeSettlement'] as const,
            ['Manager Handover', c.managerHandover, 'managerHandover'] as const,
          ];
          const done = steps.filter(([, v]) => v).length;
          return (
            <div key={c.id} className="card card-hover animate-fade-up p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-200">
                    <LogOut className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-900">{c.name}</p>
                    <p className="text-[11px] text-slate-500">{c.role} · {c.dept}</p>
                  </div>
                </div>
                <span className="num badge bg-rose-50 text-rose-700 ring-1 ring-rose-200">LWD {c.lastDay}</span>
              </div>
              <p className="num mt-4 text-[11px] font-bold text-navy-900">{done} of 3 clearances complete</p>
              <div className="mt-2.5 space-y-2">
                {steps.map(([label, v, key]) => (
                  <button
                    key={label}
                    onClick={() => toggle(c.id, key)}
                    className={`flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition-all duration-200 hover:shadow-card ${
                      v ? 'border-emerald-200 bg-emerald-50/60 text-emerald-800' : 'border-line bg-canvas/60 text-slate-500'
                    }`}
                  >
                    {v ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <Circle className="h-4 w-4 shrink-0 text-slate-300" />}
                    {label}
                    <span className={`ml-auto text-[10px] font-bold ${v ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {v ? 'Cleared' : 'Pending'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
