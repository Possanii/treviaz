'use client'

import { Button } from '@treviaz/ui/components/ui/button'
import { DialogClose, DialogFooter } from '@treviaz/ui/components/ui/dialog'
import { cn } from '@treviaz/ui/lib/utils'
import { HTMLAttributes } from 'react'

interface IModalCreateCondominiumFooter extends HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode
}

export function ModalCreateCondominiumFooter({
  action,
  className,
  ...props
}: IModalCreateCondominiumFooter) {
  return (
    <DialogFooter className={cn('sm:justify-end', className)} {...props}>
      <DialogClose asChild>
        <Button type="button" variant="secondary" className="w-24">
          Close
        </Button>
      </DialogClose>
      {action || (
        <Button
          type="submit"
          className="w-24 bg-green-500 text-accent-foreground"
        >
          Criar
        </Button>
      )}
    </DialogFooter>
  )
}
