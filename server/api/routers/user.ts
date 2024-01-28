import { z } from 'zod'

import { protectedProcedure, createTRPCRouter } from './../trpc'

export const userRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUniqueOrThrow({
      where: {
        externalId: ctx.auth.userId
      }
    })
  }),

  getUserbyUsername: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        username: z.string()
      })
    )
    .query(async (opts) => {
      const { ctx, input } = opts
      const limit = input.limit ?? 15
      const { cursor } = input

      const posts = await ctx.db.user.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          username: input.username
        },
        select: {
          id: true,
          displayName: true,
          username: true,
          imageUrl: true,
          email: true,
          posts: {
            select: {
              id: true,
              mediaFiles: {
                select: {
                  url: true
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (posts.length > limit) {
        const nextItem = posts.pop()
        nextCursor = nextItem!.id
      }

      return {
        posts,
        nextCursor
      }
    })
})
