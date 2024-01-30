import React from 'react'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from '@tanstack/react-query'

import { IUser } from '~/helpers/interfaces'
import { Spinner } from '~/components/custom-icon/spinner'
import { SuggestedUserItem } from '~/components/suggested-user-item'

type SuggestedUserListProps = {
  users: IUser[] | undefined
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<
    InfiniteQueryObserverResult<{
      users: Array<{
        id: number
        externalId: string
        username: string
        email: string
        displayName: string
        imageUrl: string
        createdAt: Date
        updatedAt: Date
      }>
      nextCursor: number | undefined
    }>
  >
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
}

export const SuggestedUserList = (props: SuggestedUserListProps): JSX.Element => {
  const { users, fetchNextPage, hasNextPage, isFetchingNextPage } = props

  return (
    <nav className="mt-5">
      <ul className="flex flex-col space-y-6">
        {users?.map((user, index) => {
          return (
            <SuggestedUserItem
              key={index}
              {...{
                user
              }}
            />
          )
        })}
      </ul>
      {isFetchingNextPage ? (
        <div className="mt-5 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : null}

      {!isFetchingNextPage && hasNextPage! && (
        <div className="mt-4 text-center">
          <span
            role="button"
            onClick={() => {
              void fetchNextPage()
            }}
            className="cursor-pointer text-xs font-medium text-core-secondary-200 hover:underline"
          >
            Show more
          </span>
        </div>
      )}
    </nav>
  )
}
