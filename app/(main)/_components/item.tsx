import React from 'react'
import { usePathname } from 'next/navigation'
import { Icon } from '@icon-park/react/lib/runtime'

import { cn } from '~/lib/utils'

type Props = {
  onClick: () => void
  label: string
  icon: Icon
  href?: string
}

export const Item = ({ onClick, label, icon: Icon, href }: Props): JSX.Element => {
  const pathname = usePathname()
  // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
  const isActive = pathname.includes(href as string)

  return (
    <div
      onClick={onClick}
      role="button"
      className={cn(
        'group inline-flex w-full items-center space-x-4 py-1.5 md:py-2',
        'outline-core transition duration-75 ease-in-out',
        'rounded-lg px-4 hover:bg-background',
        isActive ? 'text-core' : 'text-core-secondary-100 hover:text-core-secondary-300'
      )}
    >
      <Icon size={28} theme="filled" className="group-hover:scale-105" />
      <span className="select-none font-bold">{label}</span>
    </div>
  )
}
