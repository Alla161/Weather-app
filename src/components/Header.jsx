import { useTheme } from '../hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <header className="w-full bg-slate-950/90 border-b border-slate-800 dark:bg-slate-900/90 dark:border-slate-700">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-slate-100 tracking-wide dark:text-slate-50">
            WeatherNow
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-400">
            Онлайн-приложение: текущая погода, прогноз и местное время
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition"
          aria-label="Переключатель темы"
        >
          <span>{isDark ? '🌙' : '☀️'}</span>
          <span>{isDark ? 'Тёмная' : 'Светлая'}</span>
        </button>
      </div>
    </header>
  );
}