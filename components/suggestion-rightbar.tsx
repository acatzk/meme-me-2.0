'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FileWarningIcon } from 'lucide-react'
import { Remind, UploadOne } from '@icon-park/react'

import { cn } from '~/lib/utils'
import { useUpload } from '~/hooks/use-upload'
import { Spinner } from '~/components/custom-icon/spinner'

import { SearchField } from './search-field'
import { SuggestedUserList } from './suggested-user-list'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'

export const SuggestionRightBar = (): JSX.Element => {
  const upload = useUpload()
  const isLoading = false
  const isError = false

  const businessLinks = [
    { label: 'About', href: '#' },
    { label: 'Help', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Popular', href: '#' },
    { label: 'Language', href: '#' }
  ]

  return (
    <div className="custom-scrollbar flex h-screen flex-col overflow-y-auto">
      <div className="hidden h-full px-4 py-6 md:block">
        {/* User Options  */}
        <header className="flex items-center gap-x-2">
          {/* Search Field */}
          <div className="flex-1">
            <SearchField />
          </div>
          {/* Notification Bell Button */}
          <button
            className={cn(
              'rounded-full border border-stroke-2 bg-section-1 p-4',
              'transition ease-in-out focus:ring-2 focus:ring-primary',
              'text-core-secondary-100 duration-200 focus:text-primary',
              'outline-none'
            )}
          >
            <Remind size={20} theme="filled" />
          </button>
          {/* Upload Button */}
          <button
            onClick={() => upload.onOpen()}
            className={cn(
              'rounded-full bg-fancyBlue p-4 text-white',
              'transition duration-200 ease-in-out focus:ring-2',
              'outline-none focus:ring-sky-500'
            )}
          >
            <UploadOne size={20} theme="filled" />
          </button>
        </header>
        {isError && (
          <div className="py-4">
            <Alert variant="destructive">
              <FileWarningIcon className="h-4 w-4" />
              <AlertTitle>Opps!</AlertTitle>
              <AlertDescription>Something went wrong fetching data....</AlertDescription>
            </Alert>
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Spinner size="default" />
          </div>
        ) : (
          <main>
            <header className="mt-6 flex items-center justify-between text-sm">
              <h2 className="font-bold text-core-secondary">Suggestions for you</h2>
              <Link href="#" className="font-semibold text-primary hover:underline">
                See All
              </Link>
            </header>
            {/* List of User */}
            <SuggestedUserList />

            <hr className="my-4" />
            <h2 className="text-sm font-bold text-core-secondary">Latest Post Activity</h2>
            <div className="mt-4 rounded-xl border-[3px] border-white shadow">
              <Image
                src="/images/post-image.webp"
                width={300}
                height={300}
                quality={50}
                priority={false}
                className="overflow-hidden rounded-xl"
                alt=""
              />
            </div>
          </main>
        )}
      </div>
      <div className="mb-auto hidden md:block">
        <ul className="flex items-center gap-x-2 px-4 py-2 text-xs text-core-secondary-100">
          {businessLinks.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
              {index < businessLinks.length - 1 && <li>•</li>}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )
}
