'use client'

import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShareTwo } from '@icon-park/react'
import { genConfig } from 'react-nice-avatar'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'

import { defaultAvatarStyle } from '~/constant/default-avatar-style'

import { Button } from './ui/button'

const ReactNiceAvatar = dynamic(async () => await import('react-nice-avatar'), { ssr: false })

export const UserPost = (): JSX.Element => {
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
