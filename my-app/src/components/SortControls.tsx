import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { SortOptions, SortField } from "../types";

interface SortControlsProps {
  sortOptions: SortOptions;
  onSortChange: (options: SortOptions) => void;
}

export default function SortControls({
  sortOptions,
  onSortChange,
}: SortControlsProps) {
  const handleFieldChange = (field: SortField) => {
    if (sortOptions.field === field) {
      onSortChange({
        field,
        order: sortOptions.order === "asc" ? "desc" : "asc",
      });
    } else {
      onSortChange({ field, order: "asc" });
    }
  };

  const sortFields: { field: SortField; label: string }[] = [
    { field: "name", label: "Name" },
    { field: "foundedYear", label: "Founded Year" },
    { field: "employeeCount", label: "Employees" },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-gray-700">Sort by:</span>
      {sortFields.map(({ field, label }) => (
        <button
          key={field}
          onClick={() => handleFieldChange(field)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            sortOptions.field === field
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 border border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {label}
          {sortOptions.field === field ? (
            sortOptions.order === "asc" ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )
          ) : (
            <ArrowUpDown className="w-4 h-4 opacity-50" />
          )}
        </button>
      ))}
    </div>
  );
}
