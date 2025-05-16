import React, { useState } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterControlsProps {
  onFilterChange?: (filters: {
    workType: string[];
    status: string[];
    search: string;
    sortBy: string;
    sortDirection: "asc" | "desc";
  }) => void;
}

const FilterControls = ({ onFilterChange = () => {} }: FilterControlsProps) => {
  const [workType, setWorkType] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("dateApplied");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleWorkTypeChange = (value: string) => {
    const newWorkTypes =
      value === "all"
        ? []
        : workType.includes(value)
          ? workType.filter((type) => type !== value)
          : [...workType, value];

    setWorkType(newWorkTypes);
    triggerFilterChange(newWorkTypes, status, search, sortBy, sortDirection);
  };

  const handleStatusChange = (value: string) => {
    const newStatus =
      value === "all"
        ? []
        : status.includes(value)
          ? status.filter((s) => s !== value)
          : [...status, value];

    setStatus(newStatus);
    triggerFilterChange(workType, newStatus, search, sortBy, sortDirection);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    triggerFilterChange(workType, status, newSearch, sortBy, sortDirection);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    triggerFilterChange(workType, status, search, value, sortDirection);
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc";
    setSortDirection(newDirection);
    triggerFilterChange(workType, status, search, sortBy, newDirection);
  };

  const triggerFilterChange = (
    workType: string[],
    status: string[],
    search: string,
    sortBy: string,
    sortDirection: "asc" | "desc",
  ) => {
    onFilterChange({
      workType,
      status,
      search,
      sortBy,
      sortDirection,
    });
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="w-full sm:w-auto">
            <Select
              onValueChange={handleWorkTypeChange}
              value={workType.length ? workType[0] : "all"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Work Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Work Types</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto">
            <Select
              onValueChange={handleStatusChange}
              value={status.length ? status[0] : "all"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-auto">
            <Select onValueChange={handleSortChange} value={sortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateApplied">Date Applied</SelectItem>
                <SelectItem value="company">Company Name</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            className="h-9 w-9"
          >
            {sortDirection === "asc" ? (
              <SortAsc className="h-4 w-4" />
            ) : (
              <SortDesc className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
