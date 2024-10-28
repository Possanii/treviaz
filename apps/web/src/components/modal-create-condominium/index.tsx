import { ModalCreateCondominiumContent } from './modal-content'
import { ModalCreateCondominiumFooter } from './modal-footer'
import { ModalCreateCondominiumForm } from './modal-form'
import { ModalCreateCondominiumHeader } from './modal-header'
import { ModalCreateCondominiumRoot } from './modal-root'
import { ModalCreateCondominiumTrigger } from './modal-trigger'

export const ModalCreateCondominiumParts = {
  Root: ModalCreateCondominiumRoot,
  Trigger: ModalCreateCondominiumTrigger,
  Content: ModalCreateCondominiumContent,
  Form: ModalCreateCondominiumForm,
  Header: ModalCreateCondominiumHeader,
  Footer: ModalCreateCondominiumFooter,
}

export function ModalCreateCondominium() {
  return (
    <ModalCreateCondominiumParts.Root>
      <ModalCreateCondominiumParts.Trigger />
      <ModalCreateCondominiumParts.Content>
        <ModalCreateCondominiumParts.Header />
        <ModalCreateCondominiumParts.Form />
      </ModalCreateCondominiumParts.Content>
    </ModalCreateCondominiumParts.Root>
  )
}
