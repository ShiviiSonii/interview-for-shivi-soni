import { ITEMS_PER_PAGE } from "@/lib/constants.js"
import useSpaceXLaunches from "@/hooks/useSpaceXLaunches.js"

import Header from "@/components/Header.jsx"
import Filters from "@/components/Filters.jsx"
import LaunchesTable from "@/components/LaunchesTable.jsx"
import Pagination from "@/components/Pagination.jsx"
import LoadingSpinner from "@/components/LoadingSpinner.jsx"
import LaunchModal from "./components/LaunchModal"
import { useState } from "react"

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
    handleSortChange
  } = useSpaceXLaunches();

  const [selectedFlightNumber, setSelectedFlightNumber] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLaunchClick = (flightNumber) => {
    setSelectedFlightNumber(flightNumber)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedFlightNumber(null)
  }


  return (
    <div className="container mx-auto py-4">
      <Header />

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
            loading={loading}
            error={error}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onLaunchClick={handleLaunchClick}
          />


          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
          />

          <LaunchModal isOpen={isModalOpen} onClose={handleCloseModal} flightNumber={selectedFlightNumber} />
    </div>
  );
}

