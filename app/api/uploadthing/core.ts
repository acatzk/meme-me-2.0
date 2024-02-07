import { createUploadthing } from 'uploadthing/next'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // * Takes a 4 2mb images and/or 1 256mb video
  mediaPost: f({
    image: { maxFileSize: '32MB', maxFileCount: 10 },
    video: { maxFileSize: '256MB', maxFileCount: 5 }
  }).onUploadComplete(() => {})
}

export type OurFileRouter = typeof ourFileRouter
