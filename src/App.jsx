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
  // Getting all required values and handlers from the custom hook
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

  // State to manage selected launch and modal visibility
  const [selectedFlightNumber, setSelectedFlightNumber] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Open modal with selected flight number
  const handleLaunchClick = (flightNumber) => {
    setSelectedFlightNumber(flightNumber)
    setIsModalOpen(true)
  }

  // Close modal and clear selected flight
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedFlightNumber(null)
  }

  return (
    <div className="py-4">
      {/* App header */}
      <Header />

      {/* Filter section for time, status, and sorting */}
      <Filters
        timeFilter={timeFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onTimeFilterChange={handleTimeFilterChange}
        onStatusFilterChange={handleStatusFilterChange}
        onSortChange={handleSortChange}
      />

      {/* Table showing launches */}
      <LaunchesTable
        launches={launches}
        loading={loading}
        error={error}
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        onLaunchClick={handleLaunchClick}
      />

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />

      {/* Modal showing details of selected launch */}
      <LaunchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        flightNumber={selectedFlightNumber}
      />
    </div>
  );
}
