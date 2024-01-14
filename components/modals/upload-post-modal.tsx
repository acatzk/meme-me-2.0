'use client'

import React from 'react'

import { useUpload } from '~/hooks/use-upload'
import { Dialog, DialogContent, DialogHeader } from '~/components/ui/dialog'

export const UploadPostModal = (): JSX.Element => {
  const upload = useUpload()

  return (
    <Dialog open={upload.isOpen} onOpenChange={upload.onClose}>
      <DialogContent className="max-w-2xl px-4">
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        hello world
      </DialogContent>
    </Dialog>
  )
}
