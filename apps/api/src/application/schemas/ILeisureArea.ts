import z from "zod";

export const ILeisureArea = z.object({
  name: z.string(),
  description: z.string(),
  photo_url: z.string(),
  condominiumId: z.string(),
})

export type ILeisureArea = z.infer<typeof ILeisureArea>
