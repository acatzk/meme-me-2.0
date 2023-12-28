import Image from 'next/image'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ChevronDown } from 'lucide-react'

import { cn } from '~/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'

export const UserCollapse = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { user } = useUser()

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} defaultOpen>
      <CollapsibleTrigger className="w-full">
        <div className="mt-8 w-full px-3">
          <div className="flex w-full items-center justify-between rounded-lg px-6 py-2 outline-primary">
            <h4 className="text-core-secondary font-extrabold">Account</h4>
            <ChevronDown className={cn('h-5 w-5', !isOpen ? '-rotate-180 transform' : '')} />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="text-gray-500 flex items-center gap-x-4 px-8 py-4 text-sm">
        <Image
          // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
          src={user?.imageUrl as string}
          width={48}
          height={48}
          className="shadow rounded-full border-[3px] border-white outline-4"
          alt="User Profile"
        />
        <div className="leading-none">
          <h2
            className={cn('text-core-secondary line-clamp-1 text-base font-bold hover:underline')}
          >
            @{user?.username}username
          </h2>
          <span className={cn('text-core-secondary-100 text-sm')}>{user?.fullName}</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
