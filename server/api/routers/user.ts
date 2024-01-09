import { protectedProcedure, createTRPCRouter } from '../trpc'

export const userRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        externalId: ctx.auth.userId
      }
    })
  })
})
