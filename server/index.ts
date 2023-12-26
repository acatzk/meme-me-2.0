import { router } from './trpc'
import { exampleRouter } from './routers/exampleRouter'

export const appRouter = router({
  example: exampleRouter
})

export type AppRouter = typeof appRouter
