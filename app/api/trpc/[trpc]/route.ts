import { getAuth } from '@clerk/nextjs/server'
import { type NextRequest } from 'next/server'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '~/server'
import { createTRPCContext } from '~/server/trpc'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
/* eslint-disable */
const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
    auth: getAuth(req)
  })
}

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : undefined
  })

export { handler as GET, handler as POST }
