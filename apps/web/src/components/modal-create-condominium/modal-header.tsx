import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@treviaz/ui/components/ui/dialog'

interface IModalCreateCondominiumHeader {
  children?: React.ReactNode
  title?: string
  description?: string
}

export function ModalCreateCondominiumHeader({
  children,
  title,
  description,
}: IModalCreateCondominiumHeader) {
  return (
    <DialogHeader>
      {children || (
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </>
      )}
    </DialogHeader>
  )
}
