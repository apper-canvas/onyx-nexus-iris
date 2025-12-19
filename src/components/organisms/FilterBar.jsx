import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Dropdown from "@/components/molecules/Dropdown";
import Badge from "@/components/atoms/Badge";

const FilterBar = ({ filters, onFilterChange, onClearFilters }) => {
  const owners = ["John Smith", "Emily Davis", "Sarah Johnson"];
  const statuses = ["New Lead", "Qualified", "Customer", "Unqualified"];

  const activeFilterCount = [
    filters.owner,
    filters.leadStatus.length > 0,
    filters.dateRange?.start,
    filters.dateRange?.end
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {/* Owner Filter */}
        <Dropdown
          trigger={
<Button variant="ghost" size="sm" className="border border-purple-200 bg-white">
              <ApperIcon name="User" size={16} className="mr-2" />
              Owner: {filters.owner || "All"}
              <ApperIcon name="ChevronDown" size={16} className="ml-2" />
            </Button>
          }
        >
          <Dropdown.Item onClick={() => onFilterChange("owner", "")}>
            All Owners
          </Dropdown.Item>
          {owners.map((owner) => (
            <Dropdown.Item 
              key={owner}
              onClick={() => onFilterChange("owner", owner)}
            >
              {owner}
            </Dropdown.Item>
          ))}
        </Dropdown>

        {/* Lead Status Filter */}
        <Dropdown
          trigger={
<Button variant="ghost" size="sm" className="border border-purple-200 bg-white">
              <ApperIcon name="Target" size={16} className="mr-2" />
              Status{filters.leadStatus.length > 0 && `: ${filters.leadStatus.length}`}
              <ApperIcon name="ChevronDown" size={16} className="ml-2" />
            </Button>
          }
        >
          {statuses.map((status) => (
            <Dropdown.Item 
              key={status}
              onClick={() => {
                const newStatuses = filters.leadStatus.includes(status)
                  ? filters.leadStatus.filter(s => s !== status)
                  : [...filters.leadStatus, status];
                onFilterChange("leadStatus", newStatuses);
              }}
            >
              <input
                type="checkbox"
                checked={filters.leadStatus.includes(status)}
                onChange={() => {}}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer"
              />
              {status}
            </Dropdown.Item>
          ))}
        </Dropdown>

        {/* More Filters Button */}
<Button variant="ghost" size="sm" className="border border-purple-200 bg-white">
          <ApperIcon name="SlidersHorizontal" size={16} className="mr-2" />
          More
          <ApperIcon name="ChevronDown" size={16} className="ml-2" />
        </Button>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearFilters}
            className="text-slate-600"
          >
            <ApperIcon name="X" size={16} className="mr-1" />
            Clear filters ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(filters.owner || filters.leadStatus.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.owner && (
<Badge variant="secondary" className="text-xs px-3 py-1 bg-purple-50 text-purple-700">
              Owner: {filters.owner}
              <button
                onClick={() => onFilterChange("owner", "")}
                className="ml-2 hover:text-orange-800"
              >
                <ApperIcon name="X" size={12} />
              </button>
            </Badge>
          )}
          {filters.leadStatus.map((status) => (
<Badge key={status} variant="secondary" className="text-xs px-3 py-1 bg-purple-50 text-purple-700">
              Status: {status}
              <button
                onClick={() => onFilterChange("leadStatus", filters.leadStatus.filter(s => s !== status))}
                className="ml-2 hover:text-orange-800"
              >
                <ApperIcon name="X" size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;