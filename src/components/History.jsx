export function History({ items, onSelect, onClear, activeLocation }) {
  if (!items.length) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-600 dark:text-slate-300">
          Недавние запросы:
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          Очистить
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive =
            activeLocation &&
            activeLocation.lat === item.lat &&
            activeLocation.lon === item.lon;

          return (
            <button
              key={`${item.lat}-${item.lon}-${item.label}`}
              type="button"
              onClick={() => onSelect(item)}
              className={
                'text-xs px-2 py-1 rounded-full border transition-colors ' +
                (isActive
                  ? 'bg-sky-500 border-sky-400 text-white'
                  : 'bg-slate-200 border-slate-300 text-slate-800 hover:bg-slate-300 hover:border-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600')
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}