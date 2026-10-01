import type { Sensor } from '../types/sensor';

interface SensorsTableProps {
  sensors: Sensor[];
}

export function SensorsTable({ sensors }: SensorsTableProps) {
  if (sensors.length === 0) {
    return <p>No sensors found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {sensors.map((sensor) => (
          <tr key={sensor.id}>
            <td>{sensor.name}</td>
            <td>{sensor.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}