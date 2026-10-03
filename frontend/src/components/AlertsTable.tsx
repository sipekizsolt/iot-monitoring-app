import type { Alert } from '../types/alert';

interface AlertsTableProps {
  alerts: Alert[];
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  if (alerts.length === 0) {
    return <p>No alerts.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Message</th>
          <th>Sensor</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert) => (
          <tr key={alert.id}>
            <td>{alert.message}</td>
            <td>{alert.sensorId}</td>
            <td>{new Date(alert.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}