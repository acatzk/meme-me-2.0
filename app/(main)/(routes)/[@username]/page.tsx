'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Camera, FileWarningIcon } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

import { trpc } from '~/trpc/client'
import { IPost } from '~/helpers/interfaces'
import { Spinner } from '~/components/custom-icon/spinner'
import ProfileLayout from '~/components/layouts/profile-layout'
import { extractUsernameFromPath } from '~/helpers/extract-username-from-path'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

export default function ProfilePage(): JSX.Element {
  const pathname = usePathname()
  const { ref, inView } = useInView()
  const username = extractUsernameFromPath(pathname)

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.post.getAllPostByUsername.useInfiniteQuery(
      {
        limit: 15,
        username
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor
      }
    )

  const posts = data?.pages.reduce((acc: IPost[], page: any): IPost[] => {
    return [...acc, ...page.posts]
  }, [])

  useEffect(() => {
    if (inView && hasNextPage!) {
      void fetchNextPage()
    }
  }, [inView])

  if (isError) {
    return (
      <div className="px-6 py-6">
        <Alert variant="destructive">
          <FileWarningIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.message ?? 'Something went wrong!'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (posts?.length === 0) {
    return (
      <div className="mx-auto mt-8 flex max-w-sm flex-col items-center space-y-6">
        <div className="border-secondary-300 rounded-full border-2 p-4">
          <Camera className="h-6 w-6 stroke-1 text-core-secondary-300" />
        </div>
        <h1 className="text-2xl font-bold text-core-secondary-300">No Posts Yet</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <ProfileLayout>
        <div className="mx-auto mt-4 grid w-full max-w-4xl animate-pulse grid-cols-1 gap-2 px-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="h-52 w-full rounded-sm bg-core-secondary-100/30" />
          ))}
        </div>
      </ProfileLayout>
    )
  }

  return (
    <ProfileLayout>
      <pre>{JSON.stringify(posts, null, 2)}</pre>

      {isFetchingNextPage ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : null}

      <span style={{ visibility: 'hidden' }} ref={ref}>
        intersection observer marker
      </span>
    </ProfileLayout>
  )
}
