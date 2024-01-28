import React from 'react'
import Link from 'next/link'

export type HashtagProps = {
  tag: string
}

export const Hashtag = ({ tag }: HashtagProps): JSX.Element => {
  return (
    <Link
      href={`/tags/${tag}`}
      className="mr-1 text-sm text-core-secondary-300 hover:text-primary hover:underline"
    >
      #{tag}
    </Link>
  )
}
