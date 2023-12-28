import { auth } from '@clerk/nextjs'
import isEmpty from 'lodash/isEmpty'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'

type Props = {
  children: ReactNode
}

const MainLayout = ({ children }: Props): JSX.Element => {
  const { userId }: { userId: string | null } = auth()

  if (isEmpty(userId)) {
    return redirect('/')
  }

  return <div>{children}</div>
}

export default MainLayout
