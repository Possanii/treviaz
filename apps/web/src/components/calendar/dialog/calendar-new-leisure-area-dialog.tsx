import { zodResolver } from '@hookform/resolvers/zod'
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
import { Input } from '@treviaz/ui/components/ui/input'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useMutationCreateLeisureArea } from '@/hooks/react-query/mutations/leisure-areas/create-leisure-area-mutation'
import { useQueryGetLeisureAreasFromCondominium } from '@/hooks/react-query/queries/leisure-area/get-leisure-areas-from-condominium-query'
import { queryClient } from '@/lib/query-client'

import { useCalendarContext } from '../calendar-context'

const formSchema = z.object({
  name: z.string().min(3, 'O nome precisa conter pelo menos 3 caracteres'),
  description: z
    .string()
    .min(3, 'A descrição precisa conter pelo menos 3 caracteres'),
  photo_url: z.string().url('URL inválida'),
})

export default function CalendarNewLeisureAreaDialog() {
  const { newLeisureAreaDialogOpen, setNewLeisureAreaDialogOpen } =
    useCalendarContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      photo_url: '',
    },
  })

  const { slug } = useParams<{ slug: string }>()

  const { mutateAsync } = useMutationCreateLeisureArea({ slug })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateAsync(values)
    await queryClient.invalidateQueries(
      useQueryGetLeisureAreasFromCondominium({ slug })
    )
    setNewLeisureAreaDialogOpen(false)
    form.reset()
  }

  return (
    <Dialog
      open={newLeisureAreaDialogOpen}
      onOpenChange={setNewLeisureAreaDialogOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Área Comum</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nome da área</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Imagem</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Criar Área Comum</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
