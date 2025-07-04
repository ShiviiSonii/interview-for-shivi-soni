import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

// List of month names used in dropdowns
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export default function CustomDatePicker({ onSubmit, onCancel }) {
  // State to store the selected date range
  const [range, setRange] = useState({ from: null, to: null })

  // State to control the left calendar month/year
  const [leftMonth, setLeftMonth] = useState(new Date())

  // State to control the right calendar month/year (defaults to next month)
  const [rightMonth, setRightMonth] = useState(() => {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    return nextMonth
  })

  // Handles the "Apply Range" button click
  const handleSubmit = () => {
    if (range?.from && range?.to) {
      onSubmit({ start: range.from, end: range.to })
    }
  }

  // Checks if a valid date range is selected
  const isValidRange = range?.from && range?.to

  // Formats the selected date range into a readable string
  const formatDateRange = () => {
    if (!range?.from) return "Select start date"
    if (!range?.to) return `${range.from.toLocaleDateString()} - Select end date`
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
  }

  // Calculates total number of selected days
  const getDayCount = () => {
    if (range?.from && range?.to) {
      return Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) + 1
    }
    return 0
  }

  // Handlers for changing left calendar month/year
  const handleLeftMonthChange = (monthIndex) => {
    const newDate = new Date(leftMonth)
    newDate.setMonth(Number.parseInt(monthIndex))
    setLeftMonth(newDate)
  }

  const handleLeftYearChange = (year) => {
    const newDate = new Date(leftMonth)
    newDate.setFullYear(Number.parseInt(year))
    setLeftMonth(newDate)
  }

  // Handlers for changing right calendar month/year
  const handleRightMonthChange = (monthIndex) => {
    const newDate = new Date(rightMonth)
    newDate.setMonth(Number.parseInt(monthIndex))
    setRightMonth(newDate)
  }

  const handleRightYearChange = (year) => {
    const newDate = new Date(rightMonth)
    newDate.setFullYear(Number.parseInt(year))
    setRightMonth(newDate)
  }

  // Month navigation buttons
  const navigateLeftMonth = (direction) => {
    const newDate = new Date(leftMonth)
    newDate.setMonth(leftMonth.getMonth() + direction)
    setLeftMonth(newDate)
  }

  const navigateRightMonth = (direction) => {
    const newDate = new Date(rightMonth)
    newDate.setMonth(rightMonth.getMonth() + direction)
    setRightMonth(newDate)
  }

  // Generates a list of year options for dropdown (from 2000 to 2 years ahead)
  const yearOptions = []
  for (let year = 2000; year <= new Date().getFullYear() + 2; year++) {
    yearOptions.push(year)
  }

  return (
    // Dialog container (modal)
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[95vh] flex flex-col p-0">

        {/* Header section with title and selected range summary */}
        <DialogHeader className="flex-shrink-0 p-4 sm:p-6 border-b">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Select Custom Date Range
          </DialogTitle>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-muted-foreground">{formatDateRange()}</p>
            {isValidRange && (
              <p className="text-xs text-primary font-medium">
                {getDayCount()} day{getDayCount() !== 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        </DialogHeader>

        {/* Calendar section */}
        <div className="flex-1 overflow-y-auto">
          {/* Layout container for both calendars */}
          <div className="flex md:flex-row flex-col justify-center lg:gap-8 gap-2">
            
            {/* Left Calendar (current month) */}
            <div className="flex flex-col items-center gap-4">

              {/* Month & Year selection + nav for left calendar */}
              <div className="flex items-center justify-center md:justify-between gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateLeftMonth(-1)} className="h-9 w-9">
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Select value={leftMonth.getMonth().toString()} onValueChange={handleLeftMonthChange}>
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={leftMonth.getFullYear().toString()} onValueChange={handleLeftYearChange}>
                    <SelectTrigger className="w-[85px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="icon" onClick={() => navigateLeftMonth(1)} className="h-9 w-9">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar UI itself */}
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={1}
                month={leftMonth}
                className="rounded-lg border shadow-sm"
                classNames={{ /* customized styles omitted here for brevity */ }}
              />
            </div>

            {/* Right Calendar (next month) */}
            <div className="flex flex-col items-center gap-4">
              
              {/* Month & Year selection + nav for right calendar */}
              <div className="flex items-center justify-center md:justify-between gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateRightMonth(-1)} className="h-9 w-9">
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Select value={rightMonth.getMonth().toString()} onValueChange={handleRightMonthChange}>
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month, index) => (
                        <SelectItem key={index} value={index.toString()}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={rightMonth.getFullYear().toString()} onValueChange={handleRightYearChange}>
                    <SelectTrigger className="w-[85px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" size="icon" onClick={() => navigateRightMonth(1)} className="h-9 w-9">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar UI itself */}
              <Calendar
                mode="range"
                selected={range}
                onSelect={setRange}
                numberOfMonths={1}
                month={rightMonth}
                className="rounded-lg border shadow-sm"
                classNames={{ /* customized styles omitted here for brevity */ }}
              />
            </div>
          </div>
        </div>

        {/* Footer with Cancel and Apply buttons */}
        <DialogFooter className="flex-shrink-0 p-4 sm:p-6 border-t bg-muted/20">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:items-center sm:justify-between">
            {/* Info text */}
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              {isValidRange && (
                <span className="font-medium">
                  {getDayCount()} day{getDayCount() !== 1 ? "s" : ""} selected
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 order-1 sm:order-2">
              <Button variant="outline" onClick={onCancel} className="flex-1 sm:flex-none min-w-[100px] bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!isValidRange} className="flex-1 sm:flex-none min-w-[120px]">
                Apply Range
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
