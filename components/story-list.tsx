'use client'

import clsx from 'clsx'
import React from 'react'
import dynamic from 'next/dynamic'
import { Plus } from 'lucide-react'
import { genConfig } from 'react-nice-avatar'

import { dummyUserStories } from '~/constant/dummy-user-stories'

const ReactNiceAvatar = dynamic(async () => await import('react-nice-avatar'), { ssr: false })

export const StoryList = (): JSX.Element => {
  const config = {
    sex: 'woman',
    faceColor: '#F9C9B6',
    earSize: 'small',
    eyeStyle: 'smile',
    noseStyle: 'round',
    mouthStyle: 'peace',
    shirtStyle: 'hoody',
    glassesStyle: 'none',
    hairColor: '#D2EFF3',
    hairStyle: 'normal',
    hatStyle: 'beanie',
    hatColor: '#77311D',
    eyeBrowStyle: 'up',
    shirtColor: '#FC909F',
    bgColor: 'linear-gradient(45deg, #176fff 0%, #68ffef 100%)'
  } as const
  const myConfig = genConfig(config)

  return (
    <nav className="custom-scrollbar flex w-full items-center gap-x-6 overflow-auto py-2">
      <div className="ml-2 inline-flex flex-col items-center gap-x-4 space-y-1">
        <div className="ring-secondary-100 relative rounded-full border-[2px] border-white shadow outline-4 ring-2 ring-offset-1 ">
          <ReactNiceAvatar
            className={clsx(
              'h-12 w-12 contrast-125',
              'brightness-50 saturate-200 backdrop-brightness-125'
            )}
            {...myConfig}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Plus className="h-5 w-5 text-white" />
          </div>
        </div>
        <h4 className="line-clamp text-xs font-semibold text-core-secondary">You</h4>
      </div>
      <ul className="mr-2 flex w-full items-center gap-x-6 pl-2">
        {dummyUserStories.map((story, index) => {
          const isViewed = story.isViewed === true
          const avatar = genConfig(story.avatar as unknown as string)
          return (
            <li key={index} className="inline-flex flex-col items-center gap-x-4 space-y-1">
              <div className="inline-block">
                <ReactNiceAvatar
                  className={clsx(
                    'rounded-full border-[2px] border-white shadow outline-4',
                    'h-12 w-12 ring-2 ring-offset-1',
                    isViewed ? 'ring-secondary-100' : 'ring-primary '
                  )}
                  {...avatar}
                />
              </div>
              <h4 className="line-clamp-1 w-12 text-center text-xs font-semibold text-core-secondary">
                {story.username}
              </h4>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
