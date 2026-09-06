export interface MetricCard {
  label: string;
  value: string;
  detail: string;
}

export interface ReportResult {
  title: string;
  executive_summary: string;
  metrics: MetricCard[];
  detailed_analysis: string;
  action_items: string[];
}

interface GenerateReportParams {
  userUid?: string;
  reportType: string;
  dataset: {
    id?: string;
    name?: string;
    rows: any[];
    headers: string[];
  };
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const generateReport = async ({
  userUid,
  reportType,
  dataset,
}: GenerateReportParams): Promise<ReportResult> => {
  const response = await fetch(`${API_BASE_URL}/report`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_uid: userUid || "thread-1",
      report_type: reportType,
      rows: dataset.rows,
      headers: dataset.headers,
      dataset_name: dataset.name,
      dataset_id: dataset.id,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.detail || "Failed to generate report");
  }

  return response.json();
};
