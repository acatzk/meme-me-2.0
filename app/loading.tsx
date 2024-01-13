import React from 'react'

import { Spinner } from '~/components/custom-icon/spinner'

export default function Loading(): JSX.Element {
  return (
    <div className="flex h-screen min-h-screen items-center justify-items-center">
      <Spinner size="lg" />
    </div>
  )
}
