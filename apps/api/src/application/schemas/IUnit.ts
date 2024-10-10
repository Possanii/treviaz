import z from 'zod'

export const unitSchema = z.object({
  id: z.string().uuid(),
  condominium_id: z.string().uuid(),
  number: z.string({
    message: 'Please, provide a valid unit number.',
  }),
})

export type IUnit = z.infer<typeof unitSchema>
