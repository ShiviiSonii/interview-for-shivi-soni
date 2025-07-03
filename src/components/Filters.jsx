import { Filter } from "lucide-react"
import { TIME_FILTERS, STATUS_FILTERS } from "../lib/constants.js"
import FilterDropdown from "./FilterDropdown.jsx"

export default function Filters({
  timeFilter,
  statusFilter,
  onTimeFilterChange,
  onStatusFilterChange,
}) {
  return (
    <div className="flex items-center gap-4 mb-4 justify-between flex-wrap px-20">
      <FilterDropdown value={timeFilter} options={TIME_FILTERS} onChange={onTimeFilterChange} icon={Filter} />

      <FilterDropdown value={statusFilter} options={STATUS_FILTERS} onChange={onStatusFilterChange} />
    </div>
  )
}
