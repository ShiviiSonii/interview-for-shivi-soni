import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TABLE_COLUMNS } from "@/lib/constants.js"
import { formatDate, getOrbit } from "@/lib/helper.js"
import StatusBadge from "./StatusBadge.jsx"
import LoadingSpinner from "./LoadingSpinner.jsx"

export default function LaunchesTable({ launches, loading, error, currentPage, itemsPerPage, onLaunchClick }) {
  const startIndex = (currentPage - 1) * itemsPerPage

  return (
    <div className="w-full page_layout">
    <div className="border rounded-lg h-auto min-h-[70vh] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {TABLE_COLUMNS.map((column) => (
              <TableHead key={column.key} className={column.width}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={TABLE_COLUMNS.length} className="text-center py-10">
                <LoadingSpinner />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={TABLE_COLUMNS.length} className="text-center text-red-600 py-10">
                Error loading data: {error}
              </TableCell>
            </TableRow>
          ) : launches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={TABLE_COLUMNS.length} className="text-center py-10">
                No results found for the specified filter
              </TableCell>
            </TableRow>
          ) : (
            launches.map((launch, index) => (
              <TableRow
                key={launch.flight_number}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onLaunchClick(launch.flight_number)}
              >
                <TableCell className="font-medium">
                  {String(startIndex + index + 1).padStart(2, "0")}
                </TableCell>
                <TableCell>{formatDate(launch.launch_date_utc)}</TableCell>
                <TableCell>{launch.launch_site.site_name}</TableCell>
                <TableCell className="font-medium">{launch.mission_name}</TableCell>
                <TableCell>{getOrbit(launch)}</TableCell>
                <TableCell>
                  <StatusBadge launch={launch} />
                </TableCell>
                <TableCell>{launch.rocket.rocket_name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  )
}
