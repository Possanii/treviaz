'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { IUser } from '@treviaz/entities/schemas/IUser'
import { IForumCategory } from '@treviaz/entities/schemas/forum/IForumCategory'

import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

interface IGetAllCategoriesFromCondominium
  extends Array<
    IForumCategory & { created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'> }
  > {}

interface ISelectForumCategoryProps<TData extends FieldValues> {
  control: Control<TData>
  fieldName: Path<TData>
  categories: IGetAllCategoriesFromCondominium
}

export function SelectForumCategory<TData extends FieldValues>({
  fieldName,
  control,
  categories,
}: ISelectForumCategoryProps<TData>) {
  const [open, setOpen] = useState(false)

  categories.map

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Categoria</FormLabel>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                  defaultValue={field.value}
                >
                  {categories.find((category) => category.slug === field.value)
                    ?.name || 'Selecione a categoria...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command {...field}>
                  <CommandInput placeholder="Procurar categoria..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((forumcategory, index) => (
                        <CommandItem
                          key={index}
                          value={forumcategory.slug}
                          defaultValue={field.value}
                          onSelect={() => {
                            field.onChange(forumcategory.slug)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === forumcategory.slug
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {forumcategory.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
