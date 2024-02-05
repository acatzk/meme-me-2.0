import React from 'react'

import HomeLayout from '~/components/layouts/home-layout'

export default function Loading(): JSX.Element {
  return (
    <HomeLayout>
      <div role="status" className="flex animate-pulse flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="mt-4 flex items-center space-x-3">
            <svg
              className="h-12 w-12 text-core-secondary-100/30"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div className="mb-2 h-2.5 w-32 rounded-full bg-core-secondary-100/30"></div>
              <div className="h-2 w-48 rounded-full bg-core-secondary-100/30"></div>
            </div>
          </div>
          <div className="h-3 w-24 rounded-full bg-core-secondary-100/30"></div>
        </div>
        <div className="relative ml-14 h-[450px] w-80 rounded-lg bg-core-secondary-100/30">
          <div className="absolute -right-14 bottom-2 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
          <div className="absolute -right-14 bottom-16 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
          <div className="absolute -right-14 bottom-32 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
          <div className="absolute -right-14 bottom-48 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
        </div>
      </div>
    </HomeLayout>
  )
}
