'use client'

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

import { FormCreateCondominiumController } from './controller'

export function FormCreateCondominium() {
  const { form, handleSubmit } = FormCreateCondominiumController()

  return (
    <Form {...form}>
      <CardHeader>
        <CardTitle>Novo condomínio</CardTitle>
        <CardDescription>
          Registre um novo condomínio para sua habilitar as funcionalidades de
          administração
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <div className="md:flex flex-1 grid-cols-4 gap-4">
              <FormField
                name="address.street"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Logadouro</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address.number"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:flex flex-1 gap-4 grid-cols-9">
              <FormField
                name="address.neighborhood"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address.city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address.state"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:flex flex-1 gap-4 grid-cols-4">
              <FormField
                name="address.country"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="address.zip_code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="address.complement"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ModalFooter className="mt-6" />
        </form>
      </CardContent>
    </Form>
  )
}
