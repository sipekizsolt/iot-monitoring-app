import type { Sensor } from '../types/sensor';
import { API_BASE_URL } from './config';

export async function fetchSensors(): Promise<Sensor[]> {
  const response = await fetch(`${API_BASE_URL}/sensors`);
  if (!response.ok) {
    throw new Error(`Failed to fetch sensors: ${response.status}`);
  }
  return response.json();
}