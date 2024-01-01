import { PrismaClient } from '@prisma/client'
import { protectedProcedure, createTRPCRouter } from './../trpc'

const prisma = new PrismaClient()

export const exampleRouter = createTRPCRouter({
  hello: protectedProcedure.query(({ ctx }) => {
    return {
      greeting: `hello! ${ctx.auth?.userId}`
    }
  }),

  getAllUser: protectedProcedure.query(async ({ ctx }) => {
    return await prisma.user.findUniqueOrThrow({
      where: {
        externalId: ctx.userId as string
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        externalId: true,
        imageUrl: true,
        name: true,
        updatedAt: true,
        username: true
      }
    })
  })
})
