import React, { ReactNode } from 'react'

import { StoryList } from '~/components/story-list'
import { FeedFilterTab } from '~/components/feed-filter-tab'
import { SuggestionRightBar } from '~/components/suggestion-rightbar'

type HomeLayoutProps = {
  children: ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps): JSX.Element {
  return (
    <div className="flex">
      <article className="mx-auto w-full max-w-3xl px-8 py-6">
        {/* User Story List */}
        <StoryList />
        <hr className="border-1 my-3 border-stroke-2" />
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <h2 className="font-bold text-secondary">Feeds</h2>
          <FeedFilterTab />
        </div>
        {children}
      </article>
      <aside className="sticky top-0 h-full w-80 shrink-0 border-l border-stroke-3">
        <SuggestionRightBar />
      </aside>
    </div>
  )
}
