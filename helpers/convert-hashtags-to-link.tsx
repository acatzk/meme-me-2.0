import React from 'react'
import Link from 'next/link'

export const convertHashtagsToLinks = (text: string): JSX.Element => {
  const regex = /(#[^\s]+)/g
  const parts = text.split(regex)

  return (
    <p className="!text-secondary-300 text-sm">
      {parts.map((part, index) => {
        if (part.match(regex) !== null) {
          const href = part.slice(1) // Remove the '#' character
          return (
            <Link
              href={`/tags/${encodeURIComponent(href)}`}
              key={index}
              className="outline-primary hover:text-primary hover:underline"
            >
              {part}
            </Link>
          )
        }

        return part
      })}
    </p>
  )
}
