import z from 'zod'

export const createPackageSchema = z.object({
  unitId: z.string().uuid(),
})

export type ICreatePackage = z.infer<typeof createPackageSchema>
