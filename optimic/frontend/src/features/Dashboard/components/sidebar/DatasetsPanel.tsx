import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

import { DatasetContext } from "@/global/context/DatasetContext";
import { CustomerDataContext } from "@/global/context/CustomerDataContext";
import { DatasetType } from "@/global/types/DatasetType";
import { parseCSV } from "../../utils/csvParser";
import { persistDataset, removeDataset } from "../../services/datasetDb";
import DatasetsPanelHeader from "./DatasetsPanelHeader";
import DatasetList from "./DatasetList";
import UserDataContext from "@/global/context/UserDataContext";

type DatasetsPanelProps = {
  isCollapsed: boolean;
};

export default function DatasetsPanel({ isCollapsed }: DatasetsPanelProps) {
  const datasetCtx = useContext(DatasetContext);
  const customerCtx = useContext(CustomerDataContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserDataContext);

  // Tracks the ID of the dataset currently being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!datasetCtx) return null;

  const { datasets, setDatasets, activeDataset, setActiveDataset } = datasetCtx;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const { headers, rows } = parseCSV(text);

      const newDataset: DatasetType = {
        id: `ds_${Date.now()}`,
        name: file.name,
        headers,
        rows,
        rowCount: rows.length,
        policy: "",
        isActive: false,
        createdAt: Date.now(),
      };

      await persistDataset(newDataset);
      setDatasets((prev) => [newDataset, ...prev]);
      setActiveDataset(newDataset);
      customerCtx?.setCustomerData([]);
      toast.success(`Imported ${file.name}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to process CSV.");
    } finally {
      e.target.value = "";
    }
  };

  const handleSelectDataset = (dataset: DatasetType) => {
    setActiveDataset(dataset);
    customerCtx?.setCustomerData([]);
  };

  const handleDeleteDataset = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    // Prevent duplicate triggers while a delete is in progress
    if (deletingId) return;

    console.log(`Attempting to delete dataset with ID: ${id}`);
    const user_uid = userCtx.user_data.uid;

    if (!user_uid) {
      toast.error("User UID not found. Cannot delete dataset.");
      return;
    }

    setDeletingId(id);
    const toastId = toast.loading("Deleting dataset...");

    try {
      await removeDataset(id, user_uid);
      const remaining = datasets.filter((d) => d.id !== id);
      setDatasets(remaining);

      if (activeDataset?.id === id) {
        setActiveDataset(remaining.length > 0 ? remaining[0] : null);
        customerCtx?.setCustomerData([]);
      }
      toast.success("Dataset deleted.", { id: toastId });
    } catch (err: any) {
      toast.error(err.message || "Failed to delete dataset.", { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="flex min-h-0 flex-col gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      <DatasetsPanelHeader
        count={datasets.length}
        isCollapsed={isCollapsed}
        onUploadClick={() => fileInputRef.current?.click()}
      />

      <DatasetList
        datasets={datasets}
        activeDatasetId={activeDataset?.id ?? null}
        isCollapsed={isCollapsed}
        canDelete={datasets.length >= 1 && !deletingId}
        deletingId={deletingId}
        onSelect={handleSelectDataset}
        onDelete={handleDeleteDataset}
      />
    </section>
  );
}
