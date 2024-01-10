import Link from 'next/link'
import React, { FC } from 'react'

import { dummySuggestedUsers } from '~/constant/dummy-suggested-users'

import { Button } from './ui/button'
import { UserDetails } from './user-details'

type SuggestedUserListProps = Record<string, unknown>

export const SuggestedUserList: FC<SuggestedUserListProps> = (): JSX.Element => {
  return (
    <nav className="mt-5">
      <ul className="flex flex-col space-y-6">
        {dummySuggestedUsers.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <UserDetails
              {...{
                avatar: item.avatar,
                name: item.name,
                username: item.username,
                size: 'sm'
              }}
            />
            <Button
              type="button"
              variant={item.isFollowed ? 'primary-outline' : 'primary'}
              className="w-20 text-xs font-semibold"
              size="xs"
            >
              {item.isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-center">
        <Link href="#" className="text-xs font-medium text-core-secondary-200 hover:underline">
          Show more
        </Link>
      </div>
    </nav>
  )
}
