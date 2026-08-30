export type DatasetType = {
  id: string;          // e.g. "ds_172398234"
  name: string;        // "liste-notaires-2026.csv"
  rowCount: number;
  policy: string;      // Policy specific to this dataset
  headers?: string[];  // Table column headers
  rows?: string[][];   // Table row data
  isActive?: boolean;  // Ready to Chat With Dataset or no
  createdAt: number;
};