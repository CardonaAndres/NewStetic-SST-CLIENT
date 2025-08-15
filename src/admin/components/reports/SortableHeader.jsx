import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const SortableHeader = ({ label, sortKey, className = "", sortConfig, setSortConfig }) => {
    const isActive = sortConfig.key === sortKey;
    const isAsc = isActive && sortConfig.direction === 'asc';

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
      <th 
        className={`px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-50/50 transition-colors duration-200 ${className}`}
        onClick={() => handleSort(sortKey)}
      >
        <div className="flex items-center space-x-1">
          <span className="truncate">{label}</span>
          <div className="flex flex-col flex-shrink-0">
            {isActive ? (
              isAsc ? (
                <ChevronUp className="w-3 h-3 text-blue-600" />
              ) : (
                <ChevronDown className="w-3 h-3 text-blue-600" />
              )
            ) : (
              <div className="w-3 h-3 flex flex-col justify-center">
                <ChevronUp className="w-3 h-1.5 text-gray-400" />
                <ChevronDown className="w-3 h-1.5 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </th>
    );
  };
