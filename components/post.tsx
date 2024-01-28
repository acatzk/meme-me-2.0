'use client'

import clsx from 'clsx'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShareTwo } from '@icon-park/react'
import { genConfig } from 'react-nice-avatar'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'

import { IPost } from '~/helpers/interfaces'
import { Button } from '~/components/ui/button'
import { Reaction } from '~/helpers/emoji-helpers'
import { formatTimeDifference } from '~/helpers/format-time-diff'
import { defaultAvatarStyle } from '~/constant/default-avatar-style'
import { convertHashtagsToLinks } from '~/helpers/convert-hashtags-to-link'

import { Hashtag } from './hashtag'
import { Carousel } from './carousel'
import { ReactionButton } from './reaction-button'

const ReactNiceAvatar = dynamic(async () => await import('react-nice-avatar'), { ssr: false })

type PostProps = {
  post: IPost
  isAuthor: boolean
}

export const Post = ({ post, isAuthor }: PostProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const myConfig = genConfig(defaultAvatarStyle as any)
  const user = post.user
  const mediaFiles = post.mediaFiles
  const postHashtags = post.postHashtags

  const reactions = [
    {
      type: 'heart',
      count: 0
    },
    {
      type: 'comment',
      count: 0
    },
    {
      type: 'bookmark',
      count: 0
    },
    {
      type: 'share',
      count: 0
    }
  ]

  return (
    <main className="flex items-start justify-between py-6">
      <section className="flex flex-col items-start gap-x-3 gap-y-2 sm:flex-row">
        {/* User Avatar */}
        <Link href={`/@${user?.username}`} className="outline-primary">
          <ReactNiceAvatar
            className={clsx(
              'rounded-full border-[3px] border-white outline-4',
              'h-14 w-14 shrink-0 shadow'
            )}
            {...myConfig}
          />
        </Link>
        <div className="relative flex w-full max-w-lg flex-col space-y-1">
          {/* User Information */}
          <Link
            href={`/@${user?.username}`}
            className="group inline-flex items-center gap-x-2 leading-none text-core-secondary outline-primary"
          >
            <h2 className="font-bold group-hover:underline">{user?.username}</h2>
            <p className="text-sm">
              {user?.displayName} &bull; <small>{formatTimeDifference(post?.createdAt)}</small>
            </p>
          </Link>
          {/* User Post */}
          <div className="flex flex-col space-y-1.5">
            <div className="flex flex-wrap items-center space-x-1">
              {convertHashtagsToLinks(post.title)}
              {postHashtags?.map((item: { hashtag: { tag: string } }, index: number) => (
                <Hashtag key={index} tag={item.hashtag.tag} />
              ))}
            </div>
            <div className="relative w-[355px] max-w-[355px] shrink-0">
              <div
                className={clsx(
                  'flex h-[470px] items-center justify-center border-[5px] border-white',
                  'overflow-hidden rounded-lg bg-black shadow'
                )}
              >
                <Carousel>
                  {mediaFiles?.map((asset, idx) => {
                    if (asset.url.endsWith('.mp4')) {
                      return (
                        <video
                          key={idx}
                          src={asset.url}
                          autoPlay
                          muted
                          loop
                          className="w-full rounded-md"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )
                    } else {
                      return (
                        <Image
                          key={idx}
                          src={asset.url}
                          width={500}
                          height={470}
                          placeholder="blur"
                          className="z-50"
                          blurDataURL={asset.url}
                          alt=""
                        />
                      )
                    }
                  })}
                </Carousel>
              </div>
              {/* Post Interaction Button */}
              <div className="absolute -right-16 bottom-2 flex flex-col space-y-2">
                {reactions.map((reaction, idx) => (
                  <React.Fragment key={idx}>
                    {reaction.type === Reaction.heart && (
                      <ReactionButton count={reaction?.count}>
                        <Heart fill="#586ca0" stroke="none" />
                      </ReactionButton>
                    )}
                    {reaction.type === Reaction.comment && (
                      <ReactionButton count={reaction.count}>
                        <MessageCircle fill="#586ca0" className="h-5 w-5" />
                      </ReactionButton>
                    )}
                    {reaction.type === Reaction.bookmark && (
                      <ReactionButton count={reaction.count}>
                        <Bookmark fill="#586ca0" stroke="none" strokeLinecap="round" />
                      </ReactionButton>
                    )}
                    {reaction.type === Reaction.share && (
                      <ReactionButton count={reaction.count}>
                        <ShareTwo theme="filled" size={20} className="text-core-secondary-300" />
                      </ReactionButton>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Follow Button */}
      {!isAuthor && (
        <section className="mt-2">
          <Button
            type="submit"
            variant="primary"
            className="px-3.5 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Follow
          </Button>
        </section>
      )}
    </main>
  )
}

Post.Skeleton = function PostSkeleton() {
  return (
    <div role="status" className="flex animate-pulse flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="mt-4 flex items-center space-x-3">
          <svg
            className="h-12 w-12 text-core-secondary-100/30"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="mb-2 h-2.5 w-32 rounded-full bg-core-secondary-100/30"></div>
            <div className="h-2 w-48 rounded-full bg-core-secondary-100/30"></div>
          </div>
        </div>
        <div className="h-3 w-24 rounded-full bg-core-secondary-100/30"></div>
      </div>
      <div className="relative ml-14 h-[450px] w-80 rounded-lg bg-core-secondary-100/30">
        <div className="absolute -right-14 bottom-2 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
        <div className="absolute -right-14 bottom-16 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
        <div className="absolute -right-14 bottom-32 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
        <div className="absolute -right-14 bottom-48 h-12 w-12 rounded-full bg-core-secondary-100/30"></div>
      </div>
    </div>
  )
}
