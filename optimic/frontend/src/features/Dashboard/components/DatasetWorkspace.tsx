import DataViewer from "./DataViewer";
import OfferGenerator from "./OfferGenerator";

export default function DatasetWorkspace() {
  return (
    <main className="flex-1 min-w-0 overflow-hidden relative bg-white">
      <div className="h-full overflow-y-auto pb-48">
        <DataViewer />
      </div>
      <OfferGenerator />
    </main>
  );
}