import React from 'react'

import ProfileLayout from '~/components/layouts/profile-layout'

export default function Loading(): JSX.Element {
  return (
    <ProfileLayout>
      <div className="mx-auto mt-4 grid w-full max-w-4xl animate-pulse grid-cols-1 gap-2 px-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="h-52 w-full rounded-sm bg-core-secondary-100/30" />
        ))}
      </div>
    </ProfileLayout>
  )
}
