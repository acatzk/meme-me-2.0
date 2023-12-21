import { publicProcedure, router } from './trpc'

import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30]
  }),

  getUser: publicProcedure.query(async () => {
    return await prisma.user.findMany()
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string()
      })
    )
    .mutation(async (opts) => {
      const { input } = opts
      return await prisma.user.create({
        data: {
          name: input.name,
          email: input.email
        }
      })
    })
})

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter
