export function getWeatherBackgroundByCode(code) {
  if (code === 0) return 'bg-gradient-to-br from-sky-500/80 to-sky-700';
  if (code >= 1 && code <= 3) return 'bg-gradient-to-br from-slate-500/80 to-slate-800';
  if (code === 45 || code === 48) return 'bg-gradient-to-br from-slate-600/80 to-slate-900';
  if (code >= 51 && code <= 67) return 'bg-gradient-to-br from-sky-600/80 to-slate-800';
  if (code >= 71 && code <= 77) return 'bg-gradient-to-br from-sky-200/80 to-slate-500';
  if (code >= 80 && code <= 82) return 'bg-gradient-to-br from-sky-700/80 to-slate-900';
  if (code >= 95 && code <= 99) return 'bg-gradient-to-br from-purple-700/80 to-slate-900';
  return 'bg-slate-700';
}

export function getWeatherIconByCode(code) {
  if (code === 0) return '☀️';
  if (code >= 1 && code <= 3) return '⛅';
  if (code === 45 || code === 48) return '🌫️';
  if (code >= 51 && code <= 67) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 80 && code <= 82) return '🌦️';
  if (code >= 95 && code <= 99) return '⛈️';
  return '🌡️';
}