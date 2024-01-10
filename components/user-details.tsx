'use client'

import React, { FC } from 'react'
import ReactNiceAvatar, { AvatarFullConfig, genConfig } from 'react-nice-avatar'

import { cn } from '~/lib/utils'
import { DetaulAvatar } from '~/constant/default-avatar-style'

type Size = 'xs' | 'sm' | 'base'

type UserDetailsProps = {
  avatar: DetaulAvatar
  name: string
  username: string
  size?: Size
}

export const UserDetails: FC<UserDetailsProps> = ({
  avatar,
  name,
  username,
  size = 'base'
}): JSX.Element => {
  const myConfig = genConfig(avatar as AvatarFullConfig)

  const getAvatarSize = (size: Size): string => (size === 'base' ? 'w-12 h-12' : 'w-10 h-10')

  const getNameSize = (size: Size): string =>
    size === 'base' ? 'font-bold text-base' : 'font-semibold text-sm'

  const getUsernameSize = (size: Size): string => (size === 'base' ? 'text-sm' : 'text-xs')

  return (
    <div className={cn('flex items-center', size === 'base' ? 'gap-x-4' : 'gap-x-2')}>
      <ReactNiceAvatar
        id={name}
        className={cn(
          'shrink-0 rounded-full border-[3px] border-white shadow outline-4',
          getAvatarSize(size!)
        )}
        {...myConfig}
      />
      <div className="leading-none">
        <h2 className={cn('line-clamp-1 text-core-secondary', getNameSize(size!))}>{name}</h2>
        <span className={cn('text-sm text-core-secondary-100', getUsernameSize(size!))}>
          {username}
        </span>
      </div>
    </div>
  )
}
