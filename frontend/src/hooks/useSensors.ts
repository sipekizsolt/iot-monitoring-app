import { useEffect, useState } from 'react';
import type { Sensor } from '../types/sensor';
import { fetchSensors } from '../api/sensorsApi';

interface UseSensorsResult {
  sensors: Sensor[];
  loading: boolean;
  error: string | null;
}

export function useSensors(): UseSensorsResult {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchSensors()
      .then((data) => {
        if (!cancelled) setSensors(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { sensors, loading, error };
}