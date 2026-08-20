import { useEffect, useContext } from "react";
import toast from "react-hot-toast";

import DatasetWorkspace from "./DatasetWorkspace";
import StudioPageLayout from "./layouts/StudioPageLayout";
import StudioWorkspaceLayout from "./layouts/StudioWorkspaceLayout";
import RightSidebar from "./right-panel/RightSidebar";

import { DatasetContext } from "@/global/context/DatasetContext";
import { CustomerDataContext } from "@/global/context/CustomerDataContext";
import { getStoredDatasets } from "../services/datasetDb";

export default function OptimicStudio() {
  const datasetCtx = useContext(DatasetContext);
  const customerCtx = useContext(CustomerDataContext);

  const selectedCount = customerCtx?.customerData?.length || 0;

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
    <StudioPageLayout
      workspace={
        <StudioWorkspaceLayout
          centerArea={<DatasetWorkspace />}
          rightSidebar={<RightSidebar selectedCount={selectedCount} />}
        />
      }
    />
  );
}