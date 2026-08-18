import DataViewer from "./DataViewer";
import OfferGenerator from "./OfferGenerator";

export default function DatasetWorkspace() {
  return (
    <main className="flex-1 overflow-y-auto p-3 max-w-5xl mx-auto pb-48 relative">
      <DataViewer />
      <OfferGenerator />
    </main>
  );
}