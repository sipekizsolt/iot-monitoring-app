import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchSensors } from './sensorsApi';

describe('fetchSensors', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns sensors on success', async () => {
    const mockData = [{ id: '1', name: 'Temp Sensor', type: 'TEMPERATURE' }];
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    }) as unknown as typeof fetch;

    const result = await fetchSensors();
    expect(result).toEqual(mockData);
  });

  it('throws on failed response', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    }) as unknown as typeof fetch;

    await expect(fetchSensors()).rejects.toThrow('Failed to fetch sensors: 500');
  });
});