import { useCityClock } from '../hooks/useCityClock';

export function LocalTimeBlock({ localTime }) {
  const now = useCityClock(localTime?.iso);

  if (!localTime || !localTime.iso || !now) return null;

  const timeStr = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = now.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="mb-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-sm flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-600 text-amber-400 text-lg">
        ⏰
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400">
          Местное время города
        </div>
        <div className="text-lg font-semibold leading-tight">
          {timeStr}
        </div>
        <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
          {dateStr}
          {localTime.timezone && ` • ${localTime.timezone}`}
        </div>
      </div>
    </div>
  );
}