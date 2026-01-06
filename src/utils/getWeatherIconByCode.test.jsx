import { describe, it, expect } from 'vitest';
import { getWeatherIconByCode } from './getWeatherIcon';

describe('getWeatherIconByCode', () => {
  it('возвращает солнце для ясного неба (код 0)', () => {
    expect(getWeatherIconByCode(0)).toBe('☀️');
  });

  it('возвращает облачко/переменную облачность для кодов 1–3', () => {
    expect(getWeatherIconByCode(1)).toBe('⛅');
    expect(getWeatherIconByCode(2)).toBe('⛅');
    expect(getWeatherIconByCode(3)).toBe('⛅');
  });

  it('возвращает дождь для мороси и дождя', () => {
    expect(getWeatherIconByCode(51)).toBe('🌧️');
    expect(getWeatherIconByCode(61)).toBe('🌧️');
  });

  it('возвращает иконку по умолчанию для неизвестного кода', () => {
    expect(getWeatherIconByCode(999)).toBe('🌡️');
  });
});