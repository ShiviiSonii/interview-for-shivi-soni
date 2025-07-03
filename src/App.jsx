import { ITEMS_PER_PAGE } from "@/lib/constants.js"
import useSpaceXLaunches from "@/hooks/useSpaceXLaunches.js"

import Header from "@/components/Header.jsx"
import Filters from "@/components/Filters.jsx"
import LaunchesTable from "@/components/LaunchesTable.jsx"
import Pagination from "@/components/Pagination.jsx"
import LoadingSpinner from "@/components/LoadingSpinner.jsx"

export default function App() {
  const {
    launches,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    timeFilter,
    statusFilter,
    sortBy,
    handlePageChange,
    handleTimeFilterChange,
    handleStatusFilterChange,
    handleSortChange,
  } = useSpaceXLaunches();

  return (
    <div className="container mx-auto py-4">
      <Header />

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-xl text-red-600 mb-2">Error loading launches</div>
            <div className="text-gray-600">{error}</div>
          </div>
        </div>
      ) : (
        <>
          <Filters
            timeFilter={timeFilter}
            statusFilter={statusFilter}
            sortBy={sortBy}
            onTimeFilterChange={handleTimeFilterChange}
            onStatusFilterChange={handleStatusFilterChange}
            onSortChange={handleSortChange}
          />

          <LaunchesTable
            launches={launches}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

