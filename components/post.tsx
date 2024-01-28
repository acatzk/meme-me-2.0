'use client'

import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShareTwo } from '@icon-park/react'
import { genConfig } from 'react-nice-avatar'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'

import { Button } from '~/components/ui/button'
import { defaultAvatarStyle } from '~/constant/default-avatar-style'

const ReactNiceAvatar = dynamic(async () => await import('react-nice-avatar'), { ssr: false })

export const Post = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const myConfig = genConfig(defaultAvatarStyle as any)

  return (
    <div className="flex items-start justify-between py-6">
      <div className={clsx('flex flex-col items-start gap-x-3 gap-y-2 sm:flex-row')}>
        <ReactNiceAvatar
          className={clsx(
            'h-12 w-12 shrink-0 rounded-full border-[3px] border-white shadow outline-4'
          )}
          {...myConfig}
        />
        <div className="flex w-full max-w-sm shrink-0 flex-col">
          <div className="flex items-center gap-x-2 leading-none text-core-secondary">
            <h2 className={clsx('font-bold')}>allybenwich</h2>
            <span className={clsx('text-sm')}>ally:)</span>
          </div>
          <div className="relative flex flex-col">
            <p className="text-sm text-core-secondary-300">
              pulchitudinous insanity. #fyp #fyp #poems #poetsoftiktok #originalpoem #original
              #acting #skit #act
            </p>
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border-4 border-white shadow">
              <Image
                src="https://images.unsplash.com/photo-1689363199550-d0f417ed21db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                fill={true}
                className="shrink-0"
                alt=""
              />
            </div>
            <div className="absolute -right-16 bottom-0 flex flex-col space-y-2">
              {/* Heart Button */}
              <div className="flex flex-col items-center space-y-1.5 text-xs text-core-secondary-300">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary-outline"
                  className="h-[53px] w-[53px] rounded-full border-stroke-2 bg-section-1"
                >
                  <Heart fill="#586ca0" stroke="none" />
                </Button>
                <span className="text-xs font-medium">2.6M</span>
              </div>
              {/* Message Button */}
              <div className="flex flex-col items-center space-y-1.5 text-xs text-core-secondary-300">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary-outline"
                  className="h-[53px] w-[53px] rounded-full border-stroke-2 bg-section-1 text-core-secondary-300"
                >
                  <MessageCircle className="h-5 w-5 fill-current" />
                </Button>
                <span className="text-xs font-medium">16.4K</span>
              </div>
              {/* Remarks Button */}
              <div className="flex flex-col items-center space-y-1.5 text-xs text-core-secondary-300">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary-outline"
                  className="h-[53px] w-[53px] rounded-full border-stroke-2 bg-section-1 text-core-secondary-300"
                >
                  <Bookmark fill="#586ca0" stroke="none" strokeLinecap="round" />
                </Button>
                <span className="text-xs font-medium">448.3K</span>
              </div>
              {/* Share Button */}
              <div className="flex flex-col items-center space-y-1.5 text-xs text-core-secondary-300">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary-outline"
                  className="h-[53px] w-[53px] rounded-full border-stroke-2 bg-section-1"
                >
                  <ShareTwo theme="filled" size={20} className="text-core-secondary-300" />
                </Button>
                <span className="text-xs font-medium">14.1K</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Button type="button" variant="primary-outline" className="text-sm">
          Follow
        </Button>
      </div>
    </div>
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
