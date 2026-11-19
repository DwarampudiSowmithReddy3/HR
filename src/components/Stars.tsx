import { Star, StarHalf } from 'lucide-react';

export function Stars({
  value,
  onChange,
  size = 'md',
}: {
  value: number | null;
  onChange?: (n: number) => void;
  size?: 'sm' | 'md';
}) {
  const cls = size === 'sm' ? 'h-4 w-4' : 'h-7 w-7';
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = (value ?? 0) >= n;
        const half = (value ?? 0) === n - 0.5;
        const interactive = !!onChange;
        return (
          <span key={n} className="relative">
            {filled ? (
              <Star className={`${cls} fill-gold-500 text-gold-500 transition-transform duration-150 ${interactive ? 'hover:scale-110' : ''}`} />
            ) : half ? (
              <StarHalf className={`${cls} fill-gold-500 text-gold-500`} />
            ) : (
              <Star className={`${cls} text-slate-300 transition-colors ${interactive ? 'hover:text-gold-400' : ''}`} />
            )}
            {interactive && (
              <>
                <button
                  aria-label={`${n - 0.5} stars`}
                  onClick={() => onChange(n - 0.5)}
                  className="absolute inset-y-0 left-0 w-1/2 rounded-l focus:outline-none"
                />
                <button
                  aria-label={`${n} stars`}
                  onClick={() => onChange(n)}
                  className="absolute inset-y-0 right-0 w-1/2 rounded-r focus:outline-none"
                />
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}
