import isEmpty from 'lodash/isEmpty'
import { auth } from '@clerk/nextjs'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { Sidebar } from './_components/sidebar'

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
      <Sidebar />
      <main className="custom-scrollbar h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
