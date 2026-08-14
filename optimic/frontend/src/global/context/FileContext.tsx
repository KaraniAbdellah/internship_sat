import { FileType } from "../types/FileType";
import { createContext, type Dispatch, type SetStateAction } from "react";

type FileContextValue = {
  file: FileType | null;
  setFile: Dispatch<SetStateAction<FileType | null>>;
};
const FileContext = createContext<FileContextValue | null>(null);
export { FileContext, type FileContextValue };
