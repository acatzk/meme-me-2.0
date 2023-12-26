import React from 'react'

import { api } from '~/app/_trpc/server-client'
import { AuthenComponents } from './../../_components/authenticationComponent'

export default async function Home(): Promise<JSX.Element> {
  const hello = await api.example.hello.query()

  return (
    <div>
      <pre>{JSON.stringify(hello.greeting, null, 2)}</pre>
      <AuthenComponents />
    </div>
  )
}
