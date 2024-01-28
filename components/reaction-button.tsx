import React, { ComponentProps, ReactNode } from 'react'

import { cn } from '~/lib/utils'
import { Button } from './ui/button'

export type ReactionButtonProps = {
  count: number
  children: ReactNode
  direction?: string
  btnStyle?: string
} & ComponentProps<'button'>

export const ReactionButton = (props: ReactionButtonProps): JSX.Element => {
  const { count, children, direction = 'column', btnStyle } = props

  return (
    <div
      className={cn(
        'inline-flex items-center text-xs text-core-secondary-300',
        direction === 'column' ? 'flex-col gap-y-1.5' : 'flex-row gap-x-1'
      )}
    >
      <Button
        type="button"
        size="icon"
        variant="secondary-outline"
        className={cn('h-[53px] w-[53px] rounded-full border-stroke-2 bg-section-1', btnStyle)}
      >
        {children}
      </Button>
      <span className="font-medium">{count}</span>
    </div>
  )
}
