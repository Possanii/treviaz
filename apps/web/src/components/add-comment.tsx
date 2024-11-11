import { Button } from '@treviaz/ui/components/ui/button'
import { Card, CardFooter, CardHeader } from '@treviaz/ui/components/ui/card'
import { Textarea } from '@treviaz/ui/components/ui/textarea'

export function AddCommentInput() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <Textarea placeholder="Add a comment..." />
      </CardHeader>
      <CardFooter>
        <Button>Thread Comment</Button>
      </CardFooter>
    </Card>
  )
}
