'use client'

import {Button} from '@/components/ui/button'
import {DialogClose, DialogFooter} from '@/components/ui/dialog'
import {cn} from '@/lib/utils'
import {Loader2} from 'lucide-react'

interface IModalFooter extends React.HTMLAttributes<HTMLDivElement> {
  buttonLabel?: string
  isLoading?: boolean
  action?: React.ReactNode
}

export function ModalFooter({
                              buttonLabel = 'Salvar',
                              action,
                              isLoading,
                              className,
                              ...props
                            }: IModalFooter) {
  return (
    <DialogFooter className={cn('sm:justify-end', className)} {...props}>
      <DialogClose asChild>
        <Button type="button" variant="secondary" className="w-24">
          Fechar
        </Button>
      </DialogClose>
      {action || (
        <Button
          type="submit"
          className="w-24 bg-green-500 text-accent-foreground"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-4"/>
          ) : (
            buttonLabel
          )}
        </Button>
      )}
    </DialogFooter>
  )
}
