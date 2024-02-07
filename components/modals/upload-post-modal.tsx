'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { isEmpty } from 'lodash'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { ChevronDown, ChevronLeft, MapPin } from 'lucide-react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import React, { ChangeEvent, ReactNode, useCallback, useState } from 'react'

import { cn } from '~/lib/utils'
import { trpc } from '~/trpc/client'
import { Tag } from '~/helpers/tag-helpers'
import { useUpload } from '~/hooks/use-upload'
import { Emoji } from '~/helpers/emoji-helpers'
import { Textarea } from '~/components/ui/textarea'
import { PostSchema, PostSchemaType } from '~/zod/schema'
import { MediaFiles, useUploadThing } from '~/helpers/uploadthing'
import { Dialog, DialogContent, DialogHeader } from '~/components/ui/dialog'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~/components/ui/collapsible'
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormDescription
} from '~/components/ui/form'

import { Button } from './../ui/button'
import { Switch } from './../ui/switch'
import { Carousel } from './../carousel'
import { TagInput } from './../tag-input'
import { EmojiPicker } from './../emoji-picker'
import { Spinner } from './../custom-icon/spinner'
import { UploadPhotoVideoIcon } from './../custom-icon/upload-video-icon'

export const UploadPostModal = (): JSX.Element => {
  const upload = useUpload()
  const currentUser = trpc.user.currentUser.useQuery()
  const hashtags = trpc.hashtag.getHashtags.useQuery()
  const createPost = trpc.post.create.useMutation()

  const [tags, setTags] = useState<Tag[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [fileUrls, setFileUrls] = useState<string[]>([])
  const [advanceSetting, setAdvanceSetting] = useState<boolean>(true)

  const isFileExist = files

  const form = useForm<PostSchemaType>({
    mode: 'onTouched',
    resolver: zodResolver(PostSchema)
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting }
  } = form

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files
    const fileArray = files !== null ? Array.from(files) : []
    setFiles(fileArray) // * USE TO PREPARE TO UPLOAD IN `UPLOADTHING`

    // * USE TO PARTIALLY DISPLAY THE IMAGE/VIDEOS
    const urls = fileArray.map((file) => URL.createObjectURL(file))
    setFileUrls(urls)

    setValue(
      'mediaFiles',
      fileArray.map((p, k) => ({
        key: k.toString(),
        url: p.type
      }))
    )
  }

  // * UPLOAD THING HOOKS
  const { startUpload } = useUploadThing('mediaPost', {
    onClientUploadComplete: (res) => {
      const mediaFiles = res?.map((file) => file)
      setValue(
        'mediaFiles',
        mediaFiles?.map((m) => ({
          key: m.key,
          url: m.url
        })) as MediaFiles[]
      )
    },
    onUploadError: (error) => {
      toast.error(error.message)
    }
  })

  // * UPLOAD THING ONDROP
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles) // * USE TO PREPARE TO UPLOAD IN `UPLOADTHING`

    // * USE TO PARTIALLY DISPLAY THE IMAGE/VIDEOS
    const urls = acceptedFiles.map((file) => URL.createObjectURL(file))
    setFileUrls(urls)
  }, [])

  const fileTypes = ['image', 'video']
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: !isEmpty(fileTypes) ? generateClientDropzoneAccept(fileTypes) : undefined
  })

  const handleCollapsibleChange = (): void => setAdvanceSetting((prev) => !prev)

  const handleReset = (): void => {
    setFileUrls([])
    setFiles([])
    setTags([])
    reset({
      mediaFiles: undefined,
      captions: '',
      location: ''
    })
  }

  // * THIS WILL AUTOMATICALLY ADD THE VALUE WITH EMOJI
  const handleEmojiSelect = (emoji: Emoji): void => {
    const captions = watch('captions')
    if (captions?.length === 200) return

    if (captions !== undefined) {
      setValue('captions', captions + emoji.native)
    }
  }

  const onPost: SubmitHandler<PostSchemaType> = async (data): Promise<void> => {
    const uploads = await startUpload(files)
      .then(
        (p) =>
          p?.map((d) => ({
            key: d.key,
            url: d.url
          }))
      )
      .catch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        (error: any) => toast.error(error?.message)
      )

    if (!isEmpty(uploads)) {
      await createPost.mutateAsync(
        {
          title: data.captions ?? '',
          mediaFiles: {
            createMany: {
              data: uploads as MediaFiles[]
            }
          },
          isHideLikeAndCount: data.isHideLikeAndCount,
          isTurnOffComment: data.isTurnOffComment,
          postHashtags: {
            create: tags?.map((t) => ({
              hashtag: {
                connectOrCreate: {
                  where: { tag: t.text },
                  create: { tag: t.text }
                }
              }
            }))
          }
        },
        {
          onSuccess() {
            toast.success('Created new post successfully!')
          },
          onSettled() {
            handleReset()
            upload.onClose()
          }
        }
      )
    } else {
      toast.error('Something went wrong!')
    }
  }

  return (
    <Dialog open={upload.isOpen} onOpenChange={upload.onClose}>
      <DialogContent
        className={cn(
          'h-auto overflow-y-auto rounded-xl bg-white p-0',
          !isEmpty(isFileExist) ? 'max-w-[710px]' : 'max-w-xl'
        )}
      >
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onPost)}
          >
            <DialogHeader className="flex flex-row items-center justify-between border-b border-stroke-3 px-3 py-2.5">
              {!isEmpty(isFileExist) ? (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleReset}
                  className="rounded-full outline-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft />
                </button>
              ) : (
                <span></span>
              )}
              <h2 className="text-center font-bold">Create new post</h2>
              {!isEmpty(isFileExist) ? (
                <button
                  type="submit"
                  className={cn(
                    'hover:text-primary-200 p-0.5 text-sm font-semibold text-primary outline-primary',
                    isSubmitting ? 'disabled:cursor-not-allowed disabled:opacity-50' : ''
                  )}
                >
                  {isSubmitting ? <Spinner /> : 'Share'}
                </button>
              ) : (
                <span></span>
              )}
            </DialogHeader>
            {/* <hr /> */}
            <main
              className={cn('min-h-[500px]', isEmpty(isFileExist) && 'flex place-content-center')}
            >
              {isEmpty(isFileExist) && (
                <section className="flex flex-col items-center justify-center">
                  <div
                    {...getRootProps()}
                    className="flex flex-col items-center rounded-lg border border-dashed border-core-secondary-100 p-4"
                  >
                    <input {...getInputProps()} className="hidden" />
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
                    onChange={handleFileChange}
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
              )}
              {!isEmpty(isFileExist) && (
                <section className="relative flex h-full flex-col-reverse md:flex-row">
                  <div
                    className={cn(
                      'flex h-full min-h-[550px] w-full justify-center rounded-bl-2xl',
                      'max-w-sm items-center overflow-hidden bg-black'
                    )}
                  >
                    <Carousel>
                      {
                        fileUrls?.map((asset, idx) => {
                          if (asset.endsWith('.mp4')) {
                            return (
                              <video key={idx} src={asset} autoPlay muted loop className="w-full">
                                Your browser does not support the video tag.
                              </video>
                            )
                          } else {
                            return (
                              <img
                                key={idx}
                                src={asset}
                                alt=""
                                className="h-full w-full flex-1 object-fill"
                              />
                            )
                          }
                        }) as ReactNode[]
                      }
                    </Carousel>
                  </div>
                  <div className="w-full p-4 md:w-80">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={
                          currentUser?.data?.imageUrl ??
                          'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
                        }
                        width={32}
                        height={32}
                        className="rounded-full border-[3px] border-white shadow outline-4"
                        alt="User Profile"
                      />
                      <h2 className="font-semibold">{currentUser?.data?.displayName}</h2>
                    </div>
                    <section className="relative mt-2">
                      <FormField
                        control={control}
                        name="captions"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Write a caption"
                                maxLength={200}
                                {...field}
                                className={cn(
                                  'bg-none! w-full resize-none rounded-sm border-0 p-2',
                                  'custom-scrollbar focus-visible:ring-none! text-sm text-core-secondary placeholder:text-core-secondary-200 focus-within:outline-none',
                                  'font-medium placeholder:font-light',
                                  isSubmitting
                                    ? 'disabled:cursor-not-allowed disabled:opacity-50'
                                    : ''
                                )}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="-ml-2 flex items-center justify-between text-core-secondary-200">
                        <EmojiPicker
                          {...{
                            handleEmojiSelect,
                            isSubmitting
                          }}
                        />
                        <span className="text-xs font-normal">{`${
                          watch('captions')?.length ?? 0
                        }/200`}</span>
                      </div>
                    </section>
                    <section className="relative z-50 mt-2">
                      <TagInput
                        {...{
                          state: {
                            tags,
                            setTags
                          },
                          data: hashtags?.data
                        }}
                      />
                    </section>
                    <section className="mt-2">
                      <FormField
                        control={control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative flex items-center justify-between space-x-2 text-core-secondary-200">
                                <input
                                  type="text"
                                  placeholder="Add location"
                                  onChange={field.onChange}
                                  className={cn(
                                    'border-1 m-0 w-full border-[#eee] py-2 text-xs focus:bottom-0 focus:outline-none focus:ring-0',
                                    'font-normal text-core-secondary placeholder:text-core-secondary-200',
                                    isSubmitting
                                      ? 'disabled:cursor-not-allowed disabled:opacity-50'
                                      : ''
                                  )}
                                  disabled={isSubmitting}
                                />
                                <MapPin className="absolute right-2 h-4 w-4 stroke-1 text-core-secondary-200" />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </section>
                    <Collapsible
                      onOpenChange={handleCollapsibleChange}
                      defaultOpen
                      className="mt-2"
                    >
                      <CollapsibleTrigger className="inline-flex w-full justify-between py-1.5 text-sm font-bold text-core-secondary-300 outline-none">
                        Advanced settings
                        <ChevronDown
                          className={cn(!advanceSetting ? '-rotate-180 transform' : '', 'h-5 w-5')}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-3">
                        <FormField
                          control={control}
                          name="isHideLikeAndCount"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-normal text-core-secondary-300">
                                  Hide like and view counts on this post
                                </FormLabel>
                                <FormDescription className="text-xs font-light">
                                  Only you will see the total number of likes and views on this
                                  post. You change this alter by going to the ... menu at the top of
                                  the post. To hide like counts on other’s post, go to your account
                                  settings.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="isTurnOffComment"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start justify-between">
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-normal text-core-secondary-300">
                                  Turn off commenting
                                </FormLabel>
                                <FormDescription className="text-xs font-light">
                                  You can change this later by going to the ... menu at the top of
                                  your post.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </section>
              )}
            </main>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
