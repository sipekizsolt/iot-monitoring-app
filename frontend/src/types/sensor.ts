export type SensorType = 'TEMPERATURE' | 'HUMIDITY' | 'ATMOSPHERIC_PRESSURE';

export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
}