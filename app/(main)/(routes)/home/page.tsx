import React from 'react'

import { PostList } from '~/components/post-list'

import HomeLayout from '../../../../components/layouts/home-layout'

export default function HomePage(): JSX.Element {
  return (
    <HomeLayout>
      <PostList />
    </HomeLayout>
  )
}
