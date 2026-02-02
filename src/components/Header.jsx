import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const isDark = theme === 'dark';
  const currentLang = i18n.language || 'ru';

  const handleChangeLang = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('weathernow_lang', lng);
  };

  return (
    <header className="w-full bg-slate-950/90 border-b border-slate-800 dark:bg-slate-900/90 dark:border-slate-700">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-100 tracking-wide dark:text-slate-50">
            {t('appName')}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-400">
            {t('appTagline')}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* переключатель языка */}
          <div className="flex items-center gap-1 rounded-full bg-slate-900/80 px-1 py-1 border border-slate-700">
            <button
              type="button"
              onClick={() => handleChangeLang('ru')}
              className={
                'px-2 py-0.5 text-[11px] rounded-full ' +
                (currentLang.startsWith('ru')
                  ? 'bg-amber-400 text-slate-900 font-semibold'
                  : 'text-slate-300')
              }
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => handleChangeLang('en')}
              className={
                'px-2 py-0.5 text-[11px] rounded-full ' +
                (currentLang.startsWith('en')
                  ? 'bg-amber-400 text-slate-900 font-semibold'
                  : 'text-slate-300')
              }
            >
              EN
            </button>
          </div>

          {/* переключатель темы */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <span>{isDark ? '🌙' : '☀️'}</span>
            <span>{isDark ? t('darkThemeLabel') ?? 'Dark' : t('lightThemeLabel') ?? 'Light'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
