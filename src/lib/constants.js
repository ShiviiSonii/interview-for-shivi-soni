// Base API URL for SpaceX data
export const API_URL = "https://api.spacexdata.com/v3/launches";

// Number of items to show per page in pagination
export const ITEMS_PER_PAGE = 12;

// Time-based filter options for launches
export const TIME_FILTERS = [
  { label: "Any Time", value: "all" },
  { label: "Past Week", value: "1week" },
  { label: "Past Month", value: "1month" },
  { label: "Past 3 Months", value: "3months" },
  { label: "Past 6 Months", value: "6months" },
  { label: "Past Year", value: "1year" },
  { label: "Past 2 Years", value: "2years" },
  { label: "Custom Range", value: "custom" },
];

// Launch status filter options
export const STATUS_FILTERS = [
  { label: "All Launches", value: "all" },
  { label: "Successful", value: "success" },
  { label: "Failed", value: "failed" },
  { label: "Upcoming", value: "upcoming" },
];

// Columns used in the launch table with optional widths
export const TABLE_COLUMNS = [
  { key: "no", label: "No.", width: "w-16" },
  { key: "launched", label: "Launched (UTC)", width: "min-w-48" },
  { key: "location", label: "Location", width: "" },
  { key: "mission", label: "Mission", width: "" },
  { key: "orbit", label: "Orbit", width: "" },
  { key: "status", label: "Launch Status", width: "" },
  { key: "rocket", label: "Rocket", width: "" },
];
