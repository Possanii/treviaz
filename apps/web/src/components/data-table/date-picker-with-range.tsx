'use client'

import { kbdVariants } from '@treviaz/ui/components/custom/kbd'
import { Button } from '@treviaz/ui/components/ui/button'
import { Calendar } from '@treviaz/ui/components/ui/calendar'
import { Input } from '@treviaz/ui/components/ui/input'
import { Label } from '@treviaz/ui/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@treviaz/ui/components/ui/popover'
import { Separator } from '@treviaz/ui/components/ui/separator'
import { cn } from '@treviaz/ui/lib/utils'
import { addDays, addHours, endOfDay, format, startOfDay } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { type DateRange } from 'react-day-picker'

import { useDebounce } from '@/hooks/use-debounce'

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  setDate: (date: DateRange | undefined) => void
}

// AND presets
export function DatePickerWithRange({
  className,
  date,
  setDate,
}: DatePickerWithRangeProps) {
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      presets.forEach((preset) => {
        if (preset.shortcut === e.key) {
          setDate({ from: preset.from, to: preset.to })
        }
      })
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setDate])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="sm"
            className={cn(
              'max-w-full justify-start truncate text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <span className="truncate">
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </span>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex justify-between">
            <DatePresets onSelect={setDate} selected={date} />
            <Separator orientation="vertical" className="h-auto w-[px]" />
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
          </div>
          <Separator />
          <CustomDateRange onSelect={setDate} selected={date} />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// TODO: probably move to `constants` file
const presets = [
  {
    label: 'Today',
    from: startOfDay(new Date()),
    to: endOfDay(new Date()),
    shortcut: 'd', // day
  },
  {
    label: 'Yesterday',
    from: startOfDay(addDays(new Date(), -1)),
    to: endOfDay(addDays(new Date(), -1)),
    shortcut: 'y',
  },
  {
    label: 'Last hour',
    from: addHours(new Date(), -1),
    to: new Date(),
    shortcut: 'h',
  },
  {
    label: 'Last 7 days',
    from: startOfDay(addDays(new Date(), -7)),
    to: endOfDay(new Date()),
    shortcut: 'w',
  },
  {
    label: 'Last 14 days',
    from: startOfDay(addDays(new Date(), -14)),
    to: endOfDay(new Date()),
    shortcut: 'b', // bi-weekly
  },
  {
    label: 'Last 30 days',
    from: startOfDay(addDays(new Date(), -30)),
    to: endOfDay(new Date()),
    shortcut: 'm',
  },
]

function DatePresets({
  selected,
  onSelect,
}: {
  selected: DateRange | undefined
  onSelect: (date: DateRange | undefined) => void
}) {
  return (
    <div className="flex flex-col gap-2 p-3">
      <p className="mx-3 text-xs uppercase text-muted-foreground">Date Range</p>
      <div className="grid gap-1">
        {presets.map(({ label, shortcut, from, to }) => {
          const isActive = selected?.from === from && selected?.to === to
          return (
            <Button
              key={label}
              variant={isActive ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => onSelect({ from, to })}
              className={cn(
                'flex items-center justify-between gap-6',
                !isActive && 'border border-transparent'
              )}
            >
              <span className="mr-auto">{label}</span>
              <span className={cn(kbdVariants(), 'uppercase')}>{shortcut}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

// REMINDER: We can add min max date range validation https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#setting_maximum_and_minimum_dates_and_times
function CustomDateRange({
  selected,
  onSelect,
}: {
  selected: DateRange | undefined
  onSelect: (date: DateRange | undefined) => void
}) {
  const [dateFrom, setDateFrom] = React.useState<Date | undefined>(
    selected?.from
  )
  const [dateTo, setDateTo] = React.useState<Date | undefined>(selected?.to)
  const debounceDateFrom = useDebounce(dateFrom, 1000)
  const debounceDateTo = useDebounce(dateTo, 1000)

  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return ''
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return utcDate.toISOString().slice(0, 16)
  }

  React.useEffect(() => {
    onSelect({ from: debounceDateFrom, to: debounceDateTo })
  }, [debounceDateFrom, debounceDateTo])

  return (
    <div className="flex flex-col gap-2 p-3">
      <p className="text-xs uppercase text-muted-foreground">Custom Range</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="from">Start</Label>
          <Input
            key={formatDateForInput(selected?.from)}
            type="datetime-local"
            id="from"
            name="from"
            defaultValue={formatDateForInput(selected?.from)}
            onChange={(e) => {
              const newDate = new Date(e.target.value)
              if (!Number.isNaN(newDate.getTime())) {
                setDateFrom(newDate)
              }
            }}
            disabled={!selected?.from}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="to">End</Label>
          <Input
            key={formatDateForInput(selected?.to)}
            type="datetime-local"
            id="to"
            name="to"
            defaultValue={formatDateForInput(selected?.to)}
            onChange={(e) => {
              const newDate = new Date(e.target.value)
              if (!Number.isNaN(newDate.getTime())) {
                setDateTo(newDate)
              }
            }}
            disabled={!selected?.to}
          />
        </div>
      </div>
    </div>
  )
}
