import React from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from 'next/image'
import { useQueryClient } from '@tanstack/react-query'

import { trpc } from '~/trpc/client'
import { IUser } from '~/helpers/interfaces'
import { Button } from '~/components/ui/button'
import { Spinner } from './custom-icon/spinner'

type SuggestedUserItemProps = {
  user: IUser
  authorId: number
}

export const SuggestedUserItem = (props: SuggestedUserItemProps): JSX.Element => {
  const { id, username, imageUrl, displayName, isFollowed } = props.user
  const { authorId } = props

  const queryClient = useQueryClient()
  const follow = trpc.follow.follow.useMutation()
  const unfollow = trpc.follow.unfollow.useMutation()

  const handleFollowUnfollow = async (): Promise<void> => {
    if (isFollowed) {
      await unfollow.mutateAsync(
        {
          authorId,
          targetId: id
        },
        {
          onSuccess: () => {
            void queryClient.invalidateQueries({
              queryKey: [['user', 'getSuggestedUsers']]
            })
            toast.success(`You unfollow ${displayName}`)
          },
          onError: () => {
            toast.error(`Something went wrong unfollowing ${displayName}`)
          }
        }
      )
    } else {
      await follow.mutateAsync(
        {
          authorId,
          targetId: id
        },
        {
          onSuccess: () => {
            void queryClient.invalidateQueries({
              queryKey: [['user', 'getSuggestedUsers']]
            })
            toast.success(`You follow ${displayName}`)
          },
          onError: () => {
            toast.error(`Something went wrong following ${displayName}`)
          }
        }
      )
    }
  }

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
        variant={isFollowed ? 'primary' : 'primary-outline'}
        className="w-20 text-xs font-semibold"
        onClick={() => {
          void handleFollowUnfollow()
        }}
        size="xs"
        disabled={follow.isLoading || unfollow.isLoading}
      >
        {follow.isLoading || unfollow.isLoading ? (
          <Spinner size="default" className={isFollowed ? 'text-white' : ''} />
        ) : isFollowed ? (
          'Unfollow'
        ) : (
          'Follow'
        )}
      </Button>
    </li>
  )
}
