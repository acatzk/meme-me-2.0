import { z } from 'zod'

export const PostInput = z.object({
  title: z.string(),
  mediaFiles: z.object({
    createMany: z.object({
      data: z.array(
        z.object({
          key: z.string().refine((value) => value.trim() !== '', {
            message: 'Media key is required'
          }),
          url: z.string().refine((value) => value.trim() !== '', {
            message: 'Media URL is required'
          })
        })
      )
    })
  }),
  location: z.string().optional(),
  isHideLikeAndCount: z.boolean(),
  isTurnOffComment: z.boolean(),
  postHashtags: z.object({
    create: z.array(
      z.object({
        hashtag: z.object({
          connectOrCreate: z.object({
            where: z.object({
              tag: z.string()
            }),
            create: z.object({
              tag: z.string()
            })
          })
        })
      })
    )
  })
})
