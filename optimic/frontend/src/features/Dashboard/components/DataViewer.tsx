import React, { useState, useMemo, useContext, useEffect } from "react";
import {
  Search,
  CheckSquare,
  Square,
  Users,
  ChevronLeft,
  ChevronRight,
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
    <div className="space-y-4">


      {/* ── Table Card ────────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6 space-y-4">
        {/* Table Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900">
                Active Dataset: {activeDataset?.name || "No dataset selected"}
              </h2>
              <p className="text-[10px] text-slate-400">
                Click rows to toggle injection into offer prompt
              </p>
            </div>
          </div>

          <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-200">
            {selectedIds.length} Targets Selected
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search active dataset by name, phone, email, or city..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
          />
        </div>

        {/* Dynamic Table */}
        {!activeDataset || rows.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No rows available. Please upload or select a dataset from the
            sidebar.
          </div>
        ) : (
          <>
            <div className="border border-slate-100 rounded-2xl overflow-x-auto shadow-2xs">
              <table className="w-full text-left text-xs text-slate-600 border-collapse">
                <thead>
                  <tr className="bg-orange-50/40 border-b border-orange-100 text-[10px] font-bold text-orange-950 uppercase tracking-wider">
                    <th className="py-3 px-3 w-10 text-center">
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        className="cursor-pointer flex items-center justify-center mx-auto"
                      >
                        {selectedIds.length === filteredRows.length &&
                        filteredRows.length > 0 ? (
                          <CheckSquare className="w-4 h-4 text-orange-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300" />
                        )}
                      </button>
                    </th>
                    {activeDataset.headers?.map((h, i) => (
                      <th key={i} className="py-3 px-3 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedRows.map(({ id, cells }) => {
                    const isSelected = selectedIds.includes(id);

                    return (
                      <tr
                        key={id}
                        onClick={() => toggleRow(id, cells)}
                        className={`cursor-pointer transition select-none ${
                          isSelected
                            ? "bg-orange-50/50 hover:bg-orange-50/70 text-slate-900 font-semibold"
                            : "hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        <td className="py-3 px-3 text-center">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-orange-600 mx-auto" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-300 mx-auto" />
                          )}
                        </td>
                        {cells.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="py-3 px-3 whitespace-nowrap max-w-[220px] truncate"
                          >
                            {cell || "—"}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ── Pagination Controls ──────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
              <span className="text-[11px] text-slate-400">
                Showing{" "}
                <strong className="text-slate-700">
                  {filteredRows.length === 0 ? 0 : startIndex + 1}
                </strong>{" "}
                to <strong className="text-slate-700">{endIndex}</strong> of{" "}
                <strong className="text-slate-700">
                  {filteredRows.length}
                </strong>{" "}
                records
              </span>

              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="p-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-orange-50 hover:border-orange-200 text-slate-600 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
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
                            <span className="px-1 text-slate-400">...</span>
                          )}
                          <button
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-7 h-7 rounded-xl text-xs font-semibold transition cursor-pointer ${
                              isActive
                                ? "bg-orange-600 text-white shadow-xs"
                                : "bg-white hover:bg-orange-50 border border-slate-200/80 text-slate-600 hover:text-orange-600 hover:border-orange-200"
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
                  className="p-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-orange-50 hover:border-orange-200 text-slate-600 disabled:opacity-40 disabled:pointer-events-none transition cursor-pointer"
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
