'use client'

import { httpBatchLink } from '@trpc/client'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { trpc } from './client'

type ProviderProps = {
  children: ReactNode
}

export const Provider = ({ children }: ProviderProps): JSX.Element => {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: undefined,
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
