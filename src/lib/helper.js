// Format a given date string to a readable format like "July 04, 2025 at 17:00"
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) +
    " at " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
};

// Get the orbit of the launch from the payload data
export const getOrbit = (launch) => {
  return launch.rocket?.second_stage?.payloads?.[0]?.orbit || "N/A";
};

// Determine the launch status and corresponding CSS classes
export const getStatusInfo = (launch) => {
  if (launch.upcoming) {
    return {
      status: "Upcoming",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    };
  } else if (launch.launch_success === true) {
    return {
      status: "Success",
      className: "bg-green-100 text-green-800 hover:bg-green-100",
    };
  } else if (launch.launch_success === false) {
    return {
      status: "Failed",
      className: "bg-red-100 text-red-800 hover:bg-red-100",
    };
  } else {
    return {
      status: "Unknown",
      className: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };
  }
};

// Generate a date range based on selected time filter or a custom range
export const getDateRange = (timeFilter, customRange = null) => {
  const now = new Date();

  // Define preset ranges based on the current date
  const ranges = {
    "1week": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
    "1month": new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
    "3months": new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
    "6months": new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()),
    "1year": new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
    "2years": new Date(now.getFullYear() - 2, now.getMonth(), now.getDate()),
  };

  const format = (date) => date.toISOString().split("T")[0];

  // If custom range is selected, return it
  if (timeFilter === "custom" && customRange) {
    return {
      start: format(new Date(customRange.start)),
      end: format(new Date(customRange.end)),
    };
  }

  // If no valid preset range, return null
  if (!ranges[timeFilter]) return null;

  // Return selected range with current date as end
  return {
    start: format(ranges[timeFilter]),
    end: format(now),
  };
};

// Build query parameters for API requests based on filters
export const buildQueryParams = (filters = {}) => {
  const params = new URLSearchParams();
  let pathSuffix = "";

  // Add status filters
  if (filters.statusFilter && filters.statusFilter !== "all") {
    if (filters.statusFilter === "success") {
      params.append("launch_success", true);
    } else if (filters.statusFilter === "failed") {
      params.append("launch_success", false);
    } else if (filters.statusFilter === "upcoming") {
      pathSuffix = "/upcoming";
    }
  }

  // Add pagination
  if (filters.limit) params.append("limit", filters.limit);
  if (filters.offset) params.append("offset", filters.offset);

  // Add date range filters
  if (filters.dateRange) {
    params.append("start", filters.dateRange.start);
    params.append("end", filters.dateRange.end);
  }

  return {
    pathSuffix,
    queryString: params.toString(),
  };
};

// Format date with more spacing like "July 04, 2025 17:00"
export const formatDetailedDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
};

// Extract payload details from launch data
export const getPayloadInfo = (launch) => {
  const payload = launch.rocket?.second_stage?.payloads?.[0];

  // If no payload info, return default values
  if (!payload) return { type: "N/A", manufacturer: "N/A", nationality: "N/A" };

  return {
    type: payload.payload_type || "N/A",
    manufacturer: payload.manufacturer || "N/A",
    nationality: payload.nationality || "N/A",
  };
};
