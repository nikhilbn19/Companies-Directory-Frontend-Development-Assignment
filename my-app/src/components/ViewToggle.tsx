import { LayoutGrid, Table2 } from "lucide-react";
import type { ViewMode } from "../types";

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function ViewToggle({
  viewMode,
  onViewModeChange,
}: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 p-1">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
          viewMode === "grid"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <LayoutGrid className="w-4 h-4" />
        Grid
      </button>
      <button
        onClick={() => onViewModeChange("table")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
          viewMode === "table"
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <Table2 className="w-4 h-4" />
        Table
      </button>
    </div>
  );
}
