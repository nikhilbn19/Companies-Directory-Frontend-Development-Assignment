import {
  Building2,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  Globe,
} from "lucide-react";
import type { Company } from "../types";

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 group">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700 transition-all"></div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {company.name}
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                {company.industry}
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {company.description}
        </p>

        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>
              {company.location}, {company.country}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{company.employeeCount.toLocaleString()} employees</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {company.employeeSize}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Founded in {company.foundedYear}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span>Revenue: {company.revenue}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 pt-2">
            <Globe className="w-4 h-4" />
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-medium"
            >
              {company.website}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
