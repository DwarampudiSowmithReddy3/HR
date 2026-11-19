import { useMemo, useState } from 'react';
import { FileSpreadsheet, CalendarDays, Download, TrendingUp } from 'lucide-react';
import { DEPT_REPORT, RECRUIT_REPORT } from '../data/mock';

function toCsv(rows: (string | number)[][]) {
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
}

function download(filename: string, rows: (string | number)[][]) {
  const csv = '\uFEFF' + toCsv(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function Reports() {
  const [tab, setTab] = useState<'recruit' | 'dept'>('recruit');
  const [month] = useState('Nov 2026');
  const [exported, setExported] = useState(false);

  const recruitTotals = useMemo(
    () =>
      RECRUIT_REPORT.reduce(
        (a, r) => ({
          walkins: a.walkins + r.walkins,
          interviews: a.interviews + r.interviews,
          selected: a.selected + r.selected,
          rejected: a.rejected + r.rejected,
          joined: a.joined + r.joined,
        }),
        { walkins: 0, interviews: 0, selected: 0, rejected: 0, joined: 0 },
      ),
    [],
  );

  const deptTotals = useMemo(
    () =>
      DEPT_REPORT.reduce(
        (a, r) => ({
          collections: a.collections + r.collections,
          cs: a.cs + r.cs,
          vkyc: a.vkyc + r.vkyc,
          telesales: a.telesales + r.telesales,
          misc: a.misc + r.misc,
          left: a.left + r.left,
        }),
        { collections: 0, cs: 0, vkyc: 0, telesales: 0, misc: 0, left: 0 },
      ),
    [],
  );

  const exportSheet = () => {
    if (tab === 'recruit') {
      download(
        'VV-Recruitment-Summary-Nov-2026.csv',
        [
          ['Vaibhav Vyapaar — Recruitment Summary Report', month],
          ['Date', 'Walk-ins', 'Interviews Conducted', 'Selected', 'Rejected', 'Joined'],
          ...RECRUIT_REPORT.map((r) => [r.date, r.walkins, r.interviews, r.selected, r.rejected, r.joined]),
          ['Monthly Total', recruitTotals.walkins, recruitTotals.interviews, recruitTotals.selected, recruitTotals.rejected, recruitTotals.joined],
        ],
      );
    } else {
      download(
        'VV-Department-Onboarding-Attrition-Nov-2026.csv',
        [
          ['Vaibhav Vyapaar — Department-Wise Onboarding & Attrition Report', month],
          ['Date', 'Collections', 'Customer Support', 'vKYC', 'Tele-Sales', 'Miscellaneous', 'Total', 'LEFT'],
          ...DEPT_REPORT.map((r) => {
            const total = r.collections + r.cs + r.vkyc + r.telesales + r.misc;
            return [r.date, r.collections, r.cs, r.vkyc, r.telesales, r.misc, total, r.left];
          }),
          [
            'Monthly Total', deptTotals.collections, deptTotals.cs, deptTotals.vkyc, deptTotals.telesales,
            deptTotals.misc, deptTotals.collections + deptTotals.cs + deptTotals.vkyc + deptTotals.telesales + deptTotals.misc,
            deptTotals.left,
          ],
        ],
      );
    }
    setExported(true);
    setTimeout(() => setExported(false), 2400);
  };

  const deptTotal = (r: (typeof DEPT_REPORT)[number]) => r.collections + r.cs + r.vkyc + r.telesales + r.misc;

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="animate-fade-up">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-600">Automated Daily Reports</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-navy-900 md:text-3xl">Recruitment & Onboarding Trackers</h1>
          <p className="mt-1 text-sm text-slate-500">Replaces the manual Excel sheet — always current, always exportable.</p>
        </div>
        <div className="flex animate-fade-up items-center gap-2.5" style={{ animationDelay: '60ms' }}>
          <div className="flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-card">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            <select
              value={month}
              onChange={() => {}}
              className="bg-transparent text-sm font-semibold text-navy-900 focus:outline-none"
              aria-label="Report month"
            >
              <option>Nov 2026</option>
              <option>Oct 2026</option>
              <option>Sep 2026</option>
            </select>
          </div>
          <button onClick={exportSheet} className="btn-gold">
            <FileSpreadsheet className="h-4 w-4" />
            {exported ? 'Sheet downloaded' : 'Export to Excel (.xlsx)'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex animate-fade-up gap-1 rounded-xl border border-line bg-white p-1 shadow-card" style={{ animationDelay: '100ms' }}>
        {([
          ['recruit', 'Recruitment Summary'],
          ['dept', 'Onboarding & Attrition'],
        ] as const).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setTab(v)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-xs font-bold transition-all sm:flex-none sm:px-6 ${
              tab === v ? 'bg-navy-900 text-white shadow-card' : 'text-slate-500 hover:text-navy-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'recruit' ? (
        <div className="card animate-fade-up overflow-hidden" style={{ animationDelay: '140ms' }}>
          <div className="flex items-center justify-between border-b border-line bg-canvas/60 px-5 py-3.5">
            <p className="text-xs font-bold text-navy-900">Daily Recruitment Summary — {month}</p>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> {recruitTotals.joined} joined of {recruitTotals.walkins} walk-ins
            </span>
          </div>
          <div className="max-h-[560px] overflow-auto">
            <table className="w-full min-w-[680px]">
              <thead className="sticky top-0 z-10 bg-navy-900 text-white shadow-card">
                <tr>
                  {['Date', 'Walk-ins', 'Interviews Conducted', 'Selected', 'Rejected', 'Joined'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gold-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {RECRUIT_REPORT.map((r, i) => {
                  const active = r.walkins + r.interviews + r.selected + r.rejected + r.joined > 0;
                  return (
                    <tr key={r.date} className={i % 2 ? 'bg-canvas/50' : ''}>
                      <td className={`td-cell num font-semibold ${active ? 'text-navy-900' : 'text-slate-400'}`}>{r.date}</td>
                      <td className="td-cell num">{active ? r.walkins : '—'}</td>
                      <td className="td-cell num">{active ? r.interviews : '—'}</td>
                      <td className="td-cell num font-semibold text-emerald-600">{active ? r.selected : '—'}</td>
                      <td className="td-cell num text-rose-600">{active ? r.rejected : '—'}</td>
                      <td className="td-cell num font-bold">{active ? r.joined : '—'}</td>
                    </tr>
                  );
                })}
                <tr className="sticky bottom-0 bg-gold-500/10 shadow-[0_-4px_12px_rgba(15,23,42,0.06)] backdrop-blur">
                  <td className="td-cell font-bold text-navy-900">Monthly Total</td>
                  <td className="td-cell num font-bold text-navy-900">{recruitTotals.walkins}</td>
                  <td className="td-cell num font-bold text-navy-900">{recruitTotals.interviews}</td>
                  <td className="td-cell num font-bold text-emerald-700">{recruitTotals.selected}</td>
                  <td className="td-cell num font-bold text-rose-700">{recruitTotals.rejected}</td>
                  <td className="td-cell num font-bold text-navy-900">{recruitTotals.joined}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card animate-fade-up overflow-hidden" style={{ animationDelay: '140ms' }}>
          <div className="flex items-center justify-between border-b border-line bg-canvas/60 px-5 py-3.5">
            <p className="text-xs font-bold text-navy-900">Department-Wise Onboarding & Attrition — {month}</p>
            <span className="text-[11px] font-semibold text-rose-600">{deptTotals.left} exits this month</span>
          </div>
          <div className="max-h-[560px] overflow-auto">
            <table className="w-full min-w-[760px]">
              <thead className="sticky top-0 z-10 bg-navy-900 text-white shadow-card">
                <tr>
                  {['Date', 'Collections', 'Customer Support', 'vKYC', 'Tele-Sales', 'Miscellaneous', 'Total', 'LEFT'].map((h) => (
                    <th
                      key={h}
                      className={`px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider ${h === 'LEFT' ? 'text-rose-300' : 'text-gold-400'}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/70">
                {DEPT_REPORT.map((r, i) => {
                  const active = deptTotal(r) + r.left > 0;
                  return (
                    <tr key={r.date} className={i % 2 ? 'bg-canvas/50' : ''}>
                      <td className={`td-cell num font-semibold ${active ? 'text-navy-900' : 'text-slate-400'}`}>{r.date}</td>
                      <td className="td-cell num">{active ? r.collections : '—'}</td>
                      <td className="td-cell num">{active ? r.cs : '—'}</td>
                      <td className="td-cell num">{active ? r.vkyc : '—'}</td>
                      <td className="td-cell num">{active ? r.telesales : '—'}</td>
                      <td className="td-cell num">{active ? r.misc : '—'}</td>
                      <td className="td-cell num font-bold text-navy-900">{active ? deptTotal(r) : '—'}</td>
                      <td className="td-cell">
                        {r.left > 0 ? (
                          <span className="badge bg-rose-50 text-rose-700 ring-1 ring-rose-200">{r.left} left</span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr className="sticky bottom-0 bg-gold-500/10 shadow-[0_-4px_12px_rgba(15,23,42,0.06)] backdrop-blur">
                  <td className="td-cell font-bold text-navy-900">Monthly Total</td>
                  <td className="td-cell num font-bold">{deptTotals.collections}</td>
                  <td className="td-cell num font-bold">{deptTotals.cs}</td>
                  <td className="td-cell num font-bold">{deptTotals.vkyc}</td>
                  <td className="td-cell num font-bold">{deptTotals.telesales}</td>
                  <td className="td-cell num font-bold">{deptTotals.misc}</td>
                  <td className="td-cell num font-extrabold text-navy-900">
                    {deptTotals.collections + deptTotals.cs + deptTotals.vkyc + deptTotals.telesales + deptTotals.misc}
                  </td>
                  <td className="td-cell">
                    <span className="badge bg-rose-100 text-rose-700 ring-1 ring-rose-200">{deptTotals.left} left</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="flex items-center gap-2 text-[11px] text-slate-400">
        <Download className="h-3.5 w-3.5" />
        Exports include the highlighted monthly total row and open directly in Excel or Google Sheets.
      </p>
    </div>
  );
}
