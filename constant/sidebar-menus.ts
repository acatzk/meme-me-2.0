import { Icon } from '@icon-park/react/lib/runtime'
import { BookmarkOne, HomeTwo, People, Wechat } from '@icon-park/react'

export const sidebarMenus: ISidebar[] = [
  {
    Icon: HomeTwo,
    name: 'Home',
    href: '/home'
  },
  {
    Icon: Wechat,
    name: 'Messages',
    href: '/messages'
  },
  {
    Icon: People,
    name: 'Profile',
    href: '/@acatzk'
  },
  {
    Icon: BookmarkOne,
    name: 'Saved Post',
    href: '/saved-post'
  }
]

export type ISidebar = {
  Icon: Icon
  name: string
  href: string
}
