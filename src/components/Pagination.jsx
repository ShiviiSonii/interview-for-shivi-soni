import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Pagination({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const generatePageNumbers = () => {
    if (isMobile) {
      const pages = []
      if (currentPage > 1) pages.push(currentPage - 1)
      pages.push(currentPage)
      if (currentPage < totalPages) pages.push(currentPage + 1)
      return pages
    }

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

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
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {totalItems} launches
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center sm:justify-end">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

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

        {!isMobile && totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-2">...</span>
            <Button variant="outline" size="icon" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}

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
