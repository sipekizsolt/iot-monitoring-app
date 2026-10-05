import { useAlerts } from '../hooks/useAlerts';
import { useSensors } from '../hooks/useSensors';
import { Spinner } from '../components/Spinner';

interface AlertsPageProps {
  filterSensorId: string | null;
}

export function AlertsPage({ filterSensorId }: AlertsPageProps) {
  const { alerts, loading, error } = useAlerts();
  const { sensors } = useSensors();
  
  if (loading) return <div className="page"><Spinner label="Loading alerts..." /></div>;
  if (error) return <div className="page"><p className="form-error">{error}</p></div>;

  const visibleAlerts = filterSensorId
  ? alerts.filter((a) => a.sensorId === filterSensorId)
  : alerts;

  if (visibleAlerts.length === 0) {
    return (
      <div className="page">
        <h2 className="page-title">Alerts{filterSensorId && ` — Sensor ${filterSensorId.slice(0, 8)}`}</h2>
        <p className="empty-state">{filterSensorId ? 'No alerts for this sensor.' : 'No alerts. &#127881'}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">
        Alerts{filterSensorId && ` — Sensor ${filterSensorId.slice(0, 8)}`}
      </h2>
      <div className="alert-list">
        {visibleAlerts.map((alert) => (
          <div key={alert.id} className={`alert-card alert-card--${sensors.find(sensor => sensor.id === alert.sensorId)?.type.toLowerCase()}`}>
            <span className="alert-card__message">{alert.message}</span>
            <span className="alert-card__meta">
              {alert.sensorId.slice(0, 8)}<br />
              {new Date(alert.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}