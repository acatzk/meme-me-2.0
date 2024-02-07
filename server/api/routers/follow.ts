import { z } from 'zod'
import { TRPCError } from '@trpc/server'

import { protectedProcedure, createTRPCRouter } from './../trpc'

const UserRelation = z.object({
  targetId: z.number(),
  authorId: z.number()
})

export const followRouter = createTRPCRouter({
  follow: protectedProcedure.input(UserRelation).mutation(async ({ ctx, input }) => {
    const { authorId, targetId } = input
    if (authorId === targetId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You cannot follow yourself.'
      })
    }

    const targetUserFound = await ctx.db.user.findUnique({
      where: { id: targetId }
    })

    if (!targetUserFound) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Target user not found.'
      })
    }

    // Check if already following
    const existingFollow = await ctx.db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: authorId,
          followingId: targetId
        }
      }
    })

    if (existingFollow) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You are already following this user.'
      })
    }

    return await ctx.db.$transaction(async (db) => {
      await ctx.db.follow.create({
        data: {
          follower: {
            connect: {
              id: targetId
            }
          },
          following: {
            connect: {
              id: authorId
            }
          }
        }
      })
    })
  }),

  unfollow: protectedProcedure.input(UserRelation).mutation(async ({ ctx, input }) => {
    const { authorId, targetId } = input
    if (authorId === targetId) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You cannot follow yourself.'
      })
    }

    const targetUserFound = await ctx.db.user.findUnique({
      where: { id: targetId }
    })

    if (!targetUserFound) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Target user not found.'
      })
    }

    // Check if already unfollowed
    const existingFollow = await ctx.db.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: targetId,
          followingId: authorId
        }
      }
    })

    if (!existingFollow) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You are not following this user.'
      })
    }

    // Start a transaction
    return await ctx.db.$transaction(async (db) => {
      await db.follow.delete({
        where: {
          followerId_followingId: {
            followerId: targetId,
            followingId: authorId
          }
        }
      })
    })
  })
})
