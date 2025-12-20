import { useState, useEffect } from 'react';
import { OpenWeather } from './components/OpenWeather';
import { WeatherForecast } from './components/WeatherForecast';
import { History } from './components/History';
import { CitySearch } from './components/CitySearch';
import { AirQuality } from './components/AirQuality';
import { HourlyForecast } from './components/HourlyForecast';
import { Favorites } from './components/selectedLocation';
import { useLocationHistory } from './hooks/useLocationHistory';


function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [units, setUnits] = useState('metric');

  const { history, addToHistory, clearHistory } = useLocationHistory();

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
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center px-3 sm:px-0">
      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-slate-700/60">
        <div className="animate-[fadeInUp_0.35s_ease-out]">
          <h1 className="text-2xl font-bold mb-1 text-center flex items-center justify-center gap-2">
            <span>Погода</span>
            <span className="text-amber-300 text-2xl">🌤️</span>
          </h1>

          {selectedLocation && (
            <p className="text-xs text-slate-300 text-center">
              {selectedLocation.label}
            </p>
          )}

          <p className="text-[11px] text-slate-400 text-center mb-2">
            Обновлено: {nowLabel}
          </p>

          <div className="flex justify-center gap-2 mb-4">
            <button
              className={`px-2 py-1 text-xs rounded-full border ${
                units === 'metric'
                  ? 'bg-amber-400 text-slate-900 border-amber-400'
                  : 'border-slate-500 text-slate-300'
              }`}
              onClick={() => setUnits('metric')}
            >
              °C, м/с
            </button>
            <button
              className={`px-2 py-1 text-xs rounded-full border ${
                units === 'imperial'
                  ? 'bg-amber-400 text-slate-900 border-amber-400'
                  : 'border-slate-500 text-slate-300'
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

          <OpenWeather location={selectedLocation} units={units} />
          <HourlyForecast location={selectedLocation} units={units} />
          <WeatherForecast location={selectedLocation} units={units} />
          <AirQuality location={selectedLocation} />
        </div>
      </div>
    </div>
  );
}

export default App;