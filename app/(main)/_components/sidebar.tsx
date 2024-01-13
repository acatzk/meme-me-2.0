'use client'

import Link from 'next/link'
import { isEmpty } from 'lodash'
import { useMediaQuery } from 'usehooks-ts'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { ElementRef, MouseEvent, useEffect, useRef, useState } from 'react'
import { BookmarkOne, HomeTwo, People, Wechat, SettingOne } from '@icon-park/react'

import { cn } from '~/lib/utils'
import { trpc } from '~/trpc/client'
import { Button } from '~/components/ui/button'
import { LogoWitTitle } from '~/components/custom-icon/logo-with-title'

import { Item } from './item'
import { UserCollapse } from './user-collapse'
import { UserDropdownOptions } from './user-dropdown-options'

export const Sidebar = (): JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const currentUser = trpc.user.currentUser.useQuery()

  const sidebarMenus = [
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
      href: `/@${currentUser?.data?.username ?? '/'}`
    },
    {
      Icon: BookmarkOne,
      name: 'Saved Post',
      href: '/saved-post'
    }
  ]

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)
  const navbarRef = useRef<ElementRef<'div'>>(null)
  const [isResetting, setIsResetting] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isMobile)

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [pathname, isMobile])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.preventDefault()
    e.stopPropagation()

    isResizingRef.current = true
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    document.addEventListener('mousemove', handleMouseMove as any)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isResizingRef.current) return

    let newWidth = e.clientX
    if (newWidth < 288) newWidth = 288
    if (newWidth > 480) newWidth = 480

    if (!isEmpty(sidebarRef.current) && !isEmpty(navbarRef.current)) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`)
      navbarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`)
    }
  }

  const handleMouseUp = (): void => {
    isResizingRef.current = false
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    document.removeEventListener('mousemove', handleMouseMove as any)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const resetWidth = (): void => {
    if (!isEmpty(sidebarRef.current) && !isEmpty(navbarRef.current)) {
      setIsCollapsed(false)
      setIsResetting(true)

      sidebarRef.current.style.width = isMobile ? '100%' : '288px'
      navbarRef.current.style.setProperty('width', isMobile ? '0' : 'calc(100% - 288px)')
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '288px')
    }
    setTimeout(() => setIsResetting(false), 300)
  }

  const collapse = (): void => {
    if (!isEmpty(sidebarRef.current) && !isEmpty(navbarRef.current)) {
      setIsCollapsed(true)
      setIsResetting(true)

      sidebarRef.current.style.width = '0'
      navbarRef.current.style.setProperty('width', '100%')
      navbarRef.current.style.setProperty('left', '0')
      setTimeout(() => setIsResetting(false), 200)
    }
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar custom-scrollbar relative z-[99999] flex h-full w-[288px] flex-col overflow-y-auto bg-white',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0'
        )}
      >
        {/* Collapse button */}
        <Button
          onClick={collapse}
          size="icon"
          className={cn(
            'absolute -right-0 top-24 z-[99999] opacity-0 transition group-hover/sidebar:opacity-100',
            'rounded-full',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        {/* Main Sidebar content */}
        <main className="flex h-full flex-col">
          <Link href="/home" className="outline-core">
            <LogoWitTitle className="scale-90" />
          </Link>
          <nav>
            <h4 className="mt-8 px-6 font-extrabold text-core-secondary">Menu</h4>
            <div className="mt-8 flex flex-col space-y-3 px-3">
              {sidebarMenus.map((item, index) => {
                return (
                  <Item
                    key={index}
                    onClick={() => router.push(item.href)}
                    label={item.name}
                    icon={item.Icon}
                    href={item.href}
                  />
                )
              })}
              <Item onClick={() => {}} label="Settings" icon={SettingOne} />
            </div>
            <UserCollapse />
          </nav>
          <UserDropdownOptions />
        </main>
        {/* Dragrable sizebar */}
        <div
          role="button"
          onMouseDown={handleMouseDown as any}
          onClick={resetWidth}
          className="absolute right-0 top-0 z-[99999] h-full w-1 cursor-ew-resize bg-stroke-2 opacity-0 transition group-hover/sidebar:opacity-100"
        />
      </aside>
      {/* Menu button when collapsed */}
      <div
        ref={navbarRef}
        className={cn(
          'absolute left-60 top-0 z-[99999] w-[calc(100%-288px)]',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className="w-full bg-transparent px-3 py-2">
          {isCollapsed && (
            <Button
              size="icon"
              onClick={resetWidth}
              className={cn(
                'absolute -left-2 top-24 z-[99999] transition group-hover/sidebar:opacity-100',
                'rounded-full'
              )}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </nav>
      </div>
    </>
  )
}
