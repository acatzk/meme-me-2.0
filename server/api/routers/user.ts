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

  getUserByUsername: protectedProcedure
    .input(
      z.object({
        username: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUniqueOrThrow({
        where: {
          username: input.username
        },
        select: {
          id: true,
          displayName: true,
          imageUrl: true,
          username: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true
            }
          }
        }
      })
    }),

  getSuggestedUsers: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish() // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async (opts) => {
      const { ctx, input } = opts
      const limit = input.limit ?? 15
      const { cursor } = input
      const currentUserId = ctx.auth.userId

      const users = await ctx.db.user.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          NOT: { externalId: currentUserId }
        },
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          followers: true
        }
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (users.length > limit) {
        const nextItem = users.pop()
        nextCursor = nextItem!.id
      }

      // Fetch followings of the current user
      const currentFollowings = await ctx.db.follow.findMany({
        where: { following: { externalId: currentUserId } },
        select: { followerId: true }
      })

      // Map users and set isFollowed based on whether the current user follows each suggested user
      const usersWithFollowStatus = users.map((user) => ({
        ...user,
        isFollowed: currentFollowings.some((follower) => follower.followerId === user.id)
      }))

      return {
        users: usersWithFollowStatus,
        nextCursor
      }
    })
})
