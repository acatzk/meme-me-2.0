'use client'

import dynamic from 'next/dynamic'
import React, { ComponentProps } from 'react'
import { WinkingFace } from '@icon-park/react'
import data from '@emoji-mart/data/sets/14/facebook.json'

import { Emoji } from '~/helpers/emoji-helpers'

import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const EmojiMartReact = dynamic(async () => await import('@emoji-mart/react'), {
  ssr: false
})

type EmojiPickerProps = {
  handleEmojiSelect: (emoji: Emoji) => void
  panelPosition?: string
  isSubmitting: boolean
  btnStyle?: string
} & ComponentProps<'div'>

export const EmojiPicker = (props: EmojiPickerProps): JSX.Element => {
  const { handleEmojiSelect, panelPosition, isSubmitting, btnStyle, ...rest } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full text-slate-400 hover:text-slate-600"
        >
          <WinkingFace theme="outline" size="22" strokeWidth={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" side="right">
        <div {...rest}>
          <EmojiMartReact data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
        </div>
      </PopoverContent>
    </Popover>
  )
}
