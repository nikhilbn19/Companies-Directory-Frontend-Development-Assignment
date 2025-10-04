import { useState, useMemo, useEffect } from "react";
import { Building2 } from "lucide-react";
import { mockCompanies } from "./data/mockCompanies";
import { useDebounce } from "./hooks/useDebounce";
import type { Company, FilterOptions, SortOptions, ViewMode } from "./types";
import CompanyCard from "./components/CompanyCard";
import CompanyTable from "./components/CompanyTable";
import FilterPanel from "./components/FilterPanel";
import SortControls from "./components/SortControls";
import Pagination from "./components/Pagination";
import ViewToggle from "./components/ViewToggle";
import LoadingState from "./components/LoadingState";
import EmptyState from "./components/EmptyState";

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    industry: "",
    employeeSize: "",
    country: "",
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "name",
    order: "asc",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const debouncedSearch = useDebounce(filters.search, 300);

  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCompanies(mockCompanies);
      setLoading(false);
    };

    loadCompanies();
  }, []);

  const industries = useMemo(
    () => Array.from(new Set(mockCompanies.map((c) => c.industry))).sort(),
    []
  );

  const employeeSizes = useMemo(
    () => Array.from(new Set(mockCompanies.map((c) => c.employeeSize))).sort(),
    []
  );

  const countries = useMemo(
    () => Array.from(new Set(mockCompanies.map((c) => c.country))).sort(),
    []
  );

  const filteredAndSortedCompanies = useMemo(() => {
    let result = [...companies];

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (company) =>
          company.name.toLowerCase().includes(searchLower) ||
          company.description.toLowerCase().includes(searchLower) ||
          company.location.toLowerCase().includes(searchLower)
      );
    }

    if (filters.industry) {
      result = result.filter(
        (company) => company.industry === filters.industry
      );
    }

    if (filters.employeeSize) {
      result = result.filter(
        (company) => company.employeeSize === filters.employeeSize
      );
    }

    if (filters.country) {
      result = result.filter((company) => company.country === filters.country);
    }

    result.sort((a, b) => {
      const { field, order } = sortOptions;
      let comparison = 0;

      if (field === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (field === "foundedYear") {
        comparison = a.foundedYear - b.foundedYear;
      } else if (field === "employeeCount") {
        comparison = a.employeeCount - b.employeeCount;
      }

      return order === "asc" ? comparison : -comparison;
    });

    return result;
  }, [companies, debouncedSearch, filters, sortOptions]);

  const totalPages = Math.ceil(
    filteredAndSortedCompanies.length / itemsPerPage
  );
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCompanies.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filteredAndSortedCompanies, currentPage, itemsPerPage]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortOptions: SortOptions) => {
    setSortOptions(newSortOptions);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      industry: "",
      employeeSize: "",
      country: "",
    });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    !!filters.search ||
    !!filters.industry ||
    !!filters.employeeSize ||
    !!filters.country;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Companies Directory
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Discover and explore leading companies worldwide
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                industries={industries}
                employeeSizes={employeeSizes}
                countries={countries}
              />
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-xl shadow-md p-4 border border-gray-200">
              <SortControls
                sortOptions={sortOptions}
                onSortChange={handleSortChange}
              />
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>

            {loading ? (
              <LoadingState />
            ) : filteredAndSortedCompanies.length === 0 ? (
              <EmptyState
                hasFilters={hasActiveFilters}
                onReset={handleResetFilters}
              />
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedCompanies.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>
                ) : (
                  <CompanyTable companies={paginatedCompanies} />
                )}

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredAndSortedCompanies.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Companies Directory - Built for Frontlines Media Technical
            Assessment
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
