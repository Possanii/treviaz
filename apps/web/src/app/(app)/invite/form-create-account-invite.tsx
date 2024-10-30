'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@treviaz/ui/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@treviaz/ui/components/ui/form'
import { Input } from '@treviaz/ui/components/ui/input'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useSignUpMutation } from '@/hooks/react-query/mutations/auth/sign-up-mutation'
import { useAcceptInviteMutation } from '@/hooks/react-query/mutations/invite/accept-invite-mutation'
import { IGetInviteByTokenResponse } from '@/http/invite/get-invite-by-token'
import { ISignUp, signUpSchema } from '@/schemas/ISign-up'

export function FormCreateAccountInvite({ invite }: IGetInviteByTokenResponse) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: invite.email,
      password: '',
      password_confirmation: '',
    },
  })

  const { mutateAsync, isSuccess: acceptedInviteIsSuccess } =
    useAcceptInviteMutation()

  const { mutateAsync: signUpMutatioAsync } = useSignUpMutation()

  const handleSubmit = form.handleSubmit(async (form) => {
    await signUpMutatioAsync(form)

    await mutateAsync({ token: searchParams.get('code') as string })
  })

  useEffect(() => {
    if (acceptedInviteIsSuccess) {
      router.replace('/auth/sign-in')
    }
  }, [router, acceptedInviteIsSuccess])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password_confirmation"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme sua senha</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant={'secondary'}
          className="w-full"
          // disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <CheckCircle className="mr-2 size-4" />
              Participar de {invite.condominium.name}
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
