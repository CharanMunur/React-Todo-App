"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate }) {
  return (
    <div className="relative w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "h-9 w-full justify-between text-left font-normal pr-9",
              !date && "text-muted-foreground"
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <CalendarIcon className="h-4 w-4" />
              {date ? format(date, "MMM d, yyyy") : "Pick a date"}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" sideOffset={6}>
          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {date && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDate(null);
          }}
          aria-label="Clear due date"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
