import { DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface IModalContent extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ModalContent({ children, className, ...props }: IModalContent) {
  return (
    <DialogContent className={cn('md:max-w-2xl', className)} {...props}>
      {children}
    </DialogContent>
  )
}
