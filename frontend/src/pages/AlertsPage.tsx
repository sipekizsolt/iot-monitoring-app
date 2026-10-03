import { useAlerts } from '../hooks/useAlerts';
import { Spinner } from '../components/Spinner';

export function AlertsPage() {
  const { alerts, loading, error } = useAlerts();

  if (loading) return <div className="page"><Spinner label="Loading alerts..." /></div>;
  if (error) return <div className="page"><p className="form-error">{error}</p></div>;

  if (alerts.length === 0) {
    return (
      <div className="page">
        <h2 className="page-title">Alerts</h2>
        <p className="empty-state">No alerts have been raised yet.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">Alerts</h2>
      <div className="alert-list">
        {alerts.map((alert) => (
          <div key={alert.id} className="alert-card">
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