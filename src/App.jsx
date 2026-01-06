import { useState, useEffect } from 'react';
import { OpenWeather } from './components/OpenWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { History } from './components/History';
import { CitySearch } from './components/CitySearch';
import { AirQuality } from './components/AirQuality';
import { HourlyForecast } from './components/HourlyForecast';
import { Favorites } from './components/selectedLocation';
import { useLocationHistory } from './hooks/useLocationHistory';
import { LocalTimeBlock } from './components/LocalTimeBlock';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';



function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [units, setUnits] = useState('metric');
  const [localTime, setLocalTime] = useState(() => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem('weather_localTime');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
});

useEffect(() => {
  if (!localTime) return;
  try {
    window.localStorage.setItem('weather_localTime', JSON.stringify(localTime));
  } catch {
    
  }
}, [localTime]);

  const { history, addToHistory, clearHistory } = useLocationHistory();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (history.length > 0 && !selectedLocation) {
      setSelectedLocation(history[0]);
    }
  }, [history, selectedLocation]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    addToHistory(location);
  };

  const handleHistoryClick = (location) => {
    setSelectedLocation(location);
  };

  const handleClearHistory = () => {
    clearHistory();
  };

  const now = new Date();
  const nowLabel = now.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={
        'min-h-screen flex flex-col ' +
        (isDark
          ? 'bg-slate-900 text-slate-100'
          : 'bg-slate-100 text-slate-900')
      }
    >
      <Header />

      <main className="flex-1 flex items-center justify-center px-3 sm:px-0">
        <div className="w-full max-w-md bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700/60">
          <div className="animate-[fadeInUp_0.35s_ease-out]">
            <h1 className="text-2xl font-bold mb-1 text-center flex items-center justify-center gap-2 text-slate-900 dark:text-slate-50">
              <span>Прогноз погоды по городам</span>
              <span className="text-amber-300 text-2xl">🌤️</span>
            </h1>

            {selectedLocation && (
              <p className="text-xs text-slate-600 dark:text-slate-300 text-center">
                Текущая погода и прогноз для города {selectedLocation.label}
              </p>
            )}

            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mb-1">
              Обновлено: {nowLabel}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mb-2">
              Почасовой и подробный прогноз на ближайшие дни.
            </p>

            <LocalTimeBlock localTime={localTime} />

            <div className="flex justify-center gap-2 mb-4">
              <button
                className={`px-2 py-1 text-xs rounded-full border ${
                  units === 'metric'
                    ? 'bg-amber-400 text-slate-900 border-amber-400'
                    : 'border-slate-400 text-slate-700 dark:border-slate-500 dark:text-slate-300'
                }`}
                onClick={() => setUnits('metric')}
              >
                °C, м/с
              </button>
              <button
                className={`px-2 py-1 text-xs rounded-full border ${
                  units === 'imperial'
                    ? 'bg-amber-400 text-slate-900 border-amber-400'
                    : 'border-slate-400 text-slate-700 dark:border-slate-500 dark:text-slate-300'
                }`}
                onClick={() => setUnits('imperial')}
              >
                °F, mph
              </button>
            </div>

            <CitySearch onSelect={handleSelectLocation} />

            <Favorites
              selectedLocation={selectedLocation}
              onSelect={setSelectedLocation}
            />

            <History
              items={history}
              onSelect={handleHistoryClick}
              onClear={handleClearHistory}
              activeLocation={selectedLocation}
            />

            <OpenWeather
              location={selectedLocation}
              units={units}
              onTimeUpdate={setLocalTime}
            />

            <HourlyForecast
              location={selectedLocation}
              units={units}
            />

            <WeatherForecast
              location={selectedLocation}
              units={units}
            />

            <AirQuality location={selectedLocation} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;