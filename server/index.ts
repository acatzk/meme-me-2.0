// import { z } from 'zod'
// import { PrismaClient } from '@prisma/client'

import { protectedProcedure, router } from './trpc'

// const prisma = new PrismaClient()

export const appRouter = router({
  hello: protectedProcedure.query(({ ctx }) => {
    return {
      secret: `${ctx.auth?.userId} is using a protected procedure`
    }
  })
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
