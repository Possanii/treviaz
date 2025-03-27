'use client'

import {Check, ChevronsUpDown} from 'lucide-react'
import {useState} from 'react'
import {Control, FieldValues, Path} from 'react-hook-form'

import {cn} from '@/lib/utils'
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover'
import {Button} from '../ui/button'
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from '../ui/command'
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from '../ui/form'
import {IUnit} from "@treviaz/entities/schemas/IUnit";

interface ISelectUnitProps<TData extends FieldValues> {
  fieldName: Path<TData>
  control: Control<TData>
  units: IUnit[]
}

export function SelectUnit<TData extends FieldValues>({
                                                        fieldName,
                                                        control,
                                                        units,
                                                      }: ISelectUnitProps<TData>) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      name={fieldName}
      control={control}
      render={({field}) => (
        <FormItem>
          <FormLabel>Unidades</FormLabel>
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
                  {field.value ? units.find((unit) => unit.id === field.value)!.number : 'Selecione o unidades...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command {...field}>
                  <CommandInput placeholder="Procurar cargo..."/>
                  <CommandList>
                    <CommandEmpty>Nenhuma unidade encontrado.</CommandEmpty>
                    <CommandGroup>
                      {units.map((unit, index) => (
                        <CommandItem
                          key={index}
                          value={unit.id}
                          defaultValue={field.value}
                          onSelect={() => {
                            field.onChange(unit.id)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === unit.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {unit.number}
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
