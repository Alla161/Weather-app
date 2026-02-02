import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { SkeletonCard } from './SkeletonCard';
import { WEATHER_CODE_LABELS_RU, WEATHER_CODE_LABELS_EN } from '../confing/keyConst';
import { getWeatherBackgroundByCode, getWeatherIconByCode } from '../utils/getWeatherIcon';
import { ErrorCard } from './ErrorCard';
import { useTranslation } from 'react-i18next';

export function OpenWeather({ location, units, onTimeUpdate }) {
  const { t, i18n } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: location.lat,
          longitude: location.lon,
          timezone: 'auto',
          current: 'temperature_2m,wind_speed_10m,weather_code',
        },
      });

      const current = res.data.current;
      const timezone = res.data.timezone;

      if (!current) {
        setError(t('currentWeatherNoData'));
        return;
      }

      setWeather({
        name: location.label || t('currentLocationName'),
        temp: current.temperature_2m,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
      });

      if (onTimeUpdate && current.time) {
        onTimeUpdate({
          iso: current.time,
          timezone,
        });
      }
    } catch (err) {
      setError(t('currentWeatherError'));
    } finally {
      setLoading(false);
    }
  }, [location, onTimeUpdate, t]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  if (!location) {
    return (
      <p className="text-sm text-slate-600 dark:text-slate-300">
        {t('currentWeatherPrompt')}
      </p>
    );
  }

  if (loading) {
    return <SkeletonCard lines={4} />;
  }

  if (error) {
    return <ErrorCard message={error} onRetry={fetchWeather} />;
  }

  if (!weather) return null;

  const isEn = i18n.language?.startsWith('en');
  const labelsMap = isEn ? WEATHER_CODE_LABELS_EN : WEATHER_CODE_LABELS_RU;

  const desc =
    labelsMap[weather.weatherCode] || t('currentWeatherGenericLabel');

  const bgClass = getWeatherBackgroundByCode
    ? getWeatherBackgroundByCode(weather.weatherCode)
    : 'bg-slate-200 dark:bg-slate-700';

  const iconEmoji = getWeatherIconByCode
    ? getWeatherIconByCode(weather.weatherCode)
    : '🌡️';

  const tempValue =
    units === 'metric' ? weather.temp : weather.temp * 1.8 + 32;

  const windValue =
    units === 'metric' ? weather.windSpeed : weather.windSpeed * 2.23694;

  const tempUnitLabel = units === 'metric' ? 'C' : 'F';
  const windUnitLabel =
    units === 'metric'
      ? isEn
        ? 'm/s'
        : 'м/с'
      : 'mph';

  return (
    <div
      className={`
        mt-2 p-4 rounded-xl shadow-inner ${bgClass}
        text-slate-900 dark:text-slate-100
        border border-slate-200 dark:border-slate-600
        transition-transform transition-shadow duration-200
        hover:-translate-y-0.5 hover:shadow-lg
      `}
    >
      <div className="flex items-center gap-3">
        <div>
          <div className="text-xl font-semibold">
            {weather.name}
          </div>
          <div className="text-4xl font-bold">
            {Math.round(tempValue)}°{tempUnitLabel}
          </div>
          <div className="capitalize text-sm text-slate-700 dark:text-slate-200">
            {desc}
          </div>
        </div>

        <div className="w-16 h-16 flex items-center justify-center text-3xl">
          {iconEmoji}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-sm opacity-90">
        <div>
          <span className="font-semibold">
            {t('currentWeatherWindLabel')}{' '}
          </span>
          {Math.round(windValue)} {windUnitLabel}
        </div>
      </div>
    </div>
  );
}