import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import { protectedProcedure, createTRPCRouter } from './../trpc'

const UserRelation = z.object({
  targetId: z.number(),
  authorId: z.number()
})

export const followRouter = createTRPCRouter({
  follow: protectedProcedure.input(UserRelation).query(async ({ ctx, input }) => {
    if (input.authorId === input.targetId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You cannot follow yourself.'
      })
    }

    const targetUserFound = await ctx.db.user.findUnique({
      where: { id: input.targetId }
    })

    if (!targetUserFound) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Target user not found.'
      })
    }

    return await ctx.db.follow.create({
      data: {
        follower: {
          connect: {
            id: input.targetId
          }
        },
        following: {
          connect: {
            id: input.authorId
          }
        }
      },
      include: {
        follower: true,
        following: true
      }
    })
  }),

  unfollow: protectedProcedure.input(UserRelation).query(async ({ ctx, input }) => {
    if (input.authorId === input.targetId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You cannot follow yourself.'
      })
    }

    const targetUserFound = await ctx.db.user.findUnique({
      where: { id: input.targetId }
    })

    if (!targetUserFound) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Target user not found.'
      })
    }

    return await ctx.db.follow.delete({
      where: {
        followerId_followingId: {
          followerId: input.targetId,
          followingId: input.authorId
        }
      },
      include: {
        follower: true,
        following: true
      }
    })
  }),

  checkUserFollowed: protectedProcedure.input(UserRelation).query(({ ctx, input }) => {
    const followRelationship = ctx.db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: input.targetId,
          followingId: input.authorId
        }
      }
    })

    return !!followRelationship
  })
})
