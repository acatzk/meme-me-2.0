import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { extractRouterConfig } from 'uploadthing/server'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'

import '~/styles/globals.css'
import { ourFileRouter } from '~/app/api/uploadthing/core'
import { TRPCProvider } from '~/components/providers/trpc-provider'
import { ModalProvider } from '~/components/providers/modal-providers'
import { ReactQueryProvider } from '~/components/providers/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meme me',
  description: 'Social media website for fun & entertainment',
  icons: {
    icon: [
      {
        url: '/logo.ico',
        href: '/logo.ico'
      }
    ]
  }
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <TRPCProvider>
            <ReactQueryProvider>
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}
            </ReactQueryProvider>
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
