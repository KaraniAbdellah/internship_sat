import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  BarChart3,
  LineChart as LineIcon,
  PieChart as PieIcon,
  Table as TableIcon,
  Download,
  Copy,
  Check,
  Layers,
  Palette,
  Terminal,
} from "lucide-react";
import { CHART_PALETTE } from "@/features/Dashboard/constants/conts";
import { ChartData } from "@/features/Dashboard/services/analyseService";

const COLOR_PRESETS = [
  { name: "Orange", hex: "#ea580c" },
  { name: "Blue", hex: "#2563eb" },
  { name: "Emerald", hex: "#059669" },
  { name: "Purple", hex: "#7c3aed" },
  { name: "Rose", hex: "#e11d48" },
];

interface Props {
  initialChart: ChartData;
  sql?: string | null;
}

export const InteractiveChartCard: React.FC<Props> = ({ initialChart, sql }) => {
  const [currentChartType, setCurrentChartType] = useState<ChartData["chart_type"]>(
    initialChart.chart_type
  );
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const [chartColor, setChartColor] = useState<string>("#ea580c");
  const [copied, setCopied] = useState(false);

  const data = initialChart.data || [];
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleCopySql = () => {
    if (!sql) return;
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (!data.length) return;
    const headers = columns.join(",");
    const rows = data.map((row) => columns.map((col) => `"${row[col] ?? ""}"`).join(","));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${initialChart.title.replace(/\s+/g, "_").toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-3 bg-white p-3 sm:p-4 rounded-xl border border-orange-100 shadow-xs transition w-full">
      {/* Responsive Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-gray-100">
        <div>
          <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 shrink-0" style={{ color: chartColor }} />
            <span className="truncate">{initialChart.title}</span>
          </h4>
          <span className="text-[11px] text-gray-400 font-mono">
            {data.length} aggregated records
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Color Selector */}
          {viewMode === "chart" && (
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-1 rounded-lg">
              <Palette className="w-3.5 h-3.5 text-gray-400" />
              <div className="flex items-center gap-1">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => setChartColor(preset.hex)}
                    title={preset.name}
                    className={`w-3.5 h-3.5 rounded-full transition-transform ${
                      chartColor === preset.hex
                        ? "scale-125 ring-2 ring-offset-1 ring-gray-400"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: preset.hex }}
                  />
                ))}
                <label
                  title="Custom color"
                  className="w-3.5 h-3.5 rounded-full border border-gray-300 relative cursor-pointer overflow-hidden flex items-center justify-center hover:scale-110 transition"
                  style={{ backgroundColor: chartColor }}
                >
                  <input
                    type="color"
                    value={chartColor}
                    onChange={(e) => setChartColor(e.target.value)}
                    className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Action Pills */}
          <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200 text-xs">
            <div className="flex items-center border-r border-gray-200 pr-1 mr-1 gap-0.5">
              {[
                { type: "bar", icon: BarChart3 },
                { type: "line", icon: LineIcon },
                { type: "area", icon: Layers },
                { type: "pie", icon: PieIcon },
              ].map(({ type, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => {
                    setCurrentChartType(type as ChartData["chart_type"]);
                    setViewMode("chart");
                  }}
                  className={`p-1.5 rounded transition ${
                    currentChartType === type && viewMode === "chart"
                      ? "bg-white shadow-xs font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                  style={currentChartType === type && viewMode === "chart" ? { color: chartColor } : {}}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setViewMode(viewMode === "chart" ? "table" : "chart")}
              className={`flex items-center gap-1 px-2 py-1 rounded transition ${
                viewMode === "table"
                  ? "bg-white text-orange-600 shadow-xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              title="Download CSV"
              className="p-1.5 text-gray-500 hover:text-gray-800 rounded transition"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === "chart" ? (
        <div className="w-full h-56 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            {currentChartType === "bar" ? (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey={initialChart.x_key} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey={initialChart.y_key} fill={chartColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : currentChartType === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey={initialChart.x_key} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={initialChart.y_key}
                  stroke={chartColor}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: chartColor }}
                />
              </LineChart>
            ) : currentChartType === "area" ? (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey={initialChart.x_key} tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey={initialChart.y_key}
                  stroke={chartColor}
                  fill={chartColor}
                  fillOpacity={0.18}
                />
              </AreaChart>
            ) : (
              <PieChart>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: "10px" }} />
                <Pie
                  data={data}
                  dataKey={initialChart.y_key}
                  nameKey={initialChart.x_key}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                >
                  {data.map((_, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={idx === 0 ? chartColor : CHART_PALETTE[idx % CHART_PALETTE.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="max-h-60 overflow-x-auto overflow-y-auto border border-gray-100 rounded-lg">
          <table className="w-full text-left text-xs min-w-[320px]">
            <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 text-gray-600">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="p-2 font-medium uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-mono">
              {data.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-orange-50/40 transition">
                  {columns.map((col) => (
                    <td key={col} className="p-2 text-gray-700">
                      {String(row[col] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SQL Footnote */}
      {sql && (
        <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-mono gap-2">
          <div className="flex items-center gap-1.5 truncate max-w-[80%]">
            <Terminal className="w-3.5 h-3.5 shrink-0" style={{ color: chartColor }} />
            <span className="truncate">{sql}</span>
          </div>
          <button
            onClick={handleCopySql}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-700 transition shrink-0"
          >
            {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy SQL"}</span>
          </button>
        </div>
      )}
    </div>
  );
};
