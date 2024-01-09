import Image from 'next/image'
import React, { useState } from 'react'
import { ChevronDown, MessageSquareWarningIcon } from 'lucide-react'

import { cn } from '~/lib/utils'
import { trpc } from '~/trpc/client'
import { Skeleton } from '~/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'

export const UserCollapse = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { data: user, isLoading, isError } = trpc.user.currentUser.useQuery()

  if (isError && isLoading) {
    return (
      <div className="px-4 py-4">
        <Alert variant="destructive">
          <MessageSquareWarningIcon className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Something went wrong!</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-8">
      <CollapsibleTrigger className="w-full">
        <div className="w-full px-3">
          <div className="flex w-full items-center justify-between rounded-lg px-6 py-2 outline-primary">
            <h4 className="font-extrabold text-core-secondary">Account</h4>
            <ChevronDown className={cn('h-5 w-5', !isOpen ? '-rotate-180 transform' : '')} />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex items-center gap-x-4 px-8 py-3 text-sm">
        {isLoading ? (
          <UserSkeleton />
        ) : (
          <>
            <Image
              src={
                user?.imageUrl ??
                'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
              }
              width={48}
              height={48}
              className="rounded-full border-[3px] border-white shadow outline-4"
              alt="User Profile"
            />
            <div className="overflow-hidden leading-none">
              <h2
                className={cn(
                  'line-clamp-1 text-base font-bold text-core-secondary hover:underline'
                )}
              >
                @{user?.username}
              </h2>
              <span className={cn('text-sm text-core-secondary-100')}>{user?.displayName}</span>
            </div>
          </>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

function UserSkeleton(): JSX.Element {
  return (
    <div className="mt-4 flex animate-pulse items-center">
      <svg
        className="me-3 h-10 w-10 text-stroke-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div>
        <Skeleton className="mb-2 h-2.5 w-32 rounded-full" />
        <Skeleton className="h-2 w-44 rounded-full" />
      </div>
    </div>
  )
}
