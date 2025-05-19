import { Button } from '@treviaz/ui/components/ui/button'
import { Plus } from 'lucide-react'

import { useCalendarContext } from '../../calendar-context'

export default function CalendarHeaderActionsAddLeisureArea() {
  const { setNewLeisureAreaDialogOpen } = useCalendarContext()
  return (
    <Button
      className="flex items-center gap-1 bg-primary text-background"
      onClick={() => setNewLeisureAreaDialogOpen(true)}
    >
      <Plus />
      Adicionar Área de Lazer
    </Button>
  )
}
