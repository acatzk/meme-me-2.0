import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { getAuth, SignedInAuthObject, SignedOutAuthObject } from '@clerk/nextjs/server'

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject
}

export const createContextInner = async ({ auth }: AuthContext): Promise<AuthContext> => {
  return {
    auth
  }
}

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
): Promise<AuthContext> => {
  return await createContextInner({ auth: getAuth(opts.req) })
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
