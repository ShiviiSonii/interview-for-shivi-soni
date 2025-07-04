"use client"

import { useState } from "react"
import { ChevronDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import CustomDatePicker from "./CustomDatePicker"

export default function DateDropdown({ value, options, onChange, icon: Icon, className = "", customDateRange = null }) {
  const [showCustomPicker, setShowCustomPicker] = useState(false)

  // Handle custom range display
  const getDisplayLabel = () => {
    if (value === "custom" && customDateRange) {
      const startDate = new Date(customDateRange.start).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      const endDate = new Date(customDateRange.end).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      return `${startDate} - ${endDate}`
    }
    const selectedOption = options.find((opt) => opt.value === value)
    return selectedOption ? selectedOption.label : options[0].label
  }

  const handleSelect = (val) => {
    if (val === "custom") {
      setShowCustomPicker(true)
    } else {
      setShowCustomPicker(false)
      onChange(val)
    }
  }

  const handleCustomSubmit = (range) => {
    onChange("custom", range)
    setShowCustomPicker(false)
  }

  const handleCustomCancel = () => {
    setShowCustomPicker(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={`gap-2 bg-transparent min-w-0 ${className}`} size="sm">
            {Icon ? <Icon className="h-4 w-4 flex-shrink-0" /> : <Calendar className="h-4 w-4 flex-shrink-0" />}
            <span className="truncate max-w-32 sm:max-w-48 text-left">{getDisplayLabel()}</span>
            <ChevronDown className="h-4 w-4 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer ${value === option.value ? "bg-accent" : ""}`}
            >
              <span className="flex items-center gap-2">
                {option.value === "custom" && <Calendar className="h-4 w-4" />}
                {option.label}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {showCustomPicker && <CustomDatePicker onSubmit={handleCustomSubmit} onCancel={handleCustomCancel} />}
    </>
  )
}
