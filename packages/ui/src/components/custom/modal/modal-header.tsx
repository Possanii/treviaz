import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface IModalHeader extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  title?: string
  description?: string
}

export function ModalHeader({
  children,
  title,
  description,
  className,
  ...props
}: IModalHeader) {
  return (
    <DialogHeader className={cn('', className)} {...props}>
      {children || (
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </>
      )}
    </DialogHeader>
  )
}
