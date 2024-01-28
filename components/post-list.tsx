'use client'

import React, { useEffect } from 'react'
import { FileWarningIcon } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import { trpc } from '~/trpc/client'
import { Post } from '~/components/post'
import { IPost } from '~/helpers/interfaces'
import { Spinner } from '~/components/custom-icon/spinner'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

export const PostList = (): JSX.Element => {
  const { ref, inView } = useInView()

  const currentUser = trpc.user.currentUser.useQuery()
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.post.getAll.useInfiniteQuery(
      {
        limit: 5
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor
      }
    )

  const posts = data?.pages.reduce((acc: IPost[], page: any) => {
    return [...acc, ...page.posts]
  }, [])

  useEffect(() => {
    if (inView && hasNextPage!) {
      void fetchNextPage()
    }
  }, [inView])

  //   Loading style with Skeleton
  if (isLoading && currentUser.isLoading) {
    return <Post.Skeleton />
  }

  // Error message during fetch
  if (isError && currentUser.isError) {
    return (
      <div className="py-6">
        <Alert variant="destructive">
          <FileWarningIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
        </Alert>
      </div>
    )
  }

  //   Show text with no post
  if (posts?.length === 0) {
    return (
      <div className="mt-3">
        <p className="py-2 text-center text-sm text-core-secondary-200">No Post</p>
      </div>
    )
  }
  return (
    <>
      {posts?.map((post, idx) => {
        const isAuthor = post.user.id === currentUser?.data?.id

        return (
          <Post
            key={idx}
            {...{
              post,
              isAuthor
            }}
          />
        )
      })}

      {isFetchingNextPage ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : null}

      <span style={{ visibility: 'hidden' }} ref={ref}>
        intersection observer marker
      </span>
    </>
  )
}
