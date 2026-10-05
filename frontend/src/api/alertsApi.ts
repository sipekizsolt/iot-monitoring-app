import type { Alert } from '../types/alert';
import { API_BASE_URL } from './config';

export async function fetchAlerts(): Promise<Alert[]> {
  const response = await fetch(`${API_BASE_URL}/alerts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch alerts: ${response.status}`);
  }
  return response.json();
}