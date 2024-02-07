import { createTRPCRouter } from './trpc'
import { userRouter } from './routers/user'
import { postRouter } from './routers/post'
import { followRouter } from './routers/follow'
import { hashtagRouter } from './routers/hashtag'

export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  follow: followRouter,
  hashtag: hashtagRouter
})

export type AppRouter = typeof appRouter
