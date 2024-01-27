import { createTRPCRouter } from './trpc'
import { userRouter } from './routers/user'
import { postRouter } from './routers/post'
import { hashtagRouter } from './routers/hashtag'

export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  hashtag: hashtagRouter
})

export type AppRouter = typeof appRouter
