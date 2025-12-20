export function History({ items, onSelect, onClear, activeLocation }) {
  if (!items.length) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-300">Недавние запросы:</div>
        <button
          type="button"
          onClick={onClear}
          className="text-[10px] text-slate-400 hover:text-slate-200"
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
                'text-xs px-2 py-1 rounded-full border ' +
                (isActive
                  ? 'bg-sky-500 border-sky-400 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600')
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