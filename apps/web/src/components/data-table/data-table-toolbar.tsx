'use client'

import type { Table } from '@tanstack/react-table'
import { Kbd } from '@treviaz/ui/components/custom/kbd'
import { Button } from '@treviaz/ui/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@treviaz/ui/components/ui/tooltip'
import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'
import { useEffect } from 'react'

import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  controlsOpen: boolean
  setControlsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DataTableToolbar<TData>({
  table,
  controlsOpen,
  setControlsOpen,
}: DataTableToolbarProps<TData>) {
  const filters = table.getState().columnFilters

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setControlsOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setControlsOpen])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setControlsOpen((prev) => !prev)}
              >
                {controlsOpen ? (
                  <>
                    <PanelLeftClose className="mr-2 h-4 w-4" /> Esconder filtros
                  </>
                ) : (
                  <>
                    <PanelLeftOpen className="mr-2 h-4 w-4" /> Mostrar filtros
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Abrir filtros com{' '}
                <Kbd className="ml-1 text-muted-foreground group-hover:text-accent-foreground">
                  <span className="mr-0.5">⌘</span>
                  <span>B</span>
                </Kbd>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of{' '}
          {table.getCoreRowModel().rows.length} row(s) filtered
        </p>
      </div>
      <div className="flex items-center gap-2">
        {filters.length ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
          >
            <X className="mr-2 h-4 w-4" />
            Resetar
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
