import { CreateDeliveryModalProvider } from '@/contexts/create-delivery-modal-context'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CreateDeliveryModalProvider>{children}</CreateDeliveryModalProvider>
}
