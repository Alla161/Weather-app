import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export function CitySearch({ onSelect }) {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (value) => {
    const trimmed = value.trim();
    setSearch(value);

    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        'https://geocoding-api.open-meteo.com/v1/search',
        {
          params: {
            name: trimmed,
            count: 5,
            language: i18n.language?.startsWith('en') ? 'en' : 'ru',
          },
        }
      );

      const results = res.data.results || [];

      setSuggestions(
        results.map((item) => ({
          name: item.name,
          country: item.country,
          state: item.admin1,
          lat: item.latitude,
          lon: item.longitude,
        }))
      );
    } catch (err) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  const handleSelect = (location) => {
    const label = `${location.name}${
      location.state ? ', ' + location.state : ''
    }, ${location.country}`;
    setSearch(label);
    setSuggestions([]);
    onSelect({ ...location, label });
  };

  return (
    <div className="mb-3">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-1">
        <input
          type="text"
          className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder={t('citySearchPlaceholder')}
          value={search}
          onChange={(e) => fetchSuggestions(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 font-semibold"
        >
          {t('citySearchButton')}
        </button>
      </form>

      {loading && (
        <div className="text-xs text-slate-300 mb-1">
          {t('citySearchLoading')}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="bg-slate-700 rounded-lg p-2 text-sm max-h-48 overflow-y-auto">
          {suggestions.map((item) => {
            const label = `${item.name}${
              item.state ? ', ' + item.state : ''
            }, ${item.country}`;
            return (
              <button
                key={`${item.lat}-${item.lon}-${label}`}
                type="button"
                onClick={() => handleSelect(item)}
                className="block w-full text-left px-2 py-1 rounded hover:bg-slate-600"
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}