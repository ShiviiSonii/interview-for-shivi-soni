import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function FilterDropdown({ value, options, onChange, icon: Icon, className = "" }) {
  // Get the currently selected option object based on the value
  const selectedOption = options.find((opt) => opt.value === value) || options[0]

  return (
    <DropdownMenu>
      {/* Button that triggers the dropdown */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`gap-2 bg-transparent ${className}`}>
          {/* Optional icon on the left */}
          {Icon && <Icon className="h-4 w-4" />}
          {/* Selected option label */}
          {selectedOption.label}
          {/* Chevron down icon on the right */}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      {/* Dropdown list of options */}
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
