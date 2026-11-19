import { useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutDashboard, Users, FileText, ClipboardList, Contact, CalendarClock,
  PackageSearch, Search, Plus, Bell, Menu, X, ChevronLeft, BriefcaseBusiness,
} from 'lucide-react';
import { toast } from './ui';
import { CANDIDATES } from '../data/mock';
import type { Candidate } from '../data/types';

const CANDIDATE_NAMES = CANDIDATES;

export type ScreenId =
  | 'dashboard' | 'ats' | 'eval' | 'reports' | 'directory' | 'attendance' | 'assets';

export const NAV: { id: ScreenId; label: string; icon: typeof LayoutDashboard; group: string }[] = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, group: 'Overview' },
  { id: 'ats', label: 'Recruitment & Walk-Ins', icon: Users, group: 'Hiring' },
  { id: 'eval', label: 'Interview Evaluation', icon: FileText, group: 'Hiring' },
  { id: 'reports', label: 'Daily HR Reports', icon: ClipboardList, group: 'Hiring' },
  { id: 'directory', label: 'Employee Directory', icon: Contact, group: 'People' },
  { id: 'attendance', label: 'Attendance & Leave', icon: CalendarClock, group: 'People' },
  { id: 'assets', label: 'Assets & Exit Clearance', icon: PackageSearch, group: 'People' },
];

interface Props {
  active: ScreenId;
  onNavigate: (s: ScreenId) => void;
  onOpenCandidate: (c: Candidate) => void;
  children: ReactNode_ish;
}
type ReactNode_ish = React.ReactNode;

export function Shell({ active, onNavigate, onOpenCandidate, children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [palette, setPalette] = useState(false);
  const [notifs, setNotifs] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette(true);
      }
      if (e.key === 'Escape') setPalette(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  useEffect(() => {
    if (palette) setTimeout(() => inputRef.current?.focus(), 30);
  }, [palette]);

  useEffect(() => setDrawer(false), [active]);

  const groups = useMemo(() => {
    const m = new Map<string, typeof NAV>();
    NAV.forEach((n) => {
      if (!m.has(n.group)) m.set(n.group, []);
      m.get(n.group)!.push(n);
    });
    return [...m.entries()];
  }, []);

  const runSearch = () => {
    const hit = CANDIDATE_NAMES.find((c) => c.name.toLowerCase().includes(q.trim().toLowerCase()));
    if (q.trim() && hit) {
      onOpenCandidate(hit);
      setPalette(false);
      setQ('');
    } else {
      toast(q.trim() ? 'No candidate resume matched that search' : 'Type a candidate name to search');
    }
  };

  const navEl = (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-6">
      {groups.map(([group, items]) => (
        <div key={group}>
          {!collapsed && (
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{group}</p>
          )}
          <div className="space-y-1">
            {items.map(({ id, label, icon: Icon }) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  title={collapsed ? label : undefined}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    on ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }`}
                >
                  {on && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-gold-500" />
                  )}
                  <Icon className={`h-[18px] w-[18px] shrink-0 ${on ? 'text-gold-400' : ''}`} />
                  {!collapsed && <span className="truncate">{label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-canvas">
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden flex-col bg-navy-900 shadow-drawer transition-all duration-300 lg:flex ${
          collapsed ? 'w-[76px]' : 'w-[264px]'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{ background: 'radial-gradient(420px 160px at 20% 0%, rgb(234 179 8 / 0.16), transparent 70%)' }}
        />
        <div className={`relative flex items-center gap-3 px-5 pb-2 pt-6 ${collapsed ? 'justify-center px-0' : ''}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-gold">
            <BriefcaseBusiness className="h-5 w-5 text-navy-900" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold tracking-wide text-white">VAIBHAV VYAPAAR</p>
              <p className="text-[11px] font-medium tracking-wide text-gold-400/90">HR Portal</p>
            </div>
          )}
        </div>
        {navEl}
        <div className="relative border-t border-white/10 p-3">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && 'Collapse'}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-navy-950/60 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-[280px] flex-col bg-navy-900 shadow-drawer">
            <div className="flex items-center justify-between px-5 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600">
                  <BriefcaseBusiness className="h-4 w-4 text-navy-900" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-white">VAIBHAV VYAPAAR</p>
                  <p className="text-[10px] text-gold-400/90">HR Portal</p>
                </div>
              </div>
              <button onClick={() => setDrawer(false)} className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
              {NAV.map(({ id, label, icon: Icon }) => {
                const on = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => onNavigate(id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                      on ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-[18px] w-[18px] ${on ? 'text-gold-400' : ''}`} />
                    {label}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className={`flex min-h-screen flex-col transition-all duration-300 ${collapsed ? 'lg:pl-[76px]' : 'lg:pl-[264px]'}`}>
        {/* Glass header */}
        <header className="sticky top-0 z-30 border-b border-line/70 bg-white/75 shadow-[0_1px_0_0_rgb(255_255_255_/_0.6)_inset] backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 md:px-8">
            <button
              onClick={() => setDrawer(true)}
              className="rounded-xl border border-line bg-white p-2 text-navy-800 shadow-card transition hover:shadow-lift lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPalette(true)}
              className="group flex flex-1 items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2 text-left text-sm text-slate-400 shadow-card transition-all hover:border-navy-900/20 hover:shadow-lift md:max-w-md"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search candidates, employees…</span>
              <span className="sm:hidden">Search…</span>
              <kbd className="ml-auto hidden rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 md:inline">
                ⌘K
              </kbd>
            </button>
            <button onClick={() => onNavigate('ats')} className="btn-gold hidden md:inline-flex">
              <Plus className="h-4 w-4" /> Log Walk-In Candidate
            </button>
            <div className="relative">
              <button
                onClick={() => setNotifs((n) => !n)}
                className="relative rounded-xl border border-line bg-white p-2 text-navy-800 shadow-card transition hover:shadow-lift"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-navy-900 ring-2 ring-white">
                  3
                </span>
              </button>
              {notifs && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotifs(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-80 animate-scale-in rounded-2xl border border-line bg-white p-2 shadow-lift">
                    <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">Approval alerts</p>
                    {[
                      ['Ananya Sharma', 'HR approval pending'],
                      ['Meghna Iyer', 'Management sign-off pending'],
                      ['Vikram S. Rathore', 'Offer at ₹52,000 needs COO sign-off'],
                    ].map(([n, msg]) => (
                      <button
                        key={n}
                        onClick={() => {
                          setNotifs(false);
                          onNavigate('eval');
                        }}
                        className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-canvas"
                      >
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                        <span>
                          <span className="block text-sm font-semibold text-navy-900">{n}</span>
                          <span className="block text-xs text-slate-500">{msg}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-line bg-white py-1 pl-1 pr-1 shadow-card md:pr-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-gold-400">
                RM
              </span>
              <span className="hidden text-left md:block">
                <span className="block text-xs font-bold leading-tight text-navy-900">R. Meenakshi</span>
                <span className="block text-[10px] leading-tight text-slate-500">HR Head</span>
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-24 md:pb-10">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl md:hidden">
          <div className="grid grid-cols-5">
            {NAV.slice(0, 5).map(({ id, label, icon: Icon }) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className={`flex flex-col items-center gap-1 py-2.5 text-[9px] font-semibold transition-colors ${
                    on ? 'text-navy-900' : 'text-slate-400'
                  }`}
                >
                  <span className={`rounded-lg px-3 py-1 ${on ? 'bg-gold-500/15' : ''}`}>
                    <Icon className={`h-5 w-5 ${on ? 'text-gold-600' : ''}`} />
                  </span>
                  {label.split(' ')[0].replace('&', '')}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Command palette */}
      {palette && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]">
          <div className="absolute inset-0 animate-fade-in bg-navy-950/50 backdrop-blur-sm" onClick={() => setPalette(false)} />
          <div className="relative w-full max-w-lg animate-scale-in overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runSearch()}
                placeholder="Search candidates by name…"
                className="w-full bg-transparent py-4 text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none"
              />
              <kbd className="rounded-md border border-line bg-canvas px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick actions</p>
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    onNavigate(id);
                    setPalette(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-800 transition-colors hover:bg-canvas"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
