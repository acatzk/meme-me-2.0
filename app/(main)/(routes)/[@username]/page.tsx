'use client'

import React from 'react'
import { Camera } from 'lucide-react'

import ProfileLayout from '~/components/layouts/profile-layout'

export default function ProfilePage(): JSX.Element {
  return (
    <ProfileLayout>
      <div className="mx-auto mt-8 flex max-w-sm flex-col items-center space-y-6">
        <div className="border-secondary-300 rounded-full border-2 p-4">
          <Camera className="h-6 w-6 stroke-1 text-core-secondary-300" />
        </div>
        <h1 className="text-2xl font-bold text-core-secondary-300">No Posts Yet</h1>
      </div>
    </ProfileLayout>
  )
}
