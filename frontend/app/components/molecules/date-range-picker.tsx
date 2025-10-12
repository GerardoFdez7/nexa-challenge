"use client"
import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DateRangePickerProps {
  startDate: string
  endDate: string
  onStartDateChange: (date: string) => void
  onEndDateChange: (date: string) => void
  className?: string
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end ${className}`}>
      <div className="flex-1">
        <Label htmlFor="start-date" className="text-sm font-medium">
          Fecha Inicio
        </Label>
        <div className="relative mt-1">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex-1">
        <Label htmlFor="end-date" className="text-sm font-medium">
          Fecha Fin
        </Label>
        <div className="relative mt-1">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </div>
  )
}
