export const API_URL = "https://api.spacexdata.com/v3/launches";

export const ITEMS_PER_PAGE = 12;

export const TIME_FILTERS = [
  { label: "All Time", value: "all" },
  { label: "Past 6 Months", value: "6months" },
  { label: "Past Year", value: "1year" },
  { label: "Past 2 Years", value: "2years" },
];

export const STATUS_FILTERS = [
  { label: "All Launches", value: "all" },
  { label: "Successful", value: "success" },
  { label: "Failed", value: "failed" },
  { label: "Upcoming", value: "upcoming" },
];

export const TABLE_COLUMNS = [
  { key: "no", label: "No.", width: "w-16" },
  { key: "launched", label: "Launched (UTC)", width: "min-w-48" },
  { key: "location", label: "Location", width: "" },
  { key: "mission", label: "Mission", width: "" },
  { key: "orbit", label: "Orbit", width: "" },
  { key: "status", label: "Launch Status", width: "" },
  { key: "rocket", label: "Rocket", width: "" },
];
