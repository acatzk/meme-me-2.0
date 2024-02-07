import { generateComponents } from '@uploadthing/react'
import { generateReactHelpers } from '@uploadthing/react/hooks'

import { OurFileRouter } from '~/app/api/uploadthing/core'

export const { UploadButton, UploadDropzone, Uploader } = generateComponents<OurFileRouter>()
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()

export type MediaFiles = {
  key: string
  url: string
}
