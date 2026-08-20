import DatasetsPanel from "./sidebar/DatasetsPanel";

export default function DatasetsViewer() {
  return (
    <aside className="w-[230px] shrink-0 border-r border-slate-200 bg-white p-3 select-none min-h-[calc(100vh-4rem)]">
      <DatasetsPanel isCollapsed={false} />
    </aside>
  );
}
