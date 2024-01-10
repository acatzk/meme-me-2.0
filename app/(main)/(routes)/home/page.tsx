import React from 'react'

import { StoryList } from '~/components/story-list'
import { FeedFilterTab } from '~/components/feed-filter-tab'

export default function HomePage(): JSX.Element {
  return (
    <article className="mx-auto w-full max-w-3xl px-8 py-6">
      {/* User Story List */}
      <StoryList />
      <hr className="border-1 my-3 border-stroke-2" />
      <div className="flex flex-wrap items-center justify-between gap-y-2">
        <h2 className="font-bold text-secondary">Feeds</h2>
        <FeedFilterTab />
      </div>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis deleniti alias modi sint
        obcaecati nam porro eveniet quibusdam ea, provident nobis aspernatur culpa fugiat dolore
        voluptas molestias numquam? Maiores, provident?
      </div>
    </article>
  )
}
