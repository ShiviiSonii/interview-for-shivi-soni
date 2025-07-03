import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TABLE_COLUMNS } from "@/lib/constants.js"
import { formatDate, getOrbit } from "@/lib/helper.js"
import StatusBadge from "./StatusBadge.jsx"

export default function LaunchesTable({ launches, currentPage, itemsPerPage, onLaunchClick }) {
  const startIndex = (currentPage - 1) * itemsPerPage

  return (
    <div className="border rounded-lg overflow-hidden mx-20">
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
          {launches.map((launch, index) => (
            <TableRow key={launch.flight_number} className="hover:bg-gray-50" onClick={() => onLaunchClick(launch.flight_number)}>
              <TableCell className="font-medium">{String(startIndex + index + 1).padStart(2, "0")}</TableCell>
              <TableCell>{formatDate(launch.launch_date_utc)}</TableCell>
              <TableCell>{launch.launch_site.site_name}</TableCell>
              <TableCell className="font-medium">{launch.mission_name}</TableCell>
              <TableCell>{getOrbit(launch)}</TableCell>
              <TableCell>
                <StatusBadge launch={launch} />
              </TableCell>
              <TableCell>{launch.rocket.rocket_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
