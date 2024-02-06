'use client'

import React, { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const ReactQueryProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  const [client] = useState<QueryClient>(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
