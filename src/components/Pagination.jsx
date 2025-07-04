import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) {
  const [isMobile, setIsMobile] = useState(false)

  // Detect if the current screen size is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate the index range of items being shown
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // Generate the list of page numbers to display
  const generatePageNumbers = () => {
    if (isMobile) {
      // On mobile, show only previous, current, and next pages
      const pages = []
      if (currentPage > 1) pages.push(currentPage - 1)
      pages.push(currentPage)
      if (currentPage < totalPages) pages.push(currentPage + 1)
      return pages
    }

    // On desktop, show a sliding window of up to 5 pages
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // Adjust if not enough pages at the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 mt-4 w-full page_layout">
      {/* Showing info text */}
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} launches
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center sm:justify-end">
        {/* Previous button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers with optional gaps (on desktop) */}
        {pageNumbers.map((pageNum, idx) => {
          const isGap =
            !isMobile &&
            idx > 0 &&
            pageNum !== pageNumbers[idx - 1] + 1

          return (
            <span key={pageNum} className="flex items-center">
              {isGap && <span className="px-1">...</span>}
              <Button
                variant={currentPage === pageNum ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            </span>
          )
        })}

        {/* Show last page button with gap if needed */}
        {!isMobile && totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-2">...</span>
            <Button variant="outline" size="icon" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}

        {/* Next button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
