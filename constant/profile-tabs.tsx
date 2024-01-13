import { Bookmark, InsertTable, UserPositioning } from '@icon-park/react'

import { ReelsIcon } from '~/components/custom-icon/reels-icon'

export const profileTabs = [
  {
    Icon: InsertTable,
    title: 'posts',
    href: ''
  },
  {
    Icon: ReelsIcon,
    title: 'reels',
    href: '/reels'
  },
  {
    Icon: Bookmark,
    title: 'saved',
    href: '/saved'
  },
  {
    Icon: UserPositioning,
    title: 'tagged',
    href: '/tagged'
  }
]
