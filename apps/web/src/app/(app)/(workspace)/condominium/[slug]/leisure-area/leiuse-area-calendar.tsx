'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { IReserve } from '@treviaz/entities/schemas/IReserve'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import Calendar from '@/components/calendar/calendar'
import { Mode } from '@/components/calendar/calendar-types'
import { useQueryGetReservesFromCondominium } from '@/hooks/react-query/queries/reserves/get-reserves-from-condominium-query'

export default function LeisureAreaCalendar() {
  const { slug } = useParams<{ slug: string }>()

  const { data } = useSuspenseQuery(
    useQueryGetReservesFromCondominium({ slug })
  )
  const [events, setEvents] = useState<IReserve[]>(data.reserves)
  const [mode, setMode] = useState<Mode>('month')
  const [date, setDate] = useState<Date>(new Date())

  return (
    <Calendar
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
    />
  )
}
