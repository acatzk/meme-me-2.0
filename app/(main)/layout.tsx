import isEmpty from 'lodash/isEmpty'
import { auth } from '@clerk/nextjs'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import Navigation from './_components/navigation'

type Props = {
  children: ReactNode
}

export default function MainLayout({ children }: Props): JSX.Element {
  const { userId } = auth()

  if (isEmpty(userId)) {
    return redirect('/')
  }

  return (
    <div className="flex h-full bg-background">
      <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4">{children}</div>
      </main>
    </div>
  )
}
