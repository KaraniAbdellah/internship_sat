import { useState } from 'react';
import Sidebar from './Sidebar';
import { NAV_ITEMS } from '../constants/conts';
import AppLayout from './layouts/AppLayout';

// 1. Import your page components
import OptimicStudio from './OptimicStudio';
import SettingsView from './Settings';
import Analyse from './analyse/Analyse';

// 2. Component Lookup Map (id -> Component)
const VIEWS: Record<string, React.ComponentType> = {
  'dashboard': OptimicStudio,
  'settings': SettingsView,
  "agent-analytics": Analyse,
};

// Default fallback for sections you haven't created yet
const Placeholder = ({ label }: { label: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-slate-900">
      Hello <span className="text-orange-600">{label}</span>
    </h1>
  </div>
);

export default function Optimic() {
  const [activeId, setActiveId] = useState(NAV_ITEMS[0].id);

  const activeItem = NAV_ITEMS.find((item) => item.id === activeId) || NAV_ITEMS[0];
  const ActiveComponent = VIEWS[activeId];

  return (
    <AppLayout
      sidebar={<Sidebar activeId={activeId} onSelect={setActiveId} />}
      content={
        ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <Placeholder label={activeItem.label} />
        )
      }
    />
  );
}
