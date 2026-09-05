import React, { useState } from "react";
import { DatasetType } from "@/global/types/DatasetType";
import { AlertTriangle, FileSpreadsheet, Loader2, Trash2, X } from "lucide-react";

type DatasetItemProps = {
  item: DatasetType;
  isActive: boolean;
  isCollapsed: boolean;
  canDelete: boolean;
  isDeleting?: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
};

export default function DatasetItem({
  item,
  isActive,
  isCollapsed,
  canDelete,
  isDeleting = false,
  onSelect,
  onDelete,
}: DatasetItemProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDeleting) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  const handleContainerClick = () => {
    if (!isDeleting) {
      onSelect();
    }
  };

  const handleDeleteTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmModal(false);
    onDelete(e);
  };

  const handleCancelModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirmModal(false);
  };

  return (
    <>
      {isCollapsed ? (
        <div
          onClick={handleContainerClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          title={`${item.name} · ${item.rowCount} records`}
          className={`group relative flex w-full items-center justify-center rounded-xl border p-3 transition-all cursor-pointer ${
            isDeleting ? "opacity-60 pointer-events-none" : ""
          } ${
            isActive
              ? "border-orange-300 bg-orange-50/70 text-orange-700 shadow-sm"
              : "border-slate-200/80 bg-white text-slate-500 hover:border-orange-200 hover:bg-orange-50/40 hover:text-orange-600"
          }`}
        >
          <FileSpreadsheet className="h-4 w-4 shrink-0" />

          {isDeleting ? (
            <div className="absolute -right-1 -top-1 rounded-full bg-white p-1 text-rose-500 shadow-sm ring-1 ring-slate-200">
              <Loader2 className="h-3 w-3 animate-spin" />
            </div>
          ) : canDelete ? (
            <button
              type="button"
              onClick={handleDeleteTrigger}
              aria-label={`Delete ${item.name}`}
              className="absolute -right-1 -top-1 hidden rounded-full bg-white p-1 text-slate-400 shadow-sm ring-1 ring-slate-200 transition group-hover:block hover:text-rose-600"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      ) : (
        <div
          onClick={handleContainerClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          className={`group relative w-full rounded-xl border p-3 text-left transition-all cursor-pointer ${
            isDeleting ? "opacity-60 pointer-events-none" : ""
          } ${
            isActive
              ? "border-orange-300 bg-orange-50/70 shadow-sm"
              : "border-slate-200/80 bg-white hover:border-orange-200 hover:bg-orange-50/30"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <FileSpreadsheet
                className={`h-4 w-4 shrink-0 ${isActive ? "text-orange-600" : "text-slate-400"}`}
              />
              <span
                className={`truncate text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-700"}`}
              >
                {item.name}
              </span>
            </div>

            {isDeleting ? (
              <div className="shrink-0 p-1 text-rose-500">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              </div>
            ) : canDelete ? (
              <button
                type="button"
                onClick={handleDeleteTrigger}
                aria-label={`Delete ${item.name}`}
                className="shrink-0 p-1 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:text-rose-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[11px] font-medium text-slate-400">
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            <span className="font-semibold text-slate-500">{item.rowCount} records</span>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          onClick={handleCancelModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <button
                type="button"
                onClick={handleCancelModal}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-semibold text-slate-900">Delete Dataset</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-slate-800">{item.name}</span>? This action permanently removes all rows and vector embeddings.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelModal}
                className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-rose-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
