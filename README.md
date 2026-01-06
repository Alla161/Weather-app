# WeatherNow — прогноз погоды по городам

Одностраничное веб‑приложение прогноза погоды: текущие условия, почасовой и дневной прогноз, качество воздуха и местное время для любых городов. [web:100][web:104]

## Демо

- GitHub Pages: https://Alla161.github.io/Weather-app

## Стек

- **Frontend:** React, Vite, JavaScript (ES6+)
- **Стили:** Tailwind CSS (light/dark тема)
- **HTTP:** axios
- **Тесты:** Vitest, @testing-library/react, @testing-library/jest-dom
- **API:** Open‑Meteo, OpenWeather (air pollution API) [web:100][web:107]

## Основные возможности

- Поиск города и отображение:
  - текущей температуры, состояния, ветра;
  - почасового прогноза на 24 часа;
  - прогноза на несколько дней.
- Блок «местное время» с тикающими часами по данным API (кастомный хук `useCityClock`).
- Качество воздуха (AQI) и ключевые показатели (PM2.5, PM10, NO₂, O₃, SO₂, CO).
- История запросов и избранные города с сохранением в `localStorage`.
- Переключатель единиц измерения (°C/м/с ↔ °F/mph).
- Переключатель светлой/тёмной темы с сохранением выбора пользователя. [web:100][web:107]

## Локальный запуск

```bash
git clone https://github.com/Alla161/Weather-app.git
cd Weather-app
npm install

# режим разработки
npm run dev

# продакшн-сборка
npm run build
npm run preview

Тестирование
npm test

Структура проекта
src/
  App.jsx
  main.jsx
  index.css
  components/
    Header.jsx
    Footer.jsx
    CitySearch.jsx
    Favorites.jsx
    History.jsx
    OpenWeather.jsx
    HourlyForecast.jsx
    WeatherForecast.jsx
    AirQuality.jsx
    LocalTimeBlock.jsx
    SkeletonCard.jsx
  hooks/
    useTheme.js
    useCityClock.js
    useLocationHistory.js
  utils/
    getWeatherIconByCode.js
    getWeatherBackgroundByCode.js