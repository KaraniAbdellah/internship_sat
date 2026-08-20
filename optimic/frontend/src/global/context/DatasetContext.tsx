import { createContext, type Dispatch, type SetStateAction } from "react";
import { DatasetType } from "../types/DatasetType";

export type DatasetContextValue = {
  datasets: DatasetType[];
  setDatasets: Dispatch<SetStateAction<DatasetType[]>>;
  activeDataset: DatasetType | null;
  setActiveDataset: Dispatch<SetStateAction<DatasetType>>;
};

export const DatasetContext = createContext<DatasetContextValue | null>(null);