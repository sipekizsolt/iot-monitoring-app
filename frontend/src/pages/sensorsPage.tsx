import { useSensors } from '../hooks/useSensors';
import { SensorsTable } from '../components/SensorsTable';

export function SensorsPage() {
  const { sensors, loading, error } = useSensors();

  if (loading) return <p>Loading sensors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Sensors</h1>
      <SensorsTable sensors={sensors} />
    </div>
  );
}