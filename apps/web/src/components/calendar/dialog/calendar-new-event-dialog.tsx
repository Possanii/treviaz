import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { ColorPicker } from '@treviaz/ui/components/custom/color-picker'
import { DateTimePicker } from '@treviaz/ui/components/custom/date-time-picker'
import { SelectLeisureArea } from '@treviaz/ui/components/custom/select-leisure-areas'
import { Button } from '@treviaz/ui/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@treviaz/ui/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@treviaz/ui/components/ui/form'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useMutationCreateReserve } from '@/hooks/react-query/mutations/reserve/create-reserve-mutation'
import { useQueryGetLeisureAreasFromCondominium } from '@/hooks/react-query/queries/leisure-area/get-leisure-areas-from-condominium-query'
import { useQueryGetReservesFromCondominium } from '@/hooks/react-query/queries/reserves/get-reserves-from-condominium-query'
import { queryClient } from '@/lib/query-client'

import { useCalendarContext } from '../calendar-context'

const formSchema = z
  .object({
    id: z.string().uuid(),
    start: z.string().datetime(),
    end: z.string().datetime(),
    color: z.string(),
  })
  .refine(
    (data) => {
      const start = new Date(data.start)
      const end = new Date(data.end)
      return end >= start
    },
    {
      message: 'End time must be after start time',
      path: ['end'],
    }
  )

export default function CalendarNewEventDialog() {
  const { newEventDialogOpen, setNewEventDialogOpen, date } =
    useCalendarContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      start: format(date, "yyyy-MM-dd'T'HH:mm"),
      end: format(date, "yyyy-MM-dd'T'HH:mm"),
      color: 'blue',
    },
  })

  const { mutateAsync } = useMutationCreateReserve()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync({
      body: {
        start_date: new Date(values.start),
        end_date: new Date(values.end),
      },
      leisureAreaId: { id: values.id },
    })
    await queryClient.invalidateQueries(
      useQueryGetReservesFromCondominium({ slug })
    )
    setNewEventDialogOpen(false)
    form.reset()
  }

  const { slug } = useParams<{ slug: string }>()

  const { data } = useQuery(useQueryGetLeisureAreasFromCondominium({ slug }))

  return (
    <Dialog open={newEventDialogOpen} onOpenChange={setNewEventDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SelectLeisureArea
              control={form.control}
              fieldName={'id'}
              leisureAreas={data?.leisureAreas ?? []}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Start</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">End</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Color</FormLabel>
                  <FormControl>
                    <ColorPicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Create event</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
