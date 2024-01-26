import { PostSchema } from '~/zod/schema'

import { protectedProcedure, createTRPCRouter } from './../trpc'

export const postRouter = createTRPCRouter({
  create: protectedProcedure.input(PostSchema).mutation(async ({ input, ctx }) => {
    return await ctx.db.post.create({
      data: {
        mediaFiles: {
          createMany: {
            data: input.mediaFiles
          }
        },
        isHideLikeAndCount: input.isHideLikeAndCount,
        isTurnOffComment: input.isTurnOffComment,
        title: input.captions,
        user: {
          connect: {
            id: parseInt(ctx.auth.userId)
          }
        }
      },
      include: {
        user: true,
        postHashtags: true,
        mediaFiles: true
      }
    })
  })
})
