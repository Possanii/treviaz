import { DialogContent } from '@treviaz/ui/components/ui/dialog'

interface IModalCreateCondominiumContent {
  children: React.ReactNode
}

export function ModalCreateCondominiumContent({
  children,
}: IModalCreateCondominiumContent) {
  return <DialogContent className="md:max-w-2xl">{children}</DialogContent>
}
