import { API_URL } from "./constants.js";
import { buildQueryParams } from "./helper.js";

// Fetch SpaceX launches with optional filters (status, date range, etc.)
export const fetchSpaceXLaunches = async (filters = {}) => {
  try {
    // Build URL with query parameters and path suffix
    const { pathSuffix, queryString } = buildQueryParams(filters);
    const url = `${API_URL}${pathSuffix}${
      queryString ? `?${queryString}` : ""
    }`;

    console.log("Fetching from:", url);

    // Make API call
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching SpaceX launches:", error);
    throw error;
  }
};

// Fetch total number of launches matching given filters (excluding pagination)
export const fetchTotalLaunches = async (filters = {}) => {
  try {
    // Remove limit and offset to count all matching launches
    const filtersForCount = { ...filters };
    delete filtersForCount.limit;
    delete filtersForCount.offset;

    // Build URL
    const { pathSuffix, queryString } = buildQueryParams(filtersForCount);
    const url = `${API_URL}${pathSuffix}${
      queryString ? `?${queryString}` : ""
    }`;

    // Make API call
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return count of total launches
    const data = await response.json();
    return data.length;
  } catch (error) {
    console.error("Error fetching total launches:", error);
    return 0;
  }
};

// Fetch detailed info for a specific launch by flight number
export const fetchLaunchDetails = async (flightNumber) => {
  try {
    const url = `${API_URL}/${flightNumber}`;
    console.log("Fetching launch details from:", url);

    // Make API call
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return detailed data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching launch details:", error);
    throw error;
  }
};
