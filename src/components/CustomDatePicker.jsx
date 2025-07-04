"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function CustomDatePicker({ onSubmit, onCancel }) {
  const [range, setRange] = useState({ from: null, to: null })
  const [leftMonth, setLeftMonth] = useState(new Date())
  const [rightMonth, setRightMonth] = useState(() => {
    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    return nextMonth
  })

  const handleSubmit = () => {
    if (range?.from && range?.to) {
      onSubmit({ start: range.from, end: range.to })
    }
  }

  const isValidRange = range?.from && range?.to

  const formatDateRange = () => {
    if (!range?.from) return "Select start date"
    if (!range?.to) return `${range.from.toLocaleDateString()} - Select end date`
    return `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
  }

  const getDayCount = () => {
    if (range?.from && range?.to) {
      return Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24)) + 1
    }
    return 0
  }

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

  const currentYear = new Date().getFullYear()
  const yearOptions = []
  for (let year = 2000; year <= new Date().getFullYear() + 2; year++) {
    yearOptions.push(year)
  }

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[95vh] flex flex-col p-0">
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

        <div className="flex-1 overflow-y-auto">
          {/* Desktop: Two months side by side with separate controls */}
          <div className="">
            <div className="flex md:flex-row flex-col justify-center lg:gap-8 gap-2">
              {/* Left Calendar */}
              <div className="flex flex-col items-center gap-4">
                {/* Left Month/Year Navigation */}
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

                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={1}
                  month={leftMonth}
                  className="rounded-lg border shadow-sm"
                  classNames={{
                    month: "space-y-4",
                    caption: "hidden",
                    nav: "hidden",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex mb-2",
                    head_cell:
                      "text-muted-foreground rounded-md w-10 h-10 font-normal text-sm flex items-center justify-center",
                    row: "flex w-full mt-1",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                    day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground font-semibold",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-none",
                    day_hidden: "invisible",
                  }}
                />
              </div>

              {/* Right Calendar */}
              <div className="flex flex-col items-center gap-4">
                {/* Right Month/Year Navigation */}
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

                <Calendar
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={1}
                  month={rightMonth}
                  className="rounded-lg border shadow-sm"
                  classNames={{
                    month: "space-y-4",
                    caption: "hidden",
                    nav: "hidden",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex mb-2",
                    head_cell:
                      "text-muted-foreground rounded-md w-10 h-10 font-normal text-sm flex items-center justify-center",
                    row: "flex w-full mt-1",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                    day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                    day_selected:
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                    day_today: "bg-accent text-accent-foreground font-semibold",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-none",
                    day_hidden: "invisible",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 p-4 sm:p-6 border-t bg-muted/20">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:items-center sm:justify-between">
            <div className="text-sm text-muted-foreground order-2 sm:order-1">
              {isValidRange && (
                <span className="font-medium">
                  {getDayCount()} day{getDayCount() !== 1 ? "s" : ""} selected
                </span>
              )}
            </div>
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
