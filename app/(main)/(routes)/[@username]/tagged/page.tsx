import React from 'react'
import { Image } from 'lucide-react'

import ProfileLayout from '~/components/layouts/profile-layout'

export default function TaggedPage(): JSX.Element {
  return (
    <ProfileLayout>
      <div className="mx-auto mt-8 flex max-w-sm flex-col items-center space-y-6">
        <div className="border-secondary-300 rounded-full border-2 p-4">
          <Image className="h-6 w-6 stroke-1 text-core-secondary-300" />
        </div>
        <h1 className="text-2xl font-bold text-core-secondary-300">Photos of you</h1>
        <p className="text-sm  text-core-secondary-200">
          When people tag you in photos, they&apos;ll appear here.
        </p>
      </div>
    </ProfileLayout>
  )
}
