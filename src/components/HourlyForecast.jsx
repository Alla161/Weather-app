import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { SkeletonCard } from './SkeletonCard';
import { WEATHER_CODE_LABELS_RU, WEATHER_CODE_LABELS_EN } from '../confing/keyConst';
import {
  getWeatherBackgroundByCode,
  getWeatherIconByCode,
} from '../utils/getWeatherIcon';
import { ErrorCard } from './ErrorCard';
import { useTranslation } from 'react-i18next';


export function HourlyForecast({ location, units }) {
  const { t, i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHourly = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError('');
    setItems([]);

    try {
      const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: location.lat,
          longitude: location.lon,
          timezone: 'auto',
          hourly: 'temperature_2m,weathercode',
        },
      });

      const hourly = res.data.hourly;

      if (
        !hourly ||
        !hourly.time ||
        !hourly.temperature_2m ||
        !hourly.weathercode
      ) {
        setError(t('hourlyNoData'));
        return;
      }

      const now = Date.now();

      const hours = hourly.time.map((timeStr, index) => {
        const tDate = new Date(timeStr);
        return {
          time: tDate,
          temp: hourly.temperature_2m[index],
          weathercode: hourly.weathercode[index],
          diffMs: tDate.getTime() - now,
        };
      });

      const next24 = hours
        .filter((h) => h.diffMs >= 0)
        .sort((a, b) => a.diffMs - b.diffMs)
        .slice(0, 24);

      setItems(next24);
    } catch (err) {
      setError(t('hourlyError'));
    } finally {
      setLoading(false);
    }
  }, [location, t]);

  useEffect(() => {
    fetchHourly();
  }, [fetchHourly]);

  if (!location) return null;

  if (loading) {
    return <SkeletonCard lines={3} />;
  }

  if (error) {
    return <ErrorCard message={error} onRetry={fetchHourly} />;
  }

  if (!items.length) return null;

  const tempUnitLabel = units === 'metric' ? 'C' : 'F';
  const locale = i18n.language?.startsWith('en') ? 'en-US' : 'ru-RU';
  const isEn = i18n.language?.startsWith('en');
  const labelsMap = isEn ? WEATHER_CODE_LABELS_EN : WEATHER_CODE_LABELS_RU;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">
        {t('hourlyTitle')}
      </h2>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {items.map((item) => {
          const hourLabel = item.time.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
          });

          const label =
            labelsMap[item.weathercode] || t('hourlyGenericLabel');

          const iconEmoji = getWeatherIconByCode
            ? getWeatherIconByCode(item.weathercode)
            : '🌡️';

          const bgClass = getWeatherBackgroundByCode
            ? getWeatherBackgroundByCode(item.weathercode)
            : 'bg-slate-200 dark:bg-slate-700';

          const tempValue =
            units === 'metric'
              ? item.temp
              : item.temp * 1.8 + 32;

          return (
            <div
              key={item.time.toISOString()}
              className={`
                ${bgClass}
                rounded-lg p-3 flex flex-col items-center text-center
                text-slate-900 dark:text-slate-100
                border border-slate-200 dark:border-slate-600
                transition-transform transition-shadow duration-200
                hover:-translate-y-0.5 hover:shadow-md
              `}
            >
              <div className="text-[11px] mb-1 text-slate-700 dark:text-slate-200">
                {hourLabel}
              </div>
              <div className="text-xl mb-1">
                {iconEmoji}
              </div>
              <div className="font-semibold mb-1">
                {Math.round(tempValue)}°{tempUnitLabel}
              </div>
              <div className="text-[10px] text-slate-700 dark:text-slate-200">
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}