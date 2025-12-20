import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'weather_favorites';

export function Favorites({ selectedLocation, onSelect }) {
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
          item.label === selectedLocation.label
      );

      if (exists) {
        return prev.filter(
          (item) =>
            !(
              item.lat === selectedLocation.lat &&
              item.lon === selectedLocation.lon &&
              item.label === selectedLocation.label
            )
        );
      }

      return [selectedLocation, ...prev].slice(0, 5);
    });
  };

  const isCurrentFavorite = !!selectedLocation && favorites.some(
    (item) =>
      item.lat === selectedLocation.lat &&
      item.lon === selectedLocation.lon &&
      item.label === selectedLocation.label
  );

  return (
    <div className="mb-3">
      {selectedLocation && (
        <div className="flex justify-center mb-2">
          <button
            className="px-3 py-1 text-xs rounded-full border border-slate-500 text-slate-200 hover:bg-slate-700"
            onClick={toggleFavorite}
          >
            {isCurrentFavorite ? 'Убрать из избранного' : 'В избранное'}
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <>
          <h2 className="text-xs uppercase tracking-wide text-slate-400 mb-1">
            Избранные города
          </h2>
          <div className="flex flex-wrap gap-2">
            {favorites.map((item) => (
              <button
                key={`${item.lat}-${item.lon}-fav`}
                className={`
                  px-2 py-1 text-xs rounded-full border
                  ${
                    selectedLocation &&
                    item.lat === selectedLocation.lat &&
                    item.lon === selectedLocation.lon
                      ? 'bg-amber-400 text-slate-900 border-amber-400'
                      : 'border-slate-600 text-slate-200 hover:bg-slate-700'
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