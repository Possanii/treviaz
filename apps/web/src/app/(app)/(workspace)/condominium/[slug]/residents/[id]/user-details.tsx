'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@treviaz/ui/components/ui/card'
import { Separator } from '@treviaz/ui/components/ui/separator'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useParams } from 'next/navigation'

import { useQueryGetUserById } from '@/hooks/react-query/queries/user/get-user-by-id'
import { getNameInitial } from '@/utils/get-name-initials'

export function ViewUserDetails() {
  const { slug, id } = useParams<{ slug: string; id: string }>()

  const { data } = useSuspenseQuery(useQueryGetUserById({ slug, id }))

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="bg-muted p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={data.user.avatar_url ?? ''}
              alt={data.user.name}
            />
            <AvatarFallback>{getNameInitial(data.user.name)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="text-xl font-semibold">{data.user.name}</div>
            <div className="text-sm text-muted-foreground">
              {data.user.email}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatRelative(data.user.created_at, new Date(), {
                locale: ptBR,
              })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-semibold">Condominios</h3>
            <Separator className="my-4" />
            <div className="grid gap-4">
              {data.user.condominiums.map((condominium) => (
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                  <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-10">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={condominium.condominium.photo_url ?? ''}
                        alt={condominium.condominium.name}
                      />
                      <AvatarFallback>
                        {getNameInitial(condominium.condominium.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <div className="font-medium">
                      {condominium.condominium.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {condominium.condominium.slug}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {condominium.role.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Joined on{' '}
                    {formatRelative(condominium.joined_at, new Date(), {
                      locale: ptBR,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
