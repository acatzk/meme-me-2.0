import clsx from 'clsx'
import React from 'react'
import { Search } from 'lucide-react'

export const SearchField = (): JSX.Element => {
  return (
    <div
      className={clsx(
        'relative flex items-center rounded-full bg-section-1 text-sm',
        'border border-stroke-2 text-core-secondary-100',
        'focus-within:ring-2 focus-within:ring-primary',
        'py-6 transition duration-200 ease-in-out'
      )}
    >
      <div className="absolute inset-y-0 left-5 flex items-center focus-within:text-primary">
        <Search className="h-4 w-4" />
      </div>
      <input
        className={clsx(
          'outline-none placeholder:text-core-secondary-200',
          'bg-transparent pl-12 font-medium text-core-secondary',
          'absolute inset-0 py-6 placeholder:font-normal'
        )}
        placeholder="Search"
      />
    </div>
  )
}
