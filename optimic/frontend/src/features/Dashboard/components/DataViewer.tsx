import React, { useState, useMemo, useContext, useEffect } from "react";
import {
  Search,
  CheckSquare,
  Square,
  Users,
  ChevronLeft,
  ChevronRight,
  Database,
} from "lucide-react";

import { DatasetContext } from "@/global/context/DatasetContext";
import { CustomerDataContext } from "@/global/context/CustomerDataContext";
import { PAGE_SIZE } from "../constants/conts";

export default function DataViewer() {
  const datasetCtx = useContext(DatasetContext);
  const customerCtx = useContext(CustomerDataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const activeDataset = datasetCtx?.activeDataset;
  const customerData = customerCtx?.customerData || [];
  const setCustomerData = customerCtx?.setCustomerData;

  // Reset page when dataset or search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeDataset?.id, searchTerm]);

  // Map all rows with index ID
  const rows = useMemo(() => {
    if (!activeDataset?.rows) return [];
    return activeDataset.rows.map((row, idx) => ({ id: idx, cells: row }));
  }, [activeDataset]);

  // Filter based on search query
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;
    const q = searchTerm.toLowerCase();
    return rows.filter(({ cells }) =>
      cells.some((cell) => cell.toLowerCase().includes(q)),
    );
  }, [rows, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE) || 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filteredRows.length);

  const paginatedRows = useMemo(() => {
    return filteredRows.slice(startIndex, endIndex);
  }, [filteredRows, startIndex, endIndex]);

  const selectedIds = useMemo(
    () => customerData.map((c) => c.id),
    [customerData],
  );

  // Row selection handlers
  const toggleRow = (id: number, cells: string[]) => {
    if (!setCustomerData) return;
    if (selectedIds.includes(id)) {
      setCustomerData((prev) =>
        prev ? prev.filter((item) => item.id !== id) : [],
      );
    } else {
      const content = activeDataset?.headers?.length
        ? activeDataset.headers
            .map((h, i) => `${h}: ${cells[i] || ""}`)
            .join(" | ")
        : cells.join(", ");
      setCustomerData((prev) => [...(prev || []), { id, content }]);
    }
  };

  const toggleSelectAll = () => {
    if (!setCustomerData) return;
    if (selectedIds.length === filteredRows.length) {
      setCustomerData([]);
    } else {
      const allSelected = filteredRows.map(({ id, cells }) => {
        const content = activeDataset?.headers?.length
          ? activeDataset.headers
              .map((h, i) => `${h}: ${cells[i] || ""}`)
              .join(" | ")
          : cells.join(", ");
        return { id, content };
      });
      setCustomerData(allSelected);
    }
  };

  return (
    <div className="w-full">
      {/* ── Table Container Card ─────────────────────────────────────────── */}
      <div className="bg-white border-l border-slate-200/80 p-5 space-y-4">
        {/* Table Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-50 text-orange-600 border border-orange-200/60 shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                  {activeDataset?.name ? (
                    <span className="text-slate-900">{activeDataset.name}</span>
                  ) : (
                    <span className="text-slate-400">No dataset selected</span>
                  )}
                </h2>
              </div>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                Click any row to toggle audience injection into the offer prompt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50/90 text-orange-700 text-xs font-bold rounded-full border border-orange-200/70">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              {selectedIds.length} Targets Selected
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search active dataset rows by keyword, email, phone, city..."
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400 text-slate-800"
          />
        </div>

        {/* Dynamic Table & Empty States */}
        {!activeDataset || rows.length === 0 ? (
          <div className="py-14 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/40 text-center px-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
              <Database className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-700">No data available</p>
            <p className="text-[11px] text-slate-400 mt-0.5 max-w-sm">
              Please upload or activate a CSV dataset from the top bar to inspect records.
            </p>
          </div>
        ) : (
          <>
            <div className="border border-slate-200/80 rounded-xl overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-3.5 w-11 text-center">
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        className="cursor-pointer flex items-center justify-center mx-auto transition-transform active:scale-95"
                        title={
                          selectedIds.length === filteredRows.length
                            ? "Deselect all"
                            : "Select all"
                        }
                      >
                        {selectedIds.length === filteredRows.length &&
                        filteredRows.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-orange-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 hover:text-slate-400 transition-colors" />
                        )}
                      </button>
                    </th>
                    {activeDataset.headers?.map((h, i) => (
                      <th key={i} className="py-3 px-3.5 whitespace-nowrap font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {paginatedRows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={(activeDataset.headers?.length || 0) + 1}
                        className="py-10 text-center text-xs text-slate-400"
                      >
                        No matching records found for "{searchTerm}"
                      </td>
                    </tr>
                  ) : (
                    paginatedRows.map(({ id, cells }) => {
                      const isSelected = selectedIds.includes(id);

                      return (
                        <tr
                          key={id}
                          onClick={() => toggleRow(id, cells)}
                          className={`cursor-pointer transition-colors duration-150 select-none ${
                            isSelected
                              ? "bg-orange-50/60 hover:bg-orange-50/80 text-slate-900 font-medium"
                              : "hover:bg-slate-50/80 text-slate-600"
                          }`}
                        >
                          <td className="py-2.5 px-3.5 text-center">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-orange-600 mx-auto" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-300 mx-auto transition-colors group-hover:text-slate-400" />
                            )}
                          </td>
                          {cells.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="py-2.5 px-3.5 whitespace-nowrap max-w-[240px] truncate text-xs"
                            >
                              {cell || <span className="text-slate-300">—</span>}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Pagination Controls ──────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
              <span className="text-[11px] font-medium text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {filteredRows.length === 0 ? 0 : startIndex + 1}
                </span>{" "}
                to{" "}
                <span className="font-bold text-slate-800">{endIndex}</span> of{" "}
                <span className="font-bold text-slate-800">
                  {filteredRows.length}
                </span>{" "}
                records
              </span>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 text-slate-600 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 5) return true;
                      return (
                        Math.abs(page - currentPage) <= 1 ||
                        page === 1 ||
                        page === totalPages
                      );
                    })
                    .map((page, idx, arr) => {
                      const isEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                      const isActive = page === currentPage;

                      return (
                        <React.Fragment key={page}>
                          {isEllipsis && (
                            <span className="px-1 text-slate-400 font-bold text-[10px]">
                              ...
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-7 h-7 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? "bg-orange-600 text-white"
                                : "bg-white hover:bg-orange-50 border border-slate-200 text-slate-600 hover:text-orange-600 hover:border-orange-200"
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <button
                  type="button"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-orange-50 hover:border-orange-200 text-slate-600 hover:text-orange-600 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}