import type { Sensor } from '../types/sensor';

export async function fetchSensors(): Promise<Sensor[]> {
  const response = await fetch('/sensors');
  if (!response.ok) {
    throw new Error(`Failed to fetch sensors: ${response.status}`);
  }
  return response.json();
}