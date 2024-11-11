import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@treviaz/ui/components/ui/card'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ICommentBox {
  key: string
  avatarUrl?: string | null
  userName: string
  createdAt: Date | string | number
  comment: string
}

export function CommentBox({
  key,
  avatarUrl,
  userName,
  createdAt,
  comment,
}: ICommentBox) {
  return (
    <Card key={key} className="mb-4">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarUrl || undefined} alt={userName} />
            <AvatarFallback>{userName}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{[0]}</p>
            <p className="text-xs text-muted-foreground">
              {formatRelative(createdAt, new Date(), {
                locale: ptBR,
              })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{comment}</p>
      </CardContent>
    </Card>
  )
}
