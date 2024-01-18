'use client'

import React from 'react'

import { useUpload } from '~/hooks/use-upload'
import { Dialog, DialogContent, DialogHeader } from '~/components/ui/dialog'

import { Button } from './../ui/button'
import { UploadPhotoVideoIcon } from './../custom-icon/upload-video-icon'

export const UploadPostModal = (): JSX.Element => {
  const upload = useUpload()

  return (
    <Dialog open={upload.isOpen} onOpenChange={upload.onClose}>
      <DialogContent className="max-w-[519px] rounded-xl px-0 py-0">
        <DialogHeader className="border-b border-stroke-3 py-2">
          <h2 className="text-center text-lg font-bold text-core-secondary">Create new post</h2>
        </DialogHeader>
        {/* <hr /> */}
        <main className="flex min-h-[500px] items-center justify-center p-5">
          <section className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center rounded-lg border border-dashed border-core-secondary-100 p-4">
              <input className="hidden" />
              <UploadPhotoVideoIcon className="h-36 w-40 text-core-secondary" />
              <h1 className="text-xl font-medium text-core-secondary">
                Drag photos and videos here
              </h1>
            </div>
            <input
              type="file"
              id="file-upload"
              name="file-upload"
              accept="image/*, video/*"
              style={{ display: 'none' }}
              multiple={true}
            />
            <Button
              type="button"
              variant="primary"
              onClick={() => document.getElementById('file-upload')?.click()}
              className="mt-4 px-4 py-1 text-sm"
            >
              Select from computer
            </Button>
          </section>
        </main>
      </DialogContent>
    </Dialog>
  )
}
