import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { appRouter } from '~/server'

const handler = async (req: Request): Promise<Response> =>
  await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({})
  })

export { handler as GET, handler as POST }
