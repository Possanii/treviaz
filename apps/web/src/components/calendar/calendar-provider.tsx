import { IReserve } from '@treviaz/entities/schemas/IReserve'
import { useState } from 'react'

import CalendarNewLeisureAreaDialog from '@/components/calendar/dialog/calendar-new-leisure-area-dialog'

import { CalendarContext } from './calendar-context'
import { Mode } from './calendar-types'
import CalendarManageEventDialog from './dialog/calendar-manage-event-dialog'
import CalendarNewEventDialog from './dialog/calendar-new-event-dialog'

export default function CalendarProvider({
  events,
  setEvents,
  mode,
  setMode,
  date,
  setDate,
  calendarIconIsToday = true,
  children,
}: {
  events: IReserve[]
  setEvents: (events: IReserve[]) => void
  mode: Mode
  setMode: (mode: Mode) => void
  date: Date
  setDate: (date: Date) => void
  calendarIconIsToday: boolean
  children: React.ReactNode
}) {
  const [newEventDialogOpen, setNewEventDialogOpen] = useState(false)
  const [newLeisureAreaDialogOpen, setNewLeisureAreaDialogOpen] =
    useState(false)
  const [manageEventDialogOpen, setManageEventDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<IReserve | null>(null)

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        mode,
        setMode,
        date,
        setDate,
        calendarIconIsToday,
        newEventDialogOpen,
        setNewEventDialogOpen,
        newLeisureAreaDialogOpen,
        setNewLeisureAreaDialogOpen,
        manageEventDialogOpen,
        setManageEventDialogOpen,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      <CalendarNewEventDialog />
      <CalendarNewLeisureAreaDialog />
      <CalendarManageEventDialog />
      {children}
    </CalendarContext.Provider>
  )
}
