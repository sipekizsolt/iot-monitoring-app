import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SensorsTable } from './SensorsTable';

describe('SensorsTable', () => {
  it('shows empty state with no sensors', () => {
    render(<SensorsTable sensors={[]} />);
    expect(screen.getByText('No sensors found.')).toBeInTheDocument();
  });

  it('renders a row per sensor', () => {
    render(
      <SensorsTable
        sensors={[
          { id: '1', name: 'Temp Sensor', type: 'TEMPERATURE' },
          { id: '2', name: 'Humidity Sensor', type: 'HUMIDITY' },
        ]}
      />
    );
    expect(screen.getByText('Temp Sensor')).toBeInTheDocument();
    expect(screen.getByText('Humidity Sensor')).toBeInTheDocument();
  });
});