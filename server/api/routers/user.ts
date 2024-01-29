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
        }
      })
    })
})
