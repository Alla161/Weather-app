import { useState, useEffect } from 'react';

export function useCityClock(initialIso) {
  const [now, setNow] = useState(() =>
    initialIso ? new Date(initialIso) : null
  );

  useEffect(() => {
    if (!initialIso) {
      setNow(null);
      return;
    }

    // базовое время из API
    setNow(new Date(initialIso));

    const interval = setInterval(() => {
      setNow((prev) =>
        prev ? new Date(prev.getTime() + 60 * 1000) : prev
      );
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [initialIso]);

  return now;
}