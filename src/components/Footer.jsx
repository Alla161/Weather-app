import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-slate-950/90 border-t border-slate-800 mt-6">
      <div className="max-w-md mx-auto px-4 py-3 text-[11px] text-slate-500 flex items-center justify-between">
        <span>© {new Date().getFullYear()} WeatherNow</span>
        <span>{t('footerDataSource')}</span>
      </div>
    </footer>
  );
}