# Weather Dashboard

Небольшое, но функциональное приложение-панель погоды на React: текущая погода, почасовой прогноз, прогноз на несколько дней и качество воздуха для выбранного города.

## Функционал

- Поиск города и выбор локации по подсказкам.
- Текущая погода с иконкой, описанием и скоростью ветра.
- Почасовой прогноз на 24 часа.
- Прогноз на несколько дней.
- Качество воздуха (AQI и основные загрязнители).
- История последних запросов (выбор города в один клик).
- Избранные города (закрепление важных локаций).
- Переключатель единиц измерения: °C/м/с и °F/mph.
- Адаптивный интерфейс с Tailwind CSS и плавными анимациями.

## Технологии

- React (функциональные компоненты, хуки).
- Tailwind CSS.
- Axios для работы с HTTP-запросами.
- Open-Meteo API (текущая погода, почасовой и дневной прогноз).
- OpenWeather Air Pollution API (качество воздуха).
- LocalStorage для истории и избранных городов.

## Запуск локально
установка зависимостей
npm install

запуск dev-сервера
npm start

Создай файл `.env` в корне проекта и добавь туда ключи API (пример):

REACT_APP_OPEN_WEATHER_API_KEY=твой_ключ
REACT_APP_OPEN_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5

## Структура проекта (основное)

- `src/App.jsx` — главный компонент приложения.
- `src/components/CitySearch.jsx` — поиск города и выбор локации.
- `src/components/OpenWeather.jsx` — блок текущей погоды.
- `src/components/HourlyForecast.jsx` — почасовой прогноз.
- `src/components/WeatherForecast.jsx` — прогноз на несколько дней.
- `src/components/AirQuality.jsx` — качество воздуха.
- `src/components/History.jsx` — история последних городов.
- `src/components/Favorites.jsx` — избранные города.
- `src/components/SkeletonCard.jsx` — скелетоны загрузки.
- `src/hooks/useLocationHistory.js` — кастомный хук для истории.
- `src/confing/keyConst.js` — константы и ключи.

## Деплой

Приложение можно задеплоить, например, на Vercel или Netlify.  
После деплоя добавь сюда ссылку:

> Live demo: `https://your-app-name.vercel.app`