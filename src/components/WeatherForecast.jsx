import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { SkeletonCard } from './SkeletonCard';
import { WEATHER_CODE_LABELS } from '../confing/keyConst';
import { getWeatherBackgroundByCode, getWeatherIconByCode } from '../utils/getWeatherIcon';
import { ErrorCard } from './ErrorCard';

export function WeatherForecast({ location, units }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchForecast = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError('');
    setItems([]);

    try {
      const res = await axios.get(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude: location.lat,
            longitude: location.lon,
            timezone: 'auto',
            daily: 'temperature_2m_max,temperature_2m_min,weathercode',
          },
        }
      );

      const daily = res.data.daily;

      if (!daily || !daily.time || !daily.temperature_2m_max) {
        setError('Нет данных прогноза');
        return;
      }

      const days = daily.time.map((dateStr, index) => ({
        date: dateStr,
        temp_max: daily.temperature_2m_max[index],
        temp_min: daily.temperature_2m_min[index],
        weathercode: daily.weathercode[index],
      }));

      setItems(days.slice(0, 5));
    } catch (err) {
      setError('Не удалось загрузить прогноз');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  if (!location) return null;

  if (loading) {
    return <SkeletonCard lines={4} />;
  }

  if (error) {
    return (
      <ErrorCard
        message={error}
        onRetry={fetchForecast}
      />
    );
  }

  if (!items.length) return null;

  const tempUnitLabel = units === 'metric' ? 'C' : 'F';

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
        Прогноз на несколько дней
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const date = new Date(item.date);
          const day = date.toLocaleDateString('ru-RU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          });

          const label =
            WEATHER_CODE_LABELS[item.weathercode] || 'Погода';

          const iconEmoji = getWeatherIconByCode
            ? getWeatherIconByCode(item.weathercode)
            : '🌡️';

          const bgClass = getWeatherBackgroundByCode
            ? getWeatherBackgroundByCode(item.weathercode)
            : 'bg-slate-200 dark:bg-slate-700';

          const tempMax =
            units === 'metric'
              ? item.temp_max
              : item.temp_max * 1.8 + 32;

          const tempMin =
            units === 'metric'
              ? item.temp_min
              : item.temp_min * 1.8 + 32;

          return (
            <div
              key={item.date}
              className={`
                ${bgClass}
                rounded-lg p-3 flex flex-col items-center text-center
                text-slate-900 dark:text-slate-100
                border border-slate-200 dark:border-slate-600
                transition-transform transition-shadow duration-200
                hover:-translate-y-0.5 hover:shadow-md
              `}
            >
              <div className="text-sm mb-1 text-slate-700 dark:text-slate-200">
                {day}
              </div>
              <div className="text-2xl mb-1">
                {iconEmoji}
              </div>
              <div className="text-xs capitalize mb-1 text-slate-700 dark:text-slate-200">
                {label}
              </div>
              <div className="text-lg font-semibold">
                {Math.round(tempMax)}°{tempUnitLabel}
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-200">
                Мин: {Math.round(tempMin)}°{tempUnitLabel}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}