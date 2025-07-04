import { Filter } from "lucide-react"
import { TIME_FILTERS, STATUS_FILTERS } from "../lib/constants.js"
import FilterDropdown from "./FilterDropdown.jsx"
import DateDropdown from "./DateDropdown.jsx"

export default function Filters({
  timeFilter,
  statusFilter,
  onTimeFilterChange,
  onStatusFilterChange,
}) {
  return (
    // Filter section containing time and status filters
    <div className="flex items-center gap-4 mb-4 justify-between flex-wrap w-full page_layout">
      
      {/* Dropdown for selecting time-based filters (e.g. Past Month, Past Year) */}
      <DateDropdown
        value={timeFilter}
        options={TIME_FILTERS}
        onChange={onTimeFilterChange}
        icon={Filter}
      />

      {/* Dropdown for selecting launch status (e.g. Success, Failed, Upcoming) */}
      <FilterDropdown
        value={statusFilter}
        options={STATUS_FILTERS}
        onChange={onStatusFilterChange}
      />
    </div>
  )
}
