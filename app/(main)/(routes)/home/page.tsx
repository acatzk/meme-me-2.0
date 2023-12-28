import React from 'react'
import { currentUser } from '@clerk/nextjs'

export default async function HomePage(): Promise<JSX.Element> {
  const user = await currentUser()

  return (
    <div>
      <p>Home Page</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
