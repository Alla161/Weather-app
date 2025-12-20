import { useState, useEffect } from 'react';

const HISTORY_KEY = 'weather_history';

export function useLocationHistory() {
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      
    }
  }, [history]);

  const addToHistory = (location) => {
    setHistory((prev) => {
      const withoutDup = prev.filter(
        (item) =>
          !(
            item.lat === location.lat &&
            item.lon === location.lon &&
            item.label === location.label
          )
      );
      return [location, ...withoutDup].slice(0, 5);
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      
    }
  };

  return { history, addToHistory, clearHistory };
}