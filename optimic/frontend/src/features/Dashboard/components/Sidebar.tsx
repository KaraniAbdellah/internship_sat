import { useState } from 'react';
import SidebarBrand from './sidebar/SidebarBrand';
import SidebarNav from './sidebar/SidebarNav';
import DatasetsPanel from './sidebar/DatasetsPanel';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-white border-r border-slate-200 flex flex-col p-2.5 select-none flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isCollapsed ? 'w-[72px]' : 'w-[270px]'
      }`}
    >
      <SidebarBrand
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((prev) => !prev)}
      />
      <SidebarNav
        activeId={activeId}
        onSelect={onSelect}
        isCollapsed={isCollapsed}
      />
      <div className="my-4 border-t border-slate-200/80" />
      <div className="flex-1 min-h-0 overflow-hidden">
        <DatasetsPanel isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
