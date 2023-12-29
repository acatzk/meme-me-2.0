'use client'

import React from 'react'
import { SignOutButton } from '@clerk/nextjs'
import { Menu, AlertOctagon, Clock, Moon, Settings } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from '~/components/ui/dropdown-menu'

export const UserDropdownOptions = (): JSX.Element => {
  return (
    <div className="mt-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="flex items-center gap-x-4 rounded-none px-8 py-2 text-core-secondary-200 hover:bg-background hover:text-core-secondary-300"
          >
            <Menu className="h-7 w-7" />
            <span className="text-lg font-semibold">More</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[246px]" sideOffset={15}>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Clock className="mr-2 h-4 w-4" />
            Your activity
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Moon className="mr-2 h-4 w-4" />
            Switch appearance
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AlertOctagon className="mr-2 h-4 w-4" />
            Report a problem
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <SignOutButton>
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
