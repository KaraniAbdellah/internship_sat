import { useState } from 'react';
import Sidebar from './Sidebar';
import { NAV_ITEMS } from '../constants/conts';

// 1. Import your page components
import Dashboard from './Dashboard';
import DataLoader from './DataLoader';
import SettingsView from './Settings';

// 2. Component Lookup Map (id -> Component)
const VIEWS: Record<string, React.ComponentType> = {
  'dashboard': Dashboard,
  'data-upload': DataLoader,
  'settings': SettingsView,
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
    <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] font-sans antialiased">
      <Sidebar activeId={activeId} onSelect={setActiveId} />

      <main className="flex-1 overflow-y-auto">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <Placeholder label={activeItem.label} />
        )}
      </main>
    </div>
  );
}