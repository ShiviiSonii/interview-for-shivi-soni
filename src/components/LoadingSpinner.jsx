export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <div className="text-lg text-gray-600">Loading SpaceX launches...</div>
      </div>
    </div>
  )
}
