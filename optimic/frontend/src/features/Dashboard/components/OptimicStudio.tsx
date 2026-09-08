import { useEffect, useContext } from "react";
import toast from "react-hot-toast";

import DatasetWorkspace from "./DatasetWorkspace";
import StudioPageLayout from "./layouts/StudioPageLayout";
import StudioWorkspaceLayout from "./layouts/StudioWorkspaceLayout";
import RightSidebar from "./right-panel/RightSidebar";

import { DatasetContext,  } from "@/global/context/DatasetContext";
import { getStoredDatasets } from "../services/datasetDb";
import UserDataContext from "@/global/context/UserDataContext";

export default function OptimicStudio() {
  const datasetCtx = useContext(DatasetContext);
  const userCtx = useContext(UserDataContext);
  
  useEffect(() => {
    async function hydrateDB() {
      console.log("Hydrating database with stored datasets...");
      const userUid = userCtx?.user_data?.uid;
      try {
        const stored = await getStoredDatasets(userUid);
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
          rightSidebar={<RightSidebar />}
        />
      }
    />
  );
}
