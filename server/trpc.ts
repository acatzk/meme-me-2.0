import superjson from 'superjson'
import { initTRPC, TRPCError } from '@trpc/server'

import { type Context } from './context'
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create()
const t2 = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  }
})

// check if the user is signed in, otherwise throw a UNAUTHORIZED CODE
const isAuthed = t2.middleware(({ next, ctx }) => {
  console.log(ctx)
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      auth: ctx.auth
    }
  })
})

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router
export const publicProcedure = t2.procedure

// export this procedure to be used anywhere in your application
export const protectedProcedure = t2.procedure.use(isAuthed)
