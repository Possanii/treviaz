import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@treviaz/ui/components/ui/avatar'
import { Button } from '@treviaz/ui/components/ui/button'
import { Separator } from '@treviaz/ui/components/ui/separator'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LogIn } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getInviteByToken } from '@/http/invite/get-invite-by-token'

import { FormCreateAccountInvite } from './form-create-account-invite'

interface InvitePageProps {
  searchParams: {
    code: string
  }
}

export default async function InvitePage({
  searchParams: { code },
}: InvitePageProps) {
  const { invite } = await getInviteByToken({ token: code })

  async function signInFromInvite() {
    'use server'

    cookies().set('inviteToken', code)

    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatar_url && (
              <AvatarImage src={invite.author.avatar_url} />
            )}
            <AvatarFallback />
          </Avatar>

          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Alguém'}
            </span>{' '}
            Convidou você para participar do condominio{' '}
            <span className="font-medium text-foreground">
              {invite.condominium.name}
            </span>
            .{' '}
            <span className="text-xs">
              {formatRelative(invite.sent_at, new Date(), {
                locale: ptBR,
              })}
            </span>
          </p>
        </div>

        <Separator />

        <FormCreateAccountInvite invite={invite} />

        <form action={signInFromInvite}>
          <Button type="submit" variant={'secondary'} className="w-full">
            <LogIn className="mr-2 size-4" />
            Já possui uma conta? Faça Login para aceitar.
          </Button>
        </form>
      </div>
    </div>
  )
}
