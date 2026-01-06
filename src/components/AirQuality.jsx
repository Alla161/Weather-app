import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from '../confing/keyConst';
import { SkeletonCard } from '../components/SkeletonCard';
import { ErrorCard } from './ErrorCard';

function getAqiLabel(aqi) {
  switch (aqi) {
    case 1:
      return { text: 'Хорошее', color: 'text-emerald-500 dark:text-emerald-300' };
    case 2:
      return { text: 'Удовлетворительное', color: 'text-lime-500 dark:text-lime-300' };
    case 3:
      return { text: 'Умеренное', color: 'text-yellow-600 dark:text-yellow-300' };
    case 4:
      return { text: 'Плохое', color: 'text-orange-600 dark:text-orange-300' };
    case 5:
      return { text: 'Очень плохое', color: 'text-red-600 dark:text-red-300' };
    default:
      return { text: 'Нет данных', color: 'text-slate-600 dark:text-slate-300' };
  }
}

export function AirQuality({ location }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAir = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError('');
    setData(null);

    try {
      const res = await axios.get(
        `${OPEN_WEATHER_BASE_URL}/air_pollution`,
        {
          params: {
            lat: location.lat,
            lon: location.lon,
            appid: OPEN_WEATHER_API_KEY,
          },
        }
      );

      const list = res.data.list || [];
      setData(list[0] || null);
    } catch (err) {
      setError('Не удалось загрузить качество воздуха');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchAir();
  }, [fetchAir]);

  if (!location) return null;

  if (loading) {
    return <SkeletonCard lines={3} />;
  }

  if (error) {
    return (
      <ErrorCard
        message={error}
        onRetry={fetchAir}
      />
    );
  }

  if (!data) return null;

  const aqi = data.main.aqi;
  const aqiInfo = getAqiLabel(aqi);
  const c = data.components || {};

  return (
    <div className="mt-6 rounded-lg p-4 bg-slate-100 dark:bg-slate-700 transition-transform duration-150 hover:-translate-y-0.5 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100">
      <h2 className="text-lg font-semibold mb-1">
        Качество воздуха
      </h2>
      <div className="text-sm mb-2">
        Индекс AQI:{' '}
        <span className={`font-semibold ${aqiInfo.color}`}>
          {aqi} — {aqiInfo.text}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-slate-800 dark:text-slate-200">
        <div>
          <div className="font-semibold">PM2.5</div>
          <div>{c.pm2_5} µg/m³</div>
        </div>
        <div>
          <div className="font-semibold">PM10</div>
          <div>{c.pm10} µg/m³</div>
        </div>
        <div>
          <div className="font-semibold">NO₂</div>
          <div>{c.no2} µg/m³</div>
        </div>
        <div>
          <div className="font-semibold">O₃</div>
          <div>{c.o3} µg/m³</div>
        </div>
        <div>
          <div className="font-semibold">SO₂</div>
          <div>{c.so2} µg/m³</div>
        </div>
        <div>
          <div className="font-semibold">CO</div>
          <div>{c.co} µg/m³</div>
        </div>
      </div>
    </div>
  );
}