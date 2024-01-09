import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import '~/styles/globals.css'
import { TRPCProvider } from '~/components/providers/trpc-provider'

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
      <html lang="en">
        <body className={inter.className}>
          <TRPCProvider>
            <Toaster />
            {children}
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
