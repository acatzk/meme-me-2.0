'use client'

import superjson from 'superjson'
import { httpBatchLink } from '@trpc/client'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { trpc } from '~/app/_trpc/client'

type ProviderProps = {
  children: ReactNode
}

export const TRPCProvider = ({ children }: ProviderProps): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/api/trpc'
        })
      ]
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
