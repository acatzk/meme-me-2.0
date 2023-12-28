import { createTRPCRouter } from './trpc'
import { exampleRouter } from './routers/exampleRouter'

export const appRouter = createTRPCRouter({
  example: exampleRouter
})

export type AppRouter = typeof appRouter
