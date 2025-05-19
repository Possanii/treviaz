import { IReserve } from '@treviaz/entities/schemas/IReserve'

export const calendarModes = ['day', 'week', 'month'] as const
export type Mode = (typeof calendarModes)[number]

export type CalendarProps = {
  events: IReserve[]
  setEvents: (events: IReserve[]) => void
  mode: Mode
  setMode: (mode: Mode) => void
  date: Date
  setDate: (date: Date) => void
  calendarIconIsToday?: boolean
}

export type CalendarContextType = CalendarProps & {
  newEventDialogOpen: boolean
  setNewEventDialogOpen: (open: boolean) => void
  newLeisureAreaDialogOpen: boolean
  setNewLeisureAreaDialogOpen: (open: boolean) => void
  manageEventDialogOpen: boolean
  setManageEventDialogOpen: (open: boolean) => void
  selectedEvent: IReserve | null
  setSelectedEvent: (event: IReserve | null) => void
}
