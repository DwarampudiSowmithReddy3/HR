import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, X } from 'lucide-react';

let pushToast: ((msg: string) => void) | null = null;
export const toast = (msg: string) => pushToast?.(msg);

export function ToastHost() {
  const [items, setItems] = useState<{ id: number; msg: string }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    pushToast = (msg: string) => {
      const id = ++idRef.current;
      setItems((p) => [...p, { id, msg }]);
      setTimeout(() => setItems((p) => p.filter((t) => t.id !== id)), 3400);
    };
    return () => {
      pushToast = null;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-24 md:bottom-8 left-1/2 z-[100] flex w-full max-w-md -translate-x-1/2 flex-col items-center gap-2 px-4">
      {items.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex w-full animate-slide-in-right items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lift"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
          <span className="text-sm font-medium text-navy-900">{t.msg}</span>
          <button
            onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))}
            className="ml-auto rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-navy-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function Sparkline({ points, className = '' }: { points: number[]; className?: string }) {
  const w = 96;
  const h = 32;
  const max = Math.max(...points, 1);
  const min = Math.min(...points);
  const span = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => `${(i * step).toFixed(1)},${(h - 4 - ((p - min) / span) * (h - 8)).toFixed(1)}`);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden>
      <polyline
        points={`0,${h} ${coords.join(' ')} ${w},${h}`}
        fill="currentColor"
        className="text-gold-500/10"
        stroke="none"
      />
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke="currentColor"
        className="text-gold-500"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Progress({ value, tone = 'gold' }: { value: number; tone?: 'gold' | 'emerald' | 'sky' }) {
  const tones = {
    gold: 'bg-gradient-to-r from-gold-600 to-gold-400',
    emerald: 'bg-gradient-to-r from-emerald-600 to-emerald-400',
    sky: 'bg-gradient-to-r from-sky-600 to-sky-400',
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full ${tones[tone]} transition-all duration-700 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div>
      <h2 className="text-base font-bold text-navy-900">{children}</h2>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return <p className="px-1 py-8 text-center text-sm text-slate-400">{children}</p>;
}
