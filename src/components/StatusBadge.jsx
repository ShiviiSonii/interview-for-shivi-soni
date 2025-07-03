import { Badge } from "@/components/ui/badge"
import { getStatusInfo } from "../lib/helper.js"

export default function StatusBadge({ launch }) {
  const { status, className } = getStatusInfo(launch)

  return <Badge className={className}>{status}</Badge>
}
