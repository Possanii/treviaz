import { IReserve } from '@treviaz/entities/schemas/IReserve'
import { cn } from '@treviaz/ui/lib/utils'
import { format, isSameDay, isSameMonth } from 'date-fns'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

import { useCalendarContext } from '@/components/calendar/calendar-context'

interface EventPosition {
  left: string
  width: string
  top: string
  height: string
}

function getOverlappingEvents(
  currentEvent: IReserve,
  events: IReserve[]
): IReserve[] {
  return events.filter((event) => {
    if (event.id === currentEvent.id) return false
    return (
      currentEvent.start_date < event.end_date &&
      currentEvent.end_date > event.start_date &&
      isSameDay(currentEvent.start_date, event.start_date)
    )
  })
}

function calculateEventPosition(
  event: IReserve,
  allEvents: IReserve[]
): EventPosition {
  const overlappingEvents = getOverlappingEvents(event, allEvents)
  const group = [event, ...overlappingEvents].sort(
    (a, b) => a.start_date.getTime() - b.start_date.getTime()
  )
  const position = group.indexOf(event)
  const width = `${100 / (overlappingEvents.length + 1)}%`
  const left = `${(position * 100) / (overlappingEvents.length + 1)}%`

  const startHour = event.start_date.getHours()
  const startMinutes = event.start_date.getMinutes()

  let endHour = event.end_date.getHours()
  let endMinutes = event.end_date.getMinutes()

  if (!isSameDay(event.start_date, event.end_date)) {
    endHour = 23
    endMinutes = 59
  }

  const topPosition = startHour * 128 + (startMinutes / 60) * 128
  const duration = endHour * 60 + endMinutes - (startHour * 60 + startMinutes)
  const height = (duration / 60) * 128

  return {
    left,
    width,
    top: `${topPosition}px`,
    height: `${height}px`,
  }
}

export default function CalendarEvent({
  event,
  month = false,
  className,
}: {
  event: IReserve
  month?: boolean
  className?: string
}) {
  const { events, setSelectedEvent, setManageEventDialogOpen, date } =
    useCalendarContext()
  const style = month ? {} : calculateEventPosition(event, events)

  // Generate a unique key that includes the current month to prevent animation conflicts
  const isEventInCurrentMonth = isSameMonth(event.start_date, date)
  const animationKey = `${event.id}-${
    isEventInCurrentMonth ? 'current' : 'adjacent'
  }`

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          className={cn(
            `px-3 py-1.5 rounded-md truncate cursor-pointer transition-all duration-300 border`,
            !month && 'absolute',
            className
          )}
          style={style}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedEvent(event)
            setManageEventDialogOpen(true)
          }}
          initial={{
            opacity: 0,
            y: -3,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: {
              duration: 0.15,
              ease: 'easeOut',
            },
          }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
            opacity: {
              duration: 0.2,
              ease: 'linear',
            },
            layout: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
          layoutId={`event-${animationKey}-${month ? 'month' : 'day'}`}
        >
          <motion.div
            className={cn(
              `flex flex-col w-full`,
              month && 'flex-row items-center justify-between'
            )}
            layout="position"
          >
            <p className={cn('font-bold truncate', month && 'text-xs')}>
              {event.title}
            </p>
            <p className={cn('text-sm', month && 'text-xs')}>
              <span>{format(event.start_date, 'h:mm a')}</span>
              <span className={cn('mx-1', month && 'hidden')}>-</span>
              <span className={cn(month && 'hidden')}>
                {format(event.end_date, 'h:mm a')}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
