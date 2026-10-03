import { useState, type FormEvent } from 'react';
import type { Sensor } from '../types/sensor';
import { submitSensorReading } from '../api/sensorReadingsApi';

interface SensorReadingFormProps {
  sensors: Sensor[];
}

export function SensorReadingForm({ sensors }: SensorReadingFormProps) {
  const [sensorId, setSensorId] = useState('');
  const [value, setValue] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

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
      setSuccess(true);
      setValue('');
      setTimestamp('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="reading-form">
      <div className="form-row">
        <label htmlFor="sensor-select">Sensor</label>
        <select
          id="sensor-select"
          value={sensorId}
          onChange={(e) => setSensorId(e.target.value)}
        >
          <option value="">Select a sensor</option>
          {sensors.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.type})
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="value-input">Value</label>
        <input
          id="value-input"
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="timestamp-input">Timestamp</label>
        <input
          id="timestamp-input"
          type="datetime-local"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit reading'}
      </button>

      {error && <p className="form-error">{error}</p>}
      {success && <p className="form-success">Reading submitted.</p>}
    </form>
  );
}