export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  country: string;
  foundedYear: number;
  employeeCount: number;
  employeeSize: "Startup" | "Small" | "Medium" | "Large" | "Enterprise";
  revenue: string;
  website: string;
  description: string;
}

export interface FilterOptions {
  search: string;
  industry: string;
  employeeSize: string;
  country: string;
}

export type SortField = "name" | "foundedYear" | "employeeCount";
export type SortOrder = "asc" | "desc";

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}

export type ViewMode = "grid" | "table";
