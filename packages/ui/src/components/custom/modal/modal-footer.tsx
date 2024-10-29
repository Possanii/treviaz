'use client'

import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface IModalFooter extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode
}

export function ModalFooter({ action, className, ...props }: IModalFooter) {
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
