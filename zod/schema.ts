import { z } from 'zod'

export const PostSchema = z.object({
  mediaFiles: z.array(
    z.object({
      key: z.string().refine((value) => value.trim() !== '', {
        message: 'Media key is required'
      }),
      url: z.string().refine((value) => value.trim() !== '', {
        message: 'Media URL is required'
      })
    })
  ),
  captions: z.string().max(200).optional(),
  location: z.string().optional()
})

export type PostSchemaType = z.infer<typeof PostSchema>
