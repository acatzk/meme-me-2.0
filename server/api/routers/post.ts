import { PostInput } from '~/zod/input'

import { protectedProcedure, createTRPCRouter } from './../trpc'

export const postRouter = createTRPCRouter({
  create: protectedProcedure.input(PostInput).mutation(async ({ input, ctx }) => {
    return await ctx.db.post.create({
      data: {
        title: input.title,
        mediaFiles: input.mediaFiles,
        isHideLikeAndCount: input.isHideLikeAndCount,
        isTurnOffComment: input.isTurnOffComment,
        postHashtags: input.postHashtags,
        user: {
          connect: {
            externalId: ctx.auth.userId
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
