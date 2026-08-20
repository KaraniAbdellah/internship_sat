import { DatasetType } from "@/global/types/DatasetType";
import DatasetItem from "./DatasetItem";

type DatasetListProps = {
  datasets: DatasetType[];
  activeDatasetId: string | null;
  isCollapsed: boolean;
  canDelete: boolean;
  onSelect: (dataset: DatasetType) => void;
  onDelete: (e: React.MouseEvent, datasetId: string) => void;
};

export default function DatasetList({
  datasets,
  activeDatasetId,
  isCollapsed,
  canDelete,
  onSelect,
  onDelete,
}: DatasetListProps) {
  return (
    <div
      className={`overflow-y-auto overflow-x-hidden pr-0.5 ${
        isCollapsed ? "space-y-2" : "space-y-2.5"
      }`}
    >
      {datasets.length === 0 ? (
        <div
          className={`rounded-xl border border-dashed border-slate-200 bg-slate-50/60 text-slate-500 ${
            isCollapsed ? "p-3 text-center text-[11px]" : "p-4 text-xs"
          }`}
        >
          {isCollapsed ? "No datasets" : "No datasets uploaded yet."}
        </div>
      ) : (
        datasets.map((item) => (
          <DatasetItem
            key={item.id}
            item={item}
            isActive={activeDatasetId === item.id}
            isCollapsed={isCollapsed}
            canDelete={canDelete}
            onSelect={() => onSelect(item)}
            onDelete={(e) => onDelete(e, item.id)}
          />
        ))
      )}
    </div>
  );
}