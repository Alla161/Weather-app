import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FAVORITES_KEY = 'weather_favorites';

export function Favorites({ selectedLocation, onSelect }) {
  const { t } = useTranslation();

  const [favorites, setFavorites] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      
    }
  }, [favorites]);

  const toggleFavorite = () => {
    if (!selectedLocation) return;

    setFavorites((prev) => {
      const exists = prev.some(
        (item) =>
          item.lat === selectedLocation.lat &&
          item.lon === selectedLocation.lon &&
          item.label === selectedLocation.label,
      );

      if (exists) {
        return prev.filter(
          (item) =>
            !(
              item.lat === selectedLocation.lat &&
              item.lon === selectedLocation.lon &&
              item.label === selectedLocation.label
            ),
        );
      }

      return [selectedLocation, ...prev].slice(0, 5);
    });
  };

  const isCurrentFavorite =
    !!selectedLocation &&
    favorites.some(
      (item) =>
        item.lat === selectedLocation.lat &&
        item.lon === selectedLocation.lon &&
        item.label === selectedLocation.label,
    );

  return (
    <div className="mb-3">
      {selectedLocation && (
        <div className="flex justify-center mb-2">
          <button
            className="px-3 py-1 text-xs rounded-full border border-slate-300 dark:border-slate-500 text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
            onClick={toggleFavorite}
          >
            {isCurrentFavorite
              ? t('favoritesRemove')
              : t('favoritesAdd')}
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <>
          <h2 className="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400 mb-1">
            {t('favoritesTitle')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {favorites.map((item) => (
              <button
                key={`${item.lat}-${item.lon}-fav`}
                className={`
                  px-2 py-1 text-xs rounded-full border transition-colors
                  ${
                    selectedLocation &&
                    item.lat === selectedLocation.lat &&
                    item.lon === selectedLocation.lon
                      ? 'bg-amber-400 text-slate-900 border-amber-400'
                      : 'bg-slate-200 border-slate-300 text-slate-800 hover:bg-slate-300 hover:border-slate-400 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600'
                  }
                `}
                onClick={() => onSelect(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}