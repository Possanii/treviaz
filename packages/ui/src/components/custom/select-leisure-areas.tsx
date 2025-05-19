'use client'

import {Check, ChevronsUpDown} from 'lucide-react'
import {useState} from 'react'
import {Control, FieldValues, Path} from 'react-hook-form'

import {cn} from '@/lib/utils'
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover'
import {Button} from '../ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from '../ui/command'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '../ui/form'
import {ILeisureArea} from "@treviaz/entities/schemas/ILeisureArea";

interface ISelectLeisureAreaProps<TData extends FieldValues> {
  fieldName: Path<TData>
  control: Control<TData>
  leisureAreas: ILeisureArea[]
}

export function SelectLeisureArea<TData extends FieldValues>({
                                                               fieldName,
                                                               control,
                                                               leisureAreas,
                                                             }: ISelectLeisureAreaProps<TData>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({field}) => (
        <FormItem>
          <FormLabel>Áreas de lazer</FormLabel>
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
                  {field.value ? leisureAreas.find((leisureArea) => leisureArea.id === field.value)?.name : 'Selecione a áreas de lazer...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command {...field}>
                  <CommandInput placeholder="Procurar cargo..."/>
                  <CommandList>
                    <CommandEmpty>Nenhuma área de lazar encontrado.</CommandEmpty>
                    <CommandGroup>
                      {leisureAreas.map((leisureArea, index) => (
                        <CommandItem
                          key={index}
                          value={leisureArea.id}
                          defaultValue={field.value}
                          onSelect={() => {
                            field.onChange(leisureArea.id)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === leisureArea.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {leisureArea.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
    />
  )
}
