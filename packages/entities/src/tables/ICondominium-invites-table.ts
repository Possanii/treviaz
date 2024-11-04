import { z } from 'zod'

import { inviteSchema } from '../IInvite'
import { userSchema } from '../IUser'
import { userCondominiumSchema } from '../IUserCondominium'

export const condominiumInvitesTableSchema = inviteSchema
  .pick({
    id: true,
    email: true,
    status: true,
    sent_at: true,
    expires_at: true,
    role: true,
  })
  .extend({
    author: userSchema
      .pick({
        id: true,
        name: true,
        avatar_url: true,
      })
      .extend({
        condominiums: z.array(
          userCondominiumSchema.pick({ id: true, role: true })
        ),
      }),
  })

export type ICondominiumInvitesTable = z.infer<
  typeof condominiumInvitesTableSchema
>
