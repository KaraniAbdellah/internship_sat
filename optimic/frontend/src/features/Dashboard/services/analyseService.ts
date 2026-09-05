const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


export interface AnalysePayload {
  question: string;
  headers: string[];
  rows: any[][];
  dataset_name?: string;
}

export interface ChartData {
  chart_type: "bar" | "line" | "area" | "pie";
  title: string;
  x_key: string;
  y_key: string;
  data: Record<string, any>[];
}

export interface AnalyseResponse {
  reply: string;
  chart?: ChartData | null;
  executed_sql?: string | null;
}

export const executeDatasetAnalysis = async (
  payload: AnalysePayload
): Promise<AnalyseResponse> => {
  const response = await fetch(`${API_URL}/analyse/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Dataset analysis failed");
  }

  return response.json();
};
