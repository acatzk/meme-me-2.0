import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { IUser } from '~/helpers/interfaces'
import { Button } from '~/components/ui/button'

type SuggestedUserItemProps = {
  user: IUser
}

export const SuggestedUserItem = (props: SuggestedUserItemProps): JSX.Element => {
  const { username, imageUrl, displayName } = props.user

  return (
    <li className="flex items-center justify-between">
      <Link href={`/@${username}`} className="flex items-center gap-x-2">
        <Image
          src={imageUrl}
          width={48}
          height={48}
          className="rounded-full border-[3px] border-white shadow outline-4"
          alt="User Profile"
        />
        <div className="leading-none">
          <h2 className="line-clamp-1 w-[140px] text-sm font-semibold text-core-secondary hover:underline">
            {username}
          </h2>
          <span className="text-xs text-core-secondary-200">{displayName}</span>
        </div>
      </Link>
      <Button
        type="button"
        variant="primary-outline"
        className="w-20 text-xs font-semibold"
        size="xs"
      >
        Follow
      </Button>
    </li>
  )
}
