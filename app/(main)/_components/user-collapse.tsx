import Image from 'next/image'
import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { ChevronDown } from 'lucide-react'

import { cn } from '~/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'

export const UserCollapse = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { user } = useUser()

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="mt-8 w-full px-3">
          <div className="flex w-full items-center justify-between rounded-lg px-6 py-2 outline-primary">
            <h4 className="font-extrabold text-core-secondary">Account</h4>
            <ChevronDown className={cn('h-5 w-5', !isOpen ? '-rotate-180 transform' : '')} />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex items-center gap-x-4 px-8 py-3 text-sm">
        <Image
          src={
            !isEmpty(user)
              ? user?.imageUrl ??
                'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
              : ''
          }
          width={48}
          height={48}
          className="rounded-full border-[3px] border-white shadow outline-4"
          alt="User Profile"
        />
        <div className="leading-none">
          <h2
            className={cn('line-clamp-1 text-base font-bold text-core-secondary hover:underline')}
          >
            @{user?.username}username
          </h2>
          <span className={cn('text-sm text-core-secondary-100')}>{user?.fullName}</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
