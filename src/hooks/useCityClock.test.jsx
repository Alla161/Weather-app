import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useCityClock } from './useCityClock';

describe('useCityClock', () => {
  it('инициализируется датой из initialIso', () => {
    const iso = '2026-01-06T12:00:00';
    const { result } = renderHook(() => useCityClock(iso));

    expect(result.current).not.toBeNull();
    expect(result.current instanceof Date).toBe(true);
    expect(result.current.toISOString().startsWith('2026-01-06T12:00')).toBe(
      true
    );
  });

  it('увеличивает время на 1 минуту по истечении интервала', () => {
    vi.useFakeTimers();

    const iso = '2026-01-06T12:00:00';
    const { result } = renderHook(() => useCityClock(iso));

    const first = result.current;
    expect(first).not.toBeNull();
    expect(first instanceof Date).toBe(true);

    act(() => {
      vi.advanceTimersByTime(60 * 1000); // 1 минута
    });

    const second = result.current;
    expect(second).not.toBeNull();
    expect(second instanceof Date).toBe(true);

    expect(second.getTime() - first.getTime()).toBe(60 * 1000);

    vi.useRealTimers();
  });
});