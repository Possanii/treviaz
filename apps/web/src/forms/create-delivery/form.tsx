import { useQuery } from '@tanstack/react-query'
import { ModalFooter } from '@treviaz/ui/components/custom/modal/modal-footer'
import { SelectUnit } from '@treviaz/ui/components/custom/select-units'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'
import { Form } from '@treviaz/ui/components/ui/form'

import { FormCreateDeliveryController } from '@/forms/create-delivery/controller'
import { useQueryGetUnitsFromCondominium } from '@/hooks/react-query/queries/get-units-from-condominium-by-slug'
import { getCurrentCondominium } from '@/utils/utils'

export function CreateDeliveryForm() {
  const slug = getCurrentCondominium()

  const { form, handleSubmit, createDeliveryIsPending } =
    FormCreateDeliveryController({ slug: slug as string })

  const { data, isPending } = useQuery(
    useQueryGetUnitsFromCondominium({ slug: slug as string })
  )

  return (
    <Form {...form}>
      <CardHeader>
        <CardTitle>Nova encomenda</CardTitle>
        <CardDescription>
          Cadastre uma nova encomenda para que possamos notificar o morador :)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isPending && (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <SelectUnit
              units={data!.units}
              control={form.control}
              fieldName="unitId"
            />
            <ModalFooter className="mt-6" isLoading={createDeliveryIsPending} />
          </form>
        )}
      </CardContent>
    </Form>
  )
}
