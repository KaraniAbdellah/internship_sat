import { useEffect, useContext } from "react";
import toast from "react-hot-toast";

import DashboardHeader from "./DashboardHeader";
import DatasetsViewer from "./DatasetsViewer";
import DatasetWorkspace from "./DatasetWorkspace";

import { DatasetContext } from "@/global/context/DatasetContext";
import { getStoredDatasets } from "../services/datasetDb";

export default function OptimicStudio() {
  const datasetCtx = useContext(DatasetContext);

  useEffect(() => {
    async function hydrateDB() {
      try {
        const stored = await getStoredDatasets();
        if (stored.length > 0 && datasetCtx) {
          datasetCtx.setDatasets(stored);
          datasetCtx.setActiveDataset(stored[0]);
        }
      } catch {
        toast.error("Failed to load datasets from storage.");
      }
    }
    hydrateDB();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-slate-800 flex flex-col font-sans antialiased">
      <DashboardHeader />

      <div className="flex-1 flex overflow-hidden">
        <DatasetsViewer />
        <DatasetWorkspace />
      </div>
    </div>
  );
}
