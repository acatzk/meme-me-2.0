import { z } from 'zod'

import { PostInput } from '~/zod/input'

import { protectedProcedure, createTRPCRouter } from './../trpc'

export const postRouter = createTRPCRouter({
  create: protectedProcedure.input(PostInput).mutation(async ({ input, ctx }) => {
    return await ctx.db.post.create({
      data: {
        title: input.title,
        mediaFiles: input.mediaFiles,
        isHideLikeAndCount: input.isHideLikeAndCount,
        isTurnOffComment: input.isTurnOffComment,
        postHashtags: input.postHashtags,
        user: {
          connect: {
            externalId: ctx.auth.userId
          }
        }
      },
      include: {
        user: true,
        postHashtags: true,
        mediaFiles: true
      }
    })
  }),

  getAll: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish() // <-- "cursor" needs to exist, but can be any type
      })
    )
    .query(async (opts) => {
      const { ctx, input } = opts
      const limit = input.limit ?? 5
      const { cursor } = input

      const posts = await ctx.db.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          title: true,
          mediaFiles: {
            select: {
              key: true,
              url: true
            }
          },
          createdAt: true,
          updatedAt: true,
          isHideLikeAndCount: true,
          isTurnOffComment: true,
          user: {
            select: {
              id: true,
              displayName: true,
              email: true,
              username: true
            }
          },
          postHashtags: {
            select: {
              hashtag: {
                select: {
                  tag: true
                }
              }
            }
          }
        }
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (posts.length > limit) {
        const nextItem = posts.pop()
        nextCursor = nextItem!.id
      }

      return {
        posts,
        nextCursor
      }
    }),

  getAllPostByUsername: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        username: z.string()
      })
    )
    .query(async (opts) => {
      const { ctx, input } = opts
      const limit = input.limit ?? 15
      const { cursor } = input

      const posts = await ctx.db.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          user: {
            username: input.username
          }
        }
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (posts.length > limit) {
        const nextItem = posts.pop()
        nextCursor = nextItem!.id
      }

      return {
        posts,
        nextCursor
      }
    })
})
