import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { ComponentProps } from 'react'

export type TabProps = {
  TabIcon: any
  title: string
  href: string
  isActive: boolean
} & ComponentProps<'svg'>

export const Tab = ({ TabIcon, title, href, isActive, ...rest }: TabProps): JSX.Element => {
  const router = useRouter()

  return (
    <li
      className={clsx(
        'inline-block border-t-2',
        isActive ? ' border-primary' : ' border-transparent'
      )}
    >
      <button
        type="button"
        onClick={() => router.replace(href)}
        className={clsx(
          'flex items-center gap-x-2 py-2 outline-none active:scale-95 active:opacity-80',
          isActive ? 'text-primary' : 'text-core-secondary-100'
        )}
      >
        {title === 'reels' ? (
          <TabIcon className="h-4 w-4" {...rest} />
        ) : (
          <TabIcon size="18" theme="outline" strokeWidth={2} {...rest} />
        )}
        <span className="text-sm font-bold uppercase">{title}</span>
      </button>
    </li>
  )
}
