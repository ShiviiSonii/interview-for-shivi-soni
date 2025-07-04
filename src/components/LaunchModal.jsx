import { useState, useEffect } from "react"
import { X, Play } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { fetchLaunchDetails } from "../lib/api.js"
import { formatDetailedDate, getPayloadInfo } from "../lib/helper.js"
import StatusBadge from "./StatusBadge.jsx"

export default function LaunchModal({ isOpen, onClose, flightNumber }) {
  const [launch, setLaunch] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch launch details whenever modal opens with a valid flight number
  useEffect(() => {
    if (isOpen && flightNumber) {
      loadLaunchDetails()
    }
  }, [isOpen, flightNumber])

  // Function to load launch details from API
  const loadLaunchDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchLaunchDetails(flightNumber)
      setLaunch(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Don't render anything if modal is closed
  if (!isOpen) return null

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm border-2">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Show error message if API call fails
  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-sm border-2">
          <div className="text-center py-8">
            <div className="text-red-600 mb-2">Error loading launch details</div>
            <div className="text-gray-600">{error}</div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Return nothing if no launch data available
  if (!launch) return null

  const payloadInfo = getPayloadInfo(launch)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-2 gap-0 bg-white rounded-lg h-auto max-h-[620px] overflow-auto">
        <div className="p-4 space-y-4">
          {/* Header Section: Patch image + mission info + action icons */}
          <div className="flex items-start gap-3">
            {/* Mission Patch */}
            <div className="flex-shrink-0">
              {launch.links?.mission_patch ? (
                <img
                  src={launch.links.mission_patch || "/placeholder.svg"}
                  alt={`${launch.mission_name} mission patch`}
                  className="w-14 h-14 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=48&width=48"
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No Patch</span>
                </div>
              )}
            </div>

            {/* Mission Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-semibold text-black">{launch.mission_name}</h2>
                <StatusBadge launch={launch} />
              </div>
              <p className="text-sm text-gray-600 mb-2">{launch.rocket.rocket_name}</p>

              {/* Action Icons: NASA, Wikipedia, YouTube */}
              <div className="flex items-center gap-1">
                <img src="./nasa.png" alt="nasa logo" height={"auto"} width={20}/>

                {launch.links?.wikipedia && (
                  <button
                    onClick={() => window.open(launch.links.wikipedia, "_blank")}
                    title="Wikipedia"
                  >
                    <img src="./wikipedia.png" alt="wikipedia logo" height={"auto"} width={20}/>
                  </button>
                )}

                {launch.links?.video_link && (
                  <button
                    onClick={() => window.open(launch.links.video_link, "_blank")}
                    title="Watch Video"
                  >
                    <img src="./youtube.png" alt="youtube logo" height={"auto"} width={20}/>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Launch Description with Wikipedia link */}
          {launch.details && (
            <div>
              <p className="text-sm text-gray-800 leading-relaxed">
                {launch.details}
                {launch.links?.wikipedia && (
                  <>
                    {" "}
                    <a
                      href={launch.links.wikipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Wikipedia
                    </a>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Launch Details Table */}
          <div className="space-y-0">
            <DetailRow label="Flight Number" value={launch.flight_number} />
            <DetailRow label="Mission Name" value={launch.mission_name} />
            <DetailRow label="Rocket Type" value={launch.rocket.rocket_type || "v1.0"} />
            <DetailRow label="Rocket Name" value={launch.rocket.rocket_name} />
            <DetailRow label="Manufacturer" value={payloadInfo.manufacturer} />
            <DetailRow label="Nationality" value={payloadInfo.nationality} />
            <DetailRow label="Launch Date" value={formatDetailedDate(launch.launch_date_utc)} />
            <DetailRow label="Payload Type" value={payloadInfo.type} />
            <DetailRow label="Orbit" value={launch.rocket?.second_stage?.payloads?.[0]?.orbit || "ISS"} />
            <DetailRow
              label="Launch Site"
              value={launch.launch_site.site_id?.toUpperCase() || launch.launch_site.site_name}
              isLast={true}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper component to display a row in the details section
function DetailRow({ label, value, isLast = false }) {
  return (
    <div className={`flex items-center py-2.5 ${!isLast ? "border-b border-gray-200" : ""}`}>
      <span className="text-sm text-gray-600 min-w-[150px]">{label}</span>
      <span className="text-sm text-black font-normal">{value}</span>
    </div>
  )
}
