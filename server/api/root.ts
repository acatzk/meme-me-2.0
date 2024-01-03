import { createTRPCRouter } from './trpc'
import { userRouter } from './routers/userRouter'

export const appRouter = createTRPCRouter({
  user: userRouter
})

export type AppRouter = typeof appRouter
