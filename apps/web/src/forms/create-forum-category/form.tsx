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
import { Textarea } from '@treviaz/ui/components/ui/textarea'
import { useParams } from 'next/navigation'

import { FormCreateForumCategoryController } from './controller'

export function FormCreateForumCategory() {
  const { slug } = useParams<{ slug: string }>()

  const { form, handleSubmit, createForumCategoryIsPending } =
    FormCreateForumCategoryController({ slug })

  return (
    <Form {...form}>
      <CardHeader>
        <CardTitle>Nova categoria</CardTitle>
        <CardDescription>
          Registre uma nova categoria e permita os moradores a criarem tópicos
          sobre ela.
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

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ModalFooter
            className="mt-6"
            isLoading={createForumCategoryIsPending}
          />
        </form>
      </CardContent>
    </Form>
  )
}
