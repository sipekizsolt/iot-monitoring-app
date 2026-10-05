import { useState, type FormEvent } from 'react';
import { useSensors } from '../hooks/useSensors';
import { submitSensorReading } from '../api/sensorReadingsApi';
import { Spinner } from '../components/Spinner';

export function SensorReadingsPage() {
  const { sensors, loading, error: loadError } = useSensors();
  const [sensorId, setSensorId] = useState('');
  const [value, setValue] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (loading) return <div className="page"><Spinner label="Loading sensors..." /></div>;
  if (loadError) return <div className="page"><p className="form-error">{loadError}</p></div>;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!sensorId || !value || !timestamp) {
      setError('All fields are required.');
      return;
    }
    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) {
      setError('Value must be a number.');
      return;
    }

    setSubmitting(true);
    try {
      await submitSensorReading({
        sensorId,
        value: numericValue,
        timestamp: new Date(timestamp).toISOString(),
      });
      setSuccess('Reading submitted successfully.');
      setValue('');
      setTimestamp('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Add Sensor Reading</h2>
      <form className="app-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="sensor-select">Sensor</label>
          <select
            id="sensor-select"
            className="form-select"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
          >
            <option value="">— select sensor —</option>
            {sensors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.type}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="value-input">Value</label>
          <input
            id="value-input"
            className="form-input"
            type="number"
            step="any"
            placeholder="0.00"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="timestamp-input">Timestamp</label>
          <input
            id="timestamp-input"
            className="form-input"
            type="datetime-local"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <button className="form-submit" type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Reading'}
        </button>
      </form>
    </div>
  );
}