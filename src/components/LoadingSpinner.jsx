export default function LoadingSpinner() {
  return (
    // Center the spinner both vertically and horizontally
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning circle animation */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>

        {/* Loading text */}
        <div className="text-lg text-gray-600">Loading SpaceX launches...</div>
      </div>
    </div>
  )
}
