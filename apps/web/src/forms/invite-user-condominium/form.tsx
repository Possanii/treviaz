import { ModalFooter } from '@treviaz/ui/components/custom/modal/modal-footer'
import { SelectRole } from '@treviaz/ui/components/custom/select-role'
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

import { getCurrentCondominium } from '@/utils/utils'

import { FormInviteUserCondominiumController } from './controller'

export function InviteUserCondominiumForm() {
  const slug = getCurrentCondominium()

  const { form, handleSubmit, inviteUserCondominiumIsPending } =
    FormInviteUserCondominiumController({ slug: slug as string })

  return (
    <Form {...form}>
      <CardHeader>
        <CardTitle>Novo Morador</CardTitle>
        <CardDescription>
          Convide um novo morador para participar do seu condominio e facilitar
          sua interatividade!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="acme@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectRole control={form.control} fieldName="role" />
          <ModalFooter
            className="mt-6"
            isLoading={inviteUserCondominiumIsPending}
          />
        </form>
      </CardContent>
    </Form>
  )
}
