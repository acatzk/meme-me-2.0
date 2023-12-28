'use client'

import { isEmpty } from 'lodash'
import { useMediaQuery } from 'usehooks-ts'
import { usePathname } from 'next/navigation'
import { ChevronsLeft, MenuIcon } from 'lucide-react'
import React, { ElementRef, MouseEvent, useEffect, useRef, useState } from 'react'

import { cn } from '~/lib/utils'

const Navigation = (): JSX.Element => {
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')

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
          'group/sidebar relative z-[99999] flex h-full w-[288px] flex-col overflow-y-auto bg-white',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0'
        )}
      >
        {/* Collapse button */}
        <div
          role="button"
          onClick={collapse}
          className={cn(
            'hover:bg-neutral-300 dark:hover:bg-neutral-600 h-6 w-6 rounded-sm text-muted-foreground',
            'absolute right-2 top-3 opacity-0 transition group-hover/sidebar:opacity-100',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias nisi accusamus maxime
          voluptatibus, dolores, voluptatum cum aut nobis animi praesentium exercitationem eius?
          Aliquam aperiam placeat dicta necessitatibus molestias fugiat nihil.s
        </div>
        {/* Dragrable sizebar */}
        <div
          role="button"
          onMouseDown={handleMouseDown as any}
          onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
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
            <MenuIcon
              onClick={resetWidth}
              className="h-6 w-6 text-muted-foreground"
              role="button"
            />
          )}
        </nav>
      </div>
    </>
  )
}

export default Navigation
