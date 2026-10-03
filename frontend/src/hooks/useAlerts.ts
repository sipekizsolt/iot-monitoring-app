import { useEffect, useState } from 'react';
import type { Alert } from '../types/alert';
import { fetchAlerts } from '../api/alertsApi';

const POLL_INTERVAL_MS = 5000;

interface UseAlertsResult {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
}

export function useAlerts(): UseAlertsResult {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = () => {
      fetchAlerts()
        .then((data) => {
          if (cancelled) return;
          const sorted = [...data].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setAlerts(sorted);
          setError(null);
        })
        .catch((err) => {
          if (!cancelled) setError(err.message);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    };

    load();
    const intervalId = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  return { alerts, loading, error };
}