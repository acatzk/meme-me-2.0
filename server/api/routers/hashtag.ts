import { protectedProcedure, createTRPCRouter } from '../trpc'

export const hashtagRouter = createTRPCRouter({
  getHashtags: protectedProcedure.query(({ ctx }) => {
    return ctx.db.hashtag.findMany({
      select: {
        id: true,
        tag: true
      }
    })
  })
})
