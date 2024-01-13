import React from 'react'

import { UserPost } from '~/components/user-post'

import HomeLayout from '../../../../components/layouts/home-layout'

export default function HomePage(): JSX.Element {
  return (
    <HomeLayout>
      <UserPost />
    </HomeLayout>
  )
}
