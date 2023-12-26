import { router, protectedProcedure } from './../trpc'

export const exampleRouter = router({
  hello: protectedProcedure.query(({ ctx }) => {
    return {
      greeting: `hello! ${ctx.auth?.userId}`
    }
  })
})
