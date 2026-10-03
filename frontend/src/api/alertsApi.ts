import type { Alert } from '../types/alert';

export async function fetchAlerts(): Promise<Alert[]> {
  const response = await fetch('/alerts');
  if (!response.ok) {
    throw new Error(`Failed to fetch alerts: ${response.status}`);
  }
  return response.json();
}