import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { FC, ReactNode } from 'react'

import '~/styles/globals.css'
import { Provider } from './_trpc/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meme me',
  description: 'Social media website for entertainment',
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

const RootLayout: FC<RootLayoutProps> = ({ children }): JSX.Element => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <Toaster />
          {children}
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
