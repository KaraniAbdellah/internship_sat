import DataViewer from "./DataViewer";
import OfferGenerator from "./OfferGenerator";
import { OfferResult } from "../types/OfferResult";

type DatasetWorkspaceProps = {
  onOfferGenerated: (result: OfferResult) => void;
  onGeneratingChange: (isGenerating: boolean) => void;
};

export default function DatasetWorkspace({
  onOfferGenerated,
  onGeneratingChange,
}: DatasetWorkspaceProps) {

  return (
    <main className="flex-1 min-w-0 overflow-hidden relative bg-white">
      <div className="h-full overflow-y-auto pb-48">
        <DataViewer />
      </div>
      <OfferGenerator
        onOfferGenerated={onOfferGenerated}
        onGeneratingChange={onGeneratingChange}
      />
    </main>
  );
}