'use client'

import React from 'react'
import { trpc } from '~/app/_trpc/client'
import { serverClient } from '~/app/_trpc/server-client'

type TodoListProps = {
  initialData: Awaited<ReturnType<(typeof serverClient)['getTodos']>>
}

export const TodoList = ({ initialData }: TodoListProps): JSX.Element => {
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData,
    refetchOnMount: false,
    refetchOnReconnect: false
  })

  return (
    <div>
      <pre>{JSON.stringify(getTodos.data, null, 2)}</pre>
    </div>
  )
}
