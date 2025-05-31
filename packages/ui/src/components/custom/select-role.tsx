'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

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
import { roleEnum } from '@treviaz/entities/schemas/IRole'

interface ISelectRoleProps<TData extends FieldValues> {
  control: Control<TData>
  fieldName: Path<TData>
}

export function SelectRole<TData extends FieldValues>({
  fieldName,
  control,
}: ISelectRoleProps<TData>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Cargo</FormLabel>
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
                  {field.value || 'Selecione o cargo...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command {...field}>
                  <CommandInput placeholder="Procurar cargo..." />
                  <CommandList>
                    <CommandEmpty>Nenhum cargo encontrado.</CommandEmpty>
                    <CommandGroup>
                      {roleEnum.options.map((role, index) => (
                        <CommandItem
                          key={index}
                          value={role}
                          defaultValue={field.value}
                          onSelect={() => {
                            field.onChange(role)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === role ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {role}
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
