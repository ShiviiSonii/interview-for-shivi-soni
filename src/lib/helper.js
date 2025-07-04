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

export const getOrbit = (launch) => {
  return launch.rocket?.second_stage?.payloads?.[0]?.orbit || "N/A";
};

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

export const getDateRange = (timeFilter, customRange = null) => {
  const now = new Date();
  const ranges = {
    "1week": new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
    "1month": new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()),
    "3months": new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
    "6months": new Date(now.getFullYear(), now.getMonth() - 6, now.getDate()),
    "1year": new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()),
    "2years": new Date(now.getFullYear() - 2, now.getMonth(), now.getDate()),
  };

  const format = (date) => date.toISOString().split("T")[0];

  // Handle custom range
  if (timeFilter === "custom" && customRange) {
    return {
      start: format(new Date(customRange.start)),
      end: format(new Date(customRange.end)),
    };
  }

  // Handle predefined ranges
  if (!ranges[timeFilter]) return null;

  return {
    start: format(ranges[timeFilter]),
    end: format(now),
  };
};

export const buildQueryParams = (filters = {}) => {
  const params = new URLSearchParams();
  let pathSuffix = "";

  if (filters.statusFilter && filters.statusFilter !== "all") {
    if (filters.statusFilter === "success") {
      params.append("launch_success", true);
    } else if (filters.statusFilter === "failed") {
      params.append("launch_success", false);
    } else if (filters.statusFilter === "upcoming") {
      pathSuffix = "/upcoming";
    }
  }

  if (filters.limit) params.append("limit", filters.limit);
  if (filters.offset) params.append("offset", filters.offset);

  if (filters.dateRange) {
    params.append("start", filters.dateRange.start);
    params.append("end", filters.dateRange.end);
  }

  return {
    pathSuffix,
    queryString: params.toString(),
  };
};

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

export const getPayloadInfo = (launch) => {
  const payload = launch.rocket?.second_stage?.payloads?.[0];
  if (!payload) return { type: "N/A", manufacturer: "N/A", nationality: "N/A" };

  return {
    type: payload.payload_type || "N/A",
    manufacturer: payload.manufacturer || "N/A",
    nationality: payload.nationality || "N/A",
  };
};
