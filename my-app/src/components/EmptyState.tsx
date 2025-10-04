import { Building2, Search } from "lucide-react";

interface EmptyStateProps {
  hasFilters?: boolean;
  onReset?: () => void;
}

export default function EmptyState({
  hasFilters = false,
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        {hasFilters ? (
          <>
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to find what you're looking for.
            </p>
            {onReset && (
              <button
                onClick={onReset}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            )}
          </>
        ) : (
          <>
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No companies available
            </h3>
            <p className="text-gray-600">Check back later for updates.</p>
          </>
        )}
      </div>
    </div>
  );
}
