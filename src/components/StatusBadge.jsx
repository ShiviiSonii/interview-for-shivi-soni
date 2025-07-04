import { Badge } from "@/components/ui/badge"
import { getStatusInfo } from "../lib/helper.js"

export default function StatusBadge({ launch }) {
  // Get status text and corresponding styles for the given launch
  const { status, className } = getStatusInfo(launch)

  // Render the status inside a styled badge
  return <Badge className={className}>{status}</Badge>
}
