import isEmpty from 'lodash/isEmpty'
import { auth } from '@clerk/nextjs'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { cn } from '~/lib/utils'
import { Sidebar } from './_components/sidebar'
import { SuggestionRightBar } from '~/components/suggestion-rightbar'

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
      <main className="h-full flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4">{children}</div>
      </main>
      <aside
        className={cn(
          'sticky top-0 mx-1 hidden h-full w-80 shrink-0 border-l border-stroke-3 xl:block'
        )}
      >
        <SuggestionRightBar />
      </aside>
    </div>
  )
}
