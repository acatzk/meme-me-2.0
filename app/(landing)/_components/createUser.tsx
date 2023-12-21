'use client'

import React from 'react'
import { toast } from 'sonner'
import { trpc } from '~/app/_trpc/client'

export const CreateUser = (): JSX.Element => {
  const create = trpc.createUser.useMutation()

  const onCreateUser = async (): Promise<void> => {
    await create.mutateAsync({
      name: 'joshua galit',
      email: 'joshuagalit@gmail.com'
    })
    toast.success('Created user')
  }

  return (
    <>
      <button onClick={onCreateUser as any}>Create User</button>
    </>
  )
}
