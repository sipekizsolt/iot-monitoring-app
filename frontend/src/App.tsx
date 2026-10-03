import { useState } from 'react';
import { SensorsPage } from './pages/SensorsPage';
import { SensorReadingsPage } from './pages/SensorReadingsPage';
import { AlertsPage } from './pages/AlertsPage';
import { useSensors } from './hooks/useSensors';
import { useAlerts } from './hooks/useAlerts';
import './App.scss';

type View = 'sensors' | 'reading' | 'alerts';

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: 'sensors', label: 'Sensors' },
  { id: 'reading', label: 'Add Reading' },
  { id: 'alerts', label: 'Alerts' },
];

export default function App() {
  const [view, setView] = useState<View>('sensors');
  const [menuOpen, setMenuOpen] = useState(false);
  const { sensors } = useSensors();
  const { alerts } = useAlerts();

  const navigateTo = (v: View) => {
    setView(v);
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header__brand">
          <span className="header__name">iot monitor</span>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`} aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav__item ${view === id ? 'nav__item--active' : ''}`}
              onClick={() => navigateTo(id)}
              aria-current={view === id ? 'page' : undefined}
            >
              {label}
              {id === 'sensors' && sensors.length > 0 && (
                <span className="nav__badge">{sensors.length}</span>
              )}
              {id === 'alerts' && alerts.length > 0 && (
                <span className="nav__badge nav__badge--danger-bg">{alerts.length}</span>
              )}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {view === 'sensors' && <SensorsPage />}
        {view === 'reading' && <SensorReadingsPage />}
        {view === 'alerts' && <AlertsPage />}
      </main>
    </div>
  );
}