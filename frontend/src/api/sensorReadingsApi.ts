import type { SensorReadingInput } from '../types/sensorReading';

export async function submitSensorReading(reading: SensorReadingInput): Promise<void> {
  const response = await fetch('/sensor-readings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reading),
  });
  if (!response.ok) {
    throw new Error(`Failed to submit reading: ${response.status}`);
  }
}