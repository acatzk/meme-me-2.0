'use client'

import React, { useEffect, useState } from 'react'

import { UploadPostModal } from './../modals/upload-post-modal'

export const ModalProvider = (): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <UploadPostModal />
    </>
  )
}
