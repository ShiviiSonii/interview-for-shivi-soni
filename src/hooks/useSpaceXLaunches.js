"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchSpaceXLaunches, fetchTotalLaunches } from "@/lib/api.js";
import { getDateRange } from "@/lib/helper.js";
import { ITEMS_PER_PAGE } from "@/lib/constants.js";

export default function useSpaceXLaunches() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [timeFilter, setTimeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customDateRange, setCustomDateRange] = useState(null);
  const debounceRef = useRef(null);

  const loadLaunches = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);
        const offset = (page - 1) * ITEMS_PER_PAGE;

        // Pass customDateRange to getDateRange when timeFilter is "custom"
        const dateRange = getDateRange(timeFilter, customDateRange);

        const filters = {
          limit: ITEMS_PER_PAGE,
          offset,
          statusFilter,
          dateRange,
        };

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
    [timeFilter, statusFilter, customDateRange] // Add customDateRange to dependencies
  );

  useEffect(() => {
    setCurrentPage(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadLaunches(1);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [loadLaunches]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    loadLaunches(page);
  };

  const handleTimeFilterChange = (filter, range = null) => {
    setTimeFilter(filter);
    if (filter === "custom" && range) {
      setCustomDateRange(range);
    } else {
      setCustomDateRange(null);
    }
  };

  const handleStatusFilterChange = (filter) => {
    setStatusFilter(filter);
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return {
    launches,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    timeFilter,
    statusFilter,
    customDateRange, // Expose customDateRange for debugging
    handlePageChange,
    handleTimeFilterChange,
    handleStatusFilterChange,
  };
}
