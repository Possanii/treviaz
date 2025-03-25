import { ModalFooter } from '@treviaz/ui/components/custom/modal/modal-footer'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@treviaz/ui/components/ui/form'
import { Input } from '@treviaz/ui/components/ui/input'

import { FormCreateDeliveryController } from '@/forms/create-delivery/controller'
import { getCurrentCondominium } from '@/utils/utils'

export function CreateDeliveryForm() {
  const slug = getCurrentCondominium()

  const { form, handleSubmit, createDeliveryIsPending } =
    FormCreateDeliveryController({ slug: slug as string })

  return (
    <Form {...form}>
      <CardHeader>
        <CardTitle>Nova encomenda</CardTitle>
        <CardDescription>
          Cadastre uma nova encomenda para que possamos notificar o morador :)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <FormField
            name="unitId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidade</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ModalFooter className="mt-6" isLoading={createDeliveryIsPending} />
        </form>
      </CardContent>
    </Form>
  )
}
