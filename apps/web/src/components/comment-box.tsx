import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@treviaz/ui/components/ui/card'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getNameInitial } from '@/utils/get-name-initials'

interface ICommentBox {
  id: string
  avatarUrl?: string | null
  userName: string
  createdAt: Date | string | number
  comment: string
}

export function CommentBox({
  id,
  avatarUrl,
  userName,
  createdAt,
  comment,
}: ICommentBox) {
  return (
    <Card key={id} className="mb-4">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatarUrl || undefined} alt={userName} />
            <AvatarFallback>{getNameInitial(userName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{userName}</p>
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
