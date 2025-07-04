import { useState, useEffect, useCallback, useRef } from "react";
import { fetchSpaceXLaunches, fetchTotalLaunches } from "@/lib/api.js";
import { getDateRange } from "@/lib/helper.js";
import { ITEMS_PER_PAGE } from "@/lib/constants.js";

export default function useSpaceXLaunches() {
  // State variables to manage launch data and UI state
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customDateRange, setCustomDateRange] = useState(null);

  const debounceRef = useRef(null); // Used for debouncing API calls

  // Function to fetch launches and total count based on current filters
  const loadLaunches = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);

        const offset = (page - 1) * ITEMS_PER_PAGE;

        // Get date range based on filter (or custom date)
        const dateRange = getDateRange(timeFilter, customDateRange);

        const filters = {
          limit: ITEMS_PER_PAGE,
          offset,
          statusFilter,
          dateRange,
        };

        // Fetch data and total count in parallel
        const [launchData, total] = await Promise.all([
          fetchSpaceXLaunches(filters),
          fetchTotalLaunches(filters),
        ]);

        setLaunches(launchData);
        setTotalItems(total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [timeFilter, statusFilter, customDateRange]
  );

  // Trigger data reload when filters change (debounced)
  useEffect(() => {
    setCurrentPage(1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      loadLaunches(1);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [loadLaunches]);

  // Handle page change from pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadLaunches(page);
  };

  // Handle time filter (and optional custom range)
  const handleTimeFilterChange = (filter, range = null) => {
    setTimeFilter(filter);
    if (filter === "custom" && range) {
      setCustomDateRange(range);
    } else {
      setCustomDateRange(null);
    }
  };

  // Handle status filter change
  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Expose data and handlers to the component using the hook
  return {
    launches,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    timeFilter,
    statusFilter,
    customDateRange,
    handlePageChange,
    handleTimeFilterChange,
    handleStatusFilterChange,
  };
}
