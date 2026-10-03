import { useSensors } from '../hooks/useSensors';
import { Spinner } from '../components/Spinner';

export function SensorsPage() {
  const { sensors, loading, error } = useSensors();

  if (loading) return <div className="page"><Spinner label="Loading sensors..." /></div>;
  if (error) return <div className="page"><p className="form-error">{error}</p></div>;

  if (sensors.length === 0) {
    return (
      <div className="page">
        <h2 className="page-title">Sensors</h2>
        <p className="empty-state">No sensors have been registered yet.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">Sensors</h2>
      <div className="sensor-grid">
        {sensors.map((sensor) => (
          <div key={sensor.id} className={`sensor-card sensor-card--${sensor.type.toLowerCase()}`}>
            <div className="sensor-card__header">
              <span className="sensor-card__type">{sensor.type.replace('_', ' ')}</span>
              <span className="sensor-card__id">{sensor.id.slice(0, 8)}</span>
            </div>
            <div className="sensor-card__body">
              <p className="sensor-card__name">{sensor.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}