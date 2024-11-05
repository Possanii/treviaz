'use client'

import { ModalFooter } from '@treviaz/ui/components/custom/modal/modal-footer'
import { SelectForumCategory } from '@treviaz/ui/components/custom/select-forum-category'
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

import { IGetAllCategoriesFromCondominium } from '@/http/forum/get-all-categories-from-condominium'

import { FormCreateForumThreadController } from './controller'

export function FormCreateForumThread({
  categories: { categories },
}: {
  categories: IGetAllCategoriesFromCondominium
}) {
  const { form, handleSubmit, createForumThreadIsPending } =
    FormCreateForumThreadController()

  return (
    <Form {...form}>
      <CardHeader>
        <CardTitle>Novo tópico</CardTitle>
        <CardDescription>
          Crie um novo post para que os moradores possam comentar sobre.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
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

          <FormField
            name="thumbnail_url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SelectForumCategory
            control={form.control}
            fieldName="name"
            categories={categories}
          />

          <ModalFooter
            className="mt-6"
            isLoading={createForumThreadIsPending}
          />
        </form>
      </CardContent>
    </Form>
  )
}
