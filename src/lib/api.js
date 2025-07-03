import { API_URL } from "./constants.js";
import { buildQueryParams } from "./helper.js";

export const fetchSpaceXLaunches = async (filters = {}) => {
  try {
    const { pathSuffix, queryString } = buildQueryParams(filters);
    const url = `${API_URL}${pathSuffix}${
      queryString ? `?${queryString}` : ""
    }`;

    console.log("Fetching from:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching SpaceX launches:", error);
    throw error;
  }
};

export const fetchTotalLaunches = async (filters = {}) => {
  try {
    // Remove limit/offset to get full dataset
    const filtersForCount = { ...filters };
    delete filtersForCount.limit;
    delete filtersForCount.offset;

    const { pathSuffix, queryString } = buildQueryParams(filtersForCount);
    const url = `${API_URL}${pathSuffix}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.length;
  } catch (error) {
    console.error("Error fetching total launches:", error);
    return 0;
  }
};

export const fetchLaunchDetails = async (flightNumber) => {
  try {
    const url = `${API_URL}/${flightNumber}`;
    console.log("Fetching launch details from:", url);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching launch details:", error);
    throw error;
  }
};
